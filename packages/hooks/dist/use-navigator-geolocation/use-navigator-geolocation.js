"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGeolocation = void 0;
const react_1 = require("react");
const useGeolocation = () => {
    const [position, setPosition] = (0, react_1.useState)({
        accuracy: 0,
        altitude: 0,
        altitudeAccuracy: 0,
        heading: 0,
        speed: 0,
        latitude: 0,
        longitude: 0,
    });
    (0, react_1.useEffect)(() => {
        (() => {
            if (typeof window !== 'undefined' &&
                typeof window.navigator.geolocation.getCurrentPosition !== 'function') {
                return;
            }
            window.navigator.geolocation.getCurrentPosition((position) => {
                const { coords } = position;
                console.info('coords', coords);
                setPosition(coords);
            });
        })();
    }, []);
    return position;
};
exports.useGeolocation = useGeolocation;
