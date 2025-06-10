import { useState } from "react";
import { Dialog, DialogHeader, DialogTitle } from "./dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import { Input } from "./input";
import { Button } from "./button";
import { useMeetingActions } from "../hooks/useMeetingsActions";
import { NODE_ESM_RESOLVE_OPTIONS } from "next/dist/build/webpack-config";

interface MeetingModalProps{
    isOpen : boolean;
    onClose:()=> void;
    title : string;
    isJoinMeeting : boolean;
}

const MeetingModal = ( { isOpen, onClose, title, isJoinMeeting} : MeetingModalProps) => {
    const[meetingUrl, setMeetingUrl] = useState('');
    const{createInstantMeeting, joinMeeting} =useMeetingActions();

    const handleStart = () => {
        if(isJoinMeeting){
            const meetingId =meetingUrl.split("/").pop()
            if(meetingId) joinMeeting(meetingId) 
        }else{
            createInstantMeeting()
        }

        setMeetingUrl("");
        onClose()
    }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
                {isJoinMeeting && (
                    <Input
                        placeholder="Paste Meeting Link here ..."
                        value={meetingUrl}
                        onChange={(e) => setMeetingUrl(e.target.value)}
                    />
                )}
                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleStart} disabled={isJoinMeeting && !meetingUrl.trim()}>
                        {isJoinMeeting ? "Join Meeting ": "Start Meeting"}
                    </Button>
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default MeetingModal