package main

import (
	"io/ioutil"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func fetch(c *gin.Context, endpoint string) {
	client := &http.Client{}

	req, err := http.NewRequest("GET", "https://dog.ceo/api"+endpoint, nil)
	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
		return
	}

	// Send the request
	res, err := client.Do(req)
	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
		return
	}
	defer res.Body.Close()

	// Read the response body
	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
		return
	}

	// Set the response status code and body
	c.Status(res.StatusCode)
	c.Writer.Write(body)
}

func main() {
	r := gin.Default()

	// Add CORS middleware
	r.Use(cors.Default())

	// Serve the bundled JavaScript file
	r.Static("/_ui/dist", "./_ui/dist")

	r.LoadHTMLGlob("templates/*")

	// Serve the template file that includes the React component
	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.tmpl", gin.H{})
	})

	r.GET("/api/get-random-dog", func(c *gin.Context) {
		fetch(c, "/breeds/image/random")
	})

	r.GET("/api/get-breeds-list", func(c *gin.Context) {
		fetch(c, "/breeds/list/all")
	})

	r.Run(":8080")
}
