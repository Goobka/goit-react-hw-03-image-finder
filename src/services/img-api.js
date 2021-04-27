import axios from 'axios';

const key = '21126804-85bb01ef7c150b1f15b426857';
axios.defaults.baseURL = `https://pixabay.com/api/?key=${key}&per_page=12`;

const fetchImg = async ({searchQuery, currentPage}) => {
  try {
    const axiosGetResult = await axios.get(`&q=${searchQuery}&page=${currentPage}`);
    return axiosGetResult.data;
  } catch (error) {
    throw error;
  }
}

export default fetchImg;