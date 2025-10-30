import { DeviceInfo } from "../types";
import { detectDeviceInfo, validateClassType } from "./detector";

let deviceInfo: DeviceInfo = detectDeviceInfo();

export const getDeviceInfo = (): DeviceInfo => {
    return {
        ...deviceInfo
    }
}

export const refreshDeviceInfo = () => {
    deviceInfo = detectDeviceInfo();
    return getDeviceInfo();
}

export default {
    getDeviceInfo,
    validateClassType,
    refreshDeviceInfo
}
