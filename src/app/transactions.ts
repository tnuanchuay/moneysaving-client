export interface Transaction {
    id: number
    userId: number
    familyId: number
    amount: number
    description:string
    categoryId: number
    createdAt: Date
}