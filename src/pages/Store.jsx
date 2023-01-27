import React from 'react'
import { Row, Col } from 'react-bootstrap';
import { productsArray } from '../productsStore';
import { ProductCard } from '../components/ProductCard';

export const Store = () => {
  return (
    <>
        <Row xs={1} md={3} className='g-4 my-3'>
            {
                productsArray.map((product, id) => (
                    <Col key={id} align="center">
                        <ProductCard title={product.title} price={product.price} id={product.id} />
                    </Col>
                ))
            }
        </Row>
    </>
  )
}
