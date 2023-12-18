import { createContext, useContext, useEffect, useState } from "react";
import { sendRequest } from "../utils/FetchAPI";

const PhotosContext = createContext();

export function PhotosProvider({ children }) {
  // PHOTOS LIST STATE
  const [photosList, setPhotosList] = useState([]);
  // CATEGORIES LIST STATE
  const [categoriesList, setCategoriesList] = useState([]);
  // STATE FOR NOT FOUND RESULTS
  const [notFound, setNotFound] = useState(false);

  // API TO GET THE PHOTOS LIST
  async function getPhotos() {
    try {
      const response = await sendRequest("/photos", "GET");
      const photos = await response;
      setPhotosList(photos);
    } catch (err) {
      console.error(err);
    }
  }

  // // API TO FILTER THE PHOTOS LIST
  async function filterPhotos(categories) {
    setNotFound(false);
    if (categories == "Tutte") {
      getPhotos();
      return;
    }
    try {
      const response = await sendRequest(
        `/photos?categories=${categories}`,
        "GET"
      );
      const photos = await response;
      setPhotosList(photos);
      if (!photos.length > 0) {
        setNotFound(true);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // // API TO SEARCH A PHOTO
  async function searchPhoto(text) {
    try {
      const response = await sendRequest(`/photos?search=${text}`, "GET");
      const photos = await response;
      setPhotosList(photos);
    } catch (err) {
      console.error(err);
    }
  }

  // API TO GET THE CATEGORIES LIST
  async function getCategories() {
    try {
      const response = await sendRequest("/categories", "GET");
      const categories = await response;
      setCategoriesList(categories);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getPhotos();
    getCategories();
  }, []);

  const values = {
    photosList,
    setPhotosList,
    categoriesList,
    setCategoriesList,
    filterPhotos,
    searchPhoto,
    notFound,
  };

  return (
    <PhotosContext.Provider value={values}>{children}</PhotosContext.Provider>
  );
}

export function usePhotos() {
  return useContext(PhotosContext);
}
