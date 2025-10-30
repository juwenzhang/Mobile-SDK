import { OS_TYPE, BROWSER_TYPE, DEVICE_TYPE } from "../types";

type _OS_TYPE = (typeof OS_TYPE)[keyof typeof OS_TYPE];
type _BROWSER_TYPE = (typeof BROWSER_TYPE)[keyof typeof BROWSER_TYPE];
type _DEVICE_TYPE = (typeof DEVICE_TYPE)[keyof typeof DEVICE_TYPE];

export const OS_DETECTION_RULES: Array<{
    type: _OS_TYPE;
    regex: RegExp,
    versionRegex: RegExp
}> = [
    {
        type: OS_TYPE.IOS,
        regex: /(iPhone|iPad|iPod)/i,
        versionRegex: /OS (\d+)_(\d+)_?(\d+)?/i
    },
    {
        type: OS_TYPE.ANDROID,
        regex: /Android/i,
        versionRegex: /Android (\d+)\.(\d+)\.?(\d+)?/i
    },
    {
        type: OS_TYPE.WINDOWS,
        regex: /Windows/i,
        versionRegex: /Windows NT (\d+)\.(\d+)\.?(\d+)?/i
    },
    {
        type: OS_TYPE.MACOS,
        regex: /Macintosh/i,
        versionRegex: /Mac OS X (\d+)_(\d+)_?(\d+)?/i
    },
    {
        type: OS_TYPE.LINUX,
        regex: /Linux/i,
        versionRegex: /Linux (\d+)\.(\d+)\.?(\d+)?/i
    }
];

export const BROWSER_DETECTION_RULES: Array<{
    type: _BROWSER_TYPE;
    regex: RegExp,
    versionRegex: RegExp
}> = [
    {
        type: BROWSER_TYPE.WECHAT,
        regex: /micromessenger/i,
        versionRegex: /micromessenger\/(\d+(\.\d+)*)/i
    },
    {
        type: BROWSER_TYPE.CHROME,
        regex: /chrome|crios/i,
        versionRegex: /chrome\/(\d+(\.\d+)*)/i
    },
    {
        type: BROWSER_TYPE.SAFARI,
        regex: /safari/i,
        versionRegex: /version\/(\d+(\.\d+)*)/i
    },
    {
        type: BROWSER_TYPE.EDGE,
        regex: /edge|edg/i,
        versionRegex: /edge\/(\d+(\.\d+)*)|edg\/(\d+(\.\d+)*)/i
    },
    {
        type: BROWSER_TYPE.FIREFOX,
        regex: /firefox|fxios/i,
        versionRegex: /firefox\/(\d+(\.\d+)*)/i
    }
];

export const DEVICE_TYPE_RULES: Array<{
    type: _DEVICE_TYPE;
    check: () => boolean;
}> = [
    {
        type: DEVICE_TYPE.TV,  // 智能电视类型
        check: () => /smart-tv|tv/i.test(navigator.userAgent)
    },
    {
        type: DEVICE_TYPE.TABLET,  // 平板类型
        check: () => {
            const ua = navigator.userAgent;
            return /tablet|ipad/i.test(ua) ||
                (/android/i.test(ua) && !/mobile/i.test(ua));
        }
    },
    {
        type: DEVICE_TYPE.MOBILE,  // 移动设备类型
        check: () => /mobile|android|iphone|ipod/i.test(navigator.userAgent)
    },
    {
        type: DEVICE_TYPE.PC,
        check: () => !DEVICE_TYPE_RULES.slice(0, 3).some(rule => rule.check())
    }
];
