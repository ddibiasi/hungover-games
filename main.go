package main

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"hungover-games/models"
	"hungover-games/routes"
)


func main() {
	e := echo.New()
	models.Db() // start db migration
	// Root level middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	drunken := e.Group("/drunken")
	// Public
	drunken.Static("/", "web/public")
	drunken.Static("/client", "web/public")
	// API - JWT Authenticated routes
	api := e.Group("/api")
	// Log
	api.POST("/log", routes.PostOrder)
	api.GET("/log/all", routes.GetPoints)

	e.Logger.Print("Everything is up and running commander!")
	e.Logger.Fatal(e.Start(":1323"))
}

