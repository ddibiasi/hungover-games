package db

import (
	"github.com/jinzhu/gorm"
)

type Team struct {
	gorm.Model
	Name           string `json:"name" gorm:"not null"`
	Orders         []Order
	CumulativeSums []CumulatedOrders
}
