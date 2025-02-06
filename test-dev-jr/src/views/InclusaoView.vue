<template>
  <div class="inclusao-page">
    <!-- Cabeçalho -->
    <header class="header">
      <nav class="breadcrumb">
  <a href="javascript:void(0);" @click="irParaHome">Home</a> /
  <a href="javascript:void(0);" @click="carregarSubestacoes">Subestação</a> /
  Inclusão
</nav>

    </header>

    <!-- Formulários -->
    <div class="forms-container">
      <fieldset>
        <legend>Subestação</legend>
        <SubestacaoForm @atualizarDados="atualizarSubestacao" />
      </fieldset>

      <fieldset>
        <legend>Rede MT</legend>
        <RedeMTForm @atualizarRedes="atualizarRedesMT" />
      </fieldset>
    </div>

    <!-- Botões de Ação -->
    <div class="buttons">
      <ButtonComponent label="Cancelar" @click="cancelarInclusao" />
      <ButtonComponent label="Incluir" type="submit" @click="incluirSubestacao" />
    </div>

    <!-- Mensagem de Sucesso ou Erro -->
    <div v-if="mensagem" class="mensagem" :class="mensagemTipo">
      {{ mensagem }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import ButtonComponent from "@/components/ButtonComponent.vue";
import SubestacaoForm from "@/components/SubestacaoForm.vue";
import RedeMTForm from "@/components/RedeMTForm.vue";

const router = useRouter();
const mensagem = ref("");
const mensagemTipo = ref("");

// 🔥 Estado para armazenar os dados em memória antes do POST
const subestacao = ref({
  codigo: "",
  nome: "",
  latitude: "",
  longitude: "",
});

const redesMT = ref<Array<{ codigo: string; nome: string }>>([]);

// 🔥 Atualizar os dados da subestação ao receber do formulário
const atualizarSubestacao = (dados: any) => {
  subestacao.value = dados;
};

// 🔥 Atualizar as redes ao receber do formulário
const atualizarRedesMT = (dados: any) => {
  redesMT.value = dados;
};

// 🔥 Função para incluir os dados no banco de dados apenas ao clicar em "Incluir"
const incluirSubestacao = async () => {
  try {
    const dadosParaEnviar = {
      codigo: subestacao.value.codigo,
      nome: subestacao.value.nome,
      latitude: subestacao.value.latitude,
      longitude: subestacao.value.longitude,
      redes: redesMT.value, // 🔥 Corrigido: agora está correto
    };

    const response = await axios.post("http://localhost:8080/entrada", dadosParaEnviar);

    if (response.status === 200) {
      mensagem.value = "Subestação e redes MT cadastradas com sucesso!";
      mensagemTipo.value = "sucesso";

      // 🔥 Limpa os dados em memória após salvar no banco
      subestacao.value = { codigo: "", nome: "", latitude: "", longitude: "" };
      redesMT.value = [];
    }
  } catch (error: any) {
    console.error("Erro ao efetivar inclusão:", error);

    if (error.response && error.response.status === 400) {
      mensagem.value = error.response.data.message || "Código já existe.";
    } else {
      mensagem.value = "Erro ao incluir a subestação. Verifique os dados e tente novamente.";
    }

    mensagemTipo.value = "erro";
  }
};

// 🔥 Carregar subestações ao clicar no menu "Subestação"
const carregarSubestacoes = async () => {
  try {
    const response = await axios.get("http://localhost:8080/subestacoes");

    if (response.status === 200) {
      router.push({
        path: "/subestacoes",
        query: { data: JSON.stringify(response.data) },
      });
    } else {
      alert("Erro ao buscar as subestações. Tente novamente.");
    }
  } catch (error) {
    console.error("Erro ao buscar subestações:", error);
    alert("Erro ao conectar ao servidor.");
  }
};

// 🔥 Redirecionar para a Home ao clicar no menu "Home"
const irParaHome = () => {
  window.location.href = "/"; // Redireciona para a raiz do servidor
};

// 🔥 Função para cancelar e voltar para a lista sem salvar
const cancelarInclusao = async () => {
  if (confirm("Deseja realmente cancelar? As alterações serão perdidas.")) {
    try {
      const response = await axios.get("http://localhost:8080/subestacoes");

      if (response.status === 200) {
        router.push({
          path: "/subestacoes",
          query: { data: JSON.stringify(response.data) },
        });
      } else {
        alert("Erro ao buscar as subestações. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao buscar subestações:", error);
      alert("Erro ao conectar ao servidor.");
    }
  }
};
</script>
<style scoped>

/* Estilização geral */
.inclusao-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
  height: 100vh;
  overflow: hidden;
}

/* Cabeçalho */
.header {
  text-align: center;
}

.breadcrumb {
  margin-top: 5px;
  font-size: 0.9rem;
}

.breadcrumb a {
  color: #007bff;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

/* Formulários */
.forms-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

fieldset {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 5px;
}

legend {
  font-weight: bold;
  color: #333;
}

/* Botões de ação */
.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  position: sticky; 
  bottom: 10px;
  background-color: white; 
  padding: 10px;
  border-top: 1px solid #ccc;
}

button:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Mensagem de sucesso ou erro */
.mensagem {
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  font-size: 0.9rem;
}

.sucesso {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.erro {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>
