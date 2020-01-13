package db

import "github.com/jinzhu/gorm"

type Order struct {
	gorm.Model
	Team   Team    `gorm:"foreignkey:TeamID"`
	TeamID uint    `json:"teamid" `
	Points float64 `json:"points" `
}
