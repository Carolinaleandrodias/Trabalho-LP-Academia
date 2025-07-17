package handlers

import (
	"backend/database"
	"backend/models"
	"encoding/json"
	"net/http"
	"strconv"
)

func ListFuncionarios(w http.ResponseWriter, r *http.Request) {
	funcionarios, err := database.GetFuncionarios()
	if err != nil {
		http.Error(w, "Erro ao buscar funcionários", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(funcionarios)
}

func GetFuncionarioByID(w http.ResponseWriter, r *http.Request) {
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

	funcionario, err := database.BuscarFuncionarioPorID(id)
	if err != nil {
		http.Error(w, "Funcionário não encontrado", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(funcionario)
}

func CreateFuncionario(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}

	var funcionario models.Funcionario
	if err := json.NewDecoder(r.Body).Decode(&funcionario); err != nil {
		http.Error(w, "Dados inválidos", http.StatusBadRequest)
		return
	}

	err := database.CriarFuncionario(funcionario.Codigo, funcionario.CPF, funcionario.Nome, funcionario.Turno)
	if err != nil {
		http.Error(w, "Erro ao criar funcionário", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(funcionario)
}

func DeleteFuncionario(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}

	codStr := r.URL.Query().Get("codigo")
	if codStr == "" {
		http.Error(w, "Codigo não informado", http.StatusBadRequest)
		return
	}

	codigo, err := strconv.Atoi(codStr)
	if err != nil {
		http.Error(w, "Codigo inválido", http.StatusBadRequest)
		return
	}

	err = database.DeletarFuncionario(codigo)
	if err != nil {
		http.Error(w, "Erro ao deletar funcionário", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func UpdateFuncionario(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}

	var funcionario models.Funcionario
	if err := json.NewDecoder(r.Body).Decode(&funcionario); err != nil {
		http.Error(w, "Dados inválidos", http.StatusBadRequest)
		return
	}

	err := database.AtualizarFuncionario(funcionario)
	if err != nil {
		http.Error(w, "Erro ao atualizar funcionário", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(funcionario)
}
