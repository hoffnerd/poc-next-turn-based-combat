"use client";


// Types ----------------------------------------------------------------------------
// Server ---------------------------------------------------------------------------
import { api } from "@/../convex/_generated/api";
// Stores ---------------------------------------------------------------------------
import { callbackWithProjectStore, useProjectStore } from "@/stores/useProjectStore";
import { useMutation, useQuery } from "convex/react";
import { Button } from "./shadcn/ui/button";
// Components -----------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Micro-Components =====


//______________________________________________________________________________________
// ===== Micro-Components =====

function JsonDisplay({ 
    children, 
    item, 
    itemToStringify,
    itemKey, 
    placement,
    isFromConvex=true,
}: { 
    children?: React.ReactNode; 
    item: any;
    itemToStringify?: any;
    itemKey?: string; 
    placement?: "ifItemIsFalsy" | "replace"; 
    isFromConvex?: boolean;
}) {
    if(item === undefined) return <div>Loading {itemKey}...</div>;
    if(placement === "ifItemIsFalsy"){
        if(!item) return children;
        if(isFromConvex && !item?.data) return children;
    }
    if(placement === "replace") return children;
    return (
        <pre>
            {itemKey ? `${itemKey}: ` : ""}
            {JSON.stringify(
                itemToStringify ? itemToStringify : (isFromConvex ? item?.data : item), 
                null, 
                4,
            )}
        </pre>
    );
}



//______________________________________________________________________________________
// ===== Component =====

export default function SaveFile() {

    //______________________________________________________________________________________
    // ===== Stores =====
    const projectStore = useProjectStore((state) => state);
    const saveFileId = useProjectStore((state) => state.saveFileId);

    //______________________________________________________________________________________
    // ===== Queries =====
    const querySaveFile = useQuery(api.saveFile.readSaveFile, { _id: saveFileId });
    const queryActiveEncounterState = useQuery(api.encounterState.readEncounterState, { 
        _id: querySaveFile?.data?.activeEncounterStateId, 
        saveFileId: saveFileId 
    });
    
    //______________________________________________________________________________________
    // ===== Mutations =====
    const createEncounterState = useMutation(api.encounterState.createEncounterState);

    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <div>
            <JsonDisplay item={projectStore} itemKey="projectStore" isFromConvex={false} />
            <JsonDisplay item={querySaveFile} itemKey="saveFile" />
            <JsonDisplay item={queryActiveEncounterState} itemKey="activeEncounterState" placement="ifItemIsFalsy">
                <Button onClick={() => callbackWithProjectStore(({ saveFileTime }) => createEncounterState({ saveFileId, encounterKey: "test", saveFileTime }))}>
                    activeEncounterState: Create Test Encounter State
                </Button>
            </JsonDisplay>
        </div>
    );
}

