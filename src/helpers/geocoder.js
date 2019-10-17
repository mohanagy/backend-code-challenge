import NodeGeocoder from 'node-geocoder';
import config from 'config';

const { google: { API_KEY } } = config;
const options = {
  provider: 'google',
  apiKey: API_KEY,
  formatter: null
};
export const geocoder = NodeGeocoder(options);

