import { Slider } from "@material-ui/core";

const MuiRange = ({ set, unset, fieldValue, config }) => {
  const min = config.min || 0;
  const max = config.max || 100;

  const value =
    fieldValue && fieldValue.length > 0
      ? fieldValue[0]
      : { min: min, max: max };

  const muiValue = [value.min, value.max];

  // const setPart = (key, val) => {
  //   const newValue = {
  //     ...value
  //   };
  //   newValue[key] = parseInt(val, 10);
  //   if (newValue.min === min && newValue.max === max) {
  //     unset();
  //   } else {
  //     set(newValue);
  //   }
  // }

  const handleChange = (event, value) => {
    const newValue = {
      min: value[0],
      max: value[1]
    };

    if (newValue.min === min && newValue.max === max) {
      unset();
    } else {
      set(newValue);
    }
  };

  return (
    <Slider
      value={muiValue}
      onChange={handleChange}
      valueLabelDisplay="auto"
      aria-labelledby="range-slider"
    />
  );
};

export default MuiRange;
