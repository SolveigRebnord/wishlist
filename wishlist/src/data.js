import axios from "axios";

const APIurl = process.env.REACT_APP_API_URL;

/**
 * Using axios, it sends a POST request to the specified API URL to fetch products.
 * @param {Object} body
 * @returns {Promise} If resolved, returns an array of product objects
 */
export const getProducts = async (body) => {
  try {
    const response = await axios({
      method: "post",
      url: APIurl,
      data: body,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Using axios, it sends a POST request to the specified API URL to fetch products.
 * @param {Array} array of product IDs
 * @returns {Promise} If resolved, returns an array of product objects
 */
export default async function getProductsByID(array) {
  try {
    const response = await axios({
      method: "post",
      url: APIurl,
      data: { products: array },
    });
    let data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
