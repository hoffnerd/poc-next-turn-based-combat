"use client";

// Types ----------------------------------------------------------------------------
import { useEffect } from "react";
// Packages -------------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
// Hooks ----------------------------------------------------------------------------
import useSaveFile from "@/hooks/useSaveFile";
// Components -----------------------------------------------------------------------
import SaveFileTimer from "./SaveFileTimer";
import EncounterTimer from "./EncounterTimer";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====
export default function Client() {

    //______________________________________________________________________________________
    // ===== Hooks =====
    const saveFileId = useSaveFile();

    // useEffect(() => {
    //     console.log({ trace: "Client > useEffect", saveFileId });
    // }, [saveFileId]);

    //______________________________________________________________________________________
    // ===== Component Return =====
    return <>
        <SaveFileTimer shouldDisplay />
        <EncounterTimer shouldDisplay />
    </>;
}
