interface Lesson {
    id: string;
    title: string;
    duration: string;
}

interface Module {
    id: number;
    title: string;
    lessons: Array<Lesson>;
}

export interface Course {
    id: number;
    modules: Array<Module>;
}