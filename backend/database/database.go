package database

import (
	"database/sql"
	"log"

	"backend/models"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func InitDB() {
	var err error
	DB, err = sql.Open("sqlite3", "database/app.db")
	if err != nil {
		log.Fatalf("Erro ao abrir o banco: %v", err)
	}
	err = DB.Ping()
	if err != nil {
		log.Fatalf("Erro ao conectar no banco: %v", err)
	}

	// _, err = DB.Exec("DROP TABLE IF EXISTS alunos")
	// if err != nil {
	// 	log.Fatalf("Erro ao excluir tabela: %v", err)
	// }

	createTable := `
    CREATE TABLE IF NOT EXISTS alunos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cpf TEXT NOT NULL UNIQUE,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        idade INTEGER NOT NULL,
        Plano TEXT NOT NULL,
        ativo BOOLEAN NOT NULL
    );`
	_, err = DB.Exec(createTable)
	if err != nil {
		log.Fatal(err)
	}
}
func GetAlunos() ([]models.Aluno, error) {
	rows, err := DB.Query("SELECT id, cpf, nome, email, idade, plano, ativo FROM alunos")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var alunos []models.Aluno
	for rows.Next() {
		var a models.Aluno
		err := rows.Scan(&a.ID, &a.CPF, &a.Nome, &a.Email, &a.Idade, &a.Plano, &a.Ativo)
		if err != nil {
			return nil, err
		}
		alunos = append(alunos, a)
	}
	return alunos, nil
}

func CriarAluno(cpf, nome, email string, idade int, plano string, ativo bool) error {
	_, err := DB.Exec(
		"INSERT INTO alunos (cpf, nome, email, idade, plano, ativo) VALUES (?, ?, ?, ?, ?, ?)",
		cpf, nome, email, idade, plano, ativo,
	)
	return err
}

func DeletarAluno(id int) error {
	_, err := DB.Exec("DELETE FROM alunos WHERE id = ?", id)
	return err
}
