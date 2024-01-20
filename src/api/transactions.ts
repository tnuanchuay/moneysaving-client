import {Transaction} from "../app/transactions"
import {CapacitorHttp} from "@capacitor/core"
import {
    createTransactionUrl,
    deleteTransactionUrl,
    getTransactionByIdUrl,
    getTransactionUrl,
    updateTransactionUrl
} from "./urls"

interface TransactionResponse {
    id: number
    user_id: number
    family_id: number
    amount: number
    description: string
    category_id: number
    created_at: string

}

export const getTransactions = async (): Promise<Transaction[]> => {
    const result = await CapacitorHttp.get({
        url: getTransactionUrl,
        webFetchExtra: {
            credentials: 'include'
        }
    })

    if (result.status === 200) {
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

export const createTransaction = async (amount: number, description: string, categoryId: number, familyId: number) => {
    const result = await CapacitorHttp.request({
        method: 'POST',
        url: createTransactionUrl,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            amount: amount as number,
            description: description,
            category_id: categoryId,
            family_id: familyId
        },
        webFetchExtra: {
            credentials: 'include'
        }
    })

    if (result.status === 200) {
        return
    }

    throw new Error(result.data.error)
}

export const getTransactionById = async (id: number): Promise<Transaction> => {
    const result = await CapacitorHttp.get({
        url: getTransactionByIdUrl(id),
        webFetchExtra: {
            credentials: 'include'
        }
    })

    if (result.status === 200) {
        const transaction = result.data as TransactionResponse
        return {
            id: transaction.id,
            userId: transaction.user_id,
            familyId: transaction.family_id,
            amount: transaction.amount,
            description: transaction.description,
            categoryId: transaction.category_id,
            createdAt: new Date(transaction.created_at)
        }
    }

    throw new Error(result.data.error)
}

export const updateTransaction = async (id: number, amount: number, description: string, categoryId: number, familyId: number) => {
    const result = await CapacitorHttp.request({
        method: 'PUT',
        url: updateTransactionUrl(id),
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            id: id,
            amount: amount as number,
            description: description,
            category_id: categoryId,
            family_id: familyId
        },
        webFetchExtra: {
            credentials: 'include'
        }
    })

    if (result.status === 200) {
        return
    }

    throw new Error(result.data.error)
}

export const deleteTransaction = async (id: number) => {
    const result = await CapacitorHttp.request({
        method: 'DELETE',
        url: deleteTransactionUrl(id),
        webFetchExtra: {
            credentials: 'include'
        }
    })

    if (result.status === 200) {
        return
    }

    throw new Error(result.data.error)
}