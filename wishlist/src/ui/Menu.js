import React from "react";
import "../styles/components/menu.scss";

/**
 * Menu Component - rendering Menu section
 * @param {string} pagetitle - Title of the page
 * @param {string} btnTitle - Title of the button
 * @param {Function} handleCopy - Display copied-popup (conditionally rendered)
 * @param {string} className: Additional classnames for styling
 * @param {Function} action: Function to be executed when clicking button
 * @returns {JSX.Element} The Menu component
 */
function Menu({ pagetitle, btnTitle, handleCopy, className, action }) {
  return (
    <>
      <section className="menu">
        <h1>{pagetitle}</h1>
        <div>
          {window.location.pathname === "/wishlist/shared" && (
            <button onClick={() => handleCopy()} className="">
              Copy
            </button>
          )}
          <button className={`${className}`} onClick={action}>
            {btnTitle}
          </button>
        </div>
      </section>
    </>
  );
}

export default Menu;
