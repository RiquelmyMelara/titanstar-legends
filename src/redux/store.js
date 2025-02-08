import { configureStore } from '@reduxjs/toolkit';
import runeReducer from '../redux/runeSlice';

export const store = configureStore({
    reducer: {
        rune: runeReducer,
    },
});