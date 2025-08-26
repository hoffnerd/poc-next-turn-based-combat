
import { action, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import type { Doc, Id } from "./_generated/dataModel";
import { authorize } from "./auth";
import { DEFAULT_SAVE_FILE } from "@/data/_config";



//______________________________________________________________________________________
// ===== Reads =====

export const readSaveFile = query({
    args: { _id: v.optional( v.union(v.id("saveFile"), v.string(), v.null()) ) },
    handler: async (ctx, args) => authorize(ctx, async () => {
        if (!args._id) return { _id: "default", _creationTime: 0, ...DEFAULT_SAVE_FILE } as Doc<"saveFile">;
        const saveFileId = args._id as Id<"saveFile">;
        return await ctx.db.get(saveFileId);
    }, { trace: "readSaveFile" }),
});



//______________________________________________________________________________________
// ===== Creates =====

export const createSaveFile = mutation({
    handler: async (ctx) => authorize(ctx, async () => {
        return await ctx.db.insert("saveFile", { ...DEFAULT_SAVE_FILE });
    }, { trace: "createSaveFile" }),
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
