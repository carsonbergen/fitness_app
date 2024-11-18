import {motion} from "motion/react";
import {usePeople} from "@/app/providers/PeopleContext";
import {RefObject, useEffect, useRef} from "react";

interface WorkoutDisplayProps {
    index: number,
    screenRef: RefObject<HTMLDivElement>,
}

export default function WorkoutDisplay({index, screenRef}: WorkoutDisplayProps) {
    const {people, mostRecentlyMovedPerson} = usePeople();

    useEffect(() => {
        if (screenRef.current) {
            const boundingRect = screenRef.current.getBoundingClientRect();
            // console.log(sboundingRect, people[index].distanceFromTopOfArea);
            console.log(boundingRect.bottom - people[index].distanceFromTopOfArea - boundingRect.y);
        }
    }, [mostRecentlyMovedPerson]);

    useEffect(() => {
        console.log('looking at screen', people[index].lookingAtScreen, people[index].inArea)
        console.log(people[index].lookingAtScreen && people[index].inArea)
    }, [people[index]]);

    return (
        <motion.div
            className={`absolute flex flex-col justify-start w-fit h-48 bg-[#00000080] px-2 rounded-md backdrop-blur-md`}
            initial={{}}
            animate={{
                opacity: (people[index].lookingAtScreen && people[index].distanceFromTopOfArea > 100) ? 1 : 0,
                x: people[index].pos.x,
                y: people[index].pos.y,
                scale: screenRef.current ?
                    people[index].distanceFromTopOfArea / 500
                    : 0,
            }}
        >
            <h1 className={`font-bold text-2xl`}>
                {`${people[index].name}'s Workout`}
            </h1>
            <div>
                Bench press 3x12
            </div>
        </motion.div>
    );
}