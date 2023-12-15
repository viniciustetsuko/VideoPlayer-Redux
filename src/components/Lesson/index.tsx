import { PlayCircle, Video } from "lucide-react"
import { useAppDispatch } from "../../store";

interface ILessonProps {
    title: string;
    duration: string;
    isCurrent?: boolean
    onPlay: () => void;
}

export const Lesson = ({title, duration, onPlay, isCurrent = false}: ILessonProps) => {
    const dispatch = useAppDispatch();
    
    return (
        <button data-active={isCurrent} onClick={onPlay} disabled={isCurrent} className="flex items-center gap-3 text-sm text-zinc-400 enabled:hover:text-zinc-100 data-[active=true]:text-emerald-400">
            {isCurrent ? <PlayCircle className="w-4 h-4 text-emerald-400"/> : <Video className="w-4 h-4 text-zinc-500" /> }
            
            <span>{title}</span>
            <span className="ml-auto font-mono text-sm text-zinc-500">{duration}</span>
        </button>
    )
}