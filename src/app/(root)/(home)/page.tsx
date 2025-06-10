"use client"
import { useUserRole } from "@/components/hooks/useUserRole";
import Actioncard from "@/components/ui/Actioncard";
import { QUICK_ACTIONS } from "@/constants";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import MeetingModal from "@/components/ui/MeetingModal";

export default function Home() {
  const {isInterviewer,isCandidate, isLoading}=useUserRole()
  const [showModal, SetShowModal] = useState(false)
  const router = useRouter();

  const[modalType, setModalType] = useState<"start" | "join">()
  // const interviews = useQuery(api.interviews.getMyInterviews)

 
  const handleQuickAction =(title : string) => {
    switch(title){
      case "New Call":
        setModalType("start")
        SetShowModal(true)
        break
      case "Join Interview":
        setModalType("join")
        SetShowModal(true)
        break
      default: 
        router.push(`/${title.toLowerCase()}`)
    }
  }

  if(isLoading) return <p>loading...</p>

  return (
    <div className="container max-w-7xl mx-auto p-6">
        {/* Welcome section */}
        <div className="rounded-lg bg-card p-6 border shadow-sm mb-10">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Welcome back
            </h1>
            <p className="text-muted-foreground mt-2">
              {isInterviewer  
              ? " Manage your interviews and review candidate effectively"
              : " Access your upcoming interviews and preparation" }
            </p>
        </div>
        {isInterviewer ? (
          <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {QUICK_ACTIONS.map((action) => (
                <Actioncard
                  key={action.title}
                  action={action}
                  onClick = {() => handleQuickAction(action.title)}
                />
              ))}
          </div>
          <MeetingModal
            isOpen={showModal}
            onClose={()=> SetShowModal(false)}
            title={modalType === "join" ? "Join Meeting" : "Start Meeting"}
            isJoinMeeting={modalType==="join"}
          />
          </>
        ) :(
          <>
          <div>Candidate Your Views here</div>
          </>
        ) }
    </div>
  );
}
 