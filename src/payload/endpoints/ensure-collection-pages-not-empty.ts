import type { PayloadHandler } from 'payload/config'

import { checkRole } from '../collections/Users/checkRole'

export const checkPages: PayloadHandler = async (req, res): Promise<void> => {
  const { user } = req

  if (!user || !checkRole(['admin'], req.user)) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  const result = await req.payload.find({ collection: 'pages', limit: 1 })
  if (result.docs.length > 0) {
    res.status(200).json({ seeded: true })
  } else {
    res.status(200).json({ seeded: false })
  }
}
