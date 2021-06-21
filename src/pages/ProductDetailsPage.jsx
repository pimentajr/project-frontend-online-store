import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import EvaluationForm from '../components/EvaluationForm';

export default class ProductDetailsPage extends Component {
  render() {
    // Funções: addToCart
    // Objetos: selectedProduct, title, thumbnail, price, id
    const { addToCart, selectedProduct } = this.props;
    const { title, thumbnail, price, id } = selectedProduct;
    return (
      <div>
        <Link to="/" className="home-button">Voltar</Link>
        <Link
          data-testid="shopping-cart-button"
          to="/cart"
        >
          Carrinho de Compras
        </Link>
        <h3 data-testid="product-detail-name">{ title }</h3>
        <img src={ thumbnail } alt="Product Thumbnail" />
        <span>
          R$
          { price }
        </span>
        <p>
          id:
          { id }
        </p>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => addToCart(selectedProduct) }
        >
          Adicionar ao Carrinho
        </button>
        <EvaluationForm />
      </div>
    );
  }
}

ProductDetailsPage.propTypes = {
  addToCart: PropTypes.func.isRequired,
  selectedProduct: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};