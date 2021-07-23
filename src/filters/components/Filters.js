import { useEffect, useState } from "react";
import FilterContext from "../contexts/FilterContext";
import FilterTagsContext from "../contexts/FilterTagsContext";
import FilterValuesContext from "../contexts/FilterValuesContext";
import FilterState from "../helpers/FilterState";

const filterState = new FilterState();
let rangeStash = false;

setInterval(() => {
  if (rangeStash) {
    rangeStash = false;
    filterState.apply();
  }
}, 1000);

const Filters = ({ children, handleChange }) => {
  const [values, setValues] = useState(null);
  const [filterTags, setFilterTags] = useState(null);

  useEffect(() => {
    setValues({});
    setFilterTags([]);
  }, []);

  filterState.onChange = (what, name, field) => {
    const _values = filterState.getValues();
    setValues(_values);
    if (field?.type === "Range") {
      rangeStash = true;
    } else if (field?.type !== "Text") {
      setFilterTags(filterState.selectedTags());
      if (handleChange) {
        handleChange(_values);
      }
    }
  };

  return (
    <FilterContext.Provider value={filterState}>
      <FilterTagsContext.Provider value={filterTags}>
        <FilterValuesContext.Provider value={values}>
          {children}
        </FilterValuesContext.Provider>
      </FilterTagsContext.Provider>
    </FilterContext.Provider>
  );
};

export default Filters;
