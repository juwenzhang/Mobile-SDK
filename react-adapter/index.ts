import flexible from "../core/flexiable-core";
import { parseAdaptParamsFromUrl } from '../core/url-parser';
import * as deviceDetect from '../core/device-detect';
import { updateGlobalDpr } from '../core/dpr';
import { CLIENT_TYPE_MAPPING } from '../core/device-detect/clientTypeMap';
import { DPR_CONFIG } from '../core/dpr/constant';
import { INSTANCE_KEY } from "../core/flexiable-core/constants";

export const initBaseMobile = (options: {
    initialClassType?: string;
    initialDpr?: number;
    initialAdaptMode?: string;
    clientTypeMapping?: Partial<typeof CLIENT_TYPE_MAPPING>;
} = {}) => {
    // url 参数解析吧
    const urlParams = parseAdaptParamsFromUrl();
    const classType = urlParams.classType || deviceDetect.default.validateClassType(options.initialClassType);
    const dpr = urlParams.dpr || options.initialDpr || DPR_CONFIG.DEFAULT_DPR;
    const adaptMode = urlParams.adaptMode || options.initialAdaptMode || '';

    // 更新全局状态吧
    // updateGlobalClassType(classType);
    updateGlobalDpr(dpr as number);

    flexible.setConfig({
        classType: classType as string,
        adaptMode: adaptMode as any
    })
    flexible.init();

    window[INSTANCE_KEY] = {
        currentClassType: classType,
        currentDpr: dpr,
        currentAdaptMode: adaptMode,
        flexible: flexible
    }

    console.log('[初始化完成了]>>>', {
        classType,
        dpr,
        adaptMode
    })
}
