package main

import (
	"fmt"
	"log"
	"net/http"

	"backend/database"
	"backend/handlers"
)

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func main() {
	database.InitDB()

	mux := http.NewServeMux()
	mux.HandleFunc("/api/login", handlers.Login)
	mux.HandleFunc("/api/usuarios/create", handlers.CreateUsuario)
	mux.HandleFunc("/api/usuarios/delete", handlers.DeleteUsuario)
	mux.HandleFunc("/api/alunos", handlers.ListAlunos)
	mux.HandleFunc("/api/alunos/create", handlers.CreateAluno)
	mux.HandleFunc("/api/alunos/get", handlers.GetAlunoByID)
	mux.HandleFunc("/api/alunos/delete", handlers.DeleteAluno)
	mux.HandleFunc("/api/alunos/update", handlers.UpdateAluno)
	mux.HandleFunc("/api/funcionarios", handlers.ListFuncionarios)
	mux.HandleFunc("/api/funcionarios/get", handlers.GetFuncionarioByID)
	mux.HandleFunc("/api/funcionarios/create", handlers.CreateFuncionario)
	mux.HandleFunc("/api/funcionarios/delete", handlers.DeleteFuncionario)
	mux.HandleFunc("/api/funcionarios/update", handlers.UpdateFuncionario)

	fmt.Println("Backend Go rodando na porta 8080...")
	log.Fatal(http.ListenAndServe(":8080", enableCORS(mux)))
}
