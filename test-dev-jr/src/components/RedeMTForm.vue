<template>
  <div class="form-container">
    <fieldset>
      <legend>Rede MT</legend>

      <div class="form-group">
        <label for="codigoRede">Código:</label>
        <input
          type="text"
          id="codigoRede"
          v-model="rede.codigo"
          @input="formatarCodigoRede"
          placeholder="Digite o código (até 3 caracteres)"
          @blur="validarCodigo"
          maxlength="3"
        />
        <p v-if="erroCodigo" class="error-message">{{ erroCodigo }}</p>
      </div>

      <div class="form-group">
        <label for="nomeRede">Nome:</label>
        <input
          type="text"
          id="nomeRede"
          v-model="rede.nome"
          placeholder="Digite o nome"
          @blur="validarNome"
        />
        <p v-if="erroNome" class="error-message">{{ erroNome }}</p>
      </div>

      <div class="button-group">
        <button @click="adicionarRede" :disabled="!!erroCodigo || !!erroNome">Adicionar</button>
      </div>

      <TabelaRedesMT :redes="redesAdicionadas" @removerRede="removerRede" />
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, defineEmits } from 'vue'
import TabelaRedesMT from '@/components/TabelaRedesMT.vue'

const emit = defineEmits(['atualizarRedes'])

const rede = reactive({
  codigo: '',
  nome: '',
})

const erroCodigo = ref('')
const erroNome = ref('')
const redesAdicionadas = ref<Array<{ codigo: string; nome: string }>>([])

const formatarCodigoRede = () => {
  rede.codigo = rede.codigo
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .slice(0, 3)
}

const validarCodigo = () => {
  erroCodigo.value = ''
  if (!/^[A-Z0-9]{1,3}$/.test(rede.codigo)) {
    erroCodigo.value = 'O código pode ter no máximo 3 caracteres'
  }
}

const validarNome = () => {
  erroNome.value = ''
  if (!rede.nome.trim()) {
    erroNome.value = 'O nome não pode estar vazio.'
  }
}

const adicionarRede = () => {
  validarCodigo()
  validarNome()

  if (erroCodigo.value || erroNome.value) {
    alert('Corrija os erros antes de adicionar.')
    return
  }

  redesAdicionadas.value.push({ codigo: rede.codigo, nome: rede.nome })

  emit('atualizarRedes', redesAdicionadas.value)

  rede.codigo = ''
  rede.nome = ''
}

const removerRede = (index: number) => {
  redesAdicionadas.value.splice(index, 1)
  emit('atualizarRedes', redesAdicionadas.value)
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

.button-group {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  margin-left: 35%;
}

button {
  font-weight: bold;
  height: 25px;
  font-size: 0.7rem;
  color: #555;
  padding: 6px 10px;
  position: relative;
  transition: all 0.2s ease-in-out;
  box-shadow:
    3px 3px 5px rgba(0, 0, 0, 0.2),
    -3px -3px 5px rgba(255, 255, 255, 0.5);
}

button:hover {
  background-color: white;
  transform: scale(1.05);
}

button:disabled {
  background-color: var(--disabled-color, #ccc);
  cursor: not-allowed;
  transform: none;
}

.error-message {
  color: red;
  font-size: 0.75rem;
  margin-top: 4px;
}
</style>
