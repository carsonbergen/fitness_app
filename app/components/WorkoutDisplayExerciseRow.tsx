import {Exercise, ExerciseSet, PersonType} from "@/app/types";
import {Check, Square, X} from "@phosphor-icons/react";
import {usePeople} from "@/app/providers/PeopleContext";

interface WorkoutDisplayExerciseRowProps {
    exerciseName: string,
    exerciseSets: ExerciseSet[],
    index: number,
    exerciseIndex: number
}

export default function WorkoutDisplayExerciseRow({
                                                      exerciseName,
                                                      exerciseSets,
                                                      index,
                                                      exerciseIndex
                                                  }: WorkoutDisplayExerciseRowProps) {
    const {people, setPeople} = usePeople();
    return (
        <div className={`w-full h-fit`}>
            <h2 className={`text-lg font-semibold`}>{exerciseName}</h2>
            <div className={`px-4 space-y-2`}>
                {exerciseSets.map((set, ei) => (
                    <div key={`${exerciseName}-${ei}`} className={`flex flex-row space-x-2 justify-start items-center`}>
                        <button
                            onClick={() => {
                                const newPeople: PersonType[] = people.map((p: PersonType, i) => {
                                    if (i !== index) {
                                        return p;
                                    } else {
                                        const newExercises = p.exercises.map((exercise, i) => {
                                            if (i === exerciseIndex) {
                                                return {
                                                    name: exercise.name,
                                                    sets: exercise.sets.map((set: ExerciseSet, eii: number) => {
                                                        if (ei === eii) {
                                                            return {
                                                                reps: set.reps,
                                                                weight: set.weight,
                                                                done: !(set.done),
                                                            }
                                                        } else {
                                                            return set;
                                                        }
                                                    })
                                                }
                                            } else {
                                                return exercise;
                                            }
                                        });

                                        return {
                                            pos: p.pos,
                                            name: p.name,
                                            distanceFromTopOfArea: p.distanceFromTopOfArea,
                                            inArea: p.inArea,
                                            areaRef: p.areaRef,
                                            lookingAtScreen: p.lookingAtScreen,
                                            exercises: newExercises,
                                        };
                                    }
                                });
                                setPeople(newPeople);
                            }}
                        >
                            {
                                set.done ?
                                    <Check/>
                                    :
                                    <Square/>
                            }
                        </button>
                        <input
                            className={`
                                font-bold
                                bg-black
                                rounded-md
                                p-2
                            `}
                            type="number"
                            value={set.reps}
                            onChange={(e) => {
                                const newPeople: PersonType[] = people.map((p: PersonType, i) => {
                                    if (i !== index) {
                                        return p;
                                    } else {
                                        const newExercises = p.exercises.map((exercise, i) => {
                                            if (i === exerciseIndex) {
                                                return {
                                                    name: exercise.name,
                                                    sets: exercise.sets.map((set: ExerciseSet, eii: number) => {
                                                        if (ei === eii) {
                                                            return {
                                                                reps: Number(e.target.value),
                                                                weight: set.weight,
                                                                done: set.done,
                                                            }
                                                        } else {
                                                            return set;
                                                        }
                                                    })
                                                }
                                            } else {
                                                return exercise;
                                            }
                                        });

                                        return {
                                            pos: p.pos,
                                            name: p.name,
                                            distanceFromTopOfArea: p.distanceFromTopOfArea,
                                            inArea: p.inArea,
                                            areaRef: p.areaRef,
                                            lookingAtScreen: p.lookingAtScreen,
                                            exercises: newExercises,
                                        };
                                    }
                                });
                                setPeople(newPeople);
                            }}
                        />
                        <span>
                            <X/>
                        </span>
                        <input
                            className={`
                                font-bold
                                bg-black
                                rounded-md
                                p-2
                            `}
                            type="number"
                            value={set.weight}
                            onChange={(e) => {
                                const newPeople: PersonType[] = people.map((p: PersonType, i) => {
                                    if (i !== index) {
                                        return p;
                                    } else {
                                        const newExercises = p.exercises.map((exercise, i) => {
                                            if (i === exerciseIndex) {
                                                return {
                                                    name: exercise.name,
                                                    sets: exercise.sets.map((set: ExerciseSet, eii: number) => {
                                                        if (ei === eii) {
                                                            return {
                                                                reps: set.reps,
                                                                weight: Number(e.target.value),
                                                                done: set.done,
                                                            }
                                                        } else {
                                                            return set;
                                                        }
                                                    })
                                                }
                                            } else {
                                                return exercise;
                                            }
                                        });

                                        return {
                                            pos: p.pos,
                                            name: p.name,
                                            distanceFromTopOfArea: p.distanceFromTopOfArea,
                                            inArea: p.inArea,
                                            areaRef: p.areaRef,
                                            lookingAtScreen: p.lookingAtScreen,
                                            exercises: newExercises,
                                        };
                                    }
                                });
                                setPeople(newPeople);
                            }}
                        />
                    </div>
                ))}
                <button
                    onClick={() => {
                        const newPeople: PersonType[] = people.map((p: PersonType, i) => {
                            if (i !== index) {
                                return p;
                            } else {
                                const newExercises = p.exercises.map((exercise, i) => {
                                    if (i === exerciseIndex) {
                                        return {
                                            name: exercise.name,
                                            sets: [
                                                ...exercise.sets,
                                                {
                                                    reps: 0,
                                                    weight: 0,
                                                    done: false,
                                                }
                                            ]
                                        }
                                    } else {
                                        return exercise;
                                    }
                                });


                                return {
                                    pos: p.pos,
                                    name: p.name,
                                    distanceFromTopOfArea: p.distanceFromTopOfArea,
                                    inArea: p.inArea,
                                    areaRef: p.areaRef,
                                    lookingAtScreen: p.lookingAtScreen,
                                    exercises: newExercises,
                                };
                            }
                        });
                        setPeople(newPeople);
                    }}
                >
                    Add set
                </button>
            </div>
        </div>
    );
}