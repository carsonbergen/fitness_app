'use client';
import {usePeople} from "@/app/providers/PeopleContext";
import {motion} from "motion/react";
import {useRef} from "react";
import RenderedPerson from "@/app/components/RenderedPerson";

export default function People() {
    const constraintsRef = useRef(null);
    const {people} = usePeople();
    return (
        <div className={`absolute top-0 left-0 w-screen h-screen`}>
            <motion.div className="w-screen h-screen" ref={constraintsRef}/>
            {people.map((person, index) => (
                <RenderedPerson
                    personName={person.name}
                    personIndex={index}
                    key={`${person.name}-${index}`}
                    constraintsRef={constraintsRef}
                />
            ))}
        </div>
    )
}