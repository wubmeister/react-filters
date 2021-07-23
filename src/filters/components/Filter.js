import { useContext, useEffect, useState } from "react";
import FilterContext from "../contexts/FilterContext";
import FilterValuesContext from "../contexts/FilterValuesContext";
import FilterCheckboxes from "../fields/FilterCheckboxes";
import FilterRadio from "../fields/FilterRadio";
import FilterRange from "../fields/FilterRange";
import FilterSelect from "../fields/FilterSelect";
import FilterTextfield from "../fields/FilterTextfield";

const Filter = ({ name, label, config, component }) => {
  let Component = component;
  const filterState = useContext(FilterContext);
  const values = useContext(FilterValuesContext);

  filterState.addField(name, { label: label || name, ...config });

  const field = filterState.field(name);

  useEffect(() => {
    setFieldValue(values && values[name]);
  }, [values]);

  const [fieldValue, setFieldValue] = useState(
    field.value ? [...field.value] : []
  );

  const set = (value) => {
    filterState.set(name, value);
  };

  const unset = () => {
    filterState.unset(name);
  };

  const toggle = (value, toggled) => {
    if (toggled !== undefined) {
      toggled
        ? filterState.select(name, value)
        : filterState.unselect(name, value);
    } else {
      filterState.toggle(name, value);
    }
  };

  if (!component) {
    switch (config.type) {
      case "Checkboxes":
        Component = FilterCheckboxes;
        break;
      case "Radio":
        Component = FilterRadio;
        break;
      case "Range":
        Component = FilterRange;
        break;
      case "Select":
        Component = FilterSelect;
        break;
      default:
        Component = FilterTextfield;
        break;
    }
  }

  return (
    <div className="Filter">
      <h5>{label || name}</h5>
      <Component
        name={name}
        set={set}
        unset={unset}
        toggle={toggle}
        config={config}
        fieldValue={fieldValue}
      />
    </div>
  );
};

export default Filter;
