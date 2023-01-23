<template>
  <div class="row justify-content-center">
    <div class="col-7 col-xs-12 mt-3">
      <h3 class="text-center">
        Iniciar Sesión
      </h3>

      <b-form @submit.prevent="onSubmitLoginUser">
        <b-form-group label="Nombre de usuario" label-for="username">
          <b-form-input id="username" v-model="credentials.username" type="text"
                        placeholder="Ingrese nombre de usuario"/>
          <b-form-invalid-feedback :state="ui.validation.fields.username === ''">
            {{ ui.validation.fields.username }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Contraseña" label-for="password">
          <b-form-input id="password" v-model="credentials.password" type="password"
                        placeholder="Ingrese contraseña"/>
        </b-form-group>

        <div class="text-center mb-3">
          <b-button type="submit" variant="primary">
            Iniciar Sesión
          </b-button>
          <nuxt-link to="/register" class="btn btn-info">
            Quiero crear una cuenta
          </nuxt-link>
        </div>

        <b-alert :show="ui.messages.success" variant="success">
          Te has registrado exitosamente. Ya puedes comprar en
          <nuxt-link to="/categories">
            <b>Remate Sincelejo</b>
          </nuxt-link>
        </b-alert>

        <b-alert :show="ui.messages.invalidCredentials" variant="warning">Las credenciales son inválidas.</b-alert>

        <b-alert :show="ui.messages.danger" variant="danger">
          Ocurrió un error, vuélvalo a intentar.
        </b-alert>
      </b-form>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  layout: 'auth',
  data() {
    return {
      credentials: {
        username: 'kminchelle',
        password: '0lelplR',
      },
      ui: {
        messages: {
          success: false,
          invalidCredentials: false,
          danger: false,
        },
        validation: {
          hasError: true,
          fields: {
            username: '',
            //ToDo, agregar password
          }
        }
      }
    }
  },
  methods: {
    async onSubmitLoginUser() {
      this.ui.validation.hasError = false

      this.validUsername()

      if (this.ui.validation.hasError) {
        return
      }

      this.ui.messages.success = false
      this.ui.messages.invalidCredentials = false
      this.ui.messages.danger = false

      const response = await this.loginUserAction(this.credentials)
      if (response === 'OK') {
        this.ui.messages.success = true
      }

      if (response === 'INVALID_CREDENTIALS') {
        this.ui.messages.invalidCredentials = true
      }

      if (response === 'ERROR') {
        this.ui.messages.danger = true
      }
    },
    validUsername() {
      if (this.credentials.username === '') {
        this.ui.validation.fields.username = 'El campo Nombre de usuario es obligatorio.'
        this.ui.validation.hasError = true
        return
      }

      // 1. Obtener el primer (0) carácter de un string con el método charAt
      // 2. Se convierte el resultado a int con parseInt
      // 3. Se verifica si es un número con la función IsNotNumber
      if (!isNaN(parseInt(this.credentials.username.charAt(0)))) {
        this.ui.validation.fields.username = 'El campo Nombre de usuario debe iniciar con un caracter alfabético.'
        this.ui.validation.hasError = true
        return
      }

      this.ui.validation.fields.username = ''
    },
    ...mapActions(['loginUserAction'])
  }
}
</script>