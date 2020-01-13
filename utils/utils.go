package utils

import (
	"github.com/labstack/echo"
	"github.com/labstack/gommon/log"
	"hungover-games/models"
	"io/ioutil"
	"os"
	"strings"
	"sync"
)

type CurrentPointsPerTeam struct {
	TeamID      uint
	TotalPoints float64
	Name        string
}

func GetCurPoints() []CurrentPointsPerTeam {
	var results []CurrentPointsPerTeam
	models.Db().Table("orders").Select("orders.team_id, teams.name, sum(orders.points) as total_points").Group("team_id").Joins("left join teams on orders.team_id = teams.id").Scan(&results)
	return results
}

var (
	secret *string
	once   sync.Once
)

/**
Singleton
*/
func Secret() *string {
	once.Do(readSecret)
	return secret
}

func CheckAuthorization(c echo.Context) bool {
	token := c.Request().Header.Get("hungover-token")
	if token != *Secret() {
		return false
	}
	return true
}

func readSecret() {
	file, err := os.Open("credentials")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()
	content, err := ioutil.ReadAll(file)
	if err != nil {
		log.Fatal(err)
	}
	s := string(content)
	s = strings.TrimSuffix(s, "\n")
	secret = &s
}
