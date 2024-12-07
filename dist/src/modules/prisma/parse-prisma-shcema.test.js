"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMessage = void 0;
/**
 * メッセージを生成する
 * @param {string} text - メッセージに含める文字列
 * @throws {Error} - textが空文字またはNGを含む場合にエラーを投げる
 * @returns {string} - 生成されたメッセージ
 */
var generateMessage = function (text) {
    if (!text || text.includes('NG')) {
        throw new Error('text is invalid');
    }
    return 'Hello, ' + text + '!';
};
exports.generateMessage = generateMessage;
describe('generateMessage', function () {
    it('should return 「Hello, World!」', function () {
        var actual = (0, exports.generateMessage)('World');
        expect(actual).toBe('Hello, World!');
    });
    it('should throw an error if text is empty', function () {
        expect(function () { return (0, exports.generateMessage)(''); }).toThrowError('text is invalid');
    });
    it('should throw an error if text includes NG', function () {
        expect(function () { return (0, exports.generateMessage)('NG'); }).toThrowError('text is invalid');
    });
});
