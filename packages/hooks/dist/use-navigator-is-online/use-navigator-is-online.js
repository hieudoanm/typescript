"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIsOnline = void 0;
const react_1 = require("react");
const useIsOnline = () => {
    const defaultOnline = typeof window !== 'undefined' ? window.navigator.onLine : true;
    const [isOnline, setIsOnline] = (0, react_1.useState)(defaultOnline);
    (0, react_1.useEffect)(() => {
        if (typeof window === 'undefined')
            return;
        window.addEventListener('offline', () => {
            console.info('offline', window.navigator.onLine);
            setIsOnline(window.navigator.onLine);
        });
        window.addEventListener('online', () => {
            console.info('online', window.navigator.onLine);
            setIsOnline(window.navigator.onLine);
        });
        return () => {
            if (typeof window === 'undefined')
                return;
            window.removeEventListener('offline', () => { });
            window.removeEventListener('online', () => { });
        };
    }, []);
    return isOnline;
};
exports.useIsOnline = useIsOnline;
