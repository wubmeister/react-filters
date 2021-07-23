const FilterRange = ({ set, unset, fieldValue, config }) => {
  const min = config.min || 0;
  const max = config.max || 100;

  const value =
    fieldValue && fieldValue.length > 0
      ? fieldValue[0]
      : { min: min, max: max };

  function setPart(key, val) {
    const newValue = {
      ...value
    };
    newValue[key] = parseInt(val, 10);
    if (newValue.min === min && newValue.max === max) {
      unset();
    } else {
      set(newValue);
    }
  }

  return (
    <div className="Range">
      <input
        type="number"
        style={{ width: 50 }}
        value={value.min || min}
        onChange={(e) => setPart("min", e.target.value || min)}
      />
      <input
        type="number"
        style={{ width: 50 }}
        value={value.max || max}
        onChange={(e) => setPart("max", e.target.value || max)}
      />
    </div>
  );
};

export default FilterRange;
