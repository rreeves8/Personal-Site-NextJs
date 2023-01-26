export function debounce(run: (args: any) => void, wait = 5, immediate = false) {
    let timeout: NodeJS.Timeout | null;

    return function (...args: any) {
        const callNow = immediate && !timeout;

        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(() => {
            timeout = null;
            if (!immediate) run(args);
        }, wait);

        if (callNow) run(args);
    };
}

let oldValue = 0;
let newValue = 0;

export function checkScrollDirectionIsUp(event: any) {
    newValue = window.pageYOffset;
    if (oldValue < newValue) {
        return true;
    } else if (oldValue > newValue) {
        return false;
    }
    oldValue = newValue;
}

export class StateManager<State> {
    private state: State;
    private listeners = new Map<keyof State, Array<(updatedStated: State) => void>>();

    constructor(initialState: State) {
        this.state = initialState;
    }

    update(key: keyof State, value: any) {
        this.state[key] = value;
        this.listeners.get(key)?.forEach((listener) => {
            listener(this.state);
        });
    }

    addListener(key: keyof State, listener: (updatedStated: State) => void) {
        this.listeners.get(key)?.push(listener);
    }

    removeListener(key: keyof State, listener: (updatedStated: State) => void) {
        this.listeners.set(
            key,
            this.listeners.get(key)?.filter((compareListener) => {
                return compareListener !== listener;
            }) as Array<(updatedStated: State) => void>
        );
    }

    getState(key: keyof State) {
        return this.state[key];
    }
}
