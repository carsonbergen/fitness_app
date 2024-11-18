'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import {Area} from "@/app/types";

interface AreaContextType {
    areas: Area[],
    setAreas: (areas: Area[]) => void;
}

const AreaContext = createContext<AreaContextType | undefined>(undefined);

export const AreaProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [areas, setAreas] = useState<Area[]>([]);
    return (
        <AreaContext.Provider value={{ areas, setAreas }}>
            {children}
        </AreaContext.Provider>
    )
}

export const useAreas = () => {
    const context = useContext(AreaContext);
    if (context === undefined) {
        throw new Error('useAreas must be used within an AreaProvider');
    }
    return context;
}