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
              <button class="delete-btn" type="button" @click="removerRede(index)">
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

// 🔥 Recebe a lista de redes em memória
const props = defineProps<{ redes: Array<{ codigo: string; nome: string }> }>();
const emit = defineEmits(["removerRede"]);

const removerRede = (index: number) => {
  emit("removerRede", index);
};
</script>

