'use client';
import Area from "@/app/components/Area";
import People from "@/app/components/People";
import {usePeople} from "@/app/providers/PeopleContext";
import {RefObject, useEffect, useRef, useState} from "react";
import {useAreas} from "@/app/providers/AreaContext";
import Screen from "@/app/components/Screen";
import {PersonType} from "@/app/types";

export default function Home() {
    const [mounted, setMounted] = useState<boolean>(false);
    const {people, setPeople} = usePeople();
    const areaRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (areaRef) {
            setMounted(true);
        }
    }, [areaRef]);

    useEffect(() => {
        console.log('People:\n', people);
    }, [people]);

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
                name: 'John',
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
                                weight: 50,
                                done: true,
                            },
                            {
                                reps: 4,
                                weight: 50,
                                done: true,
                            },
                            {
                                reps: 4,
                                weight: 50,
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
                name: 'Chloe',
                distanceFromTopOfArea: -1,
                inArea: false,
                areaRef: areaRef,
                lookingAtScreen: true,
                exercises: [],
            },
            {
                pos: {
                    x: 300,
                    y: 0,
                },
                name: 'Maria',
                distanceFromTopOfArea: -1,
                inArea: false,
                areaRef: areaRef,
                lookingAtScreen: true,
                exercises: [],
            },
        ]);
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
