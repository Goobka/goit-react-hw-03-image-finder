import ImageGalleryItem from '../ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({onClick, images}) => (
  <ul className={styles.ImageGallery}>
    {images.map(({id, webformatURL, largeImageURL}) => <ImageGalleryItem onClick={onClick} key={id} webformatURL={webformatURL} largeImage={largeImageURL}/>)}
  </ul>
)

export default ImageGallery;