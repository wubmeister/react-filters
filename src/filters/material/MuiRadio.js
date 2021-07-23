import { Radio, FormGroup, FormControlLabel } from "@material-ui/core";

const MuiRadio = ({ name, set, config, fieldValue }) => {
  const handleChange = (e, value) => {
    set(value);
  };

  return (
    <FormGroup>
      {config.options?.map((option) => {
        const id = `Checkbox_${name}_${option.value}`;
        return (
          <FormControlLabel
            key={id}
            control={
              <Radio
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

export default MuiRadio;
