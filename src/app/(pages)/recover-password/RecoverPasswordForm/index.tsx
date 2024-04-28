'use client'

import React, { Fragment, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

import { Button } from '../../../_components/Button'
import { Input } from '../../../_components/Input'
import { Message } from '../../../_components/Message'

import classes from './index.module.scss'

type FormData = {
  email: string
}

export const RecoverPasswordForm: React.FC = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = useCallback(async (data: FormData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (response.ok) {
      setSuccess(true)
      setError('')
    } else {
      setError(
        'При попытке отправить письмо со сбросом пароля возникла проблема. Пожалуйста, попробуйте ещё раз.',
      )
    }
  }, [])

  return (
    <Fragment>
      {!success && (
        <React.Fragment>
          <div className={classes.formWrapper}>
            <p>
              {`Пожалуйста, введите свой адрес электронной почты. Вы получите письмо с инструкцией по сбросу пароля.`}
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
              <Message error={error} className={classes.message} />
              <Input
                name="email"
                label="Email"
                required
                register={register}
                error={errors.email}
                type="email"
              />
              <Button
                type="submit"
                appearance="primary"
                label="Восстановить пароль"
                className={classes.submit}
              />
            </form>
          </div>
        </React.Fragment>
      )}
      {success && (
        <React.Fragment>
          <h2 className={classes.subTitle}>Запрос отправлен</h2>
          <p>
            Проверьте свою электронную почту, чтобы найти ссылку, которая позволит вам безопасно
            сбросить пароль.
          </p>
        </React.Fragment>
      )}
    </Fragment>
  )
}
