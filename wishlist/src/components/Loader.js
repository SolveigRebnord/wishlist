import HeartSVG from "../ui/HeartSVG";
import "../styles/components/loader.scss";

/**
 * Loader component for displaying a loading indicator with a message.
 * @component
 * @param {Object} props
 * @param {string} props.message - Message to be displayed in loader
 * @returns {JSX.Element} Rendered Loader component with a loading indicator and message
 */
const Loader = ({ message }) => {
  return (
    <section className="loader">
      <HeartSVG name={"heart"} width={"12"} height={"12"} fill={"none"} />
      <p>{message}</p>
    </section>
  );
};

export default Loader;
