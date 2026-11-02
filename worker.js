const ALLOWED_ORIGINS = new Set([
  "https://delariodelombre-lab.github.io"
]);

const PRODUCTS = [
  {
    id: "guide-transformation",
    name: "La prise de conscience",
    price: 4000
  },
  {
    id: "guide-preparation-mentale-spirituelle",
    name: "La préparation mentale et spirituelle",
    price: 4000
  }
];

function json(data, status = 200, origin = null) {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  };

  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Vary"] = "Origin";
  }

  return new Response(JSON.stringify(data), { status, headers });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");

    if (origin && !ALLOWED_ORIGINS.has(origin)) {
      return json({ success: false, message: "Origine non autorisée." }, 403);
    }

    if (request.method === "OPTIONS") {
      if (!origin || !ALLOWED_ORIGINS.has(origin)) {
        return new Response(null, { status: 403 });
      }

      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Vary": "Origin"
        }
      });
    }

    if (url.pathname === "/health" && request.method === "GET") {
      try {
        if (!env.DB) throw new Error("D1 indisponible");
        await env.DB.prepare("SELECT 1").first();

        return json({
          success: true,
          service: "De L'Ombre à la Lumière",
          database: "connected",
          payment: "not_configured"
        }, 200, origin);
      } catch {
        return json({
          success: false,
          database: "not_connected",
          message: "La base de données est indisponible."
        }, 503, origin);
      }
    }

    if (url.pathname === "/api/products" && request.method === "GET") {
      return json({
        success: true,
        products: PRODUCTS.map(product => ({
          ...product,
          currency: "XOF"
        }))
      }, 200, origin);
    }

    if (url.pathname === "/api/orders" && request.method === "POST") {
      try {
        if (!env.DB) {
          return json({
            success: false,
            message: "Base de données indisponible."
          }, 503, origin);
        }

        const rawBody = await request.text();

        if (rawBody.length > 10000) {
          return json({
            success: false,
            message: "Demande trop volumineuse."
          }, 413, origin);
        }

        const body = JSON.parse(rawBody);
        const customer = body.customer || {};
        const items = body.items;

        const name = String(customer.name || "").trim();
        const phone = String(customer.phone || "").trim();
        const email = String(customer.email || "").trim();

        if (name.length < 2 || name.length > 100) {
          return json({ success: false, message: "Nom invalide." }, 400, origin);
        }

        if (!/^[0-9+()\s.-]{7,25}$/.test(phone)) {
          return json({ success: false, message: "Numéro de téléphone invalide." }, 400, origin);
        }

        if (email && (
          email.length > 254 ||
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        )) {
          return json({ success: false, message: "Adresse e-mail invalide." }, 400, origin);
        }

        if (!Array.isArray(items) || items.length < 1 || items.length > 2) {
          return json({ success: false, message: "Articles de commande invalides." }, 400, origin);
        }

        const orderItems = [];
        const seen = new Set();
        let total = 0;

        for (const item of items) {
          const product = PRODUCTS.find(p => p.id === item.productId);
          const quantity = Number(item.quantity);

          if (
            !product ||
            !Number.isInteger(quantity) ||
            quantity < 1 ||
            quantity > 5 ||
            seen.has(item.productId)
          ) {
            return json({
              success: false,
              message: "Un article ou une quantité est invalide."
            }, 400, origin);
          }

          seen.add(item.productId);
          orderItems.push({ product, quantity });
          total += product.price * quantity;
        }

        if (total > 40000) {
          return json({ success: false, message: "Montant trop élevé." }, 400, origin);
        }

        const clientResult = await env.DB.prepare(
          "INSERT INTO clients (nom, telephone, email) VALUES (?, ?, ?)"
        ).bind(name, phone, email || null).run();

        const clientId = clientResult.meta.last_row_id;

        const reference = "DOL-" +
          crypto.randomUUID().replace(/-/g, "").slice(0, 16).toUpperCase();

        const orderResult = await env.DB.prepare(
          `INSERT INTO commandes
           (reference, client_id, montant, devise, statut)
           VALUES (?, ?, ?, 'XOF', 'en_attente')
           RETURNING id`
        ).bind(reference, clientId, total).first();

        if (!orderResult) throw new Error("Commande non créée");

        const statements = orderItems.map(item =>
          env.DB.prepare(
            `INSERT INTO articles_commande
             (commande_id, produit_id, nom_produit, prix_unitaire, quantite)
             VALUES (?, ?, ?, ?, ?)`
          ).bind(
            orderResult.id,
            item.product.id,
            item.product.name,
            item.product.price,
            item.quantity
          )
        );

        statements.push(
          env.DB.prepare(
            `INSERT INTO paiements
             (commande_id, prestataire, montant, statut)
             VALUES (?, 'fedapay', ?, 'en_attente')`
          ).bind(orderResult.id, total)
        );

        await env.DB.batch(statements);

        return json({
          success: true,
          message: "Commande enregistrée. Aucun paiement n'a encore été effectué.",
          order: {
            reference,
            amount: total,
            currency: "XOF",
            status: "en_attente"
          },
          payment: "not_started"
        }, 201, origin);

      } catch {
        return json({
          success: false,
          message: "Impossible d'enregistrer la commande."
        }, 500, origin);
      }
    }

    return json({
      success: false,
      message: "Route introuvable."
    }, 404, origin);
  }
};