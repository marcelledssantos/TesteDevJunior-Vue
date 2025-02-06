<template>
  <div v-if="redes.length > 0" class="table-container">
    <fieldset>
      <legend>Redes MT Adicionadas</legend>

      <table class="tabela-redes">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(rede, index) in redes" :key="index">
            <td>{{ rede.codigo }}</td>
            <td>{{ rede.nome }}</td>
            <td>
              <button class="delete-btn" type="button" @click="removerRede(index)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{ redes: Array<{ codigo: string; nome: string }> }>()
const emit = defineEmits(['removerRede'])

const removerRede = (index: number) => {
  emit('removerRede', index)
}
</script>
<style>
.table-container {
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #555;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 1200px;
}

fieldset {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  background-color: #fff;
}

legend {
  font-weight: bold;
  color: #333;
  font-size: 1.1rem;
  padding: 0 10px;
}

.tabela-redes {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}
.tabela-redes th,
.tabela-redes td {
  text-align: left;
  padding: 10px;
  border: 1px solid #ccc;
}
.tabela-redes th {
  background-color: #ccc;
  color: #333;
  font-size: 0.8rem;
}

.tabela-redes td {
  font-size: 0.9rem;
  color: #555;
}

.delete-btn {
  color: #555;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.delete-btn:hover {
  background-color: white;
}
.footer-buttons button {
  padding: 5px 15px;
  font-size: 0.6rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.footer-buttons button:hover {
  background-color: #e0e0e0;
}
</style>
