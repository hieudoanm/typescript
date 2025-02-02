"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWindowSize = void 0;
const react_1 = require("react");
const useWindowSize = () => {
    const [windowSize, setWindowSize] = (0, react_1.useState)({
        width: 0,
        height: 0,
    });
    const handleResize = (0, react_1.useCallback)(() => {
        setWindowSize({
            width: (window === null || window === void 0 ? void 0 : window.innerWidth) || 0,
            height: (window === null || window === void 0 ? void 0 : window.innerHeight) || 0,
        });
    }, []);
    (0, react_1.useEffect)(() => {
        if (!window)
            return;
        // Add event listener
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            if (!window)
                return;
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);
    return windowSize;
};
exports.useWindowSize = useWindowSize;
