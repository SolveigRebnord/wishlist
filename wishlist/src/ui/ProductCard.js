import { useEffect, useRef, useState } from "react";
import "../styles/products.scss";
import HeartSVG from "./HeartSVG";

export default function ProductCard({
  product,
  addToFavorites,
  currentUnit,
  selectPicks,
  selectFavourites,
  picks,
}) {
  const data = localStorage.getItem("wishlist");
  const current = data ? JSON.parse(data) : [];
  const active = current.includes(product.product) ? "yes" : "none";
  const price = Object.values(product.prices);
  const mediafile = Object.values(product.media).map((photo) => photo[0]);
  const size = Object.values(product.items);
  const onSharedWishlist = window.location.href.includes("shared");
  const onWishlist = window.location.href.includes("wishlist");
  const [lowStock, setlowStock] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const componentRef = useRef(null);
  const [fade, setFade] = useState(false);
  const matchingPrices = price.filter((pri) => pri.price.includes(currentUnit));
  const stock = product.items;
  let sizeID = 1;
  let currentPrice = "";

  /**
   * * Sets the 'isMobile' state based on window width and updates it on resize.
   */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth > 750);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /**
   * Observes scroll events to determine if the component is in the viewport and updates the 'fade' state accordingly.
   */
  useEffect(() => {
    const fadeIn = () => {
      if (componentRef.current) {
        const { top, bottom } = componentRef.current.getBoundingClientRect();
        setFade(top < window.innerHeight && bottom >= 0);
      }
    };
    window.addEventListener("scroll", fadeIn);
    fadeIn();
    return () => {
      window.removeEventListener("scroll", fadeIn);
    };
  }, []);

  /**
   * Generates a list of sizes with availability status based on the 'stock' property.
   * @param {Array} size - An array of objects representing different sizes with 'name' and 'stock' properties
   * @returns {Array} An array of available sizes, represented by their name
   */
  let sizes = size.map((str) =>
    str.stock === "few" || str.stock === "yes" ? (
      <li key={sizeID++}>{str.name}</li>
    ) : (
      <li className="not-available" key={sizeID++}>
        {str.name}
      </li>
    ),
  );

  /**
   * Monitors the 'product' data to update stock-related states.
   */
  useEffect(() => {
    product.available === false && setOutOfStock(true);
    stock.lenght > 0
      ? stock.map((prod) => prod.stock === "few" && setlowStock(true))
      : stock.stock === "few" && setlowStock(true);
  }, [product]);

  /**
   * Filters and retrieves the current price based on the specified unit.
   */
  matchingPrices.length > 0
    ? (currentPrice = `${matchingPrices[0].priceAsNumber} ${currentUnit}`)
    : (currentPrice = "Unavailable");

  return (
    <div ref={componentRef} className={`product-card ${fade ? "visible" : ""}`}>
      {selectPicks && (
        <button
          className={`pick-btn ${
            picks.includes(product.product) && "selected"
          }`}
          onClick={() => selectFavourites(product.product)}
        ></button>
      )}
      <div className="stock-options">
        {lowStock && <span>Few left</span>}
        {outOfStock && <span className="outofstock">Out of stock</span>}
        <img
          alt={product.name}
          className={outOfStock ? "not-available" : ""}
          src={
            mediafile.length > 0 ? mediafile[0] : "/images_not_available.svg"
          }
        />
      </div>
      <div className="product-info">
        <div>
          <p className="skinny-italic title">{product.name}</p>
          {isMobile && <p>/ {product.brandName}</p>}
        </div>

        <div>
          <p className="skinny-italic">{currentPrice}</p>
          {!onSharedWishlist && (
            <button
              onClick={() => {
                addToFavorites(product.product);
              }}
            >
              <HeartSVG width={"18"} height={"18"} fill={active} />
            </button>
          )}
        </div>
      </div>
      {!onWishlist && isMobile && <p>- {product.variantName}</p>}
      {!onWishlist && <ul className="sizes">{sizes}</ul>}
    </div>
  );
}
