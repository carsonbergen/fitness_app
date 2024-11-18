'use client';
import Area from "@/app/components/Area";
import People from "@/app/components/People";
import {usePeople} from "@/app/providers/PeopleContext";
import {useEffect, useState} from "react";
import {useAreas} from "@/app/providers/AreaContext";
import Areas from "@/app/components/Areas";

export default function Home() {
    const [mounted, setMounted] = useState<boolean>(false);
    const {people, setPeople} = usePeople();
    const {areas, setAreas} = useAreas();

    useEffect(() => {
        setMounted(true);
    }, []);

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
                name: 'Carson'
            },
            {
                pos: {
                    x: 100,
                    y: 0,
                },
                name: 'Not Carson'
            },
            {
                pos: {
                    x: 200,
                    y: 0,
                },
                name: 'Candela'
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
        <div className={`flex bg-gray-700 w-screen h-screen`}>
            <People/>
            <div className={`pt-24`}>
                <Area/>
            </div>
        </div>
    );
}
