import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "..";
import { Course } from '../../interfaces/course';
import { api } from "../../lib/axios";

export interface PlayerState {
    course: Course | null 
    currentModuleIndex: number;
    currentLessonIndex: number;
    isLoading: boolean;
}

const initialState: PlayerState = {
    course: null,
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    isLoading: true,
}

export const loadCourse = createAsyncThunk(
    'player/load',
    async () => {
        const response = await api.get("/courses/1");
        
        return response.data;
    } 
)

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        play: (state, action: PayloadAction<[number, number]>) => {
            state.currentModuleIndex = action.payload[0];
            state.currentLessonIndex = action.payload[1];
        },
        next: (state) => {
            if(state.course){
                const totalLessons = state.course.modules[state.currentModuleIndex].lessons.length - 1;
                const totalModules = state.course.modules.length - 1;
    
                if(state.currentLessonIndex < totalLessons)
                    state.currentLessonIndex++;
                else if(state.currentModuleIndex < totalModules){
                    state.currentModuleIndex++;
                    state.currentLessonIndex = 0;
                }
            }
        }
    },
    extraReducers(builder){
        builder.addCase(loadCourse.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(loadCourse.fulfilled, (state, { payload }: { payload: Course }) => {
            state.course = payload;
            state.isLoading = false;
        });
    }
})

export const player = playerSlice.reducer;

export const { play, next } = playerSlice.actions;

export const useCurrentLesson = () => {
    return useAppSelector(state => {
        const { currentLessonIndex, currentModuleIndex } = state.player;

        const currentModule = state.player.course?.modules[currentModuleIndex];
        const currentLesson = currentModule?.lessons[currentLessonIndex];

        return {currentModule, currentLesson};
    });
}