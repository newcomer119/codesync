import { calculateRecordingDuration } from "@/lib/utils";
import { CallRecording } from "@stream-io/video-react-sdk";
import { format } from "date-fns";
import React from "react";
import toast from "react-hot-toast";
import { Card, CardContent, CardFooter, CardHeader } from "./card";
import { Calendar, Clock, CopyIcon, PlayIcon } from "lucide-react";
import { Button } from "./button";

const RecordingCard = ({ recording }: { recording: CallRecording }) => {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(recording.url);
      toast.success("Recording link copied to clipboard ");
    } catch (error) {
      toast.error("failed to copy link to clipboard");
    }
  };

  const formattedTime = recording.start_time
    ? format(new Date(recording.start_time), "MMM d, yyyy, hh:mm a")
    : "Unknown";
  const duration =
    recording.start_time && recording.end_time
      ? calculateRecordingDuration(recording.start_time, recording.end_time)
      : "Unknown duration";

  return (
    <Card className="group hover:shadow-md transition-all">
      {/* card header */}
      <CardHeader className="space-y-1">
        <div className="space-y-2">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center text-sm text-muted-foreground gap-2">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formattedTime}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground gap-2">
              <Clock className="h-3.5 w-3.5" />
              <span>{duration}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      {/* card content */}
      <CardContent>
        <div
          className="w-full aspect-video bg-muted/50 rounded-lg flex items-center justify-center cursor-pointer group"
          onClick={() => window.open(recording.url, "_blank")}
        >
          <div className="size-12 rounded-full bg-background/90 flex items-center justify-center group-hover:bg-primary transition-colors">
            <PlayIcon className="size-6 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button
          className="flex-1"
          onClick={() => window.open(recording.url, "_blank")}
        >
          <PlayIcon className="size-4 mr-2" />
          Play Recording
        </Button>
        <Button variant="secondary" onClick={handleCopyLink}>
          <CopyIcon className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecordingCard;
