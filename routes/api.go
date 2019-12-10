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
type Result struct {
	TeamID      int
	TotalPoints int64
	Name        string
}

func GetPoints(c echo.Context) error {
	var results []Result
	models.Db().Table("orders").Select("orders.team_id, teams.name, sum(orders.points) as total_points").Group("team_id").Joins("left join teams on orders.team_id = teams.id").Scan(&results)
	return c.JSON(http.StatusOK, results)
}

func GetPointsDetailed(c echo.Context) error {
	var orders []db.Order
	models.Db().Preload("Team").Find(&orders)
	return c.JSON(http.StatusOK, orders)
}
