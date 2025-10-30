import { URLParser, parseQuery, stringifyQuery, joinPath } from '../index';

describe('url-parser', () => {
    test('parseQuery 应正确解析查询字符串', () => {
        expect(parseQuery('?id=1&name=test')).toEqual({ id: '1', name: 'test' });
        expect(parseQuery('?ids=1&ids=2')).toEqual({ ids: ['1', '2'] });
    });

    test('stringifyQuery 应正确序列化参数', () => {
        expect(stringifyQuery({ id: 1, name: 'test' })).toBe('?id=1&name=test');
        expect(stringifyQuery({ ids: [1, 2] })).toBe('?ids=1&ids=2');
    });

    test('URLParser 应正确解析 URL', () => {
        const parser = new URLParser('https://githhub.com/juwenzhang?');
        expect(parser.getProtocol()).toBe('https:');
        expect(parser.getHost()).toBe('githhub.com');
        expect(parser.getHostname()).toBe('githhub.com');
        expect(parser.getPathname()).toBe('');
        expect(parser.getSearch()).toBe('');
    });

    test('URLParser 应支持修改查询参数', () => {
        const parser = new URLParser('https://github.com/juwenzhang?page=1');
        parser.addQuery({ size: 10 });
        expect(parser.getSearch()).toBe('?page=1&size=10');
        parser.deleteQuery('page');
        expect(parser.getSearch()).toBe('?size=10');
    });

    test('joinPath 应正确拼接路径', () => {
        expect(joinPath('/api', 'user')).toBe('/api/user');
        expect(joinPath('/api/', '/user')).toBe('/api/user');
        expect(joinPath('', 'user')).toBe('user');
    });
});