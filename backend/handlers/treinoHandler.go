package handlers

import (
	"backend/database"
	"backend/models"
	"encoding/json"
	"net/http"
	"strconv"
)

func encontrarTreino(w http.ResponseWriter, nomeDoTreino string) {

	type TreinoPadrao struct {
		Segunda []string `json:"segunda,omitempty"`
		Terca   []string `json:"terca,omitempty"`
		Quarta  []string `json:"quarta,omitempty"`
		Quinta  []string `json:"quinta,omitempty"`
		Sexta   []string `json:"sexta,omitempty"`
	}

	var treinoRetorno TreinoPadrao

	switch nomeDoTreino {
	case "ABC":
		treinoRetorno = TreinoPadrao{
			Segunda: []string{
				"Supino Reto com Barra (4 séries de 8-12 repetições)",
				"Supino Inclinado com Halteres (3 séries de 10-15 repetições)",
				"Crucifixo Reto ou Voador (3 séries de 12-15 repetições)",
				"Tríceps Testa com Barra EZ ou Halteres (3 séries de 10-15 repetições)",
				"Tríceps Corda no Pulley (3 séries de 12-15 repetições)",
				"Paralelas ou Tríceps Banco (3 séries até a falha)",
			},
			Terca: []string{
				"Puxada Alta (Lat Pulldown) (4 séries de 8-12 repetições)",
				"Remada Curvada com Barra (3 séries de 10-15 repetições)",
				"Remada Sentada (Cabo) (3 séries de 12-15 repetições)",
				"Hiperextensão Lombar (3 séries de 12-15 repetições)",
				"Rosca Direta com Barra (3 séries de 10-15 repetições)",
				"Rosca Alternada com Halteres (3 séries de 12-15 repetições)",
				"Rosca Concentrada (3 séries de 12-15 repetições)",
			},
			Quarta: []string{
				"Agachamento Livre (Barra) (4 séries de 8-12 repetições)",
				"Leg Press (3 séries de 10-15 repetições)",
				"Cadeira Extensora (3 séries de 12-15 repetições)",
				"Mesa Flexora (Cadeira Flexora) (3 séries de 12-15 repetições)",
				"Afundo com Halteres ou Passada (3 séries de 10-12 repetições por perna)",
				"Elevação de Panturrilhas em Pé (4 séries de 15-20 repetições)",
				"Desenvolvimento com Halteres (Sentado ou em Pé) (3 séries de 10-15 repetições)",
				"Elevação Lateral com Halteres (3 séries de 12-15 repetições)",
			},
			Quinta: []string{
				"Supino Inclinado com Barra (4 séries de 8-12 repetições)",
				"Supino Reto com Halteres (3 séries de 10-15 repetições)",
				"Crossover no Cabo (3 séries de 12-15 repetições)",
				"Tríceps Francês com Halteres (3 séries de 10-15 repetições)",
				"Extensão de Tríceps Overhead com Corda (3 séries de 12-15 repetições)",
			},
			Sexta: []string{
				"Remada Cavalinho (4 séries de 8-12 repetições)",
				"Barra Fixa ou Puxada no Pulley com Pegada Supinada (3 séries de 8-12 repetições)",
				"Remada Unilateral com Halteres (Serrote) (3 séries de 10-12 repetições por lado)",
				"Rosca Scott (3 séries de 10-15 repetições)",
				"Rosca Martelo (3 séries de 12-15 repetições)",
			},
		}
	case "ABCDE":
		treinoRetorno = TreinoPadrao{
			Segunda: []string{
				"Supino Reto com Barra (4 séries de 8-12 repetições)",
				"Supino Inclinado com Halteres (3 séries de 10-15 repetições)",
				"Crucifixo Reto ou Voador (3 séries de 12-15 repetições)",
				"Crossover no Cabo (3 séries de 12-15 repetições)",
				"Supino Declinado com Barra ou Halteres (3 séries de 8-12 repetições)",
				"Flexões (Push-ups) (3 séries até a falha)",
			},
			Terca: []string{
				"Puxada Alta (Lat Pulldown) (4 séries de 8-12 repetições)",
				"Remada Curvada com Barra (3 séries de 10-12 repetições)",
				"Remada Sentada (Cabo) (3 séries de 10-15 repetições)",
				"Remada Unilateral com Halteres (Serrote) (3 séries de 10-12 repetições por lado)",
				"Pullover com Halteres ou Cabo (3 séries de 12-15 repetições)",
				"Hiperextensão Lombar (3 séries de 12-15 repetições)",
				"Levantamento Terra (3 séries de 6-10 repetições - com peso adequado)",
			},
			Quarta: []string{
				"Agachamento Livre (Barra) (4 séries de 8-12 repetições)",
				"Leg Press (3 séries de 10-15 repetições)",
				"Cadeira Extensora (3 séries de 12-15 repetições)",
				"Mesa Flexora (Cadeira Flexora) (3 séries de 12-15 repetições)",
				"Afundo com Halteres ou Passada (3 séries de 10-12 repetições por perna)",
				"Elevação de Panturrilhas em Pé (4 séries de 15-20 repetições)",
				"Elevação de Panturrilhas Sentado (3 séries de 15-20 repetições)",
			},
			Quinta: []string{
				"Desenvolvimento com Halteres (Sentado ou em Pé) (3 séries de 10-15 repetições)",
				"Elevação Lateral com Halteres (3 séries de 12-15 repetições)",
				"Elevação Frontal com Halteres ou Anilha (3 séries de 12-15 repetições)",
				"Encolhimento com Halteres ou Barra (para Trapézio) (3 séries de 12-15 repetições)",
				"Prancha (3 séries de 30-60 segundos)",
				"Abdominal Remador (3 séries de 15-20 repetições)",
			},
			Sexta: []string{
				"Rosca Direta com Barra (4 séries de 8-12 repetições)",
				"Rosca Alternada com Halteres (3 séries de 10-15 repetições)",
				"Rosca Scott (3 séries de 10-15 repetições)",
				"Rosca Martelo (3 séries de 12-15 repetições)",
				"Tríceps Testa com Barra EZ ou Halteres (4 séries de 8-12 repetições)",
				"Tríceps Corda no Pulley (3 séries de 10-15 repetições)",
				"Extensão de Tríceps Overhead com Halteres (3 séries de 12-15 repetições)",
				"Paralelas ou Tríceps Banco (3 séries até a falha)",
			},
		}
	case "FULLBODY":
		treinoRetorno = TreinoPadrao{
			Segunda: []string{
				"Agachamento Livre (3 séries de 8-12 repetições)",
				"Supino Reto com Barra (3 séries de 8-12 repetições)",
				"Remada Curvada com Barra (3 séries de 8-12 repetições)",
				"Desenvolvimento com Halteres (3 séries de 10-15 repetições)",
				"Prancha (3 séries de 30-60 segundos)",
			},
			Terca: []string{
				"Descanso",
			},
			Quarta: []string{
				"Leg Press (3 séries de 10-15 repetições)",
				"Puxada Alta (Lat Pulldown) (3 séries de 10-15 repetições)",
				"Mesa Flexora (3 séries de 12-15 repetições)",
				"Supino Inclinado com Halteres (3 séries de 10-15 repetições)",
				"Elevação de Panturrilhas (3 séries de 15-20 repetições)",
			},
			Quinta: []string{
				"Descanso",
			},
			Sexta: []string{
				"Levantamento Terra (3 séries de 6-10 repetições)",
				"Paralelas (3 séries até a falha) ou Supino Declinado",
				"Barra Fixa (3 séries até a falha) ou Remada Sentada",
				"Cadeira Extensora (3 séries de 12-15 repetições)",
				"Abdominal Remador (3 séries de 15-20 repetições)",
			},
		}
	default:
		http.Error(w, "Treino não encontrado.", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(treinoRetorno)
}

func GetTreinoByCpf(w http.ResponseWriter, r *http.Request) {

	cpfStr := r.URL.Query().Get("cpf")
	if cpfStr == "" {
		http.Error(w, "CPF não informado", http.StatusBadRequest)
		return
	}

	cpf, err := strconv.Atoi(cpfStr)
	if err != nil {
		http.Error(w, "CPF inválido", http.StatusBadRequest)
		return
	}

	treino, err := database.BuscarTreino(cpf)
	if err != nil {
		http.Error(w, "Erro ao buscar treino", http.StatusInternalServerError)
		return
	}

	encontrarTreino(w, treino)

}

func CreateTreino(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}

	var treino models.Treino
	if err := json.NewDecoder(r.Body).Decode(&treino); err != nil {
		http.Error(w, "Dados inválidos", http.StatusBadRequest)
		return
	}

	err := database.CriarTreino(treino.CPF, treino.Treino)
	if err != nil {
		http.Error(w, "Erro ao criar treino", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
