import { defineSchema, defineTable } from "convex/server";
import { v, type Validator } from "convex/values";


//______________________________________________________________________________________
// ===== Schema Definition =====

export default defineSchema({
    saveFile: defineTable({
        dump: v.optional(v.string()),
    }),
});