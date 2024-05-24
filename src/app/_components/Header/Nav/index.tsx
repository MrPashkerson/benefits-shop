'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Header as HeaderType, User } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { Button } from '../../Button'
import { CartLink } from '../../CartLink'
import { CMSLink } from '../../Link'

import classes from './index.module.scss'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const { user } = useAuth()

  return (
    <nav className={[classes.nav, user === undefined && classes.hide].filter(Boolean).join(' ')}>
      {user && <p>{user.credits} б.</p>}
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="none"/>
      })}
      <CartLink />
      {user && <Link href="/account">Аккаунт</Link>}
      {!user && (
        <Button
          el="link"
          href="/login"
          label="Войти"
          appearance="primary"
          onClick={() => (window.location.href = '/login')}
        />
      )}
      {user && (
        <Link href="/logout" className={classes.navItem}>
          <Image src="/assets/icons/logout.svg" alt="Выйти" width={24} height={24} />
        </Link>
      )}
    </nav>
  )
}
