import type { Keyvalue } from "../types";

export const parseQuery = (search: string): Keyvalue<string | string[]> => {
    const query: Keyvalue<string | string[]> = {};

    if (!search || typeof search !== 'string') {
        return query;
    }

    /// delete '?' and '#' that the searched url can find it.
    const queryStr = search.replace(/^[?#]/, '');
    if (!queryStr) {
        return query;
    }

    queryStr.split('&').forEach(item => {
        const [key, value] = item
            .split('=')
            .map(decodeURIComponent);
        if (key === undefined) {
            return;
        }

        if (query[key] !== undefined) {
            if (Array.isArray(query[key])) {
                query[key].push(value);
            }
            else {
                query[key] = [query[key], value];
            }
        }
        else {
            query[key] = value;
        }
    })

    return query;
}

export const stringifyQuery = (
    query: Keyvalue<any>,
    prefix: '?' | '#' = '?',
): string => {
    if (!query || typeof query !== 'object') {
        return '';
    }

    const params: string[] = [];
    Object.entries(query).forEach(([key, value]) => {
        if (value === undefined || value === null) {
            return;
        }
        if (Array.isArray(value)) {
            value.forEach(v => {
                params.push(`${encodeURIComponent(key)}=${encodeURIComponent(v)}`);
            })
        }
        else {
            params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        }
    })
    return params.length > 0 ? `${prefix}${params.join('&')}` : '';
}

export const joinPath = (base: string, path: string): string => {
    if (!path) {
        return base;
    }
    if (!base) {
        return path;
    }
    const baseTrimmed = base.replace(/\/$/, '');
    const pathTrimmed = path.replace(/^\//, '');
    return `${baseTrimmed}/${pathTrimmed}`;
}
