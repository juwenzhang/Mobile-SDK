import { DeviceInfo } from "../types/device"
import { 
    OS_CLASS_MAPPING,
    DEVICE_TYPE_CLASS_MAPPING,
    BROWSER_CLASS_MAPPING,
    SPECIAL_CLASS_MAPPING
} from "./class-mapping"

export const generateClassTypes = (deviceInfo: DeviceInfo): string[] => {
    const classes: string[] = [];

    // 添加系统类名
    classes.push(OS_CLASS_MAPPING[deviceInfo.os]);

    // 添加设备类型类名
    classes.push(DEVICE_TYPE_CLASS_MAPPING[deviceInfo.deviceType]);

    // 添加浏览器类名
    classes.push(BROWSER_CLASS_MAPPING[deviceInfo.browser]);

    // 添加特殊类名
    classes.push(deviceInfo.isTouch ? SPECIAL_CLASS_MAPPING.touch : SPECIAL_CLASS_MAPPING.noTouch);

    if (deviceInfo.osVersion) {
        classes.push(`${OS_CLASS_MAPPING[deviceInfo.os]}-${deviceInfo.osVersion}`);
    }

    if (deviceInfo.browserVersion) {
        classes.push(`${BROWSER_CLASS_MAPPING[deviceInfo.browser]}-${deviceInfo.browserVersion}`);
    }

    return [
        ...new Set(classes)
    ].filter(Boolean);
}
