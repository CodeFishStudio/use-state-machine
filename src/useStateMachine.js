import {useMemo} from 'react';

const matchState = (data, state) => {
    return Object.entries(state).every(([key, value]) => {
        if (typeof value === 'function') {
            return value(data[key]);
        }
        if (value === data[key]) return true;
        return false;
    });
};

/**
* @param {string} defaultState - Default State
* @param {object} data - Date to compare state with
* @params {[[func,string]]} states - Array of states with compare data
*/
export const useStateMachine = (defaultState, data, states) => {
    const state = useMemo(() => {
        const ns = states.find(([compare]) => matchState(data, compare));

        if (ns) return ns[1];
        return defaultState;
    }, [data, defaultState, states]);

    return state;
};
