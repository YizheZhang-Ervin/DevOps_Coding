package main
 
import (
	"bufio"
	"fmt"
	"golang.org/x/net/html/charset"
	"golang.org/x/text/encoding"
	"golang.org/x/text/transform"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"regexp"
)
 
func main() {
	url := "https://aa.bb.cc"
 	// 创建客户端
	client := &http.Client{}
 	// 创建request请求
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Fatalln(err)
	}
 	// 设置Header
	req.Header.Set("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36")
	
 	// 客户端发起请求，收到响应
	resp, err := client.Do(req)
	if err != nil {
		log.Fatalln(err)
	}
	defer resp.Body.Close()
	
 	// 如果访问失败，就打印当前状态码
	if resp.StatusCode != http.StatusOK {
		fmt.Println("Error: status code", resp.StatusCode)
		return
	}
  
 	// 需要得到获取的内容的编码
	e := determineEncodeing(resp.Body)
 	// 得到utf-8编码的内容
	utf8Reader := transform.NewReader(resp.Body, e.NewDecoder())
	
	// 读取网页所有信息
	all, err := ioutil.ReadAll(utf8Reader)
	if err != nil {
		panic(err)
	}
 	// 打印信息
	fmt.Printf("%s",all)
  //对获取的内容进行解析和打印
	printTitle(all)
}
 
func determineEncodeing(r io.Reader) encoding.Encoding {
	bytes, err := bufio.NewReader(r).Peek(1024)
	if err != nil {
		panic(err)
	}
	e, _, _ := charset.DetermineEncoding(bytes, "")
	return e
}
 
func printTitle(contents []byte) {
  	// 正则表达式，用于匹配内容，+代表至少含有一个内容，^表示不可以含有的内容，加括号的地方会取到数组里
	re := regexp.MustCompile(`<a></a>`)
  	// -1 寻找所有匹配的字串
	matches := re.FindAllSubmatch(contents, -1)
 	// 打印
	for _, m := range matches {
		fmt.Printf("Title: %s, URL:%s\n", m[2], m[1])
	}
	fmt.Printf("matches: %d\n", len(matches))
}
