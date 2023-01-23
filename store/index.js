const DEFAULT_USER = {
    id: null,
    firstName: null,
    lastName: null,
    username: null,
    email: null,
    image: null,
    token: null,
}

const INIT_QUANTITY = 1

export const state = () => ({
    user: DEFAULT_USER,
    cart: []
})

export const getters = {
    getUserID(state) {
        return state.user.id
    },
    getCart(state) {
        return state.cart
    },
    getCartTotalQuantity(state) {
        let total = 0

        state.cart.forEach(c => total += c.quantity)

        return total
    },
    getCartPriceTotal(state) {
        let total = 0

        state.cart.forEach(c => total += c.quantity * c.product.price)

        return total
    }
}

export const mutations = {
    setUserLogged(state, currentUser) {
        state.user = currentUser
    },
    setDefaultUser(state) {
        state.user = DEFAULT_USER
    },
    addInitProduct(state, product) {
        state.cart.push({
            id: product.id,
            quantity: INIT_QUANTITY,
            product: product
        })
    },
    addQuantityToProduct(state, productId) {
        state.cart.forEach(c => {
            if (c.id === productId) {
                c.quantity++
            }
        })
    },
    reduceQuantityToProduct(state, productId) {
        state.cart.forEach(c => {
            if (c.id === productId) {
                c.quantity--
            }
        })
    },
    deleteProduct(state, productId) {
        const index = state.cart.findIndex(c => c.id === productId)
        state.cart.splice(index, 1)
    }
}

export const actions = {
    async loginUserAction(context, payload) {
        try {
            const response = await this.$axios.post('/auth/login', payload)
            context.commit('setUserLogged', response.data)

            return 'OK'
        } catch (err) {
            if (err.response.status === 400) {
                return 'INVALID_CREDENTIALS'
            }

            if (err.response.status === 500) {
                return 'ERROR'
            }
        }
    },
}
