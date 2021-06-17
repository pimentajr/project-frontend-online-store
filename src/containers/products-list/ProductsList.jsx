import React, { Component } from 'react';
import './products-list.css';

import { ProductCard } from '../../components/Components';

export default class ProductsList extends Component {
  render() {
    const { products } = this.props;

    return (
      <div className="products-container">
        { products.map((product, idx) => <ProductCard key={ idx } product={ product } />) }
      </div>
    );
  }
}