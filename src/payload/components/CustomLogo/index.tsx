import React from 'react'
import Image from 'next/image'

import './index.scss'

const CustomLogo: React.FC = () => {
  return <Image src="/logo-white.svg" alt="logo" width={250} height={23} className="CustomLogo" />
}

export default CustomLogo
