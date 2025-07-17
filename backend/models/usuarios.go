package models

type Usuario struct {
	ID      int    `json:"id"`
	Usuario string `json:"usuario"`
	Senha   string `json:"senha"`
}
