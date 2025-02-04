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
            <font-awesome-icon :icon="['fas', 'globe']" class="icon" />
          </td>
        </tr>
      </tbody>
    </table>

    <div class="button-container">
      <ButtonComponent label="Incluir" @click="irParaCadastro" />
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

    const irParaCadastro = () => {
      router.push('/cadastrar-subestacao')
    }

    return {
      subestacoes,
      irParaCadastro,
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
  margin-top: 50vh;
  transform: translateY(-50%);
}

h6 {
  margin-bottom: 10px;
  font-size: 0.9rem;
  color: #555;
  text-align: left;
  width: 60%;
  padding-left: 10px;
}
.subestacao-table thead {
  background-color: #ccc;
}

.subestacao-table {
  width: 60%;
  border-collapse: collapse;
  font-size: 0.7rem;
}

.subestacao-table th,
.subestacao-table td {
  border: 1px solid black;
  padding: 6px;
  text-align: left;
  color: #555;
}

.subestacao-table th:nth-child(1),
.subestacao-table td:nth-child(1),
.subestacao-table th:nth-child(4),
.subestacao-table td:nth-child(4),
.subestacao-table th:nth-child(5),
.subestacao-table td:nth-child(5) {
  width: 15%;
}

.delete-btn {
  background: none;
  border: none;
  color: #555;
  font-size: 0.6rem;
  cursor: pointer;
  padding: 0;
  text-decoration: none;
}

.delete-btn:hover {
  text-decoration: underline;
}

.icon {
  cursor: pointer;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  width: 60%;
  margin-top: 8px;
  margin-left: auto;
  margin-right: auto;
}

.button-container button {
  width: 100px;
  height: 20px;
  font-size: 0.7rem;
  color: #555;
  padding: 6px 10px;
  position: relative;
  transition: all 0.2s ease-in-out;
  box-shadow:
    3px 3px 5px rgba(0, 0, 0, 0.2),
    -3px -3px 5px rgba(255, 255, 255, 0.5);
}
</style>
