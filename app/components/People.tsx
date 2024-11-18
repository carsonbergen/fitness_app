'use client';
import {usePeople} from "@/app/providers/PeopleContext";
import {RefObject, useRef} from "react";
import RenderedPerson from "@/app/components/RenderedPerson";

interface PeopleProps {
    areaRef: RefObject<HTMLDivElement>
}

export default function People({areaRef}: PeopleProps) {
    // const constraintsRef = useRef(areaRef);
    const {people} = usePeople();
    return (
        <div className={`absolute top-0 left-0 w-screen h-screen z-0 pointer-events-none`}>
            {/*<motion.div className="w-screen h-screen pointer-events-none" ref={constraintsRef}/>*/}
            {people.map((person, index) => (
                <RenderedPerson
                    personName={person.name}
                    personIndex={index}
                    key={`${person.name}-${index}`}
                    constraintsRef={areaRef}
                />
            ))}
        </div>
    )
}