import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    maxPoints: 6,
    pointsSpent: 0,
    selectedRunes: [],
    unlockOrder: {
        path1: ['stack', 'fork', 'cake', 'crown'],
        path2: ['helmet', 'goggles', 'lightning', 'skull']
    },
};

const runeSlice = createSlice({
    name: 'rune',
    initialState,
    reducers: {
        addPoint: (state, action) => {
            if (state.pointsSpent < state.maxPoints) {
                const rune = action.payload;
                const path = Object.values(state.unlockOrder).find(path => path.includes(rune));
                if (!path) return;

                if (state.selectedRunes.includes(rune)) return;

                const runeIndex = path.indexOf(rune);
                if (runeIndex === 0 || state.selectedRunes.includes(path[runeIndex - 1])) {
                    state.selectedRunes.push(rune);
                    state.pointsSpent += 1;
                }
            }
        },
        removePoint: (state, action) => {
            const rune = action.payload;
            const path = Object.values(state.unlockOrder).find(path => path.includes(rune));
            if (!path) return;

            const lastSelectedRuneInPath = path.filter(r => state.selectedRunes.includes(r)).pop();
            if (rune === lastSelectedRuneInPath) {
                state.selectedRunes = state.selectedRunes.filter((r) => r !== rune);
                state.pointsSpent -= 1;
            }
        },
    },
});

export const { addPoint, removePoint } = runeSlice.actions;
export default runeSlice.reducer;
