import Currency from "../components/Currency";
import Search from "../components/Search";
import ProductCard from "../ui/ProductCard";
import "../styles/products.scss";
import { useEffect, useState } from "react";
import { getProducts } from "../data";
import Loader from "../components/Loader";

export default function Products() {
  const currencies = ["NOK", "SEK", "DKK", "GBP", "EUR", "USD"];
  const [currentUnit, setCurrentUnit] = useState(currencies[0]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  let data = localStorage.getItem("wishlist");
  let wishlist = data ? JSON.parse(data) : [];
  let initial = !wishlist ? [] : wishlist;
  const [favourites, setFavorites] = useState(initial);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [reachedBottom, setReachedBottom] = useState(false);

  let productBody = {
    limit: pageSize,
    skipFirst: products.length,
    search: "",
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
      setProducts([...products, ...data]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  /**
   * Fetches data based on the provided product body when triggered by scrolling or button click.
   * OPTION: [reachedBottom] if load more by scroll | [page] if load more each click
   * [page] --> then needs <button onClick={loadMore}>Load more</button> added in rendered JSX
   * @param {Object} productBody - Body of request
   * @param {boolean} [reachedBottom] - Does a new fetch when returning true, meaning the user has hit page bottom
   * @returns {void}
   */
  useEffect(() => {
    fetchData(productBody);
  }, [reachedBottom]);

  /**
   * OPTION: Increments the 'page' state to load more data.
   */
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  /**
   * Allows user to add or remove favourites
   * @param {number} productId
   */
  const likeProduct = (productId) => {
    const storedWishlist = localStorage.getItem("wishlist");
    const currentWishlist = storedWishlist ? JSON.parse(storedWishlist) : [];

    const newWishlist = !currentWishlist.includes(productId)
      ? [...currentWishlist, productId]
      : currentWishlist.filter((prod) => prod !== productId);
    setFavorites(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
  };

  /**
   * * Listens for scroll events to determine if the bottom has been reached.
   */
  useEffect(() => {
    const handleScroll = () => {
      const hasReachedBottom =
        document.documentElement.offsetHeight -
          (window.innerHeight + document.documentElement.scrollTop) <=
        10;
      setReachedBottom(hasReachedBottom);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reachedBottom]);
  return (
    <>
      <Search setProducts={setProducts} />
      <Currency currencies={currencies} setCurrentUnit={setCurrentUnit} />
      {loading ? (
        <Loader message={"Checking the storage"} />
      ) : products.length > 0 ? (
        <>
          <section className="show-products">
            {products &&
              products.map((product) => (
                <ProductCard
                  key={product.uri}
                  addToFavorites={likeProduct}
                  currentUnit={currentUnit}
                  product={product}
                />
              ))}
          </section>
        </>
      ) : (
        <div className="loader no-products">
          <img src="/broken_heart.svg"></img>
          <span>We're sorry, there seems to be no products</span>
          <span>
            Try another search, or{" "}
            <a onClick={() => window.location.reload()}>refresh the page</a>
          </span>
        </div>
      )}
    </>
  );
}
