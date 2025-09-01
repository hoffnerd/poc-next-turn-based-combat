

// Types ----------------------------------------------------------------------------
// Packages -------------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------
import { normalizeTwoDigitNumber } from "@/utils";



//______________________________________________________________________________________
// ===== Micro-Components =====

/**
 * Converts a given time in seconds into a readable format of hours, minutes, and seconds (HH:MM:SS).
 */
export function ReadableTime({ timeInSeconds, options={} }: Readonly<{ timeInSeconds: number; options?: { showHours?: boolean; }; }>) {
    const { showHours } = { showHours: true, ...options };
    const timeInSecondsAbs = Math.abs(timeInSeconds);
    const hours = Math.floor(timeInSecondsAbs / (60 * 60));
    const divisorForMinutes = timeInSecondsAbs % (60 * 60);
    const minutes = Math.floor(divisorForMinutes / 60);
    const divisorForSeconds = divisorForMinutes % 60;
    const seconds = Math.ceil(divisorForSeconds);
    const negativeDisplay = timeInSeconds < 0 ? "-" : "";
    const minuteSecondsDisplay = `${normalizeTwoDigitNumber(minutes)}:${normalizeTwoDigitNumber(seconds)}`;
    if(!showHours) return `${negativeDisplay}${minuteSecondsDisplay}`;
    return `${negativeDisplay}${normalizeTwoDigitNumber(hours)}:${minuteSecondsDisplay}`;
}