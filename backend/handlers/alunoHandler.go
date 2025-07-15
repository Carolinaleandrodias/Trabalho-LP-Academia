package handlers

import (
	"backend/database"
	"backend/models"
	"encoding/json"
	"net/http"
	"strconv"
)

func ListAlunos(w http.ResponseWriter, r *http.Request) {
	alunos, err := database.GetAlunos()
	if err != nil {
		http.Error(w, "Erro ao buscar alunos", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(alunos)
}

func CreateAluno(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}

	var aluno models.Aluno
	if err := json.NewDecoder(r.Body).Decode(&aluno); err != nil {
		http.Error(w, "Dados inválidos", http.StatusBadRequest)
		return
	}

	err := database.CriarAluno(aluno.CPF, aluno.Nome, aluno.Email, aluno.Idade, aluno.Plano, aluno.Ativo)
	if err != nil {
		http.Error(w, "Erro ao criar aluno", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(aluno)
}

func DeleteAluno(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}

	idStr := r.URL.Query().Get("id")
	if idStr == "" {
		http.Error(w, "ID não informado", http.StatusBadRequest)
		return
	}

	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "ID inválido", http.StatusBadRequest)
		return
	}

	err = database.DeletarAluno(id)
	if err != nil {
		http.Error(w, "Erro ao deletar aluno", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
