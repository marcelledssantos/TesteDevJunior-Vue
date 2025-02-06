<template>
  <div class="login-page">
    <div class="image-container"></div>

    <div class="login-box">
      <div class="form-group">
        <label for="usuario">Usuário</label>
        <input
          id="usuario"
          type="text"
          v-model="usuario"
          placeholder="Digite o usuário"
          @blur="validarUsuario"
        />
      </div>

      <div class="form-group">
        <label for="senha">Senha</label>
        <input
          id="senha"
          type="password"
          v-model="senha"
          placeholder="Digite a senha"
          @blur="validarSenha"
        />
      </div>
      <ButtonComponent label="Entrar" @click="entrar" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import ButtonComponent from '@/components/ButtonComponent.vue'

export default defineComponent({
  name: 'LoginView',
  components: {
    ButtonComponent,
  },
  setup() {
    const usuario = ref('')
    const senha = ref('')
    const erroUsuario = ref('')
    const erroSenha = ref('')
    const router = useRouter()

    const validarUsuario = () => {
      if (!usuario.value.trim()) {
        erroUsuario.value = 'Usuário é obrigatório.'
        window.alert(erroUsuario.value)
      } else {
        erroUsuario.value = ''
      }
    }

    const validarSenha = () => {
      if (!senha.value.trim()) {
        erroSenha.value = 'Senha é obrigatória.'
        window.alert(erroSenha.value)
      } else {
        erroSenha.value = ''
      }
    }

    const entrar = async () => {
      validarUsuario()
      validarSenha()

      if (erroUsuario.value || erroSenha.value) {
        return
      }

      try {
        const response = await axios.get('http://localhost:8080/subestacoes')
        if (response.data && response.data.length > 0) {
          router.push({
            path: '/subestacoes',
            query: { data: JSON.stringify(response.data) },
          })
        } else {
          alert('Nenhuma subestação encontrada!')
        }
      } catch (error) {
        console.error(error)
        alert('Erro ao conectar ao servidor! Tente novamente mais tarde.')
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
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  position: relative;
  background-color: #f9f9f9;
}

.image-container {
  transform: translateX(0%);
  width: 80%;
  height: calc(100vh - 50px);
  background-image: url('../assets/electric-grid.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.login-box {
  position: absolute;
  bottom: 10%;
  right: 12%;
  background-color: #ccc;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 240px;
  height: 180px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-box {
  position: absolute;
  bottom: 10%;
  right: 12%;
  background-color: #ccc;
  padding: 10px 15px;
  border-radius: 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 260px;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form-group {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
  position: relative;
}

.form-group label {
  font-size: 0.8rem;
  font-weight: bold;
  color: #555;
  width: 35%;
  text-align: center;
  margin-right: 5px;
  margin-top: 30px;
}

.form-group input {
  width: 60%;
  height: 20px;
  margin-top: 30px;
  border: 2px solid #444;
  border-radius: 4px;
  font-size: 0.6rem;
  text-align: center;
  box-shadow:
    inset 2px 2px 5px rgba(0, 0, 0, 0.2),
    inset -2px -2px 5px rgba(255, 255, 255, 0.2);
  background-color: #f0f0f0;
}

.toast-error {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ff4d4d;
  color: white;
  padding: 12px 20px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  animation: fadeOut 3s ease-in-out forwards;
  z-index: 1000;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

button {
  width: 20%;
  padding: 8px;
  background-color: #ccc;
  color: black;
  border: 2px solid #888;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.6rem;
  text-align: center;
  margin-left: auto;
  margin-top: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10px;
  line-height: 1;
  box-shadow:
    2px 2px 5px rgba(0, 0, 0, 0.2),
    -2px -2px 5px rgba(255, 255, 255, 0.2);
}

button:hover {
  background-color: #bbb;
  border-color: #666;
}
</style>
