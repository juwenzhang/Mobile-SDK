import { FlexibleConfig } from "./types";
import { defaultDprManager } from "../dpr";
import { SANDBOX_GLOBBAL_KEY, INITDATA } from "./constants";

// 这里的设置是只要是 -1 说明是无效的设置
export const setGlobalProperty = (key: string, ele: HTMLElement): void => {
    /// 首先进行将全局的标识进先清除再全部注册
    Object.keys(SANDBOX_GLOBBAL_KEY).forEach(key => {
        ele.style.removeProperty(SANDBOX_GLOBBAL_KEY[key])
        ele.style.setProperty(SANDBOX_GLOBBAL_KEY[key], '1')
    })
    switch (key) {
        case SANDBOX_GLOBBAL_KEY.rem:
            ele.style.setProperty(SANDBOX_GLOBBAL_KEY.vw, '-1')
            break;
        case SANDBOX_GLOBBAL_KEY.vw:
            ele.style.setProperty(SANDBOX_GLOBBAL_KEY.rem, '-1')
            break;
    }
}

const getCurrentDpr = () => {
    return defaultDprManager.getDpr();
}

export const calculateRemRootFontSize = (
    screenWidth: number,
    config: FlexibleConfig
): number =>  {
    if (typeof screenWidth !== 'number' || screenWidth <= 0) {
        throw new Error('无效的屏幕宽度');
    }
    const { 
        remBaseRatio = 10, 
        minFontSize = 24, 
        maxFontSize = 64 
    } = config;
    /// 基本的计算公式
    let fontSize = screenWidth / remBaseRatio;
    /// 设置合理的fontSize，避免太小或者太大了吧
    fontSize = Math.max(fontSize, minFontSize);
    fontSize = Math.min(fontSize, maxFontSize);
    const dpr = getCurrentDpr();
    /// 为什么这么计算呐： 核心是为了保留 dpr 计算精度吧
    return Math.round(fontSize * dpr) / dpr;
}

export const calculateVwRootBase = (config: FlexibleConfig): number => {
    /// vw 基准 = 设计稿宽度，默认 375，确保 1vw = 设计稿宽度/100 px
    return config.vwDesignWidth || 375;
}

/// 计算并且设置全局的样式吧
export const setRootStyle = (screenWidth: number, config: FlexibleConfig): void => {
    const htmlRoot = document.documentElement;
    if (config.adaptMode === 'rem') {
        const forntSize = calculateRemRootFontSize(screenWidth, config);
        htmlRoot.style.fontSize = `${forntSize}px`;
        /// 设置全局的标识吧
        setGlobalProperty(SANDBOX_GLOBBAL_KEY.rem, htmlRoot);
    }
    else {
        const vwBase = calculateVwRootBase(config);
        htmlRoot.style.setProperty(SANDBOX_GLOBBAL_KEY.vw, `${vwBase}px`);
        setGlobalProperty(SANDBOX_GLOBBAL_KEY.vw, htmlRoot);
        /// 字体重制
        htmlRoot.style.fontSize = INITDATA.initFontSize;
    }
    /// 先把原本的 dpr global_key 清理了后再进行后续的其他操作，因为全局的函数已经了的值的了
    htmlRoot.style.removeProperty(SANDBOX_GLOBBAL_KEY.dpr);
    htmlRoot.style.setProperty(SANDBOX_GLOBBAL_KEY.dpr, `${getCurrentDpr()}`);
}

export const getSandboxValidGlobalKey = (): string[] => {
    const validGlobalKey: string[] = [];
    Object.keys(SANDBOX_GLOBBAL_KEY).forEach(key => {
        if (SANDBOX_GLOBBAL_KEY[key] !== '-1') {
            validGlobalKey.push(key);
        }
    })
    return validGlobalKey;
}
