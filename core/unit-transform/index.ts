import flexible from "../flexiable-core";
import { DPR_CONFIG } from '../dpr/constant';
import { getDPR } from '../dpr';

/// 这里的是全局的单位转换函数吧
export const transformUiPx = (uiPx: number) => {
    if (typeof uiPx !== 'number' || uiPx <= 0) {
        return '0'
    }

    const dpr = getDPR();
    const realPx = Math.round((uiPx / DPR_CONFIG.UI_BASE_DPR) * dpr);

    const { adaptMode, vwDesignWidth } = flexible.config;
    if (adaptMode === 'rem') {
        const rootFontSize = flexible.getRootFontSize();
        const rem = (realPx / rootFontSize).toFixed(4);
        return `${rem.replace(/\.?0*$/, '')}rem`
    }
    else {
        const vw = (realPx / (vwDesignWidth || 375) * 100).toFixed(4);
        return `${vw.replace(/\.?0*$/, '')}vw`
    }
}
