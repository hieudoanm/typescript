"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBluetooth = void 0;
const react_1 = require("react");
const useBluetooth = () => {
    const [bluetooth, setBluetooth] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (typeof window !== 'undefined' &&
            (!window.navigator ||
                !('bluetooth' in window.navigator) ||
                typeof window.navigator.bluetooth.getAvailability === 'undefined' ||
                typeof window.navigator.bluetooth.getDevices === 'undefined')) {
            return setBluetooth(false);
        }
        setBluetooth(window.navigator.bluetooth);
    }, []);
    return bluetooth;
};
exports.useBluetooth = useBluetooth;
