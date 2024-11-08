import dotenv from 'dotenv'
import next from 'next'
import nextBuild from 'next/dist/build'
import path from 'path'

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

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info(`Next.js is now building...`)
      // @ts-expect-error
      await nextBuild(path.join(__dirname, '../'))
      process.exit()
    })

    return
  }

  const nextApp = next({
    dev: process.env.NODE_ENV !== 'production',
  })

  const nextHandler = nextApp.getRequestHandler()

  app.use((req, res) => nextHandler(req, res))

  nextApp.prepare().then(() => {
    payload.logger.info('Starting Next.js...')

    app.listen(PORT, async () => {
      payload.logger.info(`Next.js App URL: ${process.env.PAYLOAD_PUBLIC_SERVER_URL}`)
    })
  })
}

start()
