const FilterTextfield = ({ set, unset, fieldValue }) => {
  return (
    <div className="Textfield">
      <input
        type="text"
        value={fieldValue || ""}
        onChange={(e) => (e.target.value ? set(e.target.value) : unset())}
      />
    </div>
  )
}

export default FilterTextfield
