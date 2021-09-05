import { useState, useEffect } from "react";
import s from "./App.module.css";
import Loader from "react-loader-spinner";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageApi from "./services/image-api";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";

function App() {
  const [imagesSearch, setImageSearch] = useState("");
  const [hits, setHits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImg = () => {
      if (!imagesSearch) {
        return;
      }
      setLoading(true);

      ImageApi(imagesSearch, currentPage)
        .then((result) => {
          setHits((prevState) => [...prevState, ...result]);
          setLoading(false);
        })
        .catch((error) => {
          alert(`При загрузке изображений произошла ошибка ${error}`);
        })
        .finally(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        });
    };

    fetchImg();
  }, [imagesSearch, currentPage]);

  const handlFormSubmit = (data) => {
    setImageSearch(data);
    setHits([]);
    setCurrentPage(1);
  };

  const modalOpen = (largeImage) => {
    setShowModal(true);
    setModalImage(largeImage);
  };

  const modalClose = () => {
    setShowModal(false);
    setModalImage("");
  };

  const incrementPage = () => {
    setCurrentPage((prevState) => prevState + 1);
  };

  return (
    <div className={s.App}>
      <SearchBar onSubmit={handlFormSubmit} />
      {loading && (
        <Loader type="Circles" color="#00BFFF" height={180} width={180} />
      )}
      {imagesSearch && <ImageGallery images={hits} onImageClick={modalOpen} />}
      {hits.length > 0 && (
        <Button text="Load more" onLoadClick={incrementPage} />
      )}
      {showModal && (
        <Modal onClose={modalClose}>
          <img src={modalImage} alt="" />
        </Modal>
      )}
    </div>
  );
}

export default App;
