'use client';
import {motion} from "motion/react";
import {useEffect, useRef} from "react";
import {useAreas} from "@/app/providers/AreaContext";
import Area from "@/app/components/Area";


export default function Areas() {
    const {areas} = useAreas();

    useEffect(() => {
        console.log('Areas', areas);
    }, [areas]);

    return (
        <div className={`absolute top-0 left-0 w-screen h-screen`}>
            {areas.map((area, index) => (
                <Area
                    key={`${index}`}
                    areaIndex={index}
                />
            ))}
        </div>
    )
}