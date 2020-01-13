package models

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	dbModels "hungover-games/models/db"
	"log"
	"sync"
)

var USE_TCP_FLAG = true

const DbUser = "docker"
const DbPw = "docker"
const DbName = "hungover_db"

var (
	db   *gorm.DB
	once sync.Once
)

/**
Singleton
*/
func Db() *gorm.DB {
	once.Do(setupDb)
	return db
}

func setupDb() {
	connectionString := DbUser + ":" + DbPw + "@tcp(db:3306)/" + DbName + "?charset=utf8&parseTime=True&loc=Local"
	if !USE_TCP_FLAG {
		connectionString = DbUser + ":" + DbPw + "@/" + DbName + "?charset=utf8&parseTime=True&loc=Local"
	}
	database, err := gorm.Open("mysql", connectionString)
	if err != nil {
		log.Fatalln("Failed to init db:", err)
	}
	db = database
	// Migrate the schema
	db.AutoMigrate(&dbModels.Team{})
	db.AutoMigrate(&dbModels.Order{})
	db.AutoMigrate(&dbModels.CumulatedOrders{})
	populateDb()
}

func populateDb() {
	teams := [8]string{"AC", "HSD", "KWM", "MTD", "MBI", "MC", "SI", "SE"}
	for _, name := range teams {
		team := dbModels.Team{Name: name}
		db.Where(team).FirstOrCreate(&team)
	}
}
