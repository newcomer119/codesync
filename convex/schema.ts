import {defineSchema , defineTable} from "convex/server"
import { v } from "convex/values"
import { stat } from "fs"

export default defineSchema({
    users:defineTable({
        name : v.string(),
        email : v.string(),
        image : v.optional(v.string()),
        role : v.union(v.literal("candidate") ,v.literal("interviewer")),
        clerkId : v.string(),
    }).index("by_clerk_id",["clerkId"]),

    interviews : defineTable({
        title : v.string(),
        description : v.string(),
        startTime : v.number(),
        endTime : v.optional(v.number()), // can be 30 minutes or 45 minutes 
        status : v.string(),
        streamCallId  : v.string(),
        candidateId : v.string(),
        interviewersId : v.array(v.string()),
    }).index("by_candidate_id", ["candidateId"]).index("by_stream_call", ["streamCallId"]),

    comments : defineTable({
        content:v.string(),
        interviewerId : v.id("users"),
        interviewId : v.id("interviews"),
        rating:v.number(),
    }).index("by_interview_id", ["interviewId"])
})