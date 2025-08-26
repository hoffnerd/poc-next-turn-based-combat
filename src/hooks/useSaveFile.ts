"use client";


// Types ----------------------------------------------------------------------------
import type { Id } from "@/../convex/_generated/dataModel";
// Packages -------------------------------------------------------------------------
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
// Server ---------------------------------------------------------------------------
import { api } from "@/../convex/_generated/api";
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Hook =====
export default function useSaveFile() {

    //______________________________________________________________________________________
    // ===== State =====
    const [ saveFileId, setSaveFileId ] = useState<Id<"saveFile"> | string | null>(null);



    //______________________________________________________________________________________
    // ===== Queries =====
    const querySaveFile = useQuery(api.saveFile.readSaveFile, { _id: saveFileId });



    //______________________________________________________________________________________
    // ===== Mutations =====
    const createSaveFile = useMutation(api.saveFile.createSaveFile);



    //______________________________________________________________________________________
    // ===== Use Effects =====

    useEffect(() => {
        const localSaveFileId = localStorage.getItem("saveFileId");
        if (localSaveFileId){ 
            setSaveFileId(localSaveFileId);
            return;
        }

        const runCreateSaveFile = async () => {
            const createSaveFileResponse = await createSaveFile();
            const newSaveFileId = createSaveFileResponse?.data;
            localStorage.setItem("saveFileId", newSaveFileId as string);
            setSaveFileId(newSaveFileId ?? null);
        }
        runCreateSaveFile();
    }, []);



    //______________________________________________________________________________________
    // ===== Hook Return =====
    return querySaveFile;
}
