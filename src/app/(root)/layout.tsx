
import React, { ReactNode } from 'react'
import StreamVideoProvider from '@/components/Provider/StreamCallProvider'
const layout = ({children} : {children : React.ReactNode}) => {
  return (
    <StreamVideoProvider>
        {children}
    </StreamVideoProvider>
  )
}

export default layout