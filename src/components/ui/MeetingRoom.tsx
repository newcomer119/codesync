import {
  CallControls,
  CallingState,
  CallParticipantListing,
  PaginatedGridLayout,
  SpeakerLayout,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./resizable";
import { LayoutListIcon, UsersIcon, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button } from "./button";

const MeetingRoom = () => {
  const router = useRouter();

  const [layout, setLayout] = useState<"grid" | "speaker">("speaker");

  const [showParticipants, setShowParticipants] = useState(false);

  const { useCallCallingState, useParticipants } = useCallStateHooks();

  const callingState = useCallCallingState();

  const call = useCall();

  const participants = useParticipants();

  if (callingState !== CallingState.JOINED) {
    return (
      <div className="h-96 flex items-center justify-center">
        <LoaderIcon className="size-6 animate-spin" />
      </div>
    );
  }

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        defaultSize={35}
        minSize={25}
        maxSize={100}
        className="relative"
      >
        {/* Video Layout  */}
        <div className="absolute inset-0">
          {layout === "grid" ? <PaginatedGridLayout /> : <SpeakerLayout />}

          {/* Participants List Overlay */}
          {showParticipants && (
            <div className="absolute right-0 top-0 h-full w-[300px] bg-background/95 backdrop:blur supports-[backdrop-filter]:bg-background/60">
              <div className="flex justify-end p-2">
                <button
                  onClick={() => setShowParticipants(false)}
                  className="p-2 hover:bg-accent rounded-full transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <CallParticipantListing data={participants} />
            </div>
          )}
        </div>

        {/* Video Controls */}
        <div className="absolute bottom-4 left-0 right-0">
          <div className="flex flex-col items-center gap-4 ">
            <div className="flex items-center gap-2 flex-wrap justify-center px-4">
              <CallControls onLeave={() => router.push("/")} />

              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="size-10">
                      <LayoutListIcon className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setLayout("grid")}>
                      Grid View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLayout("speaker")}>
                      Speaker View
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="outline" size="icon" className="size-10" onClick={() => setShowParticipants(!showParticipants)}>
                  <UsersIcon className="size-4"/>
                </Button>



              </div>
            </div>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={65} minSize={25}>
        <h3>Code editor will go here </h3>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default MeetingRoom;
