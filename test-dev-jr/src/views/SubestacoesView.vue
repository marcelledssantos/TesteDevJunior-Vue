<template>
  <div>
    <h1>Subestações</h1>
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Nome</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="subestacao in subestacoes" :key="subestacao.codigo">
          <td>{{ subestacao.codigo }}</td>
          <td>{{ subestacao.nome }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "SubestacoesView",
  data() {
    return {
      subestacoes: [], // Armazena as subestações
    };
  },
  created() {
    const data = this.$route.query.data;
    if (data) {
      this.subestacoes = JSON.parse(data); // Recebe os dados da rota
    }
  },
};
</script>




