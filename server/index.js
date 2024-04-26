import express from "express";

const app = express();
const port = 3000; //add your port here
const PUBLISHABLE_KEY = "pk_test_51P68wy1tDqxMM27lIviRoVTwoO1AQRuzmqcx89PM7B72Iibty2gkHCqkGkgbQ7P9M1cAIFAugTooK5nvzCIo7Vf200wjUFoORY";
const SECRET_KEY = "sk_test_51P68wy1tDqxMM27lL63ijCcSovukKHgC314o44bsSnJhfCxJUpbd4H1fHp7jUrazHAZZfPHeaPinezQgpkBUCy3u005wr2Him3";
import Stripe from "stripe";

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2024-04-10" });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 500, //lowest denomination of particular currency
      currency: "usd",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});