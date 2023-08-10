import React, { Component } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    name: '',
 };
// это параметр поитска который береться с инпута ПРИ ВВОДЕ
  handleChange = event => {
    const { value } = event.currentTarget;
    this.setState({ name: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.name.trim() === '') {
      toast.error(
        'search string is empty!', { position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",}
      );
      return;
    }

    this.props.onSubmitHandler(this.state);

    this.reset();
  };

  reset() {
    this.setState({ name: '' });
  }

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchbutton}>
            <span className="searchForm-button-label">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 20 20"
              >
                <title>search</title>
                <path d="M19 17l-5.15-5.15a7 7 0 1 0-2 2L17 19zM3.5 8A4.5 4.5 0 1 1 8 12.5 4.5 4.5 0 0 1 3.5 8z" />
              </svg>
            </span>
          </button>

          <input
            className={css.searchinput}
            type="text"
            onChange={this.handleChange}
            autoComplete="off"
            value={this.state.name}
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;