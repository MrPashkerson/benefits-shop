import { draftMode } from 'next/headers'

export async function GET(): Promise<Response> {
  draftMode().disable()
  return new Response('Режим черновика отключен')
}
