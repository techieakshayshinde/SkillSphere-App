import { describe, test, expect } from "vitest";
import authReducer, { loginSuccess, logout } from './authSlice';

describe('authSlice tests', () => {
    test('should return initial state', () => {
        const state = authReducer(undefined, {type:'unknown'});
        expect(state).toEqual({user:null, loading: false, error: null});
    });

    test('should handle loginSuccess', () => {
        const user={email:'student@test.com'}
        const state=authReducer(undefined, loginSuccess(user));
        expect(state.user).toEqual(user);
    });

    test('should handle logout', () => {
        const initialState={user:{email:'student@test.com'}, loading: false, error: null};
        const state=authReducer(initialState,logout());
        expect(state.user).toBeNull();
    });
});