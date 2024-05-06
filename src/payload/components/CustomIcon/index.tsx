import React from 'react'
import Image from 'next/image'

import './index.scss'

const CustomIcon: React.FC = () => {
  return <Image src="/favicon.svg" alt="logo" width={24} height={24} className="CustomIcon" />
}

export default CustomIcon
