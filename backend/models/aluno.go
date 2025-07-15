package models

type Aluno struct {
	ID    int    `json:"id"`
	CPF   string `json:"cpf"`
	Nome  string `json:"nome"`
	Email string `json:"email"`
	Idade int    `json:"idade"`
	Ativo bool   `json:"ativo"`
}
