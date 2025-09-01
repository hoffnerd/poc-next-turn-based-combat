
import { Doc } from "@/../convex/_generated/dataModel";



//______________________________________________________________________________________
// ===== Project =====

export const PROJECT_USER_ROLES = {
    unauthorized: {
        display: "Unauthorized",
    },
    // user: {
    //     display: "User",
    // },
    // tester: {
    //     display: "Tester",
    // },
    // admin: {
    //     display: "Admin",
    // },
}

export const PROJECT_USER_ROLE_LOWEST = Object.keys(PROJECT_USER_ROLES)[0] as keyof typeof PROJECT_USER_ROLES;

export const PROJECT_USER_ROLE_HIGHEST = Object.keys(PROJECT_USER_ROLES)[ Object.keys(PROJECT_USER_ROLES).length - 1 ] as keyof typeof PROJECT_USER_ROLES;

export const PROJECT_USER_ROLE_ALL = Object.keys(PROJECT_USER_ROLES) as Array<keyof typeof PROJECT_USER_ROLES>;

export const PROJECT_USER_ROLE_STANDARD_ALLOWED: Array<keyof typeof PROJECT_USER_ROLES>  = [ ]; // "user", "tester", "admin" 



//______________________________________________________________________________________
// ===== Save File =====

export const DEFAULT_SAVE_FILE = {
    time: 0,
};



interface DefaultEncounterState {
    phase: Doc<"encounterState">["phase"];
    time: number;
}

export const DEFAULT_ENCOUNTER_STATE = {
    phase: "encounterStart",
    time: 0,
} as DefaultEncounterState;