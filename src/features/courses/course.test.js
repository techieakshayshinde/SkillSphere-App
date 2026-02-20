import { expect, test } from 'vitest';
import courseReducer from './courseSlice';

test('loads courses', () => {
    const state = courseReducer({ list: [], loading: false, error: null }, { type: 'courses/fetchCourses/fulfilled', payload: [{ id: 1 }] });
    expect(state.list.length).toBe(1);
});