"use client"

// Types ----------------------------------------------------------------------------
import type { Doc, Id } from "@/../convex/_generated/dataModel";
// Packages -------------------------------------------------------------------------
import { create } from 'zustand'
// Actions --------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Types =====

export interface ProjectStoreStateOptional {
    saveFileId?: Id<"saveFile"> | null;
    activeEncounterStateId?: Id<"encounterState"> | null;

    saveFileTime?: number;
    encounterTime?: number;
    isEncounterTimerActive?: boolean;
}

export interface ProjectStoreState extends Omit<ProjectStoreStateOptional, "_">{
    saveFileTime: number;
    encounterTime: number;
}

export interface ProjectStoreFunctions {
    setStoreKeyValuePair: (obj: ProjectStoreStateOptional) => void;
    incrementEncounterTime: (qty: number) => void;
}



//______________________________________________________________________________________
// ===== True Constants =====

const DEFAULT_STORE: ProjectStoreState = {
    saveFileId: null,
    activeEncounterStateId: null,
    saveFileTime: 0,
    encounterTime: 0,
}



//______________________________________________________________________________________
// ===== Functions =====



//______________________________________________________________________________________
// ===== Store =====

export const useProjectStore = create<ProjectStoreState & ProjectStoreFunctions>()((set) => ({
    ...DEFAULT_STORE,

    setStoreKeyValuePair: (obj) => set(() => ({ ...obj })),
    incrementEncounterTime: (qty: number) => set((state) => ({ encounterTime: state.encounterTime + qty })),
}))



//______________________________________________________________________________________
// ===== Callbacks with Store =====

export const callbackWithProjectStore = (callback: (store: ProjectStoreState) => void) => {
    const store = useProjectStore.getState();
    callback(store);
};