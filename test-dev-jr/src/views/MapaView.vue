<template>
  <div class="mapa-page">
    <header class="header">
      <nav class="breadcrumb">
        <a href="javascript:void(0);" @click="irParaHome">Home</a>
        <a href="javascript:void(0);" @click="carregarSubestacoes">Subestações</a>
        <a href="javascript:void(0);">Visualização</a>
      </nav>
    </header>
    <fieldset>
      <legend>Subestação</legend>
      <div class="subestacao-details">
        <form class="details-form">
          <label>
            Código:
            <input type="text" :value="codigo" disabled />
          </label>
          <label>
            Nome:
            <input type="text" :value="nome" disabled />
          </label>
          <label>
            Latitude:
            <input type="text" :value="latitude" disabled />
          </label>
          <label>
            Longitude:
            <input type="text" :value="longitude" disabled />
          </label>
        </form>
      </div>

      <div class="map-container">
        <h5>Google Maps</h5>
        <iframe
          v-if="latitude && longitude"
          :src="`https://www.google.com/maps?q=${latitude},${longitude}&hl=pt-br&z=14&output=embed`"
          width="1500"
          height="450"
          style="border: 0"
          :allowfullscreen="true"
          loading="lazy"
        ></iframe>
      </div>

      <button class="back-button" @click="voltar">Voltar</button>
    </fieldset>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default defineComponent({
  name: 'MapaView',
  setup() {
    const route = useRoute()
    const router = useRouter()

    const codigo = ref<string | null>(null)
    const nome = ref<string | null>(null)
    const latitude = ref<number | null>(null)
    const longitude = ref<number | null>(null)

    onMounted(() => {
      codigo.value = route.query.codigo as string
      nome.value = route.query.nome as string
      latitude.value = Number(route.query.latitude)
      longitude.value = Number(route.query.longitude)
    })

    const voltar = async () => {
      try {
        console.log('Iniciando a requisição GET para http://localhost:8080/subestacoes...')

        const response = await axios.get('http://localhost:8080/subestacoes')

        console.log('Resposta recebida:', response.data)

        const subestacoes = response.data

        if (subestacoes) {
          router.push({
            path: '/subestacoes',
            query: {
              data: JSON.stringify(subestacoes),
            },
          })
        }
      } catch (error) {
        console.error('Erro ao realizar o GET:', error)
        alert('Não foi possível carregar os dados das subestações. Verifique a API.')
      }
    }

    return {
      codigo,
      nome,
      latitude,
      longitude,
      voltar,
    }
  },
})
</script>

<style scoped>
.mapa-page {
  font-family: Arial, sans-serif;
  margin: 20px auto;
  width: 80%;
}
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

.mapa-page h5 {
  font-size: 0.5;
  color: #e61b26;
  text-align: center;
}

.subestacao-details {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
}

.details-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.details-form label {
  font-size: 0.9rem;
  font-weight: bold;
  color: #555;
  margin-bottom: 4px;
}

.details-form input {
  flex: 1;
  padding: 6px;
  font-size: 0.9rem;
  border: 1px solid #888;
  border-radius: 5px;
  outline: none;
  width: 100%;
}

.map-container {
  margin-bottom: 20px;
}

.back-button {
  font-size: 0.8rem;
  background-color: #dcdcdc;
  border-radius: 2px;
  cursor: pointer;
  margin-left: 48%;
  height: 3vh;
  width: 5%;
  color: #555;
}
</style>
