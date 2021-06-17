import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Product extends Component {
  render() {
    const { title, thumbnail, price, id, addCart } = this.props;
    return (
      <div data-testid="product">
        <img src={ thumbnail } alt={ title } />
        <h3>{title}</h3>
        <p>{`R$ ${price}`}</p>
        <button
          data-testid="product-add-to-cart"
          type="button"
          onClick={ addCart }
          imagem={ thumbnail }
          name={ title }
          value={ price }
          id={ id }
        >
          ADICIONAR AO CARRINHO
        </button>
        <Link
          to={ {
            pathname: `/details/${id}`,
            aboutProps: {
              name: title,
              image: thumbnail,
              preco: price,
            },
          } }
          data-testid="product-detail-link"
        >
          Mais detalhes
        </Link>
      </div>
    );
  }
}

Product.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.string,
}.isRequired;

export default Product;