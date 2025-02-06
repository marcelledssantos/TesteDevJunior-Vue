<template>
  <div class="form-container">
    <fieldset>
      <legend>Subestação</legend>
      <div class="form-group">
        <label for="codigo">Código:</label>
        <input
          type="text"
          id="codigo"
          v-model="subestacao.codigo"
          @input="formatarCodigo"
          placeholder="Digite o código"
          @blur="validarCodigo"
          maxlength="3"
        />
        <p v-if="erroCodigo" class="error-message">{{ erroCodigo }}</p>
      </div>

      <div class="form-group">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" v-model="subestacao.nome" placeholder="Digite o nome" />
      </div>

      <div class="form-group">
        <label for="latitude">Latitude:</label>
        <input
          type="text"
          id="latitude"
          v-model="subestacao.latitude"
          placeholder="Digite a latitude"
        />
      </div>

      <div class="form-group">
        <label for="longitude">Longitude:</label>
        <input
          type="text"
          id="longitude"
          v-model="subestacao.longitude"
          placeholder="Digite a longitude"
        />
      </div>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['atualizarDados'])

const subestacao = ref({
  codigo: '',
  nome: '',
  latitude: '',
  longitude: '',
})

const erroCodigo = ref('')

const formatarCodigo = () => {
  subestacao.value.codigo = subestacao.value.codigo
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .slice(0, 3)
  emit('atualizarDados', subestacao.value)
}

const validarCodigo = () => {
  erroCodigo.value = ''

  if (subestacao.value.codigo.length !== 3) {
    erroCodigo.value = 'O código deve ter exatamente 3 caracteres.'
  }
}
</script>

<style scoped>
.form-container {
  width: 60%;
  margin: 10px auto;
  padding: 15px;
  background: #f8f8f8;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: left;
  color: #555;
}

.form-group {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: bold;
  color: #555;
  margin-bottom: 4px;
}

.form-group input {
  padding: 6px;
  font-size: 0.9rem;
  border: 1px solid #888;
  border-radius: 5px;
  outline: none;
  width: 60%;
}
.error-message {
  color: red;
  font-size: 0.75rem;
  margin-top: 4px;
}
</style>
