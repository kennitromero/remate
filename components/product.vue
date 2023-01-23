<template>
  <div class="box">
    <div :style="'background-image: url('+product.images[1]+');'" class="mr-3 box-image"></div>
    <h6 class="mt-0 box-one-line">
      {{ product.brand }} - {{ product.title }}
      <br>
      <small class="money">
        ${{ product.price }}
      </small>
      <span class="badge badge-dark">
                {{ product.discountPercentage }}%
              </span>
    </h6>
    <small class="box-one-line" :title="product.description">
      {{ product.description }}
    </small>

    <br>

    <button v-if="! isProductInTheCart(product.id)"
            class="btn btn-outline-primary"
            v-on:click="addProduct(product)">
      Agregar
    </button>

    <product-add-remove :product="product"/>
  </div>
</template>

<script>
import ProductAddRemove from '~/components/product-add-remove.vue'
import {mapMutations, mapGetters} from "vuex";

export default {
  props: {
    product: Object
  },
  components: {
    ProductAddRemove
  },
  computed: {
    cartProduct() {
      return this.getCart().find(c => c.id === this.product.id)
    }
  },
  methods: {
    ...mapMutations(['addInitProduct']),
    ...mapGetters(['getCart']),
    addProduct(product) {
      this.addInitProduct(product)
    },
    isProductInTheCart(productId) {
      return this.getCart().some(c => c.id === productId)
    }
  }
}
</script>

<style>
.box {
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px 50px;
}

.box-one-line {
  white-space: nowrap;
  overflow: hidden;
  display: block;
  text-overflow: ellipsis;
}

.box-image {
  display: inline-block;
  margin: 0 auto;
  background-color: #ddd;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 128px;
  width: 128px;
  border-radius: 100%;
  border: 1px solid #333;
}

.money {
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-weight: bold
}
</style>