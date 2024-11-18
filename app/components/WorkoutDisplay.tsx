import {motion} from "motion/react";
import {usePeople} from "@/app/providers/PeopleContext";
import {RefObject, useEffect, useRef, useState} from "react";
import WorkoutDisplayExerciseRow from "@/app/components/WorkoutDisplayExerciseRow";
import PersonsPhone from "@/app/components/PersonsPhone";
import {isIPhone} from "@react-aria/utils";
import {PersonType} from "@/app/types";

interface WorkoutDisplayProps {
    index: number,
    screenRef: RefObject<HTMLDivElement>,
}

export default function WorkoutDisplay({index, screenRef}: WorkoutDisplayProps) {
    const {people, setPeople, mostRecentlyMovedPerson} = usePeople();
    const [workoutComplete, setWorkoutComplete] = useState<boolean>(false);

    useEffect(() => {
        if (screenRef.current) {
            const boundingRect = screenRef.current.getBoundingClientRect();
            // console.log(sboundingRect, people[index].distanceFromTopOfArea);
            console.log(boundingRect.bottom - people[index].distanceFromTopOfArea - boundingRect.y);
        }
    }, [mostRecentlyMovedPerson]);

    useEffect(() => {
        if (workoutComplete && people[index].exercises.length > 0) {
            setWorkoutComplete(false);
        }
    }, [index, people]);

    if (workoutComplete) {
        return null;
    }

    return (
        <motion.div
            className={`absolute flex flex-col justify-start w-fit h-96 overflow-scroll bg-[#00000080] px-2 rounded-md backdrop-blur-md`}
            initial={{}}
            animate={{
                opacity: (people[index].lookingAtScreen && people[index].distanceFromTopOfArea > 100) ? 1 : 0,
                x: people[index].pos.x - 96, // -96 for width of rendered person element
                // y: people[index].pos.y,
                scale: screenRef.current && people[index].areaRef.current ?
                    people[index].distanceFromTopOfArea / people[index].areaRef.current.getBoundingClientRect().height
                    : 0,
            }}
        >
            <h1 className={`font-bold text-2xl`}>
                {`${people[index].name}'s Workout`}
            </h1>
            {people[index].exercises.map((exercise, i) => (
                <WorkoutDisplayExerciseRow
                    key={`${exercise.name}-${i}`}
                    exerciseName={exercise.name}
                    exerciseSets={exercise.sets}
                    index={index}
                    exerciseIndex={i}
                />
            ))}
            <button
                className={`text-xl font-bold bg-black rounded-md mx-12 mt-4 mb-12`}
                onClick={() => {
                    setWorkoutComplete(!(workoutComplete));
                    const newPeople: PersonType[] = people.map((p: PersonType, i) => {
                        if (i !== index) {
                            return p;
                        } else {
                            return {
                                pos: p.pos,
                                name: p.name,
                                distanceFromTopOfArea: p.distanceFromTopOfArea,
                                inArea: p.inArea,
                                areaRef: p.areaRef,
                                lookingAtScreen: p.lookingAtScreen,
                                exercises: [],
                            };
                        }
                    });
                    setPeople(newPeople);
                }}
            >
                Complete workout
            </button>
        </motion.div>
    );
}