import { URLParser } from './url-parser';
import { DEVICE_TYPE } from '../types';
import { parseQuery, stringifyQuery, joinPath } from './utils';
import { CLIENT_TYPE_MAPPING, ClientTypeNumber } from "../device-detect/clientTypeMap";

type _DEVICE_TYPE = (typeof DEVICE_TYPE)[keyof typeof DEVICE_TYPE];

export const parseCurrentURL = (): URLParser => {
    if (typeof window === 'undefined') {
        throw new Error('请在浏览器环境中使用该工具');
    }
    return new URLParser(window.location.href);
};

export const parseAdaptParamsFromUrl = () => {
    const url = parseCurrentURL();
    const query = url.getQuery();
    const hashQuery = url.getHashQuery();
    return {
        ...query,
        ...hashQuery
    };
}

export const parseClientTypeFromUrl = (): _DEVICE_TYPE | null => {
    if (typeof window === 'undefined') return null;
    
    const params = new URLSearchParams(window.location.search);
    const clientTypeStr = params.get('clientType');
    
    if (!clientTypeStr || isNaN(Number(clientTypeStr))) {
        return null;
    }
    
    const clientTypeNum = Number(clientTypeStr) as ClientTypeNumber;
    return CLIENT_TYPE_MAPPING[clientTypeNum] || CLIENT_TYPE_MAPPING.default;
};

export const updateClientTypeMapping = (newMapping: Partial<typeof CLIENT_TYPE_MAPPING>) => {
    Object.assign(CLIENT_TYPE_MAPPING, newMapping);
};

export {
    URLParser,
    parseQuery,
    stringifyQuery,
    joinPath,
    CLIENT_TYPE_MAPPING
};
export default URLParser;
