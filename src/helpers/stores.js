import { geocoder } from 'helpers/geocoder';
import haversine from 'haversine';
const unitsSystem = { mi: 'mile', km: 'km' };

/**
 * @description parseQuery is a function used to get zip ,address ,units from query
 * @param {object} query request query
 * @return {object} object contains zip and address and unites only
 */
export const parseQuery = (query) => {
  const { zip, address, units } = query;
  return { zip, address, units };
};
/**
 * @description checkAddress is a function used to reverse address and zip to object contains all data
 * @param {string|number} address the value of zip code and address
 * @return {object} object contains long and lat
 */

export const checkAddress = async (address) => {
  const [geocodeData] = await geocoder.geocode(address);
  return geocodeData;
};

/**
 * @description calcHaversine is a function used to calc the distance between two points
 * using Haversine formula
 * @param {object} start object contains lat ,long of start point
 * @param {object} end object contains lat ,long of end point
 * @param {string} unit unit used to get distance
 * @return {number} the distance
 */
export const calcHaversine = (start, end, unit) => haversine(start, end, { unit });

/**
 * @description calcDistance is a function used to go through all csv address
 * an will calc the distance between the requested point and the stores
 * @param {array} data array of objects contains store location
 * @param {object} query objet contains the requested unit
 * @param {object} startPoint the required point which we want to get the closet for it
 * @return {array} array of same stores concatenated with distance
 */
export const calcDistance = (data, query, startPoint) => data.map((row) => {
  const endPoint = { latitude: row.Latitude, longitude: row.Longitude };
  const unit = unitsSystem[query.units || 'mi'];
  const distance = calcHaversine(startPoint, endPoint, unit);
  return { ...row, distance };
});

