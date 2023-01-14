<template>
  <div class="container">
    <b-navbar variant="faded" type="light">
      <b-navbar-brand href="/">
        Remate Sincelejo
      </b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto" right>
          <li class="nav-item">
            <nuxt-link to="/" class="nav-link">
              Volver al inicio.
            </nuxt-link>
          </li>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <!-- Esta etiqueta permite establecer el contenedor dinámico: -->
    <!-- Complementar con este video: https://www.youtube.com/watch?v=YNaNCUovvc4 -->
    <nuxt/>
  </div>
</template>