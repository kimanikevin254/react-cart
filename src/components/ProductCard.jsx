import React, {useContext} from 'react'
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';

export const ProductCard = ({ title, price, id }) => {
  const cart = useContext(CartContext)

  const productQuantity = cart.getProductQuantity(id)
  return (
    <Card>
        <Card.Title>{title}</Card.Title>
        <Card.Text>${price}</Card.Text>
        {
          productQuantity > 0 ?
          <>
            <Form as={Row}>
              <Form.Label column="true" sm="6">In Cart: {productQuantity}</Form.Label>
              <Col sm="6">
                <Button sm='6' className='mx-2' onClick={() => cart.addOneToCart(id)}>+</Button>
                <Button sm='6' className='mx-2' onClick={() => cart.removeOneFromCart(id)}>-</Button>
              </Col>
            </Form>
            <Button variant='danger' onClick={() => cart.deleteFromCart(id)} className='my-2'>Remove from Cart</Button>
          </> :
          <Button variant='primary' onClick={() => cart.addOneToCart(id)}>Add to Cart</Button>
        }
    </Card>
  )
}
