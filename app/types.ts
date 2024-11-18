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
    exercises: Exercise[];
}

export interface Area {
    peopleInside: PersonType[];
}

export interface Exercise {
    name: string;
    sets: ExerciseSet[];
}

export interface ExerciseSet {
    reps: number;
    weight: number;
    done: boolean;
}