'use client'

import React, { useEffect, useState } from 'react'

import { Product } from '../../../payload/payload-types'

import classes from './index.module.scss'

export const Price: React.FC<{
  product: Product
  quantity?: number
  button?: 'addToCart' | 'removeFromCart' | false
}> = ({ product, quantity = 1, button = 'addToCart' }) => {
  const priceWithQuantity = product.price * quantity

  return (
    <div className={classes.actions}>
      <div className={classes.price}>
        <p>{priceWithQuantity} б.</p>
      </div>
    </div>
  )
}
