package handlers

import (
	"backend/database"
	"backend/models"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

func Login(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}

	var usuario models.Usuario
	if err := json.NewDecoder(r.Body).Decode(&usuario); err != nil {
		http.Error(w, "Dados inválidos", http.StatusBadRequest)
		return
	}

	user, err := database.AutenticarUsuario(usuario.Usuario, usuario.Senha)
	if err != nil {
		http.Error(w, "Usuário ou senha inválidos", http.StatusUnauthorized)
		return
	}

	json.NewEncoder(w).Encode(user.Usuario)
}

func CreateUsuario(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}

	var usuario models.Usuario
	if err := json.NewDecoder(r.Body).Decode(&usuario); err != nil {
		http.Error(w, "Dados inválidos", http.StatusBadRequest)
		return
	}

	err := database.CriarUsuario(usuario.Usuario, usuario.Senha)
	if err != nil {
		http.Error(w, "Erro ao criar usuário", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(usuario)
}

func DeleteUsuario(w http.ResponseWriter, r *http.Request) {
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

	err = database.DeletarUsuario(id)
	if err != nil {
		http.Error(w, "Erro ao deletar funcionário", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
	fmt.Printf("Usuário %d deletado \n", id)
}
