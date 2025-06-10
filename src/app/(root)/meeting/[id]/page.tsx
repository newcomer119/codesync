"use client"
import LoaderUI from '@/components/ui/LoaderUI'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import MeetingSetup from '@/components/ui/MeetingSetup'
import MeetingRoom from '@/components/ui/MeetingRoom'
import { useGetCallById } from '@/components/hooks/useGetCallById'
function MeetingPage (){
  const { id } = useParams()
  const {isLoaded} = useUser()
  const{call, isCallLoading} = useGetCallById(id)
  const[isSetupComplete , setIsSetupComplete] = useState(false);

  if(!isLoaded || isCallLoading) return <LoaderUI/>

  if(!call){
    return ( 
      <div className='h-screen flex items-center justify-center'>
        <p className='text-2xl font-semibold'>Meeting Not Found</p>
      </div>
    )
  }

  return (
    <StreamCall call={call}>
      <StreamTheme>
        {!isSetupComplete ? (
          <MeetingSetup onSetupComplete={()=>setIsSetupComplete(true)}/>
        ) : (
          <MeetingRoom/>
        )}
      </StreamTheme>
    </StreamCall>
  )
}

export default MeetingPage;