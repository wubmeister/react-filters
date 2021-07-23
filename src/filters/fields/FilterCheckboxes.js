const FilterCheckboxes = ({ name, toggle, config, fieldValue }) => {
  const handleClick = (e, value) => {
    toggle(value, e.target.checked)
  }

  return config.options?.map((option) => {
    const id = `Checkbox_${name}_${option.value}`
    return (
      <div className="Checkbox" key={id}>
        <input
          type="checkbox"
          id={id}
          checked={fieldValue?.indexOf(option.value) > -1}
          onChange={(e) => handleClick(e, option.value)}
        />
        <label htmlFor={id}>{option.label}</label>
      </div>
    )
  })
}

export default FilterCheckboxes
