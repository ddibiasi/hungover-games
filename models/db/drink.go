package db

import (
	"github.com/jinzhu/gorm"
)

type Drink struct {
	gorm.Model
	Points  int    `json:"points" gorm:"not null;default:'1'"`
	Name    string     `json:"name" gorm:"not null"`
}
