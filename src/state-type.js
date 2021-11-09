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
