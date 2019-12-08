package utils

import (
	"github.com/labstack/echo"
	"html/template"
	"io"
)

type Template struct {
	Templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.Templates.ExecuteTemplate(w, name, data)
}
