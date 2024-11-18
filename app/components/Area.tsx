// import {motion} from "motion/react";
import {Dispatch, RefObject, SetStateAction, useEffect, useState} from "react";
import {PersonType} from "@/app/types";
import {usePeople} from "@/app/providers/PeopleContext";

interface AreaProps {
    areaRef: RefObject<HTMLDivElement>,
}

export default function Area({areaRef}: AreaProps) {
    return (
        <div
            className={`bg-black z-40 w-full h-[30vh]`}
            ref={areaRef}
            // onMouseEnter={() => {
            //     if (areaRef.current) {
            //         const boundingRect = areaRef.current.getBoundingClientRect();
            //         checkIfPersonIsInsideArea(boundingRect);
            //     }
            // }}
            // onMouseOver={() => {
            //     if (areaRef.current) {
            //         const boundingRect = areaRef.current.getBoundingClientRect();
            //         checkIfPersonIsInsideArea(boundingRect);
            //     }
            // }}
            // onMouseLeave={() => {
            //     if (areaRef.current) {
            //         const boundingRect = areaRef.current.getBoundingClientRect();
            //         checkIfPersonIsInsideArea(boundingRect);
            //     }
            // }}
        />
    );
}