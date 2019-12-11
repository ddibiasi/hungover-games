package utils

import (
	"hungover-games/models"
)

type CurrentPointsPerTeam struct {
	TeamID      uint
	TotalPoints int64
	Name        string
}

func GetCurPoints() []CurrentPointsPerTeam {
	var results []CurrentPointsPerTeam
	models.Db().Table("orders").Select("orders.team_id, teams.name, sum(orders.points) as total_points").Group("team_id").Joins("left join teams on orders.team_id = teams.id").Scan(&results)
	return results
}
