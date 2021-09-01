// 导入 crypto-js 包
const CryptoJS = require('crypto-js');

/**
 * 加密方法
 * @param key 加密key
 * @param iv       向量
 * @param data     需要加密的数据
 * @returns string
 */
const encrypt = function (key, iv, data) {
    return CryptoJS.AES.encrypt(data, CryptoJS.enc.Base64.parse(key), {
        mode: CryptoJS.mode.CBC,
        keySize: 128,
        iv: CryptoJS.enc.Base64.parse(iv)
    }).toString();
};

/**
 * 解密方法
 * @param key      解密的key
 * @param iv       向量
 * @param crypted  密文
 * @returns string
 */
const decrypt = function (key, iv, crypted) {
    return CryptoJS.AES.decrypt(crypted, CryptoJS.enc.Base64.parse(key), {
        mode: CryptoJS.mode.CBC,
        keySize: 128,
        iv: CryptoJS.enc.Base64.parse(iv)
    }).toString(CryptoJS.enc.Utf8);
};

var key = 'BnW0kBJZyIdEMh9AgGoHXA==';
console.log('加密的key:', key);
var iv = '3O/KQvJ1T2lEdj6QfAtRwg==';
console.log('加密的iv:', iv);
var data =
    '{"phoneNumber":"13588888888","purePhoneNumber":"13588888888","countryCode":"86","watermark":{"timestamp":1581352610,"appid":"wx1b022th0rba666f7"}}';
console.log('需要加密的数据:', data);
var crypted = encrypt(key, iv, data);
console.log('数据加密后:', crypted);
var dec = decrypt(key, iv, crypted);
console.log('数据解密后:', dec);
