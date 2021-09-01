const crypto = require('crypto');

/**
 * 加密方法
 * @param key 加密key
 * @param iv       向量
 * @param data     需要加密的数据
 * @returns string
 */
const encrypt = function (key, iv, data) {
    const cipher = crypto.createCipheriv(
        'aes-128-cbc',
        new Buffer.from(key, 'base64'),
        new Buffer.from(iv, 'base64')
    );
    // 设置自动 padding 为 true，删除填充补位
    cipher.setAutoPadding(true);
    let crypted = cipher.update(data, 'utf8', 'binary');
    crypted += cipher.final('binary');
    crypted = new Buffer.from(crypted, 'binary').toString('base64');
    return crypted;
};

/**
 * 解密方法
 * @param key      解密的key
 * @param iv       向量
 * @param crypted  密文
 * @returns string
 */
const decrypt = function (key, iv, crypted) {
    crypted = new Buffer.from(crypted, 'base64').toString('binary');
    const decipher = crypto.createDecipheriv(
        'aes-128-cbc',
        new Buffer.from(key, 'base64'),
        new Buffer.from(iv, 'base64')
    );
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true);
    let decoded = decipher.update(crypted, 'binary', 'utf8');
    decoded += decipher.final('utf8');
    return decoded;
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
