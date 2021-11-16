import {useEffect, useState, useRef} from 'react';

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
        let ret = null;
        if (isActive && callback.current) {
            ret = callback.current();
        }

        return () => {
            if (ret !== null && typeof ret === 'function') {
                ret();
            }
        };
    }, [isActive]);
};
