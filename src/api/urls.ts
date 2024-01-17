
const host = import.meta.env.MODE === 'development' ? 'http://localhost:3000' : 'https://app.binimm.com'

export const loginUrl = `${host}/api/v0/users/login`
export const getTransactionUrl = `${host}/api/v0/transactions`
export const createTransactionUrl = `${host}/api/v0/transactions`
export const createCategoryUrl = `${host}/api/v0/categories`
export const getCategoriesUrl = `${host}/api/v0/categories`
export const getSummaryUrl = `${host}/api/v0/summary`
export const getFamilyUrl = `${host}/api/v0/families`
export const createFamilyUrl = `${host}/api/v0/families`
export const getUserProfileUrl = `${host}/api/v0/users/profile`
export const createFamilyInviteLinkUrl = `${host}/api/v0/families/invite`
export const signUpUrl = `${host}/api/v0/users`
export const logoutUrl = `${host}/api/v0/users/logout`
export const resumeSessionUrl = `${host}/api/v0/users/resume`