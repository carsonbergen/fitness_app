import {BoundingBox, motion} from "motion/react";
import {RefObject, useRef, useState} from "react";
import {PersonType} from "@/app/types";
import {usePeople} from "@/app/providers/PeopleContext";
import {Eye, EyeSlash, Person} from "@phosphor-icons/react";

export default function RenderedPerson({
                                           constraintsRef,
                                           personName,
                                           personIndex,
                                       }: {
    constraintsRef: false | Partial<BoundingBox> | RefObject<Element> | undefined;
    personName: string;
    personIndex: number;
}) {
    const divRef = useRef<HTMLDivElement>(null);
    const {people, setPeople, setMostRecentlyMovedPerson} = usePeople();
    const [lookAtScreen, setLookAtScreen] = useState<boolean>(false);

    const calculateDistanceFromTop = (newPos: { x: number, y: number }) => {
        const person = people[personIndex];
        if (person.areaRef.current) {
            const boundingRect = person.areaRef.current.getBoundingClientRect();
            const distanceFromTop = newPos.y - boundingRect.top;
            console.log(distanceFromTop)
            if (distanceFromTop < 0) {
                return person.distanceFromTopOfArea;
            }
            return distanceFromTop;
        } else {
            return -1;
        }
    }

    const checkIfPersonIsInsideArea = () => {
        const personInElement = people[personIndex];
        if (personInElement.areaRef.current) {
            const boundingRect = personInElement.areaRef.current.getBoundingClientRect();
            if (
                personInElement.pos.x >= boundingRect.x &&
                personInElement.pos.x <= (boundingRect.x + boundingRect.width) &&
                personInElement.pos.y >= boundingRect.y &&
                personInElement.pos.y <= (boundingRect.y + boundingRect.height)
            ) {
                console.log('Inside element');
                return true;
            } else {
                console.log('Not inside element');
                return false;
            }
        }
        return false;
    }

    const updatePerson = () => {
        if (divRef.current) {
            const style = window.getComputedStyle(divRef.current);
            const matrix = new WebKitCSSMatrix(style.transform);
            const newPos = {
                x: matrix.m41,
                y: matrix.m42,
            };
            console.log(newPos);
            const newPeople: PersonType[] = people.map((p: PersonType, i) => {
                if (i !== personIndex) {
                    return p;
                } else {
                    return {
                        pos: newPos,
                        name: p.name,
                        distanceFromTopOfArea: calculateDistanceFromTop(newPos),
                        inArea: checkIfPersonIsInsideArea(),
                        areaRef: p.areaRef,
                        lookingAtScreen: p.lookingAtScreen,
                    };
                }
            });
            setPeople(newPeople);
            setMostRecentlyMovedPerson(personIndex);
        }
    }

    return (
        <motion.div
            ref={divRef}
            drag
            dragConstraints={constraintsRef}
            className={`w-24 h-24 z-50 absolute top-0 left-0 flex flex-col pointer-events-auto`}
            initial={{
                x: people[personIndex].pos.x,
                y: people[personIndex].pos.y,
            }}
            onDragTransitionEnd={() => updatePerson()}
            onDragEnd={() => updatePerson()}
            onDragStart={() => updatePerson()}
            whileDrag={{
                pointerEvents: 'none',
            }}
        >
            <Person
                className={`stroke-white w-full h-full`}
            />
            <span className={`text-white h-full w-full text-center`}>
                {personName}
            </span>
            <button
                className={`flex justify-center items-center`}
                onClick={() => {
                    setLookAtScreen(!(lookAtScreen));
                    const newPeople: PersonType[] = people.map((p: PersonType, i) => {
                        if (i !== personIndex) {
                            return p;
                        } else {
                            return {
                                pos: p.pos,
                                name: p.name,
                                distanceFromTopOfArea: p.distanceFromTopOfArea,
                                inArea: p.inArea,
                                areaRef: p.areaRef,
                                lookingAtScreen: lookAtScreen,
                            };
                        }
                    });
                    setPeople(newPeople);
                }}
            >
                {lookAtScreen ?
                    <EyeSlash size={32} weight="bold" />
                    :

                    <Eye size={32} weight="bold" />
                }
            </button>
        </motion.div>
    )
}