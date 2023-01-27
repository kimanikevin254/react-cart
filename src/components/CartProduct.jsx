import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { getProductData } from '../productsStore'

const CartProduct = (props) => {
    const cart = useContext(CartContext)
    const { id, quantity } = props
    const productData = getProductData(id)
  return (
    <>
        <h3>{productData.title}</h3>
        <p>{quantity} total</p>
        <p>${ (quantity * productData.price).toFixed(2)}</p>
        <hr />
    </>
  )
}

export default CartProduct