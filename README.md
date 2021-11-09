```javascript
import useStateMachine, {useOnState} from '../index.js';

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
