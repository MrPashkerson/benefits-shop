import dotenv from 'dotenv'
import path from 'path'

// This file is used to replace `server.ts` when ejecting i.e. `yarn eject`
// See `../eject.ts` for exact details on how this file is used
// See `./README.md#eject` for more information

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

import express from 'express'
import cron from 'node-cron'
import payload from 'payload'

import { seed } from './payload/seed'
import { creditUsers, resetCredits } from './payload/utilities/scheduledTasks'

const app = express()
const PORT = process.env.PORT || 3000

// Redirect root to the admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

const start = async (): Promise<void> => {
  await payload.init({
    email: {
      transportOptions: {
        service: process.env.SMTP_SERVICE,
        host: process.env.SMTP_HOST,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        port: Number(process.env.SMTP_PORT),
        secure: Number(process.env.SMTP_PORT) === 465, // true for port 465, false (the default) for 587 and others
        requireTLS: true,
      },
      fromName: 'Магазин Льгот',
      fromAddress: process.env.SMTP_USER,
    },
    secret: process.env.PAYLOAD_SECRET || '',
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  if (process.env.PAYLOAD_SEED === 'true') {
    await seed(payload)
    process.exit()
  }

  const creditUsersTime = process.env.CREDIT_USERS_TIME.replace(/['"`]/g, '') || '0 3 1 * *'
  const resetUserCreditsTime =
    process.env.RESET_USER_CREDITS_TIME.replace(/['"`]/g, '') || '0 0 1 1 * *'

  cron.schedule(creditUsersTime, () => {
    payload.logger.info('Running creditUsers task...')
    creditUsers()
  })
  cron.schedule(resetUserCreditsTime, () => {
    payload.logger.info('Running resetCredits task...')
    resetCredits()
  })

  app.listen(PORT, async () => {
    payload.logger.info(`App URL: ${process.env.PAYLOAD_PUBLIC_SERVER_URL}`)
  })
}

start()
