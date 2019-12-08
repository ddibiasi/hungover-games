package db

import (
	"github.com/jinzhu/gorm"
)

type Team struct {
	gorm.Model
	TotalPoints  int    `json:"total-points" gorm:"not null;default:'0'"`
	Name    string     `json:"name" gorm:"not null"`
}
