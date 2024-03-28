/**
 * Currency component for selecting and updating the current currency unit.
 * @component
 * @param {Object} props - The properties passed to the component
 * @param {Array} props.currencies - Array of possible currency units
 * @param {Function} props.setCurrentUnit - Update current currency unit
 * @returns {JSX.Element} Rendered Currency component, a currency selection menu
 */
export default function Currency({ currencies, setCurrentUnit }) {
  return (
    <div>
      <select
        name="currenciesForm"
        id="currenciesForm"
        onChange={(e) => setCurrentUnit(e.target.value)}
      >
        {currencies.map((unit) => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </select>
    </div>
  );
}
