const FilterSelect = ({ name, set, unset, config, fieldValue }) => {
  const handleChange = (e) => {
    if (
      e.target.selectedIndex > -1 &&
      e.target.options[e.target.selectedIndex].value
    ) {
      set(e.target.options[e.target.selectedIndex].value);
    } else {
      unset();
    }
  };

  return (
    <select onChange={handleChange} value={(fieldValue && fieldValue[0]) || ""}>
      <option key={`Option_${name}`} value=""></option>
      {config.options?.map((option) => {
        const id = `Option_${name}_${option.value}`;
        return (
          <option key={id} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
};

export default FilterSelect;
