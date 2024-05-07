import { CART } from './cart'

export const ME_QUERY = `query {
  meUser {
    user {
      id
      email
      name
      credits
      ${CART}
      roles
    }
    exp
  }
}`
