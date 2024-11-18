import React, { useRef} from "react";
import {usePeople} from "@/app/providers/PeopleContext";
import {PersonType} from "@/app/types";
import WorkoutDisplay from "@/app/components/WorkoutDisplay";
import { motion } from "motion/react";

export default function Screen() {
    const {people} = usePeople();
    const screenRef = useRef<HTMLDivElement>(null);
    const constraintsRef = useRef(null);

    return (
        <motion.div
            ref={constraintsRef}
            className={`w-screen h-[60vh] z-10`}
        >
            <div
                className={`bg-gradient-to-br from-green-400 to-purple-300 rounded-md w-full h-full relative z-0`}
                ref={screenRef}
            >
                {people.map((person: PersonType, index: number) => (
                    <WorkoutDisplay
                        key={`${person.name}-${index}`}
                        index={index}
                        screenRef={screenRef}
                    />
                ))}
            </div>
        </motion.div>
    );
}