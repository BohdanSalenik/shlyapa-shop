import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Container, Text, Div, Row, Col } from 'atomize'
import { Link } from 'react-router-dom';


const Homepage = () => {

  const { fetchAllProducts, products } = useContext(ShopContext)

  useEffect(() => { fetchAllProducts() }, [fetchAllProducts]);

  if (!products) return <div>Loading...</div>

  return (
    <Container>
      <Row>
        {products.map(product => (
          <Col key={product.id}>
            <Link to={`/product/${product.id}`}>
              <Div p='2rem'>
                <Div
                  h='20rem'
                  bgImg={product.images[0].src}
                  bgSize='contain'
                  bgPos='center center'
                  bgRepeat='no-repeat'
                />
              </Div>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Homepage
