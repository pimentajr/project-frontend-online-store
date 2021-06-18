import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Products.css';
import { Link } from 'react-router-dom';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    };
    this.addItemCart = this.addItemCart.bind(this);
  }

  addItemCart() {
    const { product, func } = this.props;
    const { count } = this.state;
    product.cartItem = true;
    product.cartCount = count;
    func(product);
    this.setState((previous) => ({
      count: previous.count + 1,
    }));
  }

  render() {
    const { title, img, price, product } = this.props;
    return (
      <div>
        <Link to={{ pathname: `/product-details/${title}`, state: { productToAdd: product } }} 
        data-testid="product-detail-link"
        >
          <div className="product" data-testid="product" aria-hidden="true">
            <p>{ title }</p>
            <img src={ img } alt="produto" />
            <p>
              {'R$'}
              { price.toFixed(2) }
            </p>
          </div>
        </Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ this.addItemCart }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

Products.propTypes = {
  product: PropTypes.objectOf(String).isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  func: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(Object).isRequired,
};

export default Products;