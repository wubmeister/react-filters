import { useContext } from "react";
import FilterContext from "../contexts/FilterContext";
import FilterTagsContext from "../contexts/FilterTagsContext";
import FiltersAction from "./FiltersAction";

const FilterTags = () => {
  const filterTags = useContext(FilterTagsContext);
  const filterState = useContext(FilterContext);

  const clear = (name, value) => {
    filterState.unselect(name, value);
    if (filterState.field(name)?.type === "Text") {
      filterState.apply();
    }
  };

  return (
    <>
      {filterTags &&
        filterTags.map((tag) => {
          const value =
            typeof tag.value !== "string"
              ? JSON.stringify(tag.value)
              : tag.value;

          return (
            <span className="FilterTag" key={`${tag.name}_${value}`}>
              {tag.label}: {tag.valueLabel}
              <span
                className="FilterTag-clear"
                onClick={(e) => clear(tag.name, tag.value)}
              >
                &times;
              </span>
            </span>
          );
        })}
      {filterTags?.length > 0 && (
        <FiltersAction clear>Wis alle filters</FiltersAction>
      )}
    </>
  );
};

export default FilterTags;
