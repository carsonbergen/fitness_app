// import {motion} from "motion/react";
import {RefObject} from "react";

interface AreaProps {
    areaRef: RefObject<HTMLDivElement>,
}

export default function Area({areaRef}: AreaProps) {
    return (
        <div
            className={`bg-black z-40 w-full h-[30vh]`}
            ref={areaRef}
        />
    );
}