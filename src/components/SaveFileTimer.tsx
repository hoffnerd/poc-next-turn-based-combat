"use client"

// Types ----------------------------------------------------------------------------
// Packages -------------------------------------------------------------------------
import { useEffect, useRef } from "react";
import { useQuery } from "convex/react";
// Server ---------------------------------------------------------------------------
import { api } from "@/../convex/_generated/api";
// Stores ---------------------------------------------------------------------------
import { useProjectStore } from "@/stores/useProjectStore";
// Hooks ----------------------------------------------------------------------------
import useTimer from "@/hooks/useTimer";
// Components -----------------------------------------------------------------------
import { ReadableTime } from "./microComponents";
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default function SaveFileTimer({ shouldDisplay }: { shouldDisplay?: boolean }) {

    //______________________________________________________________________________________
    // ===== Stores =====
    const setStoreKeyValuePair = useProjectStore((state) => state.setStoreKeyValuePair);
    const saveFileId = useProjectStore((state) => state.saveFileId);

    //______________________________________________________________________________________
    // ===== Queries =====
    const querySaveFile = useQuery(api.saveFile.readSaveFile, { _id: saveFileId });

    //______________________________________________________________________________________
    // ===== Hooks =====
    const [seconds, stopTimer, startTimer] = useTimer(1000, { initialCycles: querySaveFile?.data?.time, autoStartTimer: false });

    //______________________________________________________________________________________
    // ===== References =====
    const hasStartedTimer = useRef<boolean>(false);

    //______________________________________________________________________________________
    // ===== Use Effects =====

    useEffect(() => {
        if(!querySaveFile?.data?._id) return;
        if(seconds !== querySaveFile?.data?.time) return;
        if(hasStartedTimer.current) return;
        hasStartedTimer.current = true;
        startTimer();
    }, [querySaveFile, seconds]);

    useEffect(() => {
        setStoreKeyValuePair({ saveFileTime: seconds });
    }, [seconds])
    


    //______________________________________________________________________________________
    // ===== Component Return =====
    if(!shouldDisplay) return;
    return (
        <div>
            <span>saveFileTime:</span>&nbsp;
            <ReadableTime timeInSeconds={seconds} />
        </div>
    );
}

