import { createContext, useContext, useEffect, useState } from "react";

const PhotosContext = createContext();

export function PhotosProvider({ children }) {
  // PHOTOS LIST STATE
  const [photosList, setPhotosList] = useState([]);
  // CATEGORIES LIST STATE
  const [categoriesList, setCategoriesList] = useState([]);

  // API TO GET THE PHOTOS LIST
  async function getPhotos() {
    try {
      const response = await fetch("http://localhost:3000/photos");
      const photos = await response.json();
      setPhotosList(photos);
    } catch (err) {
      console.error(err);
    }
  }

  // // API TO FILTER THE PHOTOS LIST
  async function filterPhotos(categories) {
    if (categories == "Tutte") {
      getPhotos();
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/photos?categories=${categories}`
      );
      const photos = await response.json();
      setPhotosList(photos);
    } catch (err) {
      console.error(err);
    }
  }

  // // API TO SEARCH A PHOTO
  async function searchPhoto(text) {
    try {
      const response = await fetch(
        `http://localhost:3000/photos?search=${text}`
      );
      const photos = await response.json();
      setPhotosList(photos);
    } catch (err) {
      console.error(err);
    }
  }

  // API TO GET THE CATEGORIES LIST
  async function getCategories() {
    try {
      const response = await fetch("http://localhost:3000/categories");
      const categories = await response.json();
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
  };

  return (
    <PhotosContext.Provider value={values}>{children}</PhotosContext.Provider>
  );
}

export function usePhotos() {
  return useContext(PhotosContext);
}
