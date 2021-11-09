import {useMemo, useEffect, useState, useRef} from 'react';

const NotNull = (val) => val !== null;
const GreaterThan = (number) => (val) => val > number;
const LessThan = (number) => (val) => val < number;
const NotEqual = (data) => (val) => val !== data;
const NotAny = (array) => (val) => array.every((v) => v !== val);
const Any = (array) => (val) => array.some((v) => v === val);
const Every = (array) => (val) => array.every((v) => v === val);

export const StateType = {
    NotNull,
    GreaterThan,
    LessThan,
    NotEqual,
    NotAny,
    Any,
    Every,
};

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
const useStateMachine = (defaultState, data, states) => {
    const state = useMemo(() => {
        const ns = states.find(([compare]) => matchState(data, compare));

        if (ns) return ns[1];
        return defaultState;
    }, [data, defaultState, states]);

    return state;
};

/**
* Fires when state changes to any of the supplied states
* @param {func} cb - Callback
* @param {object} state - Current State from useStateMachine
* @param {array} states - Array of States
*/
export const useOnState = (cb, state, states) => {
    const [isActive, setIsActive] = useState(false);
    const callback = useRef(cb);

    useEffect(() => {
        callback.current = cb;
    }, [cb]);

    useEffect(() => {
        const newVal = states.some((s) => s === state);

        setIsActive(newVal);
    }, [state, states]);

    useEffect(() => {
        if (isActive && callback.current) {
            callback.current();
        }
    }, [isActive]);
};

export default useStateMachine;
