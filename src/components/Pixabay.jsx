import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { url, apiKey, options } from "./API/pixabay";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import LoadMoreButton from "./Button/Button";
import ColorRingLoader from "./Loader/Loader";
import Modal from "./Modal/Modal";

class Pixabay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hits: [],
      name: "",
      page: 1,
      showModal: false,
      loading: false,
      largeImageURL: "",
      totalHits: 0,
    };
  }
// это параметр поитска который береться с инпута ПРИ САБМИТЕ
// ТОТАЛД ХИТС ЭТО ПАРАМЕТР СО СТЕЙТА ДЛЯ КОТНРОЛЯ КОЛИЧЕСТВА ВСЕГО И ВЫДАВАТЬ ОШИБКУ ЕСЛИ ЗАКОНЧИЛИСЬ ФОТКИ


  componentDidUpdate(prevProps, prevState) {
    const { name, page } = this.state;
    if (prevState.name !== name || prevState.page !== page) {
      this.fetchImages();
    }
  }

  toggleModal = (imageURL, tag) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: imageURL,
      tags: tag,
    }));
  };

  getValue = ({ name }) => {
    this.setState({
      hits: [],
      name,
      page: 1,
      totalHits: 0,
    });
  };

  fetchImages = () => {
    const { name, page } = this.state;
    this.setState({ loading: true });
    try {
      axios
        .get(
          `${url}?key=${apiKey}&q=${name}&page=${page}&${options}`
        )
        .then((response) => {
          if (!response.data.hits.length) {
            toast.error(
              'No images found', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            }
            );
          }
          const modifiedHits = response.data.hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          }));
          this.setState((prevState) => ({
            hits: [...prevState.hits, ...modifiedHits],
            totalHits: response.data.totalHits,
            loading: false,
          }));
        });
    } catch (error) {
      console.error(error.message);
      this.setState({ loading: false });
    }
  };

  loadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const {
      hits,
      showModal,
      loading,
      largeImageURL,
      totalHits,
    } = this.state;

    return (
      <div>
        <Searchbar onSubmitHandler={this.getValue} />

        {hits.length > 0 && (
          <ImageGallery>
            <ImageGalleryItem articles={hits} onImage={this.toggleModal} />
          </ImageGallery>
        )}

        {showModal && (
          <Modal onClose={this.toggleModal} url={largeImageURL} />
        )}

        {loading && <ColorRingLoader />}

        {totalHits > 0 && hits.length < totalHits && (
          <LoadMoreButton onButtonClick={this.loadMore} />
        )}
        <ToastContainer />
      </div>
    );
  }
}

export default Pixabay;
// АЛГОРИТМ
// 1. ФЕТЧ ФОТОК С ПОМОЩЬЮ АПИ
// 2. РЕНДЕР ЭТИХ ФОТОК (ЮЛ С ЛИШКАМИ)
// 3. ОБРАБОТКА КНОПКИ ПО ЗАГРУЖКЕ БОЛЬШЕ
// 4. ПОДКЛЮЧЕНИЕ МОДАЛКИ ДЛЯ ОТКРЫТИЯ БОЛЬШЕГО ИЗОБРАЖЕНИЯ
// 5. ОГРАНИЧЕНИЯ ФЕТЧА ПО ТОМУ ЖЕ ИМЕНИ(ПАРАМЕТРА ПОИСКА)
// 6.ОБРАБОТКА ВЫВЕДЕГНИЧЯ ОШИБКИ ЕСЛИ ЗАКОНЧИЛИЬ ВСЕ КАРТИНКИ ПО ДАННОМУ ЗАПРОЛСУ
// 7.ОБРАБОТКА ПОКАЗА ОШИБКИ ПО НЕВАЛИДНОМУ ПАРАМЕТРУ ПОИСКА (А ИМЕННО ТО ЧТО ФОТКИ НЕ НАЙДЕНЫ)
