package utils

import (
	"fmt"
	"hungover-games/models"
	"hungover-games/models/db"
	"time"
)

var (
	ticker *time.Ticker
	done   chan bool
)

func StartCumulator() {
	ticker = time.NewTicker(5 * time.Minute)
	done = make(chan bool)
	go func() {
		for {
			select {
			case <-done:
				return
			case t := <-ticker.C:
				fmt.Println("Calculating cumulative sum", t)
				results := GetCurPoints()
				for _, element := range results {
					c := new(db.CumulatedOrders)
					c.TeamID = element.TeamID
					c.CumulatedPoints = element.TotalPoints
					models.Db().Create(c)
				}
			}
		}
	}()
	fmt.Println("Ticker started")
}

func StopCumulator() {
	ticker.Stop()
	done <- true
	fmt.Println("Ticker stopped")
}
