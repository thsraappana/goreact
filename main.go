package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func getData(c *gin.Context) {
	data := []string{"apple", "banana", "orange"}
	c.JSON(http.StatusOK, gin.H{"data": data})
}

func main() {
	r := gin.Default()

	// Serve the bundled JavaScript file
	r.Static("/ui/dist", "./ui/dist")

	r.LoadHTMLGlob("templates/*")

	// Serve the template file that includes the React component
	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.tmpl", gin.H{})
	})

	r.GET("/api/data", getData)

	r.Run(":8080")
}
