import { 
    SANDBOX_GLOBBAL_KEY,
    INITDATA,
    INSTANCE_KEY
} from "./constants";
import { 
    setGlobalProperty,
    calculateRemRootFontSize,
    calculateVwRootBase,
    setRootStyle,
    getSandboxValidGlobalKey
} from "./root-adjust";
import { 
    startResizeListener, 
    stopResizeListener, 
    handleResize 
} from "./resize-listener";
import {
    FlexibleConfig,
    FlexibleInstance
} from "./types";
import { ADAPT_MODE } from '../unit-transform/contants';

const createFlexible = (initialConfig: Partial<FlexibleConfig> = {}): FlexibleInstance => {
    const defaultConfig: FlexibleConfig = {
        adaptMode: ADAPT_MODE.REM as 'rem' | 'vw',
        remBaseRatio: INITDATA.remBaseRatio,
        vwDesignWidth: INITDATA.vwDesignWidth,
        minFontSize: INITDATA.minFontSize,
        maxFontSize: INITDATA.maxFontSize,
        resizeDebounceTime: INITDATA.debounceTime,
        onResize: undefined
    }

    let config: FlexibleConfig = {
        ...defaultConfig,
        ...initialConfig
    }

    const flexibleInstance: FlexibleInstance = {
        config,
        init() {
            const screenWidth = window.innerWidth;
            setRootStyle(screenWidth, config);
            startResizeListener(config);
            // 实现将instance挂载到window上
            window[INSTANCE_KEY] = this;
            // 添加日志记录
            console.log(`[flexible实例配置已经被创建了吧]，具体内容是: ${JSON.stringify(config)}`);
        },
        setConfig(newConfig: Partial<FlexibleConfig>) {
            config = {
                ...config,
                ...newConfig
            }
            const screenWidth = window.innerWidth;
            setRootStyle(screenWidth, config);
            console.log(`[flexible实例配置已经被更新了吧]，具体内容是: ${JSON.stringify(config)}`);
        },
        getRootFontSize() {
            /// 这里有坑，因为全局设置的 fontsize 是 '16px' 的中文，所以说这里的需要做一层兜底吧，否则又是 bug 了
            return parseFloat(document.documentElement.style.fontSize) || parseFloat(INITDATA.initFontSize);
        },
        destroy() {
            stopResizeListener(config);
            const htmlRoot = document.documentElement;
            // 这里进行清理所有的属性吧
            Object.keys(SANDBOX_GLOBBAL_KEY).forEach(key => {
                htmlRoot.style.removeProperty(SANDBOX_GLOBBAL_KEY[key]);
            });
            delete window[INSTANCE_KEY];
            console.log(`[flexible实例已经被销毁]`);
        }
    }

    return flexibleInstance;
}

const flexible = createFlexible();

export {
    SANDBOX_GLOBBAL_KEY,
    INITDATA,
    setGlobalProperty,
    calculateRemRootFontSize,
    calculateVwRootBase,
    setRootStyle,
    getSandboxValidGlobalKey,
    startResizeListener,
    stopResizeListener,
    handleResize,
    FlexibleConfig,
    FlexibleInstance,

    createFlexible,
    flexible
}

export default flexible;
