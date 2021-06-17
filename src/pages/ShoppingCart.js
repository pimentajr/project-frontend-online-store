import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Back from '../imgs/Seta.png';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.renderShopCart = this.renderShopCart.bind(this);
    this.state = {
      shopCart: props.shopCart,
    };

  }

  renderShopCart(shopCart) {
    return (
      shopCart.map(({ thumbnail, title, price, amount }, index) => (
        <div key={ index }>
          <span>{ title }</span>
          <img src={ thumbnail } alt="product" />
          <p>{ price }</p>
          <p>{ amount }</p>
        </div>
      ))
    );
  }

  render() {
    const { shopCart,outro } = this.state;
    return (
      <>
        <Link to="/">
          <img
            width="30px"
            src={ Back }
            alt="imagem de voltar"
          />
        </Link>
        {shopCart.length === 0
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : this.renderShopCart(shopCart)}
      </>
    );
  }
}
export default ShoppingCart;

ShoppingCart.propTypes = {
  shopCart: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  })),
}.isRequired;
