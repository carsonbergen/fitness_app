'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import {PersonType} from "@/app/types";

interface PeopleContextType {
    people: PersonType[];
    setPeople: (people: PersonType[]) => void;
    mostRecentlyMovedPerson: number;
    setMostRecentlyMovedPerson: (index: number) => void;
}

const PeopleContext = createContext<PeopleContextType | undefined>(undefined);

export const PeopleProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [people, setPeople] = useState<PersonType[]>([]);
    const [mostRecentlyMovedPerson, setMostRecentlyMovedPerson] = useState(0);

    return (
        <PeopleContext.Provider value={{ people, setPeople, mostRecentlyMovedPerson, setMostRecentlyMovedPerson }}>
            {children}
        </PeopleContext.Provider>
    );
}

export const usePeople = () => {
    const context = useContext(PeopleContext);
    if (context === undefined) {
        throw new Error('usePeople must be used within a PeopleProvider');
    }
    return context;
}