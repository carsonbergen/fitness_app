export interface PersonType {
    pos: {
        x: number;
        y: number;
    };
    name: string;
}

export interface Area {
    peopleInside: PersonType[];
}