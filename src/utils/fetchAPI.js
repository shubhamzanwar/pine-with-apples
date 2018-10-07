import Axios from 'axios';

const fetchAPI = (options) => {
    return Axios(options)
        .then((response) => {
            console.log("[Axios request] ", response.data);
            return response.data;
        })
        .catch((e) => {
            console.log("[Axios request]: failed to fetch API ", e);
        })
}

export default fetchAPI;