import './App.css';
import React, { useState, useEffect } from 'react';
import { getImages, searchImages } from './api';

function App() {
  const [imageList, setImageList] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const responseJson = await getImages();
      setImageList(responseJson.resources);
      setNextCursor(responseJson.next_cursor);
    }
    fetchData();
  }, [])

  const handleLoadMoreButtonClick = async () => {
    const responseJson = await getImages(nextCursor);
    setImageList((currentImageList) => [
      ...currentImageList,
      ...responseJson.resources,
    ]);
    setNextCursor(responseJson.next_cursor);
  };

  const handleFormSubmit = async (event) => {
    /*This will prevent the form from trying to post and refreshing the page */
    event.preventDefault();

    const responseJson = await searchImages(searchValue, nextCursor);
    setImageList(responseJson.resources);
    setNextCursor(responseJson.next_cursor);
  };


  const resetForm = async () => {
    const responseJson = await getImages();
    setImageList(responseJson.resources);
    setNextCursor(responseJson.next_cursor);


    setSearchValue('');
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          required='required'
          placeholder='Search (Ex. Elephants)'></input>
        <button type='submit'>Search</button>
        <button type='button' onClick={resetForm}>Clear</button>
      </form>
      <div className='image-grid'>
        {imageList.map((image) => {
          if (image.format === "mp4") {
            return (
              <video controls loop>
                <source src={image.url} type="video/mp4"></source>
                This browser doesn't support video tag.
              </video>)
          }
          else {
            return (<img src={image.url} alt={image.public_id}></img>)
          }
        })}
      </div>
      <div className='footer'>
        {nextCursor && (
          <button onClick={handleLoadMoreButtonClick}>Load More</button>
        )}
      </div>
    </>
  );
}

export default App;
