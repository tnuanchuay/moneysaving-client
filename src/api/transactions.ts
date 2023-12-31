import {Transaction} from "../app/transactions";
import {CapacitorHttp} from "@capacitor/core";
import {getTransactionUrl} from "./urls";

interface TransactionResponse {
    id: number;
    user_id: number;
    family_id: number;
    amount: number;
    description:string
    category_id: number
    created_at: string;

}
export const getTransactions = async (): Promise<Transaction[]> => {
    const result = await CapacitorHttp.get({
        url: getTransactionUrl,
        webFetchExtra: {
            credentials: 'include'
        }
    })

    if(result.status === 200) {
        return (result.data as TransactionResponse[]).map(transaction => ({
            id: transaction.id,
            userId: transaction.user_id,
            familyId: transaction.family_id,
            amount: transaction.amount,
            description: transaction.description,
            categoryId: transaction.category_id,
            createdAt: new Date(transaction.created_at)
        }))
    }

    throw new Error(result.data.error)
}