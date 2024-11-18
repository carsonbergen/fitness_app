import {RefObject} from "react";

export interface PersonType {
    pos: {
        x: number;
        y: number;
    };
    name: string;
    distanceFromTopOfArea: number;
    inArea: boolean;
    areaRef: RefObject<HTMLDivElement>;
    lookingAtScreen: boolean;
}

export interface Area {
    peopleInside: PersonType[];
}