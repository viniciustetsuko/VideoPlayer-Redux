import { ChevronDown } from "lucide-react";
import { Lesson } from "../Lesson";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useAppDispatch, useAppSelector } from "../../store";
import { play } from "../../store/slices/player";
import { useEffect, useState } from "react";

interface IModuleProps {
    moduleIndex: number;
    title: string;
    lessonsAmount: number;
}

export const Module = ( { moduleIndex, lessonsAmount, title } :IModuleProps) => {
    const dispatch = useAppDispatch();

    const {currentModuleIndex, currentLessonIndex} = useAppSelector(state => {
        const {currentModuleIndex, currentLessonIndex} = state.player;
        return {currentModuleIndex, currentLessonIndex};
    })

    const lessons = useAppSelector(state => {
        return state.player.course?.modules[moduleIndex].lessons;
    });

    const [open, setOpen] = useState(false);

    const isCourseLoading = useAppSelector(state => state.player.isLoading);

    if(isCourseLoading){
        return (
            <Collapsible.Root className="animate-pulse" disabled>
                <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
                    <div className="flex h-10 w-10 rounded-full items-center justify-center text-xs bg-zinc-700"></div>

                    <div className="flex-1">
                        <div className="h-6 bg-zinc-700 rounded"></div>
                    </div>

                    <ChevronDown className="w-5 h-5 ml-auto text-zinc-400" />
                </Collapsible.Trigger>
            </Collapsible.Root>
        )
    }

    useEffect(() => {
        setOpen(moduleIndex === currentModuleIndex);
    }, [currentModuleIndex])
    
    return (
        <Collapsible.Root className="group" open={open} onOpenChange={setOpen}>
            <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
                <div className="flex h-10 w-10 rounded-full items-center justify-center text-xs bg-zinc-950">{moduleIndex + 1}</div>

                <div className="flex flex-col gap-1 text-left">
                    <strong className="text-sm">{title}</strong>
                    <span className="text-sm text-zinc-400">{lessonsAmount} {lessonsAmount > 1 ? 'aulas' : 'aula'}</span>
                </div>

                <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform duration-200" />
            </Collapsible.Trigger>

            <Collapsible.Content>
                <nav className="relative flex flex-col gap-4 p-6">
                    {lessons && lessons.map((lesson, lessonIndex) => {
                        const isCurrent = currentModuleIndex === moduleIndex && lessonIndex === currentLessonIndex;

                        return (
                            <Lesson key={lessonIndex} title={lesson.title} duration={lesson.duration} isCurrent={isCurrent} onPlay={() => dispatch(play([moduleIndex, lessonIndex]))}/>
                        )
                    })}
                </nav>
            </Collapsible.Content>
                            
        </Collapsible.Root>
    )
}