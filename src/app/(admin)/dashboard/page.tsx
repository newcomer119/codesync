"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import toast from "react-hot-toast";
import LoaderUI from "@/components/ui/LoaderUI";
import { getCandidateInfo, groupInterviews } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { INTERVIEW_CATEGORY } from "@/constants";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, CheckCircle2Icon, ClockIcon, XCircleIcon } from "lucide-react";
import { format } from "date-fns";
import CommentDialog from "@/components/ui/CommentDialog";

type Interview = Doc<"interviews">;

function DashboardPage() {
  const users = useQuery(api.users.getUsers);
  const interviews = useQuery(api.interviews.getAllInterviews);
  const updateStatus = useMutation(api.interviews.updateInterviews);

  const handleStatusUpdate = async (
    interviewId: Id<"interviews">,
    status: string
  ) => {
    try {
      await updateStatus({ id: interviewId, status });
      toast.success(`Interview marked as ${status}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (!interviews || !users) return <LoaderUI />;
  const groupedInterviews = groupInterviews(interviews);

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center mb-8">
        <Link href="/schedule" />
        <Button>Schedule New Interview</Button>
      </div>

      <div className="space-y-8">
        {INTERVIEW_CATEGORY.map(
          (category) =>
            groupedInterviews[category.id]?.length > 0 && (
              <section key={category.id}>
                {/* CATEGORY TITLE */}
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl font-semibold">{category.title}</h2>
                  <Badge variant={category.variant}>
                    {groupedInterviews[category.id].length}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid lg:grid-cols-3 gap-4">
                  {groupedInterviews[category.id].map((interview: Interview) => {
                    const candidateInfo = getCandidateInfo(users, interview.candidateId);
                    return (
                      <Card key={interview._id} className="p-4">
                        <CardHeader className="p-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={candidateInfo.image} />
                                <AvatarFallback>
                                  {candidateInfo.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{candidateInfo.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {format(interview.startTime, "MMM d, yyyy")}
                                </p>
                              </div>
                            </div>
                            <Badge
                              variant={
                                interview.status === "completed"
                                  ? "default"
                                  : interview.status === "succeeded"
                                  ? "secondary"
                                  : interview.status === "failed"
                                  ? "destructive"
                                  : "secondary"
                              }
                            >
                              {interview.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-0 mt-4">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="h-4 w-4" />
                              <span>
                                {format(interview.startTime, "MMM d, yyyy")}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ClockIcon className="h-4 w-4" />
                              <span>
                                {format(interview.startTime, "h:mm a")}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-0 mt-4 flex gap-2">
                          {interview.status === "completed" && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-green-600 hover:text-green-700"
                                onClick={() => handleStatusUpdate(interview._id, "succeeded")}
                              >
                                <CheckCircle2Icon className="h-4 w-4 mr-1" />
                                Pass
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => handleStatusUpdate(interview._id, "failed")}
                              >
                                <XCircleIcon className="h-4 w-4 mr-1" />
                                Fail
                              </Button>
                            </div>
                          )}
                          <CommentDialog interviewId={interview._id} />
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              </section>
            )
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
