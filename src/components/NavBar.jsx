import React, {useState, useContext} from 'react'
import { Button, Container, Navbar, Modal } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import CartProduct from './CartProduct';

export const NavBar = () => {
  const [show, setShow] = useState(false)

  const cart = useContext(CartContext)

  let productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0)

  // functions to handle modal closing and opening
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  return (
    <>
      <Navbar expand="sm">
        <Navbar.Brand href='/'>MyStore</Navbar.Brand>
        <Navbar.Toggle />

        {/* The items to collapse */}
        <Navbar.Collapse className='justify-content-end'>
          <Button onClick={handleShow}>Cart ({productsCount} Items)</Button>
        </Navbar.Collapse>
      </Navbar>

      {/* Cart Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>My Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            productsCount > 0 ?
            <>
              {
                cart.items.map((item, id) => (
                  <CartProduct key={id} id={item.id} quantity={item.quantity} />
                ))
              }

              <h2>Total: ${cart.getTotalCost().toFixed(2)}</h2>
            </> :

            <h2>There are no items in your cart</h2>
          }
        </Modal.Body>
      </Modal>
    </>
  )
}
