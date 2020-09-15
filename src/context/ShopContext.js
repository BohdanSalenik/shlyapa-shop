import React, { Component } from 'react';
import Client from 'shopify-buy';

const ShopContext = React.createContext();

const client = Client.buildClient({
  domain: 'shlyapa-free.myshopify.com',
  storefrontAccessToken: '7e5d8bc57084f11d60709a068a15a5f6'
});

class ShopProvider extends Component {
  state = {
    products: [],
    product: {},
    checkout: {},
    isCartOpen: false,
    test: 'test'
  }

  componentDidMount() {
    this.creatCheckout();
  }

  creatCheckout = async () => {
    const checkout = await client.checkout.create();
    this.setState({ checkout })
  }

  addItemToCart = async (variantId, quantity) => {
    const checkoutId = this.state.checkout.id;

    const lineItemsToAdd = [{
      variantId,
      quantity: parseInt(quantity, 10),
    }];

    const checkout = await client.checkout.addLineItems(checkoutId, lineItemsToAdd);

    this.setState({ checkout });
  }

  fetchAllProducts = async () => {
    const products = await client.product.fetchAll();
    this.setState({ products })
  }

  fetchAllProductWithId = async (id) => {
    const product = await client.product.fetch(id);
    this.setState({ product })
  }

  closeCart = () => this.setState({ isCartOpen: false });

  openCart = () => this.setState({ isCartOpen: true });



  render() {
    const {
      creatCheckout,
      addItemToCart,
      fetchAllProducts,
      fetchAllProductWithId,
      closeCart,
      openCart,
      state
    } = this;

    return (
      <ShopContext.Provider value={{
        ...state,
        creatCheckout,
        addItemToCart,
        fetchAllProducts,
        fetchAllProductWithId,
        closeCart,
        openCart
      }}>
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext }
export default ShopProvider;
