import { defineSchema, defineTable } from "convex/server";
import { v, type Validator } from "convex/values";


//______________________________________________________________________________________
// ===== Validators =====

export const phaseValidator = v.union(
    v.literal("encounterStart"),
    v.literal("beginning"),
    v.literal("qte"),
    v.literal("action"),
    v.literal("end"),
    v.literal("encounterEnd"),
);



//______________________________________________________________________________________
// ===== Schema Definition =====

export default defineSchema({
    saveFile: defineTable({
        activeEncounterStateId: v.optional( v.id("encounterState") ),
        time: v.number(),
        updatedAt: v.number(),
    }),
    encounterState: defineTable({
        saveFileId: v.id("saveFile"),
        encounterKey: v.string(),
        // gameChangers: 
        // effects: 
        // entities: 
        phase: phaseValidator,
        // initiative: 
        time: v.number(),
        // selectedAction: 
        // selectedTarget:
        updatedAt: v.number(),
    }).index("saveFileId", ["saveFileId"]),
});