import { OS_TYPE, BROWSER_TYPE, DEVICE_TYPE, DeviceInfo } from "../types";
import { CLIENT_TYPE_MAPPING, ClientTypeNumber } from "./clientTypeMap";
import { OS_DETECTION_RULES, BROWSER_DETECTION_RULES, DEVICE_TYPE_RULES } from "./constants";

type _OS_TYPE = (typeof OS_TYPE)[keyof typeof OS_TYPE];
type _BROWSER_TYPE = (typeof BROWSER_TYPE)[keyof typeof BROWSER_TYPE];
type _DEVICE_TYPE = (typeof DEVICE_TYPE)[keyof typeof DEVICE_TYPE];

const parseVersion = (versionStr: string): string => {
    if (!versionStr) {
        return '';
    }
    return versionStr.replace(/-/g, '.').split('.')[0];
}

const detectOS = (ua: string): { type: _OS_TYPE, version: string } => {
    for (const rule of OS_DETECTION_RULES) {
        if (rule.regex.test(ua)) {
            let version = '';
            if(rule.versionRegex) {
                const match = ua.match(rule.versionRegex);
                if (match && match[1]) {
                    version = parseVersion(match[1]);
                }
            }
            return {
                type: rule.type,
                version
            }
        }
    }
    return {
        type: OS_TYPE.UNKNOWN,
        version: ''
    }
}

const detectBrowser = (ua: string): { type: _BROWSER_TYPE, version: string } => {
    for (const rule of BROWSER_DETECTION_RULES) {
        if (rule.regex.test(ua)) {
            let version = '';
            if (rule.versionRegex) {
                const match = ua.match(rule.versionRegex);
                if (match) {
                    const versionGroup = match.slice(1).find(g => g);
                    if (versionGroup) {
                        version = parseVersion(versionGroup);
                    }
                }
            }
            return {
                type: rule.type,
                version
            }
        }
    }
    return {
        type: BROWSER_TYPE.UNKNOWN,
        version: ''
    }
}

const detectDeviceType = (ua: string, clientTypeNumber?: number): _DEVICE_TYPE => {
    if (clientTypeNumber !== undefined) {
        const mappedType = CLIENT_TYPE_MAPPING[clientTypeNumber as ClientTypeNumber];
        if (mappedType) return mappedType;
    }

    for (const rule of DEVICE_TYPE_RULES) {
        if (rule.check()) {
        return rule.type;
        }
    }
    return DEVICE_TYPE.UNKNOWN;
}

const detectIsTouch = (): boolean => {
    return 'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0;
}

export const detectDeviceInfo = (): DeviceInfo => {
    if (typeof window === 'undefined') {
        return {
            os: OS_TYPE.UNKNOWN,
            osVersion: '',
            deviceType: DEVICE_TYPE.UNKNOWN,
            browser: BROWSER_TYPE.UNKNOWN,
            browserVersion: '',
            isTouch: false
        }
    }
    const ua = navigator.userAgent;
    const { type: os, version: osVersion } = detectOS(ua);
    const { type: browser, version: browserVersion } = detectBrowser(ua);
    const deviceType = detectDeviceType(ua);
    const isTouch = detectIsTouch();

    return {
        os,
        osVersion,
        deviceType,
        browser,
        browserVersion,
        isTouch
    }
}

export const validateClassType = (mode: string | undefined): boolean => {
    return mode === 'rem' || mode === 'vw';
}
