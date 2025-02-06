<template>
  <div class="inclusao-page">
    <HeaderNav ultimaPagina="Inclusão" />
    <div class="forms-container">
      <SubestacaoForm @atualizarDados="atualizarSubestacao" />

      <RedeMTForm @atualizarRedes="atualizarRedesMT" />
    </div>

    <div class="buttons">
      <ButtonComponent label="Cancelar" @click="cancelarInclusao" />
      <ButtonComponent label="Incluir" type="submit" @click="incluirSubestacao" />
    </div>

    <div v-if="mensagem" class="mensagem" :class="mensagemTipo">
      {{ mensagem }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import ButtonComponent from '@/components/ButtonComponent.vue'
import SubestacaoForm from '@/components/SubestacaoForm.vue'
import RedeMTForm from '@/components/RedeMTForm.vue'
import HeaderNav from '@/components/HeaderNav.vue'

const router = useRouter()
const mensagem = ref('')
const mensagemTipo = ref('')

const subestacao = ref({
  codigo: '',
  nome: '',
  latitude: '',
  longitude: '',
})

const redesMT = ref<Array<{ codigo: string; nome: string }>>([])

const atualizarSubestacao = (dados: any) => {
  subestacao.value = dados
}

const atualizarRedesMT = (dados: any) => {
  redesMT.value = dados
}

const incluirSubestacao = async () => {
  try {
    const dadosParaEnviar = {
      codigo: subestacao.value.codigo,
      nome: subestacao.value.nome,
      latitude: subestacao.value.latitude,
      longitude: subestacao.value.longitude,
      redes: redesMT.value,
    }

    const response = await axios.post('http://localhost:8080/entrada', dadosParaEnviar)

    if (response.status === 200) {
      mensagem.value = 'Subestação e redes MT cadastradas com sucesso!'
      mensagemTipo.value = 'sucesso'

      subestacao.value = { codigo: '', nome: '', latitude: '', longitude: '' }
      redesMT.value = []
      setTimeout(() => {
        window.location.reload()
      }, 5000)
    }
  } catch (error: any) {
    console.error('Erro ao efetivar inclusão:', error)

    if (error.response && error.response.status === 400) {
      mensagem.value = error.response.data.message || 'Código já existe.'
    } else {
      mensagem.value = 'Erro ao incluir a subestação. Verifique os dados e tente novamente.'
      setTimeout(() => {
        window.location.reload()
      }, 5000)
    }
    mensagemTipo.value = 'erro'
  }
}
const cancelarInclusao = async () => {
  if (confirm('Deseja realmente cancelar? As alterações serão perdidas.')) {
    try {
      const response = await axios.get('http://localhost:8080/subestacoes')

      if (response.status === 200) {
        router.push({
          path: '/subestacoes',
          query: { data: JSON.stringify(response.data) },
        })
      } else {
        alert('Erro ao buscar as subestações. Tente novamente.')
      }
    } catch (error) {
      console.error('Erro ao buscar subestações:', error)
      alert('Erro ao conectar ao servidor.')
    }
  }
}
</script>
<style scoped>
.inclusao-page {
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  min-height: 100vh;
  border: 1px solid #555;
  border-radius: 10px;
  margin: 20px auto;
  width: 80%;

  background-color: #f9f9f9;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
.forms-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

fieldset {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

legend {
  font-weight: bold;
  color: #333;
  padding: 0 10px;
}

.buttons {
  display: flex;
  width: 50%;
  margin-left: 40%;
  margin-top: 5%;
}

button:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.mensagem {
  border-radius: 5px;
  text-align: center;
  font-size: 0.9rem;
  padding: 10px;
}

.sucesso {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  padding: 10px 15px;
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  z-index: 1000;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  text-align: center;
  opacity: 1;
  animation: fadeOut 10s ease-out forwards;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  99% {
    opacity: 0.01;
  }
  100% {
    opacity: 0;
    display: none;
  }
}

.erro {
  background-color: red;
  color: white;
  border: 1px solid red;
  padding: 10px 15px;
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  z-index: 1000;
  max-width: 80%;
  text-align: center;
  opacity: 1;
  animation: fadeOut 5s ease-out forwards;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  99% {
    opacity: 0.01;
  }
  100% {
    opacity: 0;
    display: none;
  }
}
</style>
