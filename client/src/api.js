/*This is where we'll put our API requests */
const API_URL = process.env.REACT_APP_API_URL;

/*Function to call the photos endpoint and return a JSON*/

export const getImages = async (nextCursor) => {

    const params = new URLSearchParams();
    if (nextCursor) {
        params.append('next_cursor', nextCursor);
    }
    /* '?' is to indicate the start of query params and ${params} will be a string and get appended to the request*/
    const response = await fetch(`${API_URL}/photos?${params}`);

    const responseJson = await response.json();

    return responseJson;
};


export const searchImages = async (searchValue, nextCursor) => {

    const params = new URLSearchParams();

    params.append(`expression`, searchValue);
    if (nextCursor) {
        params.append('next_cursor', nextCursor);
    }
    const response = await fetch(`${API_URL}/search?${params}`);

    const responseJson = await response.json();

    return responseJson;
};

