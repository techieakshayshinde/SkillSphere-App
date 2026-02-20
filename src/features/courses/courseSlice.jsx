import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import {api} from '../../api/api'
import { mockApi } from '../../api/mockApi'

const useMockApi = import.meta.env.PROD && !import.meta.env.VITE_API_BASE_URL?.includes('localhost');
const apiClient = useMockApi ? mockApi : api;

export const fetchCourses=createAsyncThunk(
    'courses/fetchCourses',
    async ()=>{
        const res=await apiClient.get('/courses');
        return res.data;
    }
);

export const addCourse = createAsyncThunk(
    'courses/addCourse',
    async (course, { rejectWithValue }) => {
        try {
            const res = await apiClient.post('/courses', course);
            return res.data;
        } catch {
            return rejectWithValue('Failed to add course');
        }
    }
);

export const updateCourse = createAsyncThunk(
    'courses/updateCourse',
    async ({ id, ...course }, { rejectWithValue }) => {
        try {
            const res = await apiClient.put(`/courses/${id}`, course);
            return res.data;
        } catch {
            return rejectWithValue('Failed to update course');
        }
    }
);

export const deleteCourse = createAsyncThunk(
    'courses/deleteCourse',
    async (id, { rejectWithValue }) => {
        try {
            await apiClient.delete(`/courses/${id}`);
            return id;
        } catch {
            return rejectWithValue('Failed to delete course');
        }
    }
);

const courseSlice=createSlice({
    name:'courses',
    initialState:{ list:[], loading: false, error: null },
    reducers: {},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchCourses.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCourses.fulfilled,(state,action)=>{
                state.list=action.payload;
                state.loading = false;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addCourse.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(updateCourse.fulfilled, (state, action) => {
                const index = state.list.findIndex(course => course.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.list = state.list.filter(course => course.id !== action.payload);
            });
    }
});

export default courseSlice.reducer;  