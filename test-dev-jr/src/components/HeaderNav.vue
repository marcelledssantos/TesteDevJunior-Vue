<template>
  <header class="header">
    <nav class="breadcrumb">
      <a href="javascript:void(0);" @click="irParaHome">Home</a>
      <a href="javascript:void(0);" @click="carregarSubestacoes">Subestações</a>
      <a href="javascript:void(0);">{{ ultimaPagina }}</a>
    </nav>
  </header>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'HeaderNav',
  props: {
    ultimaPagina: {
      type: String,
      required: true,
    },
  },
  setup() {
    const router = useRouter()

    const irParaHome = () => {
      router.push('/')
    }

    const carregarSubestacoes = async () => {
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

    return {
      irParaHome,
      carregarSubestacoes,
    }
  },
})
</script>

<style scoped>
.header {
  text-align: left;
  padding: 10px;
  margin-bottom: 20px;
  background-color: rgba(211, 211, 211, 0.2);
  width: 25%;
  height: 2vh;
  margin-left: 19%;
}

.breadcrumb {
  font-size: 0.9rem;
  display: flex;
  gap: 10px;
}

.breadcrumb a {
  color: #007bff;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.breadcrumb a:hover {
  background-color: #e0e0e0;
}

.breadcrumb a:last-child {
  color: #555;
  font-weight: bold;
  pointer-events: none;
}
</style>
