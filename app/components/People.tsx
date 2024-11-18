'use client';
import {usePeople} from "@/app/providers/PeopleContext";
import {RefObject} from "react";
import RenderedPerson from "@/app/components/RenderedPerson";

interface PeopleProps {
    areaRef: RefObject<HTMLDivElement>
}

export default function People({areaRef}: PeopleProps) {
    const {people} = usePeople();
    return (
        <div className={`absolute top-0 left-0 w-screen h-screen z-0 pointer-events-none`}>
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