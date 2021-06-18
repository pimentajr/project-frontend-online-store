import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import cart from '../Images/cart.png';
import SearchArea from './SearchArea';
import Filter from './Filter';

class HomeInitial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      products: [],
    };
    this.onChange = this.onChange.bind(this);
    this.filterProductsBySearch = this.filterProductsBySearch.bind(this);
    this.filterProductsByCategory = this.filterProductsByCategory.bind(this);
  }

  onChange({ target }) {
    const { value } = target;
    this.setState({
      search: value,
    });
  }

  async filterProductsBySearch() {
    const { search } = this.state;
    const products = await getProductsFromCategoryAndQuery('$CATEGORY_ID', `$${search}`);
    this.setState({
      products: products.results,
      search: '',
    });
  }

  async filterProductsByCategory({ target }) {
    if (target.className === 'Category') {
      const { id } = target;
      const { search } = this.state;
      if (search !== '') {
        const products = await getProductsFromCategoryAndQuery(`${id}`, `$${search}`);
        this.setState({
          products: products.results,
        });
      } else {
        const products = await getProductsFromCategoryAndQuery(`${id}`, '$QUERY');
        this.setState({
          products: products.results,
        });
      }
    }
  }

  render() {
    const { products, search } = this.state;
    const { createCart } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="search-bar">
            <input
              type="text"
              data-testid="query-input"
              placeholder="Search"
              id="search-bar"
              value={ search }
              onChange={ this.onChange }
            />
          </label>
          <button
            data-testid="query-button"
            onClick={ this.filterProductsBySearch }
            type="button"
          >
            Buscar
          </button>
        </form>
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <div>
          <Link to="/carrinho-compras">
            <img
              src={ cart }
              alt="carrinho-compras"
              data-testid="shopping-cart-button"
              height="200px"
            />
          </Link>
        </div>
        <SearchArea products={ products } createCart={ createCart } />
        <Filter onClick={ this.filterProductsByCategory } />
      </div>
    );
  }
}

HomeInitial.propTypes = {
  createCart: PropTypes.func.isRequired,
};

export default HomeInitial;