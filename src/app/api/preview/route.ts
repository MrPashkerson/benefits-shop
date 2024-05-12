import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

import { payloadToken } from '../../_api/token'

export async function GET(
  req: Request & {
    cookies: {
      get: (name: string) => {
        value: string
      }
    }
  },
): Promise<Response> {
  const token = req.cookies.get(payloadToken)?.value
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')
  const secret = searchParams.get('secret')

  if (!url) {
    return new Response('URL-адрес не указан', { status: 404 })
  }

  if (!token) {
    new Response('Вы не можете просматривать эту страницу', { status: 403 })
  }

  // validate the Payload token
  const userReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  })

  const userRes = await userReq.json()

  if (!userReq.ok || !userRes?.user) {
    draftMode().disable()
    return new Response('Вы не можете просматривать эту страницу', { status: 403 })
  }

  if (secret !== process.env.NEXT_PRIVATE_DRAFT_SECRET) {
    return new Response('Неверный токен', { status: 401 })
  }

  draftMode().enable()

  redirect(url)
}
