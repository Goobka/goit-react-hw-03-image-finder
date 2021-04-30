import { Component } from 'react';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Modal from './components/Modal';
import Button from './components/Button';
import Loader from './components/Loader';
import ErrorBoundary from './components/ErrorBoundary';
import fetchImg from './services/img-api';
import './styles.css';

class App extends Component {
  state = {
    images: [],
    showModal: false,
    searchQuery: '',
    totalHits: 0,
    currentPage: 1,
    isLoading: false,
    largeImage: '',
    message: '',
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.searchQuery !== prevState.searchQuery) {
      this.fetchApi();
    };
    if (snapshot) {
      window.scrollTo({
        top: document.documentElement.offsetHeight,
        behavior: 'smooth',
      });
    }
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.images.length > 20) {
      return true;
    }
    return false;
  }

  handleClickButton = () => {
    this.fetchApi();
  };

  openModal = (img) => {
    this.setState(({showModal, largeImage}) => ({
      showModal: true,
      largeImage: img,
    }))
  }

  closeModal = () => {
    this.setState(prevState => ({
      largeImage: '',
      showModal: !prevState.showModal,
    }));
  };

  onChangeQuery = (query) => {
    this.setState({
      searchQuery: query,
      images: [],
      totalHits: 0,
      currentPage: 1,
      error: null,
      isLoading: false,
      showModal: false,
    });
  }

  fetchApi = () => {
    const { searchQuery, currentPage } = this.state;
    const options = { searchQuery, currentPage };
    this.setState({ isLoading: true });

    fetchImg(options).then(({ hits, totalHits }) => {
        this.setState({ totalHits: totalHits });
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          currentPage: prevState.currentPage + 1,
        }));
      }).catch(error => this.setState({ error })).finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const {
      images,
      totalHits,
      isLoading,
      largeImage,
      showModal,} = this.state;

    return (
      <ErrorBoundary>
        <Searchbar onSubmit={this.onChangeQuery}/>

        <ImageGallery onClick={this.openModal} images={images} />

        {isLoading && <Loader />}

        {totalHits > 12 && <Button onClick={this.handleClickButton} />}

        {showModal && (
          <Modal onClose={this.closeModal} largeImage={largeImage}>
          </Modal>
        )}
      </ErrorBoundary>
    )
  };
}

export default App;
