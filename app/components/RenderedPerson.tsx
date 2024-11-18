import {BoundingBox, motion} from "motion/react";
import {RefObject, useRef} from "react";
import {PersonType} from "@/app/types";
import {usePeople} from "@/app/providers/PeopleContext";
import {Person} from "@phosphor-icons/react";
import {useAreas} from "@/app/providers/AreaContext";

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
    const {areas} = useAreas();
    return (
        <motion.div
            ref={divRef}
            drag
            dragConstraints={constraintsRef}
            className={`w-24 h-24 z-50 absolute top-0 left-0 flex flex-col`}
            initial={{
                x: people[personIndex].pos.x,
                y: people[personIndex].pos.y,
            }}
            onDragTransitionEnd={() => {
                if (divRef.current) {
                    const style = window.getComputedStyle(divRef.current);
                    const matrix = new WebKitCSSMatrix(style.transform);
                    const newPos = {
                        x: matrix.m41,
                        y: matrix.m42,
                    };
                    const newPeople: PersonType[] = people.map((p: PersonType, i) => {
                        if (i !== personIndex) {
                            return p;
                        } else {
                            return {
                                pos: newPos,
                                name: p.name,
                            };
                        }
                    });
                    setPeople(newPeople);
                    setMostRecentlyMovedPerson(personIndex);

                }
            }}
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
        </motion.div>
    )
}