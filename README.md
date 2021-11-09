# Installation
`npm install codefishstudio/use-state-machine`

---

# Basic Usage
```javascript
import useStateMachine, {useOnState} from 'codefishstudio/use-state-machine';

const STATES = {
    DEFAULT: 'DEFAULT',
    CONNECTED: 'CONNECTED',
    CONNECTING: 'CONNECTING',
    DISCONNECTED: 'DISCONNECTED',
    RECONNECTING: 'RECONNECTING',
};

const StateConnecting = {
    hasConnected: false,
    isConnected: false,
    isConnecting: true,
};

const StateConnected = {
    isConnected: true,
};

const StateDisconnected = {
    hasConnected: true,
    isConnected: false,
    isConnecting: false,
};

const StateReconnecting = {
    isConnecting: true,
    isConnected: false,
    hasConnected: true,
};

const States = [
    [StateConnecting, STATES.CONNECTING],
    [StateConnected, STATES.CONNECTED],
    [StateDisconnected, STATES.DISCONNECT],
    [StateReconnecting, STATES.RECONNECTING],
];

const App = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [hasConnected, setHasConnected] = useState(false);

    const mappedData = useMemo(() => {
        return {
            isConnected,
            isConnecting,
            hasConnected,
        };
    }, [isConnected, isConnecting, hasConnected]);

    const currentState = useStateMachine(STATES.DEFAULT, mappedData, States);


    useOnState(() => {
        // Try to connect
        setTimeout(() => {
            setIsConnecting(true);
        }, 1000);
    }, currentState, [STATES.DEFAULT]);

    useOnState(() => {
        // Trigger connected
        setTimeout(() => {
            setIsConnected(true);
            setHasConnected(true);
        }, 1000);
    }, currentState, [STATES.CONNECTING]);

    useOnState(() => {
        // Try to disconnect
        setTimeout(() => {
            setIsConnected(false);
        }, 1000);
    }, currentState, [STATES.CONNECTED]);

    useOnState(() => {
        // Try to reconnect
        setTimeout(() => {
            setIsConnecting(true);
        }, 1000);
    }, currentState, [STATES.DISCONNECTED]);

    useOnState(() => {
        setTimeout(() => {
            setIsConnected(true);
            setHasConnected(false);
        },1000);
    }, currentState, [STATE.RECONNECTING]);
```

---

# Helper Methods

State can either be required values or you can provide a function for comparing.

This library provides some default compare functions

```javascript
import {StateType} from 'codefishstudio/use-state-machine';

const customCompare = (array) => (val) => {
    return array.reduce((acc, cur) => {
        if (acc) return acc;
        if (val.includes(cur)) return true;
        return false;
    }, false);
};

const MyState = {
    firstName: StateTypes.NotNull,
    lastName: StateTypes.NotEqual('SwearWord'),
    middleName: StateTypes.NotAny(["BadWord1", "BadWord2", "BadWord3"]),
    age: StateTypes.GreaterThan(17),
    money: StateTypes.LessThan(5000),
    status: StateTypes.Any(['Connected', 'Loaded']),
    someArray: customCompare(['A', 'B', 'C']), 
};
```
