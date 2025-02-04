<template>
  <div class="login-container">
    <div class="login-box">
      <form @submit.prevent="entrar">
        <div class="form-group">
          <label for="usuario">Usuário</label>
          <input id="usuario" type="text" v-model="usuario" placeholder="Digite o usuário" />
          <p v-if="erroUsuario" class="error-message">{{ erroUsuario }}</p>
        </div>

        <div class="form-group">
          <label for="senha">Senha</label>
          <input id="senha" type="password" v-model="senha" placeholder="Digite a senha" />
          <p v-if="erroSenha" class="error-message">{{ erroSenha }}</p>
        </div>

        <button type="submit" class="login-button">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const usuario = ref('')
    const senha = ref('')
    const erroUsuario = ref('')
    const erroSenha = ref('')
    const router = useRouter()

    const validarUsuario = () => {
      erroUsuario.value = usuario.value.trim() ? '' : 'Usuário é obrigatório.'
    }

    const validarSenha = () => {
      erroSenha.value = senha.value.trim() ? '' : 'Senha é obrigatória.'
    }

    const entrar = async () => {
      validarUsuario()
      validarSenha()

      if (erroUsuario.value || erroSenha.value) return

      try {
        const response = await axios.get('http://localhost:8080/subestacoes')
        if (response.data?.length) {
          router.push({
            path: '/subestacoes',
            query: { data: JSON.stringify(response.data) },
          })
        } else {
          alert('Nenhuma subestação encontrada!')
        }
      } catch (error) {
        console.error(error)
        alert('Erro ao conectar ao servidor.')
      }
    }

    return {
      usuario,
      senha,
      erroUsuario,
      erroSenha,
      validarUsuario,
      validarSenha,
      entrar,
    }
  },
})
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('@/assets/electric-grid.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
}

.login-box {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 300px;
  text-align: center;
  position: relative;
  z-index: 2;
}

.login-box h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 5px;
  display: block;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  border-color: #007bff;
}

.error-message {
  color: red;
  font-size: 0.8rem;
  margin-top: 5px;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #0056b3;
}

.login-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
</style>
