import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutContext = () => {
    const context = useContext(WorkoutContext)
    if(!WorkoutContext) {
        throw Error('useWorkoutContext turi būti WorkoutContextProvider viduje')
    }
    return context
}