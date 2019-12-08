FROM golang:1.12 AS builder

WORKDIR /app

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a

FROM scratch
COPY --from=builder /app .

EXPOSE 1323
ENTRYPOINT ["./hungover-games"]

