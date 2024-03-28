import { useEffect, useState } from "react";
import ProductCard from "../ui/ProductCard";
import "../styles/products.scss";
import Currency from "../components/Currency";
import Menu from "../ui/Menu";
import Loader from "../components/Loader";
import getProductsByID from "../data";
import { NavLink } from "react-router-dom";

const Wishlist = () => {
  const currencies = ["NOK", "SEK", "DKK", "GBP", "EUR", "USD"];
  const [currentUnit, setCurrentUnit] = useState(currencies[0]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [picks, setPicks] = useState([]);
  const [selectPicks, setSelectPicks] = useState(false);
  let localeStor = localStorage.getItem("wishlist");
  let data = localeStor ? JSON.parse(localeStor) : [];

  /**
   * Allows user to add or remove favourites
   * @param {number} productId
   */
  function likeProduct(productId) {
    let storage = JSON.parse(localStorage.getItem("wishlist")) || [];
    let newlist = storage.filter((prod) => prod !== productId);
    setFavorites(newlist);
    localStorage.setItem("wishlist", JSON.stringify(newlist));
    newlist.length > 0
      ? (() => {
          fetchData(newlist);
        })()
      : setWishlist(false);
  }

  /**
   *  Allows user to select which favourites for the shared wishlist
   * @param {number} productId
   */
  function selectFavourites(productId) {
    !picks.includes(productId)
      ? setPicks([...picks, productId])
      : setPicks([
          ...picks.filter((id) => {
            return id !== productId;
          }),
        ]);
  }

  /**
   * Fetches products and updates the display array when loading is set to false
   * @description Fetches data for a wishlist based on the provided body,
   * sets the retrieved data in the wishlist state, and updates the loading state accordingly.
   * @param {Object} body
   * @returns {void}
   */
  const fetchData = async (body) => {
    try {
      const data = await getProductsByID(body);
      setWishlist(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  /**
   * Generates a random uuid for a new shared wishlist URL
   * @returns {string} uuid
   */
  const randomUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  };

  /**
   * Creates new URL containing uuid and products wanted in the shared wistlist
   * @returns {string} url
   */
  const generateNewUrl = () => {
    const baseUrl = `${window.location.href}/shared`;
    const uuid = randomUUID();
    let newUrl = "";
    picks.length !== 0
      ? (newUrl = `${baseUrl}?uuid=${uuid}&products=${JSON.stringify(picks)}`)
      : (newUrl = `${window.location.href}`);
    return newUrl;
  };

  useEffect(() => {
    data.length > 0 ? fetchData(data) : setLoading(false);
  }, []);

  return (
    <>
      <section className="main-narrow">
        <Menu
          pagetitle={"My Wishlist"}
          className={"share-btn"}
          action={() => setSelectPicks(!selectPicks)}
          btnTitle={"Share"}
        />
        <Currency currencies={currencies} setCurrentUnit={setCurrentUnit} />

        {loading ? (
          <Loader message={"Searching for the good stuff"} />
        ) : wishlist.length > 0 ? (
          <section className="show-products show-wishlist">
            {wishlist.map((product) => (
              <ProductCard
                key={product.uri}
                product={product}
                addToFavorites={likeProduct}
                currentUnit={currentUnit}
                selectPicks={selectPicks}
                picks={picks}
                selectFavourites={selectFavourites}
              />
            ))}
          </section>
        ) : (
          <div className="loader no-products">
            <img src="/broken_heart.svg"></img>
            <span>You have no favorites at the moment :-&#40;</span>
            <span>
              Let's go
              <a onClick={() => window.location.reload()}> find some</a>
            </span>
          </div>
        )}
      </section>
      {selectPicks && (
        <div className={`pick-items-box ${selectPicks && "visible"}`}>
          <div>
            <span className="items-number">{picks.length}</span>
            <span>{picks.length === 1 ? " item " : " items "}</span>
          </div>
          <div>
            <NavLink
              className={`main-btn share-list  ${
                picks.length !== 0 && "visible"
              }`}
              to={generateNewUrl()}
            >
              Share list
            </NavLink>
            <button className="main-btn" onClick={() => setSelectPicks(false)}>
              Exit
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Wishlist;
