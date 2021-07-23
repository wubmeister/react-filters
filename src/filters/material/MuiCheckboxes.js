import { Checkbox, FormGroup, FormControlLabel } from "@material-ui/core";

const MuiCheckboxes = ({ name, toggle, config, fieldValue }) => {
  const handleChange = (e, value) => {
    toggle(value, e.target.checked);
  };

  return (
    <FormGroup>
      {config.options?.map((option) => {
        const id = `Checkbox_${name}_${option.value}`;
        return (
          <FormControlLabel
            key={id}
            control={
              <Checkbox
                checked={fieldValue?.indexOf(option.value) > -1}
                onChange={(e) => handleChange(e, option.value)}
                name={name}
              />
            }
            label={option.label}
          />
        );
      })}
    </FormGroup>
  );
};

export default MuiCheckboxes;
