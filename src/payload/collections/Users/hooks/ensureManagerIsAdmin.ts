import type { FieldHook } from 'payload/types'

import type { User } from '../../../payload-types'

// ensure the first user created is an admin
// 1. lookup a single user on create as succinctly as possible
// 2. if there are no users found, append `admin` to the roles array
// access control is already handled by this fields `access` property
// it ensures that only admins can create and update the `roles` field
export const ensureManagerIsAdmin: FieldHook<User> = async ({ req, operation, value }) => {
  if (operation === 'create' || operation === 'update') {
    // if `admin` not in array of values, add it
    if ((value || []).includes('manager') && !(value || []).includes('admin')) {
      return [...(value || []), 'admin']
    }
  }

  return value
}
