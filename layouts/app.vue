<template>
  <div class="container">
    <b-navbar variant="faded" type="light">

      <nuxt-link to="/" class="navbar-brand">
        Remate Sincelejo
      </nuxt-link>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <li class="nav-item">
            <nuxt-link to="/categories" class="nav-link">
              Categorías
            </nuxt-link>
          </li>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" right>
          <li class="nav-item">
            <nuxt-link to="/cart" class="nav-link">
              Carrito
              <b-badge pill variant="primary">{{  totalQuantity }}</b-badge>
            </nuxt-link>
          </li>
          <li class="nav-item">
            <a href="javascript:void(0)" class="nav-link" v-on:click="logout">
              Cerrar Sesión
            </a>
          </li>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <nuxt/>

    <b-alert show variant="secondary" class="text-right">
      Todos los derechos reservados.
    </b-alert>
  </div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
export default {
  computed: {
    totalQuantity() {
      let total = 0

      this.getCart().forEach(c => total += c.quantity)

      return total
    }
  },
  methods: {
    ...mapMutations(['setDefaultUser']),
    ...mapGetters(['getCart']),
    logout() {
      this.setDefaultUser()
      this.$router.push('/login')
    }
  }
}
</script>
