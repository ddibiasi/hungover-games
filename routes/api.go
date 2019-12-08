package routes

import (
	"github.com/labstack/echo"
	"hungover-games/models"
	"hungover-games/models/db"
	"hungover-games/utils/web"
	"net/http"
)

// ################################
//			POST REQUESTS
// ################################

func PostOrder(c echo.Context) error {
	o := new(db.Order)
	if err := c.Bind(o); err != nil {
		return err
	}
	models.Db().Create(o)
	return c.JSON(http.StatusCreated, web.Response{Message: "Added order"})
}



// ################################
//			GET REQUESTS
// ################################

func GetPoints(c echo.Context) error {
	var teams []db.Team
	models.Db().Find(&teams)
	return c.JSON(http.StatusOK, teams)
}
