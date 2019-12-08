package db

import "github.com/jinzhu/gorm"

type Order struct {
	gorm.Model
	Team        Team   `gorm:"foreignkey:TeamID"`
	TeamID      uint   `json:"teamid" `
	Drink		Drink   `gorm:"foreignkey:DrinkID"`
	DrinkID     string `json:"-"`
	Points 		int    `json:"points" `
}
