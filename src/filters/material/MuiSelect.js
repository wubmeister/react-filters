import { Select, MenuItem, FormControl } from "@material-ui/core";

const MuiSelect = ({ name, set, unset, config, fieldValue }) => {
  const handleChange = (event) => {
    const value = event.target.value;
    if (value) {
      set(value);
    } else {
      unset();
    }
  };

  return (
    <FormControl size="small" variant="outlined">
      <Select
        id={name}
        value={(fieldValue && fieldValue[0]) || ""}
        onChange={handleChange}
      >
        <MenuItem value="">&nbsp;</MenuItem>
        {config.options?.map((option) => {
          const id = `Option_${name}_${option.value}`;
          return (
            <MenuItem key={id} value={option.value}>
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default MuiSelect;
