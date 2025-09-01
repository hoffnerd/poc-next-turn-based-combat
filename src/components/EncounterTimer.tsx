"use client"

// Types ----------------------------------------------------------------------------
import { Id } from "@/../convex/_generated/dataModel";
// Packages -------------------------------------------------------------------------
import { useEffect, useRef } from "react";
import { useQuery } from "convex/react";
// Server ---------------------------------------------------------------------------
import { api } from "@/../convex/_generated/api";
// Stores ---------------------------------------------------------------------------
import { useProjectStore } from "@/stores/useProjectStore";
// Hooks ----------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import { ReadableTime } from "./microComponents";
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default function EncounterTimer({ shouldDisplay }: { shouldDisplay?: boolean }) {

    //______________________________________________________________________________________
    // ===== Stores =====
    const setStoreKeyValuePair = useProjectStore((state) => state.setStoreKeyValuePair);
    const incrementEncounterTime = useProjectStore((state) => state.incrementEncounterTime);
    const saveFileId = useProjectStore((state) => state.saveFileId);
    const activeEncounterStateId = useProjectStore((state) => state.activeEncounterStateId);
    const saveFileTime = useProjectStore((state) => state.saveFileTime);
    const encounterTime = useProjectStore((state) => state.encounterTime);
    const isEncounterTimerActive = useProjectStore((state) => state.isEncounterTimerActive);

    //______________________________________________________________________________________
    // ===== Queries =====
    const queryActiveEncounterState = useQuery(api.encounterState.readEncounterState, { _id: activeEncounterStateId, saveFileId });

    //______________________________________________________________________________________
    // ===== References =====
    const hasStartedTimer = useRef<Id<"encounterState"> | null>(null);

    //______________________________________________________________________________________
    // ===== Use Effects =====

    useEffect(() => {
        if(!queryActiveEncounterState?.data?._id) return;
        if(hasStartedTimer.current && hasStartedTimer.current === queryActiveEncounterState.data._id) return;
        hasStartedTimer.current = queryActiveEncounterState.data._id;
        setStoreKeyValuePair({ 
            encounterTime: queryActiveEncounterState.data.time,
            isEncounterTimerActive: true 
        });
    }, [queryActiveEncounterState]);

    useEffect(() => {
        if(!queryActiveEncounterState?.data?._id) return;
        if(!isEncounterTimerActive) return;
        incrementEncounterTime(1);
    }, [queryActiveEncounterState, saveFileTime, isEncounterTimerActive]);
    


    //______________________________________________________________________________________
    // ===== Component Return =====
    if(!shouldDisplay) return;
    return (
        <div className="tw-text-sm tw-font-bold">
            <span className="tw-text-gray-500">encounterTime:</span>&nbsp;
            <ReadableTime timeInSeconds={encounterTime} />
        </div>
    );
}

