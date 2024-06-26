import { createOfferProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const STRIPE_Sk = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(STRIPE_Sk || "");

function getUnixTimestampForSevenDaysLater() {
  const currentDate = new Date();
  const sevenDaysLater = new Date(currentDate);
  sevenDaysLater.setDate(currentDate.getDate() + 3); // Add 3 days to the current date
  return Math.floor(sevenDaysLater.getTime() / 1000); // Convert to Unix timestamp (in seconds)
}

export async function GET() {
  return NextResponse.json({ name: "Paul Innocent" });
}

export interface CreateSetupIntentProps {
  name: string;
  email: string;
}

export interface CreateSubscriptionProps {
  name: string;
  email: string;
  price: string;
  customer_id: string;
  payment_method: string;
  creditMode: string;
  credit: number;
}

interface getSubscriptionProps {
  customer_id: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  const body: any = await req.json(); // Parse JSON body
  const { route } = body;
  // create setup_intent
  if (route === "create_intent") {
    try {
      const { name, email }: CreateSetupIntentProps = body;
      var options: any = {
        automatic_payment_methods: { enabled: true },
      };
      let customers = null;

      if (email) {
        customers = await stripe.customers.list({
          email,
          limit: 1,
        });
      }

      let customer = customers?.data[0] || null;
      if (customer) {
        options = { ...options, customer: customer?.id };
      }
      if (!customer && email) {
        const customer_new = await stripe.customers.create({
          name,
          email,
        });
        console.log(`created customer for: ${customer_new.email}`);
        customer = customer_new;
        options = { ...options, customer: customer_new?.id };
      }

      const intent = await stripe.setupIntents.create(options);

      // console.log(`customer: ${customer?.email}`);
      return NextResponse.json(
        {
          intent,
          customer,
          clientSecret: intent?.client_secret,
        },
        { status: 200, statusText: "OK" }
      );
    } catch (error) {
      console.error("failed to create setupIntent: ", error);
      return NextResponse.json(
        { message: `Internal server error: ${error}` },
        { status: 500, statusText: "Internal server error" }
      );
    }
  }

  if (route === "create_paymentIntent") {
    try {
      const { name, email }: CreateSetupIntentProps = body;
      var options: any = {
        amount: 500,
        currency: "GBP",
        payment_method_types: ["card"],
      };
      let customers = null;

      if (email) {
        customers = await stripe.customers.list({
          email,
          limit: 1,
        });
      }

      let customer = customers?.data[0] || null;
      if (customer) {
        options = { ...options, customer: customer?.id };
      }
      if (!customer && email) {
        const customer_new = await stripe.customers.create({
          name,
          email,
        });
        console.log(`created customer for: ${customer_new.email}`);
        customer = customer_new;
        options = { ...options, customer: customer_new?.id };
      }

      const paymentIntent = await stripe.paymentIntents.create(options);

      // console.log('paymentIntent');
      // console.log(paymentIntent);

      return NextResponse.json(
        {
          clientSecret: paymentIntent?.client_secret,
          paymentIntent,
          customer,
        },
        { status: 200, statusText: "OK" }
      );
    } catch (error: any) {
      console.error(error?.message);
      return NextResponse.json(
        { message: `Internal server error: ${error}` },
        { status: 500, statusText: "Internal server error" }
      );
    }
  }

  if (route === "create_subscription") {
    try {
      var {
        name,
        email,
        price,
        customer_id,
        payment_method,
        creditMode,
        credit,
      }: CreateSubscriptionProps = body;

      if (!customer_id) {
        var options: any = {
          name,
          email,
        };
        const customer = await stripe.customers.create(options);
        customer_id = customer.id;
        console.log(
          `created customer for: ${customer?.email} at subscription point`
        );
      }
      if (customer_id) {
        try {
          await stripe.paymentMethods.attach(payment_method, {
            customer: customer_id,
          });
        } catch (error: any) {
          console.log("error attaching payment method");
          console.log(error?.message);
          if (
            error?.message ===
            "The payment method you provided has already been attached to a customer."
          ) {
            console.log(
              "The payment method you provided has already been attached to a customer."
            );
          } else {
            console.log(
              `payment method failed to attach to customer ${customer_id}`
            );
            return NextResponse.json(
              {
                message: `payment method failed to attach to customer ${customer_id}`,
              },
              { status: 500, statusText: "Internal server error" }
            );
          }
        }

        try {
          console.log(`upadating customer's default payment method`);
          var customer: Stripe.Customer | null = await stripe.customers.update(
            customer_id,
            {
              // address: billing_details?.address,
              name,
              invoice_settings: {
                default_payment_method: payment_method,
              },
            }
          );
          console.log(
            `upadated customer's (${customer.email}) default payment method`
          );
        } catch (error: any) {
          console.log("error?.message");
          console.log(error?.message);
        }
      }

      // // Create an immediate £5 charge
      // const charge = await stripe.charges.create({
      //   amount: 500, // £5 in pennies
      //   currency: "GBP",
      //   customer: customer_id,
      //   description: "Immediate £5 charge",
      // });

      // email !== "paulinnocent04@gmail.com" || email.startsWith("_testz")
      // const dontSkip = true

      // const dontSkip = false;
      const dontSkip =
        email !== "paulinnocent04@gmail.com" || !email.startsWith("_testz");

      if (dontSkip) {
        const chargeRes = await stripe.paymentIntents.create({
          amount: creditMode ? credit * 100 : 500, // £50 if in creditMode
          currency: "GBP",
          automatic_payment_methods: {
            enabled: true,
            allow_redirects: "never",
          },
          customer: customer_id,
          description: creditMode
            ? `for ${(credit / 50) * 15} credits`
            : "Immediate £5 charge",
          payment_method,
          confirm: true,
        });
        if (chargeRes.status !== "succeeded") {
          return NextResponse.json(
            { message: `Failed to collect payment`, chargeRes },
            { status: 400, statusText: "Bad Request" }
          );
        }
      }

      const trial_end = getUnixTimestampForSevenDaysLater(); //# 3 days free trial

      const subData: Stripe.SubscriptionCreateParams = {
        customer: customer_id,
        items: [{ price }],
        trial_end,
        payment_settings: {
          payment_method_types: ["card"],
          save_default_payment_method: "on_subscription",
        },
        expand: ["latest_invoice.payment_intent"],
      };

      const subscription = creditMode
        ? null
        : await stripe.subscriptions.create(subData);

      console.log(`subscription created for ${email}: ${subscription?.id}`);

      const lastInvoice: any = subscription?.latest_invoice;

      // console.log("paymentIntent");
      // console.log(paymentIntent);
      // console.log("paymentIntent");

      return NextResponse.json(
        {
          message: `Subscription successful!`,
          subscription,
          // paymentIntent,
          customer_id,
          creditMode,
          credit,
          clientSecret: lastInvoice?.payment_intent?.client_secret,
        },
        { status: 200, statusText: "OK" }
      );
    } catch (error) {
      console.error("failed to create subscription: " + error);
      return NextResponse.json(
        { message: `Internal server error: ${error}` },
        { status: 500, statusText: "Internal server error" }
      );
    }
  }

  if (route === "delete_subscription") {
    try {
      var { subscription_id }: { subscription_id: string } = body;

      await stripe.subscriptions.cancel(subscription_id);
      console.log(`Subscription: ${subscription_id} has been cancelled! \n`);

      return NextResponse.json(
        {
          message: `Subscription cancelled successful!`,
        },
        { status: 200, statusText: "OK" }
      );
    } catch (error: any) {
      console.error("failed to create subscription: " + error);
      return NextResponse.json(
        { message: error.message },
        { status: 500, statusText: "Internal server error" }
      );
    }
  }

  if (route === "get_subscription") {
    try {
      var { customer_id }: getSubscriptionProps = body;

      const subscriptions = await stripe.subscriptions.list({
        customer: customer_id,
        limit: 1,
      });

      return NextResponse.json(
        {
          subscription: subscriptions.data[0],
        },
        { status: 200, statusText: "OK" }
      );
    } catch (error) {
      // console.error(error);
      return NextResponse.json(
        { message: `Internal server error: ${error}` },
        { status: 500, statusText: "Internal server error" }
      );
    }
  }

  if (route === "get_customers") {
    try {
      const customersRes = await stripe.customers.list();

      return NextResponse.json(
        {
          customers: customersRes.data,
        },
        { status: 200, statusText: "OK" }
      );
    } catch (error) {
      // console.error(error);
      return NextResponse.json(
        { message: `Internal server error: ${error}` },
        { status: 500, statusText: "Internal server error" }
      );
    }
  }

  if (route === "pay_for_custom_offer") {
    try {
      var { customer_id, amount, email, description }: createOfferProps = body;

      if (!customer_id) {
        return NextResponse.json(
          {
            message: `User do not have a payment id`,
          },
          { status: 500, statusText: "Internal server error" }
        );
      }

      let customer: any = null;
      try {
        customer = await stripe.customers.retrieve(customer_id);
      } catch (error: any) {
        return NextResponse.json(
          {
            message: `failed to get user details: ${error.message}`,
          },
          { status: 500, statusText: "Internal server error" }
        );
      }

      if (!customer.invoice_settings.default_payment_method) {
        return NextResponse.json(
          {
            message: `Customer did not have any payment method saved so can't be billed`,
          },
          { status: 400, statusText: "Invalid payment method" }
        );
      }

      var pi;
      if (
        process.env.NODE_ENV !== "production" ||
        email !== "paulinnocent04@gmail.com" ||
        email.startsWith("_testz")
      ) {
        try {
          pi = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: "GBP",
            automatic_payment_methods: {
              enabled: true,
              allow_redirects: "never",
            },
            customer: customer_id,
            description,
            payment_method: customer.invoice_settings.default_payment_method,
            confirm: true,
          });
        } catch (error: any) {
          return NextResponse.json(
            {
              error,
              message: `failed to collect payment: ${error.message}`,
            },
            { status: error.statusCode, statusText: error.code }
          );
        }
      }

      return NextResponse.json(
        {
          message: `Offer created successful!`,
          pi,
        },
        { status: 200, statusText: "OK" }
      );
    } catch (error) {
      console.error("failed to create subscription: " + error);
      return NextResponse.json(
        { message: `Internal server error: ${error}` },
        { status: 500, statusText: "Internal server error" }
      );
    }
  }

  return NextResponse.json(
    { message: `Route not found` },
    { status: 404, statusText: "NOT FOUND" }
  );
}
