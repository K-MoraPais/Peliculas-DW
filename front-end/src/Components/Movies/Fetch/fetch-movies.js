import axios from 'axios'
import { useEffect } from 'react';

const FetchMovies = async ({ type, data }) => {

  if (type === 'GETALL') {
    const response = await axios.get('http://127.0.0.1:8000/api/getAll');

    if (response.status !== 200) {
      return 'error';
    }

    return response;
  }

  if (type === 'GETBYID') {
    const response = await axios.get('http://127.0.0.1:8000/api/showById', { params: { idPelicula: data.id } });

    if (response.status !== 200) {
      return 'error';
    }

    return response;
  }

  if (type === 'ADD') {
    const response = await axios.post('http://127.0.0.1:8000/api/store', { nombre: data.name, img: data.image });

    if (response.status !== 200) {
      return 'error';
    }

    return response;
  }

}

export default FetchMovies;