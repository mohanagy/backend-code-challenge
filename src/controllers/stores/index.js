import { parseCsvFile } from 'helpers/parseCsv';
import { parseQuery, checkAddress, calcDistance } from 'helpers/stores';
/**
 * @description getClosestStore is a router used to get the nearest location for the provided point
 * @param {*} req request object
 * @param {*} res response object
 * @return {object} object contains result
 */
export const getClosestStore = async (req, res) => {
  // parseCsvFile from csv to json
  const data = await parseCsvFile();
  // extract requested fields from query
  const query = parseQuery(req.query);
  let latitude; let longitude;
  // assign zip if exists or address if exists
  const address = query.zip || query.address;
  // check if address have value then check the address
  if (address) ({ latitude, longitude } = await checkAddress(address));
  // declare start point
  const startPoint = { latitude, longitude };
  // calc the distance for every record with the point
  const result = calcDistance(data, query, startPoint);
  // sort the result to get the closet
  const [sortedResult] = result.sort((a, b) => a.distance - b.distance);
  // return the result
  return res.json({ result: sortedResult });
};

