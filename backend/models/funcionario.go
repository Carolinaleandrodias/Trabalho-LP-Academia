package models

type Funcionario struct {
	ID     int    `json:"id"`
	Codigo int    `json:"codigo"`
	CPF    string `json:"cpf"`
	Nome   string `json:"nome"`
	Turno  string `json:"turno"`
}
