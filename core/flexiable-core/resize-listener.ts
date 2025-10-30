import { FlexibleConfig } from "./types";
import { setRootStyle } from "./root-adjust";
import { INITDATA } from "./constants";

let resizeTimer: number | null = null;
let isListening = false;

export const handleResize = (config: FlexibleConfig): void => {
    const screenWidth = window.innerWidth;
    setRootStyle(screenWidth, config);
    config.onResize && config.onResize();
}

const resizeHandler = (config: FlexibleConfig) => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
        handleResize(config);
    }, config.resizeDebounceTime || INITDATA.debounceTime);
};

export const startResizeListener = (config: FlexibleConfig): void => {
    if (isListening) {
        return;
    }
    /// 改变全局标识吧
    isListening = true;
    window.addEventListener('resize', () => {
        if (resizeTimer) {
            clearTimeout(resizeTimer);
        }
        resizeTimer = window.setTimeout(() => {
            resizeHandler(config);
        }, config.resizeDebounceTime || INITDATA.debounceTime)
    })
}

export const stopResizeListener = (config: FlexibleConfig): void => {
    if (!isListening) {
        return;
    }
    isListening = false;
    if (resizeTimer) {
        clearTimeout(resizeTimer);
    }
    window.removeEventListener('resize', () => {
        resizeHandler(config);
    })
}
