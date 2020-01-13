package db

import "github.com/jinzhu/gorm"

type CumulatedOrders struct {
	gorm.Model
	Team            Team    `gorm:"foreignkey:TeamID" json:"-"`
	TeamID          uint    `json:"-" `
	CumulatedPoints float64 `json:"cumulated_points" `
}
