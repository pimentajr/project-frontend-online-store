import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Home.module.css';

export class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      price: 0,
      imagePath: '',
      attributes: [],
      eMail: '',
      mensage: '',
      rating: '',
    };
    this.submitButton = this.submitButton.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.fetchProductDetails(id);
  }

  async fetchProductDetails(id) {
    const url = `https://api.mercadolibre.com/items/${id}`;
    const fetchDetails = await fetch(url);
    const details = await fetchDetails.json();
    this.setState({
      title: details.title,
      price: details.price,
      imagePath: details.thumbnail,
      attributes: [],
    });
  }

  submitButton() {
    const eMail = document.getElementById('email-id').value;
    const mensage = document.getElementById('mensage-id').value;
    const rating = document.getElementById('rating-id').value;
    this.setState({
      eMail,
      mensage,
      rating,
    });
  }

  render() {
    const { title, price, imagePath, attributes, eMail, mensage, rating } = this.state;
    return (
      <div className={ style.product }>
        <h3 data-testid="product-detail-name">{ title }</h3>
        <img src={ imagePath } alt="" />
        <br />
        <span>
          Preço:
          {' '}
          { price }
        </span>
        <div>
          <ul>
            {!attributes && <span />}
            {/* {attributes.map((atribute) => <li key="">{attributes}</li>)} */}
          </ul>
        </div>
        <form>
          <h3>Avaliações</h3>
          <label htmlFor="email-id">
            <p>Email:</p>
            <input
              id="email-id"
              type="e-mail"
              placeholder="Digite seu e-mail"
              isRequired
            />
          </label>
          <label htmlFor="rating-id">
            <p>Estrelas:</p>
            <input
              id="rating-id"
              type="number"
              step={ 0.1 }
              min={ 0 }
              max={ 5 }
              placeholder="0 a 5"
              isRequired
            />
          </label>
          <label htmlFor="mensage-id">
            <p>Mensagem:</p>
            <textarea
              type="text"
              data-testid="product-detail-evaluation"
              id="mensage-id"
            />
          </label>
          <br />
          <button
            onClick={ this.submitButton }
            id="avaiation-button"
            type="button"
          >
            Avaliar
          </button>
        </form>
        <section>
          <h4>Avaliações recentes</h4>
          <h4>
            { eMail }
          </h4>
          <h3>
            { mensage }
          </h3>
          <h3>
            { rating }
          </h3>
        </section>
      </div>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Product;