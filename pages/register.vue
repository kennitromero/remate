<template class="row">
  <div class="row justify-content-center">
    <div class="col-7 col-xs-12 mt-3">

      <h3 class="text-center">
        Crear Cuenta
      </h3>

      <b-form v-on:submit.prevent="onSubmitRegisterUser">

        <b-row>
          <b-col>
            <b-form-group label="Nombres" label-for="id_first_name">
              <b-form-input id="id_first_name" v-model="user.firstName"
                            type="text" placeholder="Ingrese nombres"/>
              <b-form-invalid-feedback :state="ui.validation.fields.firstName === ''">
                {{ ui.validation.fields.firstName }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group label="Apellido" label-for="id_last_name">
              <b-form-input id="id_last_name" v-model="user.lastName"
                            type="text" placeholder="Ingrese apellidos"
                            required/>
            </b-form-group>
          </b-col>
        </b-row>


        <b-form-group label="Correo electrónico" label-for="id_email">
          <b-form-input id="id_email" v-model="user.email" type="text"
                        placeholder="Ingrese correo electrónico"/>
        </b-form-group>

        <b-form-group label="Nombre de usuario" label-for="username">
          <b-form-input id="username" v-model="user.username" type="text"
                        placeholder="Ingrese nombre de usuario"/>
          <b-form-invalid-feedback :state="ui.validation.fields.username === ''">
            {{ ui.validation.fields.username }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Contraseña" label-for="password">
          <b-form-input id="password" v-model="user.password" type="password"
                        placeholder="Ingrese contraseña" required></b-form-input>
        </b-form-group>

        <b-form-group id="gender" label="Sexo" label-for="gender">
          <b-form-select id="gender" v-model="user.gender"
                         :options="[{ text: 'Femenino', value: 'female'}, { text: 'Masculino', value: 'masculine'}]"/>
          <b-form-invalid-feedback :state="ui.validation.gender === ''">
            {{ ui.validation.gender }}
          </b-form-invalid-feedback>
        </b-form-group>

        <div class="mt-3 mb-3">
          <label for="image" class="form-label">
            Foto de perfil
          </label>
          <b-form-file
              browse-text="Abrir explorador"
              placeholder="Escoge tu foto..."
              drop-placeholder="Drop file here..."
              v-model="user.image">
            Buscar foto en el computador
          </b-form-file>
        </div>

        <div class="text-center mb-3">
          <b-button type="submit" variant="primary">Registrarme</b-button>
          <nuxt-link to="/login" class="btn btn-info">Ya tengo una cuenta</nuxt-link>
        </div>

        <b-alert variant="success" :show="ui.messages.success">
          Te has registrado exitosamente. <br>
          Ya puedes
          <nuxt-link to="login">
            <b>
              Iniciar Sesión
            </b>
          </nuxt-link>
        </b-alert>

        <b-alert variant="danger" :show="ui.messages.danger">
          Sucedió un error, vuélvelo a intentar.
        </b-alert>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  data() {
    return {
      user: {
        firstName: 'Kennit',
        lastName: 'Ruz',
        email: 'kennitromero@gmail.com',
        username: 'kruz',
        password: '12345678',
        gender: 'masculine',
        image: null,
      },

      ui: {
        messages: {
          success: false,
          danger: false
        },
        validation: {
          hasError: true,
          fields: {
            firstName: '',
            username: '',
            //ToDo, agregar otros campos de validación
          }
        }
      }
    }
  },
  methods: {
    onSubmitRegisterUser() {
      this.ui.validation.hasError = false

      this.validFirstName()
      this.validUsername()
      this.validEmail()
      // ToDo, agregar otras validaciones aquí...

      // validar campos, si alguna validación retorna false, no se realiza el registro
      if (this.ui.validation.hasError) {
        return
      }

      const payload = {
        first_name: this.user.firstName,
        last_name: this.user.lastName,
        email: this.user.email,
        username: this.user.username,
        password: this.user.password,
        gender: this.user.gender,
        image: this.user.image
      }

      this.ui.messages.success = false
      this.ui.messages.danger = false

      try {
        this.$axios.post('/users/add', payload)
        this.ui.messages.success = true
      } catch (err) {
        this.ui.messages.danger = true
      }
    },
    validFirstName() {
      if (this.user.firstName === '') {
        this.ui.validation.fields.firstName = 'El campo Nombres es obligatorio.'
        this.ui.validation.hasError = true
        return
      }

      // "/^[a-zA-Z]*$/" es una expresión regular, leer más al respecto a ellas acá: https://lenguajejs.com/javascript/regexp/expresiones-regulares/
      if (!/^[a-zA-Z]*$/.test(this.user.firstName)) {
        this.ui.validation.fields.firstName = 'El campo Nombres solo puede contener caracteres alfabéticos.'
        this.ui.validation.hasError = true
        return
      }

      if (this.user.firstName.length < 2) {
        this.ui.validation.fields.firstName = 'El campo Nombres debe contener mínimo 2 caracteres.'
        this.ui.validation.hasError = true
        return
      }

      if (this.user.firstName.length > 20) {
        this.ui.validation.fields.firstName = 'El campo Nombres  debe contener máximo 20 caracteres.'
        this.ui.validation.hasError = true
        return
      }

      this.ui.validation.fields.firstName = ''
    },
    validUsername() {
      if (this.user.username === '') {
        this.ui.validation.fields.username = 'El campo Nombre de usuario es obligatorio.'
        this.ui.validation.hasError = true
        return
      }

      // 1. Obtener el primer (0) carácter de un string con el método charAt
      // 2. Se convierte el resultado a int con parseInt
      // 3. Se verifica si es un número con la función IsNotANumber
      if (!isNaN(parseInt(this.user.username.charAt(0)))) {
        this.ui.validation.fields.username = 'El campo Nombre de usuario debe iniciar con un caracter alfabético.'
        this.ui.validation.hasError = true
        return
      }

      this.ui.validation.fields.username = ''
    },
    validEmail() {
      // ToDo, agregar condicionales para validar email
      // validarlo con una expresión regular, así como se valido que fuese alfabético el nombre del usuario.
    }
  }
}
</script>