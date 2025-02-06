<template>
  <div class="subestacao-page">
    <h6>Subestações</h6>

    <table class="subestacao-table">
      <thead>
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th>Excluir</th>
          <th>Alterar</th>
          <th>Exibir no Mapa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="subestacao in subestacoes" :key="subestacao.codigo">
          <td>{{ subestacao.codigo }}</td>
          <td>{{ subestacao.nome }}</td>
          <td>
            <button class="delete-btn">Excluir</button>
          </td>
          <td>
            <font-awesome-icon :icon="['fas', 'pen']" class="icon" />
          </td>
          <td>
            <font-awesome-icon
              :icon="['fas', 'globe']"
              class="icon mapa-icon"
              @click="exibirNoMapa(subestacao)"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <div class="button-container">
      <ButtonComponent label="Incluir" @click="irParaInclusao" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ButtonComponent from '@/components/ButtonComponent.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPen, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPen, faGlobe)

interface Subestacao {
  codigo: string
  nome: string
  latitude?: number
  longitude?: number
}

export default defineComponent({
  name: 'SubestacaoView',
  components: {
    ButtonComponent,
    FontAwesomeIcon,
  },
  setup() {
    const subestacoes = ref<Subestacao[]>([])
    const router = useRouter()
    const route = useRoute()

    if (route.query.data) {
      subestacoes.value = JSON.parse(route.query.data as string)
    }

    const irParaInclusao = () => {
      router.push('/inclusao')
    }

    const exibirNoMapa = (subestacao: Subestacao) => {
      if (!subestacao.latitude || !subestacao.longitude) {
        alert('Coordenadas não disponíveis para essa subestação.')
        return
      }

      router.push({
        path: '/mapa',
        query: {
          codigo: subestacao.codigo,
          nome: subestacao.nome,
          latitude: subestacao.latitude,
          longitude: subestacao.longitude,
        },
      })
    }

    return {
      subestacoes,
      irParaInclusao,
      exibirNoMapa,
    }
  },
})
</script>

<style scoped>
.subestacao-page {
  width: 60%;
  margin: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h6 {
  margin-bottom: 10px;
  font-size: 0.9rem;
  color: #555;
  text-align: left;
  width: 60%;
  padding-left: 10px;
}

.subestacao-table {
  width: 60%;
  border-collapse: collapse;
  font-size: 0.7rem;
}

.subestacao-table thead {
  background-color: #ccc;
}

.subestacao-table th,
.subestacao-table td {
  border: 1px solid black;
  padding: 6px;
  text-align: left;
  color: #555;
}

.icon {
  cursor: pointer;
}

.mapa-icon:hover {
  color: blue;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  width: 60%;
  margin-top: 8px;
}
</style>
