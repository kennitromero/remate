<template>
  <div>
    <h2>
      Carrito

      <div class="float-right">
        <nuxt-link class="btn btn-outline-success" to="checkout">Ir a comprar</nuxt-link>
      </div>
    </h2>

    <table class="table table-bordered">
      <thead>
      <tr>
        <th colspan="2">
          Producto
        </th>
        <th>
          Cantidad
        </th>
        <th>
          P. Unitario
        </th>
        <th>
          Sub Total
        </th>
        <th class="btn-manage-quantity">
          Gestionar
        </th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="cartProduct in getCart()">
        <td>
          <img :src="cartProduct.product.images[0]" :alt="cartProduct.product.description" style="height: 32px">
        </td>
        <td>
          {{ cartProduct.product.title }}
        </td>
        <td class="text-center">
          {{ cartProduct.quantity }}
        </td>
        <td class="text-center">
          ${{ cartProduct.product.price }}
        </td>
        <td class="text-center">
          ${{ cartProduct.quantity * cartProduct.product.price }}
        </td>
        <td>
          <product-add-remove :product="cartProduct.product"/>
        </td>
      </tr>
      <tr v-if="getCart().length === 0">
        <td colspan="6">No tienes productos en tu carrito, <nuxt-link to="categories">ve a las categorías</nuxt-link>.</td>
      </tr>
      </tbody>

      <tfoot>
      <tr>
        <th colspan="5" class="text-right">
          Total de Productos
        </th>
        <td>
          {{ getCartTotalQuantity() }}
        </td>
      </tr>
      <tr>
        <th colspan="5" class="text-right">
          Total Precio
        </th>
        <td>
          ${{ getCartPriceTotal() }}
        </td>
      </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import ProductAddRemove from '@/components/product-add-remove.vue'
import {mapGetters} from 'vuex'

export default {
  layout: 'app',
  components: {
    ProductAddRemove
  },
  methods: {
    ...mapGetters(['getCart', 'getCartTotalQuantity', 'getCartPriceTotal']),
  }
}
</script>

<style>
.btn-manage-quantity {
  width: 190px;
}
</style>