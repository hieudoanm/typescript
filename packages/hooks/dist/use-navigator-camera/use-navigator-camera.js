"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCamera = void 0;
const react_1 = require("react");
const useCamera = ({ width = 0, height = 0, facingMode = 'environment', }) => {
    const [mediaStream, setMediaStream] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const enableVideoStream = (_a) => __awaiter(void 0, [_a], void 0, function* ({ width, height, facingMode, }) {
            try {
                const stream = yield navigator.mediaDevices.getUserMedia({
                    video: { facingMode, width, height },
                });
                setMediaStream(stream);
            }
            catch (error) {
                console.error(error);
            }
        });
        enableVideoStream({ width, height, facingMode });
        return () => {
            if (!mediaStream)
                return;
            const tracks = mediaStream.getTracks();
            for (const track of tracks) {
                track.stop();
            }
        };
    }, [width, height, facingMode, mediaStream]);
    return mediaStream;
};
exports.useCamera = useCamera;
