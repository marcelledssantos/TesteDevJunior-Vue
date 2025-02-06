<template>
  <div id="app">
    <header class="app-header">Sistema Teste Desenvolvedor Java - Versão 1.5</header>
    <router-view />
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
}
</script>

<style>
.app-header {
  background-color: #ccc;
  border: 1px solid #333;
  padding: 0 20px;
  font-size: 1.5rem;
  background-color: rgba(211, 211, 211, 0.6);
  text-align: right;
  transform: translate(12.5%);
  top: 50px;
  width: 80%;
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  color: #555;
}
</style>
