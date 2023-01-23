<template>
  <div class="row justify-content-center">
    <div class="col-5">
      <div class="list-group mb-3">
        <nuxt-link v-for="c in categories" v-bind:key="c"
                   :to="'categories/' + c"
                   class="list-group-item list-group-item-action text-capitalize"
                   aria-current="true">
          {{ removeHyphen(c) }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'app',
  data() {
    return {
      categories: []
    }
  },
  methods: {
    removeHyphen(t) {
      return t.replace('-', ' ')
    }
  },
  async mounted() {
    const response = await this.$axios.get('https://dummyjson.com/products/categories')
    this.categories = response.data
  }
}
</script>