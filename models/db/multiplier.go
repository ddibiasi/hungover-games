package db

import (
	"github.com/jinzhu/gorm"
	"time"
)

type Multiplier struct {
	gorm.Model
	Value  int    `json:"total-points" gorm:"not null;default:'1'"`
	StartTime    time.Time     `json:"name" gorm:"not null"`
	EndTime    time.Time     `json:"name" gorm:"not null"`
}
