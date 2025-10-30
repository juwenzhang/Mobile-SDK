import { getDeviceInfo } from "../device-detect";
import { generateClassTypes } from "./class-generator";
import { 
    OS_CLASS_MAPPING,
    DEVICE_TYPE_CLASS_MAPPING,
    BROWSER_CLASS_MAPPING,
    SPECIAL_CLASS_MAPPING
} from "./class-mapping";

/// 获取得到当前的类名定义吧
export const getClassTypes = (): string[] => {
    const deviceInfo = getDeviceInfo();
    return generateClassTypes(deviceInfo);
}

/// 进行挂载操作了
export const mountClassTypes = (root: HTMLElement = document.documentElement): void => {
    const classTypes = getClassTypes();
    root.classList.add(...classTypes);
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => mountClassTypes());
    } else {
        mountClassTypes();
    }
}

export const calssMappings = {
    OS_CLASS_MAPPING,
    DEVICE_TYPE_CLASS_MAPPING,
    BROWSER_CLASS_MAPPING,
    SPECIAL_CLASS_MAPPING
}

export default {
    getClassTypes,
    mountClassTypes,
    calssMappings
}
