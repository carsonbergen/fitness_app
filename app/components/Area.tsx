import {motion} from "motion/react";
import {useEffect, useRef, useState} from "react";
import {PersonType} from "@/app/types";
import {usePeople} from "@/app/providers/PeopleContext";

export default function Area() {
    const {people, mostRecentlyMovedPerson} = usePeople();

    const [peopleInArea, setPeopleInArea] = useState<PersonType[]>([]);
    const [lastPerson, setLastPerson] = useState<PersonType | undefined>(undefined);

    const divRef = useRef<HTMLDivElement>(null);

    const checkIfPersonIsInsideArea = (boundingRect: DOMRect) => {
        const personInElement = people[mostRecentlyMovedPerson];
        if (
            personInElement.pos.x >= boundingRect.x &&
            personInElement.pos.x <= (boundingRect.x + boundingRect.width) &&
            personInElement.pos.y >= boundingRect.y &&
            personInElement.pos.y <= (boundingRect.y + boundingRect.height)
        ) {
            console.log('Inside element');
            if (
                (lastPerson && lastPerson.name != personInElement.name) ||
                (lastPerson == undefined)
            ) {
                console.log('Adding person to array');
                setPeopleInArea([
                    ...peopleInArea,
                    personInElement
                ]);
                setLastPerson(personInElement);
            }
        } else {
            console.log('Not inside element');
            setPeopleInArea(
                peopleInArea.filter(e => e.name != personInElement.name)
            );
        }
    }

    useEffect(() => {
        console.log('People in area:', peopleInArea);
    }, [peopleInArea]);

    return (
        <motion.div
            className={`absolute bg-black z-10 w-48 h-96`}
            ref={divRef}
            onMouseEnter={() => {
                if (divRef.current) {
                    const boundingRect = divRef.current.getBoundingClientRect();
                    checkIfPersonIsInsideArea(boundingRect);
                }
            }}
            onMouseOver={() => {
                if (divRef.current) {
                    const boundingRect = divRef.current.getBoundingClientRect();
                    checkIfPersonIsInsideArea(boundingRect);
                }
            }}
            onMouseLeave={() => {
                if (divRef.current) {
                    const boundingRect = divRef.current.getBoundingClientRect();
                    checkIfPersonIsInsideArea(boundingRect);
                }
            }}
        />
    );
}