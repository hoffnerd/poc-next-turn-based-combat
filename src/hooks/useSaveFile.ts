"use client";


// Types ----------------------------------------------------------------------------
import type { Id } from "@/../convex/_generated/dataModel";
// Packages -------------------------------------------------------------------------
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
// Server ---------------------------------------------------------------------------
import { api } from "@/../convex/_generated/api";
// Stores ---------------------------------------------------------------------------
import { useProjectStore } from "@/stores/useProjectStore";
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Micro-Hooks =====

function useSaveFileId() {

    //______________________________________________________________________________________
    // ===== Stores =====
    const setStoreKeyValuePair = useProjectStore((state) => state.setStoreKeyValuePair);
    const saveFileId = useProjectStore((state) => state.saveFileId);



    //______________________________________________________________________________________
    // ===== Mutations =====
    const validateOrCreateSaveFile = useMutation(api.saveFile.validateOrCreateSaveFile);



    //______________________________________________________________________________________
    // ===== Use Effects =====

    useEffect(() => {
        const localSaveFileId = localStorage.getItem("saveFileId");
        const runValidateOrCreateSaveFile = async () => {
            const validateOrCreateSaveFileResponse = await validateOrCreateSaveFile({ _id: localSaveFileId });
            if(validateOrCreateSaveFileResponse.error){
                console.error({ trace: "useSaveFile > runValidateOrCreateSaveFile", validateOrCreateSaveFileResponse });
                // TODO: Replace with a sonner toast. 
                console.error("Error: Something went wrong looking for your save file! Please refresh the page to try again. If this error persists, please clear your browser's local storage.");
                return;
            }
            const newSaveFileId = validateOrCreateSaveFileResponse?.data;
            localStorage.setItem("saveFileId", newSaveFileId as string);
            setStoreKeyValuePair({ saveFileId: newSaveFileId });
        }
        runValidateOrCreateSaveFile();
    }, []);



    //______________________________________________________________________________________
    // ===== Hook Return =====
    return saveFileId;
}





//______________________________________________________________________________________
// ===== Hook =====

export default function useSaveFile() {

    //______________________________________________________________________________________
    // ===== Hooks =====
    const saveFileId = useSaveFileId();



    //______________________________________________________________________________________
    // ===== Stores =====
    const setStoreKeyValuePair = useProjectStore((state) => state.setStoreKeyValuePair);

    

    //______________________________________________________________________________________
    // ===== Queries =====
    const querySaveFile = useQuery(api.saveFile.readSaveFile, { _id: saveFileId });



    //______________________________________________________________________________________
    // ===== Use Effects =====

    useEffect(() => {
        if(!querySaveFile?.data?._id) return;
        setStoreKeyValuePair({ activeEncounterStateId: querySaveFile?.data?.activeEncounterStateId });
    }, [querySaveFile]);


    //______________________________________________________________________________________
    // ===== Hook Return =====
    return saveFileId;
}
