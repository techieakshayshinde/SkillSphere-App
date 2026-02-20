import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {api} from '../../api/api'
import { mockApi, staticData } from '../../api/mockApi'

const useMockApi = import.meta.env.PROD && !import.meta.env.VITE_API_BASE_URL?.includes('localhost');
const apiClient = useMockApi ? mockApi : api;

export const login = createAsyncThunk(
    'auth/login',
    async ({email, password}, {rejectWithValue}) => {
        try {
            if (useMockApi) {
                // In production with mock API, check against static users
                const user = staticData.users.find(u => u.email === email && u.password === password);
                if (user) {
                    return user;
                } else {
                    return rejectWithValue('Invalid credentials');
                }
            } else {
                const response = await apiClient.get('/users', {
                    params: { email, password }
                });
                const user = response.data.find(u => u.email === email && u.password === password);
                if (user) {
                    return user;
                } else {
                    return rejectWithValue('Invalid credentials');
                }
            }
        } catch {
            return rejectWithValue('Login failed');
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async ({email, password, name}, {rejectWithValue}) => {
        try {
            if (useMockApi) {
                // In production, show message that registration is disabled
                return rejectWithValue('Registration is disabled in demo mode. Please contact administrator.');
            } else {
                const response = await apiClient.post('/users', {email, password, name});
                return response.data;
            }
        } catch {
            return rejectWithValue('Registration failed');
        }
    }
);

const authSlice=createSlice({
    name:'auth',
    initialState:{
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
        loading: false,
        error: null
    },
    reducers:{
        loginSuccess:(state,action)=>{
            state.user=action.payload;
            state.loading = false;
            state.error = null;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout:(state)=>{
            state.user=null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('user');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const {loginSuccess, logout}=authSlice.actions;
export default authSlice.reducer;