package web

type Response struct {
	Message string `json:"message,omitempty"`
	Error   string `json:"error,omitempty"`
}
