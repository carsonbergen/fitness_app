import {Description, Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import {usePeople} from "@/app/providers/PeopleContext";

import EXERCISES from '../constants.json';
import {useEffect, useState} from "react";
import {Exercise} from "@/app/types";
import {twMerge} from "tailwind-merge";

interface PersonsPhoneProps {
    isOpen: boolean,
    setIsOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    personIndex: number
}

export default function PersonsPhone({isOpen, setIsOpen, personIndex}: PersonsPhoneProps) {
    const {people, setPeople} = usePeople();
    const [newExercises, setNewExercises] = useState<Exercise[]>([]);

    useEffect(() => {
        console.log(newExercises)
    }, [newExercises]);

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className={`z-[9999] relative`}
        >
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="max-w-lg space-y-4 border bg-black p-12">
                    <DialogTitle className="font-bold">{`${people[personIndex].name}'s Phone`}</DialogTitle>
                    <Description>Create a new workout.</Description>
                    <p>This will delete your current workout.</p>
                    <div
                        className={`h-48 w-full overflow-scroll flex flex-col space-y-2`}
                    >
                        {EXERCISES.map((exercise, index) => (
                            <div key={`${exercise}-${index}`}>
                                <button
                                    className={twMerge(
                                        `mr-4 text-black p-1 rounded-md`,
                                        newExercises.find(e => e.name == exercise) ?
                                            `bg-red-300` : `bg-green-300`
                                    )}
                                    onClick={() => {
                                        if (newExercises.find(e => e.name == exercise)) {
                                            // Remove
                                            setNewExercises(newExercises.filter(e => e.name != exercise))
                                        } else {
                                            // Add
                                            setNewExercises([
                                                ...newExercises,
                                                {
                                                    name: exercise,
                                                    sets: [],
                                                }
                                            ]);
                                        }
                                    }}
                                >
                                    {
                                        newExercises.find(e => e.name == exercise) ?
                                            'Remove'
                                            : 'Add'
                                    }
                                </button>
                                <span>{exercise}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                setNewExercises([]);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}