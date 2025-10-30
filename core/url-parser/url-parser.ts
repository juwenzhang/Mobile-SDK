import { Keyvalue } from "../types";
import { parseQuery, stringifyQuery, joinPath } from "./utils";

export class URLParser {
    private url: URL;

    constructor(url: string, base?: string) {
        if (typeof URL === 'undefined') {
            const { URL: NodeURL } = require('node:url')
            this.url = new NodeURL(url, base);
        }
        else {
            this.url = new URL(url, base);
        }
    }

    toString(): string {
        return this.url.toString();
    }

    getProtocol(): string {
        return this.url.protocol;
    }

    setProtocol(protocol: string): void {
        this.url.protocol = protocol;
    }

    getHost(): string {
        return this.url.host;
    }

    setHost(host: string): void {
        this.url.host = host;
    }

    getHostname(): string {
        return this.url.hostname;
    }

    setHostname(hostname: string): void {
        this.url.hostname = hostname;
    }

    getPort(): string {
        return this.url.port;
    }

    setPort(port: string | number): void {
        this.url.port = String(port);
    }

    getPathname(): string {
        return this.url.pathname;
    }

    setPathname(pathname: string): void {
        this.url.pathname = pathname;
    }

    appendPath(path: string): void {
        this.url.pathname = joinPath(this.url.pathname, path);
    }

    getSearch(): string {
        return this.url.search;
    }

    getQuery(): Keyvalue<string | string[]> {
        return parseQuery(this.url.search);
    }

    setQuery(query: Keyvalue<any>): void {
        this.url.search = stringifyQuery(query, '?').slice[1];
    }

    addQuery(query: Keyvalue<any>): void {
        const currentQuery = this.getQuery();
        Object.entries(query).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                currentQuery[key] = Array.isArray(currentQuery[key])
                    ? [...[currentQuery[key]], ...value]
                    : value;
            }
            else {
                currentQuery[key] = currentQuery[key] !== undefined
                    ? [currentQuery[key], value]
                    : value;
            }
        })
        this.setQuery(currentQuery);
    }

    deleteQuery(key: string): void {
        const currentQuery = this.getQuery();
        delete currentQuery[key];
        this.setQuery(currentQuery);
    }

    getHash(): string {
        return this.url.hash;
    }

    setHash(hash: string): void {
        this.url.hash = hash;
    }

    getHashQuery(): Keyvalue<string | string[]> {
        return parseQuery(this.url.hash);
    }

    setHashQuery(query: Keyvalue<any>): void {
        this.url.hash = stringifyQuery(query, '#');
    }
}
