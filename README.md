# Hungover Games Infrastructure
This project has been created in a *very short amount
of time*, for a very specific use case. Please do not consider
it best practise.

Backend written in GoLang.

Frontend powered by chart.js.

Fully dockerized.

## Routes:
### Add order
[localhost:1323/api/order](localhost:1323/api/order)
POST
{
teamid: x,
points: x
}

### Add team
[localhost:1323/api/team](localhost:1323/api/team)
POST
{
name: x
}

### Total points of all teams
GET [localhost:1323/api/points](localhost:1323/api/points)

### Every order for each team
GET [localhost:1323/api/points/detailed](localhost:1323/api/points/detailed)

### Cumulative order sum over time for each team
GET [localhost:1323/api/timeline](localhost:1323/api/points/timeline)

### Statistic Frontend
[http://localhost:1323/drunken/index.html](http://localhost:1323/drunken/index.html)
Automatically cycles through three different views.




### 5%? Open Source it is.
