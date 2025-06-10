"use client"

import { useUserRole } from "@/components/hooks/useUserRole"
import LoaderUI from "@/components/ui/LoaderUI"
import { useUser } from "@clerk/nextjs"

import { useRouter } from "next/navigation"
import InterviewSchedulesUI from "./InterviewSchedulesUI"
import InterviewScheduleUI from "./InterviewSchedulesUI"

const SchedulePage = () => {

  const router = useRouter()
  const {isInterviewer, isLoading} = useUserRole()
  if(isLoading) return <LoaderUI/>
  if(!isInterviewer) return router.push("/")




  return (
    <InterviewScheduleUI/>
  )
}

export default SchedulePage