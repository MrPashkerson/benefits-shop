import React, { Fragment, useCallback, useEffect, useState } from 'react'

export const SeedButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const checkPages = async () => {
      try {
        const response = await fetch('/api/check-pages')
        const { seeded } = await response.json()
        if (!seeded) setSeeded(false)
      } catch (err) {
        console.error('Не удалось проверить коллекцию "pages":', err)
      }
    }

    checkPages()
  }, [])

  const handleClick = useCallback(
    async e => {
      e.preventDefault()
      if (loading || seeded) return

      setLoading(true)
      setError(null)

      try {
        await fetch('/api/seed')
        setSeeded(true)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    },
    [loading, seeded],
  )

  let message = ''
  if (loading) message = ' (настраиваем...)'
  if (seeded) message = ' (готово!)'
  if (error) message = ` (ошибка: ${error})`

  if (seeded) return null

  return (
    <Fragment>
      <a href="/api/seed" target="_blank" rel="noopener noreferrer" onClick={handleClick}>
        Нажмите сюда, чтобы произвести первичную настройку БД и панели администратора
      </a>
      {message}
    </Fragment>
  )
}
