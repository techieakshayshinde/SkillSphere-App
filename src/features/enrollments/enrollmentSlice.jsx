import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

export const enrollCourse = createAsyncThunk(
    'enrollments/enrollCourse',
    async ({ userId, courseId }, { rejectWithValue }) => {
        try {
            const response = await api.post('/enrollments', {
                userId,
                courseId,
                enrolledDate: new Date().toISOString().split('T')[0],
                progress: 0
            });
            return response.data;
        } catch {
            return rejectWithValue('Failed to enroll in course');
        }
    }
);

export const fetchUserEnrollments = createAsyncThunk(
    'enrollments/fetchUserEnrollments',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/enrollments?userId=${userId}`);
            return response.data;
        } catch {
            return rejectWithValue('Failed to fetch enrollments');
        }
    }
);

export const fetchAllEnrollments = createAsyncThunk(
    'enrollments/fetchAllEnrollments',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/enrollments');
            return response.data;
        } catch {
            return rejectWithValue('Failed to fetch all enrollments');
        }
    }
);

export const unenrollCourse = createAsyncThunk(
    'enrollments/unenrollCourse',
    async (enrollmentId, { rejectWithValue }) => {
        try {
            await api.delete(`/enrollments/${enrollmentId}`);
            return enrollmentId;
        } catch {
            return rejectWithValue('Failed to unenroll from course');
        }
    }
);

export const updateProgress = createAsyncThunk(
    'enrollments/updateProgress',
    async ({ enrollmentId, progress }, { rejectWithValue }) => {
        try {
            const response = await api.patch(`/enrollments/${enrollmentId}`, {
                progress
            });
            return response.data;
        } catch {
            return rejectWithValue('Failed to update progress');
        }
    }
);

const enrollmentSlice = createSlice({
    name: 'enrollments',
    initialState: {
        list: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(enrollCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(enrollCourse.fulfilled, (state, action) => {
                state.list.push(action.payload);
                state.loading = false;
            })
            .addCase(enrollCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserEnrollments.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserEnrollments.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserEnrollments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchAllEnrollments.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllEnrollments.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchAllEnrollments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(unenrollCourse.fulfilled, (state, action) => {
                state.list = state.list.filter(e => e.id !== action.payload);
            })
            .addCase(updateProgress.fulfilled, (state, action) => {
                const index = state.list.findIndex(e => e.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            });
    }
});

export default enrollmentSlice.reducer;