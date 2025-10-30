import { DEVICE_TYPE } from "../types/device";

export const CLIENT_TYPE_MAPPING = {
    1: DEVICE_TYPE.MOBILE,
    2: DEVICE_TYPE.TABLET,
    3: DEVICE_TYPE.PC,
    4: DEVICE_TYPE.TV,
    default: DEVICE_TYPE.UNKNOWN
} as const;

export type ClientTypeNumber = keyof typeof CLIENT_TYPE_MAPPING | number;
