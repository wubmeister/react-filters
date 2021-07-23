import { Button, Chip } from "@material-ui/core";
import { useContext } from "react";
import FilterContext from "../contexts/FilterContext";
import FilterTagsContext from "../contexts/FilterTagsContext";
import FiltersAction from "./FiltersAction";

const MuiFilterTags = () => {
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
          return (
            <Chip
              label={`${tag.label}: ${tag.valueLabel}`}
              onDelete={(e) => clear(tag.name, tag.value)}
              variant="outlined"
              size="small"
              style={{ marginRight: 10 }}
            />
          );
        })}
      {filterTags?.length > 0 && (
        <FiltersAction clear component={Button} variant="outlined" size="small">
          Wis alle filters
        </FiltersAction>
      )}
    </>
  );
};

export default MuiFilterTags;
