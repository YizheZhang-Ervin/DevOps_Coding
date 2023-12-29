const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs')

const url = 'https://news.baidu.com/';

request(url, function (error, response, body) {
  // 如果请求成功且状态码为 200
  if (!error && response.statusCode == 200) {
    // 使用 cheerio 加载 HTML 文档
    const $ = cheerio.load(body);

    // 存储获取到的数据
    const totalData = []
    
    // 获取hotnews下全部的li元素
    $('.hotnews').find('ul').find('li').each(function (index, value){
        // 向数组中存放数据
        totalData.push({
            title: $(value).find('strong').find('a').text(),
            href: $(value).find('strong').find('a').attr('href')
        })
    })
    writeFs(totalData)
    // 打印结果
    console.log(totalData)
  }
});

function writeFs(totalData){
    fs.writeFile('./data.json', JSON.stringify(totalData), function (err, data) {
        if (err) {
            throw err
        }
        console.log('数据保存成功');
    })
}

