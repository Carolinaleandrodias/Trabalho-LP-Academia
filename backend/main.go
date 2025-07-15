package main

import (
	"fmt"
	"log"
	"net/http"

	"backend/database"
	"backend/handlers"
)

func main() {
	database.InitDB()

	http.HandleFunc("/api/alunos", handlers.ListAlunos)
	http.HandleFunc("/api/alunos/create", handlers.CreateAluno)
	http.HandleFunc("/api/alunos/get", handlers.GetAlunoByID)
	http.HandleFunc("/api/alunos/delete", handlers.DeleteAluno)
	http.HandleFunc("/api/alunos/update", handlers.UpdateAluno)
	http.HandleFunc("/api/funcionarios", handlers.ListFuncionarios)
	http.HandleFunc("/api/funcionarios/get", handlers.GetFuncionarioByID)
	http.HandleFunc("/api/funcionarios/create", handlers.CreateFuncionario)
	http.HandleFunc("/api/funcionarios/delete", handlers.DeleteFuncionario)
	http.HandleFunc("/api/funcionarios/update", handlers.UpdateFuncionario)

	fmt.Println("Backend Go rodando na porta 8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
