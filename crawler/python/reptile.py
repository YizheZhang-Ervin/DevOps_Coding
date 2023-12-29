#基础用法
import requests
#1、指定url
url='https://xx.yy.zz?aa=bb'
#2、发起请求get方法的返回值为相应对象
response=requests.get(url=url)
#3、获取响应数据
page_text=response.text
#4、持久化存储
with open('./test.html','w',encoding='utf-8') as fp:
    fp.write(page_text)
