<template>
  <div v-if="isProductInTheCart(product.id)" class="input-group">
    <div class="input-group-prepend">
      <button class="btn btn-outline-danger"
              type="button"
              style="padding: 0 20px"
              v-on:click="reduceQuantity"
      >
        -
      </button>
    </div>
    <input type="text" class="form-control text-center" readonly :value="cartProduct.quantity">
    <div class="input-group-append">
      <button class="btn btn-outline-primary"
              type="button"
              style="padding: 0 20px"
              v-on:click="addQuantity"
      >
        +
      </button>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapGetters} from "vuex";

export default {
  props: {
    product: Object
  },
  computed: {
    cartProduct() {
      return this.getCart().find(c => c.id === this.product.id)
    }
  },
  methods: {
    ...mapMutations(['addQuantityToProduct', 'reduceQuantityToProduct', 'deleteProduct']),
    ...mapGetters(['getCart']),
    isProductInTheCart(productId) {
      return this.getCart().some(c => c.id === productId)
    },
    addQuantity() {
      console.log(this.product.id)
      this.addQuantityToProduct(this.product.id)
    },
    reduceQuantity() {
      if (this.cartProduct.quantity === 1) {
        this.deleteProduct(this.product.id)
        return
      }

      this.reduceQuantityToProduct(this.product.id)
    }
  }
}
</script>