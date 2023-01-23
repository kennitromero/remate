<template>
  <div class="row justify-content-center">
    <div class="col-7 col-xs-12 mt-3">
      <h3 class="text-center">
        Checkout
      </h3>

      <b-form @submit.prevent="onSubmitLoginUser">
        <b-form-group label="Dirección de envío" label-for="address">
          <b-form-input id="address" v-model="checkout.address" type="text"
                        placeholder="Ingresa tu dirección: Calle 32 # 36B - 29"/>
          <b-form-invalid-feedback :state="ui.validation.fields.address === ''">
            {{ ui.validation.fields.address }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="payment_method" label="¿Cómo deseas pagar?" label-for="payment_method">
          <b-form-select id="payment_method" v-model="checkout.paymentMethod"
                         :options="[{ text: 'Efectivo', value: 'cash'}, { text: 'Datáfono', value: 'dataphone'}]"/>
          <b-form-invalid-feedback :state="ui.validation.paymentMethod === ''">
            {{ ui.validation.paymentMethod }}
          </b-form-invalid-feedback>
        </b-form-group>

        <label>¿Qué vas a comprar?</label>
        <table class="table table-bordered">
          <tr>
            <th class="text-right">
              Número de productos
            </th>
            <td>
              {{ getCartTotalQuantity() }}
            </td>
          </tr>
          <tr>
            <th class="text-right">
              Total a pagar
            </th>
            <td>
              ${{ getCartPriceTotal() }}
            </td>
          </tr>
        </table>

        <div class="text-center mb-3">
          <b-button type="submit" variant="primary">
            Realizar Compra
          </b-button>
        </div>

        <b-alert :show="ui.messages.success" variant="success">
          <b>¡Felicidades!</b>, tu compra ha sido cargada en nuestro sistema.
        </b-alert>
      </b-form>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  layout: 'app',
  data() {
    return {
      checkout: {
        address: '',
        paymentMethod: '',
      },
      ui: {
        messages: {
          success: false,
        },
        validation: {
          hasError: true,
          fields: {
            address: '',
            //ToDo, agregar password
          }
        }
      },
    }
  },
  methods: {
    ...mapGetters(['getUserID', 'getCart', 'getCartTotalQuantity', 'getCartPriceTotal']),
    async onSubmitLoginUser() {
      this.ui.validation.hasError = false

      if (this.ui.validation.hasError) {
        return
      }

      this.ui.messages.success = false

      // https://dummyjson.com/docs/http
      await this.$axios.post('/http/200', {
        cart: this.getCart(),
        address: this.checkout.address,
        paymentMethod: this.checkout.paymentMethod,
        userID: this.getUserID()
      })
      this.ui.messages.success = true
    },
  }
}
</script>