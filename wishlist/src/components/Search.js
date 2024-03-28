import { useEffect, useState } from "react";
import { getProducts } from "../data";
import "../styles/components/menu.scss";
import HeartSVG from "../ui/HeartSVG";

/**
 * Search component for handling search-related functionality.
 * @component
 * @param {Object} props
 * @param {Function} props.setProducts - Function to update the 'products' state
 * @returns {JSX.Element} Rendered Search component
 * **/
const Search = ({ setProducts }) => {
  let initialstate = "";
  const [searchValue, setSearchValue] = useState(initialstate);
  const [searchedValues, setSearchedValues] = useState("");
  const [searched, setSearched] = useState(false);

  const searchBody = {
    limit: 10,
    skipFirst: 0,
    search: searchValue,
  };

  /**
   * Fetches products and updates the display array when loading is set to false
   * @description Fetches data for a wishlist based on the provided body,
   * sets the retrieved data in the wishlist state, and updates the loading state accordingly.
   * @param {Object} body
   * @returns {void}
   */
  const fetchData = async (body) => {
    try {
      const data = await getProducts(body);
      setSearchedValues(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  /**
   * Updates the 'products' state when 'searchedValues' change.
   */
  useEffect(() => {
    setProducts(searchedValues);
  }, [searchedValues]);

  /**
   * Handles the change event of the search input.
   * @param {Object} event - Change event object
   * @returns {void}
   */
  const handleSearchChange = (event) => {
    let value = event.target.value;
    if (value == null || value.trim().length === 0) {
      setSearchValue(value);
      fetchData(searchBody);
    }
    setSearchValue(event.target.value);
    value ? setSearched(true) : setSearched(false);
  };

  /**
   * Fetches products when 'searchValue' change.
   */
  useEffect(() => {
    fetchData(searchBody);
  }, [searchValue]);

  /**
   * Handles the refresh action, resetting the search state
   */
  const handleRefresh = () => {
    setSearchValue(initialstate);
    setSearched(false);
  };

  return (
    <>
      <section className="search">
        <div className="input-placeholder">
          <HeartSVG
            fill={searchValue ? "yes" : "none"}
            width={searchValue ? 12 : 16}
            height={searchValue ? 12 : 16}
          />
          <input
            placeholder="Find products"
            value={searchValue}
            onChange={handleSearchChange}
          ></input>
          <button
            className={`search-btn ${searched && "visible"}`}
            onClick={handleRefresh}
          >
            Refresh
          </button>
        </div>
      </section>
    </>
  );
};

export default Search;
