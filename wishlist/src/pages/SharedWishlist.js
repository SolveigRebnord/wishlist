import { useEffect, useState } from "react";
import ProductCard from "../ui/ProductCard";
import "../styles/products.scss";
import Currency from "../components/Currency";
import Menu from "../ui/Menu";
import Loader from "../components/Loader";
import getProductsByID from "../data";

const SharedWishlist = () => {
  const [wishlist, setWishlist] = useState();
  const [loading, setLoading] = useState(true);
  const currencies = ["NOK", "SEK", "DKK", "GBP", "EUR", "USD"];
  const [currentUnit, setCurrentUnit] = useState(currencies[0]);
  const [copied, setCopied] = useState(false);

  let pageUrl = window.location.href;
  let params = new URL(document.location).searchParams;
  let products = params.get("products");

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
   * Display "copied"-popup
   */
  const handleCopy = () => {
    navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  useEffect(() => {
    products.length > 0 ? fetchData(JSON.parse(products)) : setLoading(false);
  }, []);

  return (
    <section className="main-narrow">
      <Menu
        pagetitle={"My Shared Wishlist"}
        btnTitle={"Delete"}
        action={() => window.location.replace("/")}
        handleCopy={handleCopy}
        className={"delete"}
      />
      <Currency currencies={currencies} setCurrentUnit={setCurrentUnit} />
      <section className="show-products show-wishlist">
        {loading ? (
          <Loader message={"Getting your favourites"} />
        ) : (
          wishlist &&
          wishlist.map((product) => (
            <ProductCard
              product={product}
              key={product.uri}
              currentUnit={currentUnit}
            />
          ))
        )}
      </section>
      {copied && (
        <div className="copied-popup">
          <p>Copied!</p>
        </div>
      )}
    </section>
  );
};

export default SharedWishlist;
