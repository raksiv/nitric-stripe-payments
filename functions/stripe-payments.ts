import { api } from "@nitric/sdk";

const YOUR_DOMAIN = "http://example.com";
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

// API
const mainApi = api("main");

// Create Checkout Session
mainApi.get("/payment", async (ctx) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],

    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  ctx.res.status = 303;
  ctx.res.headers["Location"] = [session.url];

  return ctx;
});
