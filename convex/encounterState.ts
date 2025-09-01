
// Types ----------------------------------------------------------------------------
import type { Doc, Id } from "./_generated/dataModel";
// Packages -------------------------------------------------------------------------
import { v } from "convex/values";
// Server ---------------------------------------------------------------------------
import { action, mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { saveFileIdValidator } from "./saveFile";
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------
import { authorize } from "./auth";
import { ENCOUNTER_LIBRARY } from "@/data/encounters";
import { DEFAULT_ENCOUNTER_STATE } from "@/data/_config";



//______________________________________________________________________________________
// ===== Validators =====

export const encounterStateIdValidator = v.optional( v.union(v.id("encounterState"), v.null()) );



//______________________________________________________________________________________
// ===== Reads =====

export const readEncounterState = query({
    args: { 
        _id: encounterStateIdValidator,
        saveFileId: saveFileIdValidator,
    },
    handler: async (ctx, args) => authorize(ctx, async () => {
        const { _id, saveFileId } = args;
        if (!_id) return null;
        if (!saveFileId) return null;
        const encounterState = await ctx.db.get(_id as Id<"encounterState">);
        if(encounterState?.saveFileId !== saveFileId) throw new Error("This encounter state does not belong to this save file!");
        return await ctx.db.get(_id as Id<"encounterState">);
    }, { trace: "readEncounterState" }),
});



//______________________________________________________________________________________
// ===== Creates =====

export const createEncounterState = mutation({
    args: { 
        saveFileId: saveFileIdValidator,
        encounterKey: v.string(),
        saveFileTime: v.number(),
    },
    handler: async (ctx, args) => authorize(ctx, async () => {
        const { saveFileId, encounterKey, saveFileTime } = args;
        if (!saveFileId) return null;

        const encounterDefaults = ENCOUNTER_LIBRARY[ encounterKey as keyof typeof ENCOUNTER_LIBRARY ];
        if(!encounterDefaults) throw new Error(`You are trying to start an encounter that does not exist!`);

        const updatedAt = Date.now();
        const encounterStateId = await ctx.db.insert("encounterState", 
            { ...DEFAULT_ENCOUNTER_STATE, ...encounterDefaults, saveFileId, encounterKey, updatedAt }
        );
        await ctx.db.patch(saveFileId, { activeEncounterStateId: encounterStateId, time: saveFileTime, updatedAt });
        return encounterStateId;
    }, { trace: "createEncounterState" }),
});



//______________________________________________________________________________________
// ===== Updates =====

// export const updateTodo = mutation({
//     args: {
//         _id: v.id("todo"),
//         display: v.string(),
//         description: v.optional(v.string()),
//     },
//     handler: async (ctx, args) => authorize(ctx, async ({ userId }) => {
//         const { _id, display, description } = args;

//         const todo = await ctx.db.get(_id);
//         if(todo?.userId !== userId) throw new Error("You do not own this todo!");

//         // throw new Error("Dev Error: updateTodo");

//         // `replace` will replace the existing document entirely, potentially removing existing fields.
//         // const taskId = await ctx.db.replace(id, { display, description, isCompleted: false });

//         // `patch` performs a shallow merge with the given partial document. New fields are 
//         // added. Existing fields are overwritten. Fields set to undefined are removed.
//         await ctx.db.patch(_id, { display, description });
//     }, { trace: "updateTodo" }),
// });

// export const updateTodoIsCompleted = mutation({
//     args: {
//         _id: v.id("todo"),
//         isCompleted: v.boolean(),
//     },
//     handler: async (ctx, args) => authorize(ctx, async ({ userId }) => {
//         const { _id, isCompleted } = args;

//         const todo = await ctx.db.get(_id);
//         if(todo?.userId !== userId) throw new Error("You do not own this todo!");

//         await ctx.db.patch(_id, { isCompleted });
//     }, { trace: "updateTodoIsCompleted" }),
// });



//______________________________________________________________________________________
// ===== Deletes =====

// export const deleteTodo = mutation({
//     args: { _id: v.id("todo") },
//     handler: async (ctx, args) => authorize(ctx, async ({ userId }) => {
//         const { _id } = args;

//         const todo = await ctx.db.get(_id);
//         if(todo?.userId !== userId) throw new Error("You do not own this todo!");
        
//         await ctx.db.delete(_id);
//     }, { trace: "deleteTodo" }),
// });
