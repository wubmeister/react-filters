import { useContext, useEffect, useState } from "react";
import FilterContext from "../contexts/FilterContext";
import FilterValuesContext from "../contexts/FilterValuesContext";

import MuiCheckboxes from "../material/MuiCheckboxes";
import MuiRadio from "../material/MuiRadio";
import MuiRange from "../material/MuiRange";
import MuiSelect from "../material/MuiSelect";
import MuiTextfield from "../material/MuiTextfield";

import { Typography } from "@material-ui/core";

const Filter = ({ name, label, config, component, infieldLabel }) => {
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
        Component = MuiCheckboxes;
        break;
      case "Radio":
        Component = MuiRadio;
        break;
      case "Range":
        Component = MuiRange;
        break;
      case "Select":
        Component = MuiSelect;
        break;
      default:
        Component = MuiTextfield;
        break;
    }
  }

  return (
    <div className="Filter">
      {!infieldLabel && <Typography gutterBottom>{field.label}</Typography>}
      <Component
        name={name}
        label={label}
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
