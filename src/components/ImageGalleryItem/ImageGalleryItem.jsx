import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({onClick, webformatURL, largeImage}) => (
  <li className={styles.ImageGalleryItem} onClick={() => onClick(largeImage)}>
    <img src={webformatURL} alt="" className={styles.ImageGalleryItem__image} />
  </li>
)

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImage: PropTypes.string,
  onClickImage: PropTypes.func,
};

export default ImageGalleryItem;