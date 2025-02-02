"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEffectOnce = void 0;
const react_1 = require("react");
const useEffectOnce = (effectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    (0, react_1.useEffect)(effectCallback, []);
};
exports.useEffectOnce = useEffectOnce;
