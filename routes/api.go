package routes

import (
	"github.com/labstack/echo"
	"hungover-games/models"
	"hungover-games/models/db"
	"hungover-games/utils"
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
	if o.TeamID == 0 {
		return c.JSON(http.StatusBadRequest, web.Response{Message: "Invalid team"})
	}
	models.Db().Create(o)
	return c.JSON(http.StatusCreated, web.Response{Message: "Added order"})
}

func PostTeam(c echo.Context) error {
	t := new(db.Team)
	if err := c.Bind(t); err != nil {
		return err
	}
	models.Db().Create(t)
	return c.JSON(http.StatusCreated, web.Response{Message: "Added Team"})
}

// ################################
//			GET REQUESTS
// ################################

func GetPoints(c echo.Context) error {
	return c.JSON(http.StatusOK, utils.GetCurPoints())
}

func GetTeams(c echo.Context) error {
	var teams []db.Team
	models.Db().Find(&teams)
	return c.JSON(http.StatusOK, teams)
}

func GetPointsDetailed(c echo.Context) error {
	var teams []db.Team
	models.Db().Preload("Orders").Find(&teams)
	return c.JSON(http.StatusOK, teams)
}

func GetPointsTimeline(c echo.Context) error {
	var teams []db.Team
	models.Db().Preload("CumulativeSums").Find(&teams)
	return c.JSON(http.StatusOK, teams)
}
