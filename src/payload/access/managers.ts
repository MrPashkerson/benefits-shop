import type { AccessArgs } from 'payload/config'

import { checkRole } from '../collections/Users/checkRole'
import type { User } from '../payload-types'

type isManager = (args: AccessArgs<unknown, User>) => boolean

export const managers: isManager = ({ req: { user } }) => {
  return checkRole(['manager'], user)
}
