const FilterRadio = ({ name, set, config, fieldValue }) => {
  const handleChange = (e, value) => {
    set(value);
  };

  return config.options?.map((option) => {
    const id = `Radio_${name}_${option.value}`;
    return (
      <div className="FilterRadio-root" key={id}>
        <input
          type="radio"
          id={id}
          name={`Radio_${name}`}
          checked={fieldValue?.indexOf(option.value) > -1}
          onChange={(e) => handleChange(e, option.value)}
        />
        <label htmlFor={id}>{option.label}</label>
      </div>
    );
  });
};

export default FilterRadio;
