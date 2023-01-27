import { createContext, useState } from "react";
import { productsArray, getProductData } from "../productsStore";

export const CartContext = createContext({
    //cart items will be stored in an array
    items: [],

    //define context fxns
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {}
})

export function CartProvider({children}){
    const [cartProducts, setCartProducts] = useState([])

    // get the quantity of a certain product in the cart
    const getProductQuantity = (id) => {
        const quantity = cartProducts.find(product => product.id === id)?.quantity 

        if(quantity === undefined){
            return 0
        }
         
        return quantity
    }

    const addOneToCart = (id) => {
        const quantity = getProductQuantity(id)

        if(quantity === 0){ // no product in the cart
            setCartProducts([...cartProducts, {
                id: id,
                quantity: 1
            }])
        }else{ //product exists in the cart
            setCartProducts(
                cartProducts.map(product => product.id === id ?
                    { ...product, quantity: product.quantity + 1} :
                    product
                )
            )
        }
    }

    const removeOneFromCart = (id) => {
        const quantity = getProductQuantity(id)

        if(quantity === 1){
            deleteFromCart(id)
        }else{
            setCartProducts(
                cartProducts.map(product => product.id === id ?
                    { ...product, quantity: product.quantity - 1} :
                    product
                )
            ) 
        }
    }

    const deleteFromCart = (id) => {
        setCartProducts(
            cartProducts => cartProducts.filter(currentProduct => {
                return currentProduct.id !== id;
            })
        )
    }

    const getTotalCost = () => {
        let totalCost = 0

        cartProducts.map(cartItem => {
            const productData = getProductData(cartItem.id)
            totalCost += (productData.price * cartItem.quantity)
        })

        return totalCost
    }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost
    }
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;