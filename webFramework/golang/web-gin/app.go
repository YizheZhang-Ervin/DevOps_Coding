package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func setupRouter() *gin.Engine {
	r := gin.Default()

	r.GET("/home", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": 200, "msg": "ok"})
	})
	return r
}

func main() {
	// 设置路由信息
	r := setupRouter()
	// 启动服务器并监听 8080 端口
	r.Run(":8080")
}
