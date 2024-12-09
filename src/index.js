const fs = require('fs');
const path = require('path');

// 获取指定网络文件的文本
async function getGithubusercontent(path) {
    return new Promise((resolve, reject) => {
        if (!path) {
            return;
        }
        fetch(path)
            .then(res => {
                return res?.text?.();
            })
            .then(text => {
                return resolve(text);
            })
            .catch(e => {
                return reject(e);
            })
    })
}

// 提取链接
function matchUrl(text) {
    const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;
    const urls = text.match(urlPattern);
    console.log("urls===>",urls);
    return urls || [];
}

// 处理文本
function handleText(text) {
    var reg = new RegExp(/v2rayN订阅链接\W+\S+/ig);
    const result = text.match(reg);
    console.log("result===>",result);
    return result?.[0] ? matchUrl(result[0]) : '';
}

// 初始化
async function init() {
    getGithubusercontent("https://raw.githubusercontent.com/mksshare/mksshare.github.io/refs/heads/main/README.md")
        .then(text => {
            const url = handleText(text)?.[0];
            console.log("url===>",url)
            fs.writeFileSync(path.resolve('./url.txt'), url, 'utf-8')
        })
}

init();


