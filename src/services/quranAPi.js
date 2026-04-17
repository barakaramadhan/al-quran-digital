import axios from 'axios';

const BASE_URL = 'https://equran.id/api/v2';

export const fetchAllSurah = () => axios.get(`${BASE_URL}/surat`);
export const fetchDetailSurah = (nomor) => axios.get(`${BASE_URL}/surat/${nomor}`);