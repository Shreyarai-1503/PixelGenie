"use server"
import Stripe from "stripe"
import { handleError } from "../utils";
import { redirect } from "next/navigation";
import { connectToDatabase } from "../db/mongoose";
import Transaction from "../db/models/transaction.model";
import { updateCredits } from "./user.actions";

export async function checkoutCredits(transaction: CheckoutTransactionParams) { // Initiates a Stripe checkout session to process a payment for purchasing credits
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const amount = Number(transaction.amount) * 100; //stripe process transactions in cents

    const session = await stripe.checkout.sessions.create({  //creates a new checkout session
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    unit_amount: amount,
                    product_data: {
                        name: transaction.plan
                    }
                },
                quantity: 1
            }
        ],
        metadata: {
            plan: transaction.plan,
            credits: transaction.credits,
            buyerId: transaction.buyerId
        },
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    })

    redirect(session.url!)
}

export async function createTransaction(transaction: CreateTransactionParams) {
    try {
        await connectToDatabase();

        //Create new transaction with a buyer
        const newTransaction = await Transaction.create({
            ...transaction, buyer: transaction.buyerId
        });

        await updateCredits(transaction.buyerId, transaction.credits);

        return JSON.parse(JSON.stringify(newTransaction));
    } catch (error) {
        handleError(error);
    }
}