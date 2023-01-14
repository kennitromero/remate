<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <nuxt-link to="/">Inicio</nuxt-link>
        </li>
        <li class="breadcrumb-item">
          <nuxt-link to="/categories">Categorías</nuxt-link>
        </li>
        <li class="breadcrumb-item active text-capitalize">
          {{ category }}
        </li>
      </ol>
    </nav>

    <div class="row justify-content-center mb-3">
      <div class="col-4 m-3" v-for="p in products">
        <product :product="p"/>
      </div>
    </div>
  </div>
</template>

<script>
import Product from '~/components/product.vue'

export default {
  layout: 'app',
  components: {
    Product
  },
  data() {
    return {
      category: null,
      products: []
    }
  },
  async mounted() {
    this.category = this.$route.params.category

    const response = await this.$axios('https://dummyjson.com/products/category/' + this.category);
    this.products = response.data.products
  }
}
</script>