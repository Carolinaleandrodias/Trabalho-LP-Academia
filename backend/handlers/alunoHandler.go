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

func GetAlunoByID(w http.ResponseWriter, r *http.Request) {
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

	aluno, err := database.BuscarAlunoPorID(id)
	if err != nil {
		http.Error(w, "Aluno não encontrado", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(aluno)
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

func UpdateAluno(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}

	var aluno models.Aluno
	if err := json.NewDecoder(r.Body).Decode(&aluno); err != nil {
		http.Error(w, "Dados inválidos", http.StatusBadRequest)
		return
	}

	err := database.AtualizarAluno(aluno)
	if err != nil {
		http.Error(w, "Erro ao atualizar aluno", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(aluno)
}

func GetAtivos(w http.ResponseWriter, r *http.Request) {
	alunosAtivos, err := database.AlunosAtivos()
	if err != nil {
		http.Error(w, "Erro ao buscar os alunos ativos", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(alunosAtivos)
}

func GetInativos(w http.ResponseWriter, r *http.Request) {
	alunosInativos, err := database.AlunosInativos()
	if err != nil {
		http.Error(w, "Erro ao buscar os alunos inativos", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(alunosInativos)
}
