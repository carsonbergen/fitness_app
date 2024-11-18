'use client';
import Area from "@/app/components/Area";
import People from "@/app/components/People";
import {usePeople} from "@/app/providers/PeopleContext";
import {RefObject, useEffect, useRef, useState} from "react";
import {useAreas} from "@/app/providers/AreaContext";
import Areas from "@/app/components/Areas";
import Screen from "@/app/components/Screen";
import {PersonType} from "@/app/types";

export default function Home() {
    const [mounted, setMounted] = useState<boolean>(false);
    const {people, setPeople} = usePeople();
    const areaRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
    const [peopleInArea, setPeopleInArea] = useState<PersonType[]>([]);

    useEffect(() => {
        if (areaRef) {
            setMounted(true);
        }
    }, [areaRef]);

    useEffect(() => {
        console.log('People:\n', people);
    }, [people]);

    useEffect(() => {
        console.log('People in area:', peopleInArea);
    }, [peopleInArea]);

    useEffect(() => {
        setPeople([
            {
                pos: {
                    x: 0,
                    y: 0,
                },
                name: 'Carson',
                distanceFromTopOfArea: -1,
                inArea: false,
                areaRef: areaRef,
                lookingAtScreen: true,
                exercises: [],
            },
            {
                pos: {
                    x: 100,
                    y: 0,
                },
                name: 'Not Carson',
                distanceFromTopOfArea: -1,
                inArea: false,
                areaRef: areaRef,
                lookingAtScreen: true,
                exercises: [{
                    name: 'Bench Press',
                    sets: [
                        {
                            reps: 5,
                            weight: 225,
                            done: true,
                        },
                        {
                            reps: 4,
                            weight: 225,
                            done: true,
                        },
                        {
                            reps: 4,
                            weight: 225,
                            done: false,
                        }
                    ]
                },
                    {
                        name: 'Bicep Curl',
                        sets: [
                            {
                                reps: 5,
                                weight: 225,
                                done: true,
                            },
                            {
                                reps: 4,
                                weight: 225,
                                done: true,
                            },
                            {
                                reps: 4,
                                weight: 225,
                                done: false,
                            }
                        ]
                    }],
            },
            {
                pos: {
                    x: 200,
                    y: 0,
                },
                name: 'Candela',
                distanceFromTopOfArea: -1,
                inArea: false,
                areaRef: areaRef,
                lookingAtScreen: true,
                exercises: [],
            }
        ]);
        // setAreas([
        //     {
        //         pos: {
        //             x: 0,
        //             y: 0,
        //         },
        //         size: {
        //             width: 192,
        //             height: 384,
        //         }
        //     },
        //     {
        //         pos: {
        //             x: 200,
        //             y: 0,
        //         },
        //         size: {
        //             width: 192,
        //             height: 384,
        //         }
        //     },
        // ]);
    }, [mounted]);

    return (
        <div className={`flex bg-black w-screen h-screen overflow-clip`}>
            <People
                areaRef={areaRef}
            />
            <div>
                <Area
                    areaRef={areaRef}
                />
                <Screen/>
            </div>
        </div>
    );
}
