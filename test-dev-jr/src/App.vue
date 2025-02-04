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
  border: 2px solid #333;
  padding: 0 20px;
  font-size: 1.5rem;
  color: #333;
  text-align: right;
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 8%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 1000;
  box-sizing: border-box;
}
</style>
