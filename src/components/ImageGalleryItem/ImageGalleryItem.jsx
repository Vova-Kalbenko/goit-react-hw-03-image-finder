import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

// артикл это масив обьектов который приходит к нам с ответа от бэка,
// в нем есть свойства id, webformatURL, largeImageURL, tags
const ImageGalleryItem = ({articles, onImage}) => {
    // console.log(articles)
    return (
        <>
            {articles.map(({ id, webformatURL, largeImageURL, tags }) => (
                
                <li className={css.imageGalleryItem} key={id}>
                    <img
                        src={webformatURL}
                        alt="response from API"
                        onClick={() => onImage(largeImageURL, tags, id) } 
                    />
                </li>
            ))}
        </>
    );
}
// онИмедж это ссылка на метод с мейн файла для тогл модалки(открыть изображение больщше)
// 

ImageGalleryItem.propTypes = {
    id: PropTypes.string,
    webformatURL: PropTypes.string,
    LargeImageURL: PropTypes.string,
    tags: PropTypes.string,
    onImage: PropTypes.func,
};
export default ImageGalleryItem;
