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
	http.HandleFunc("/api/alunos/delete", handlers.DeleteAluno)

	fmt.Println("Backend Go rodando na porta 8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
