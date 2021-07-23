import { TextField } from "@material-ui/core";

const MuiTextfield = ({ set, name, unset, fieldValue }) => {
  return (
    <TextField
      id={name}
      value={fieldValue || ""}
      variant="outlined"
      size="small"
      onChange={(e) => (e.target.value ? set(e.target.value) : unset())}
    />
  );
};

export default MuiTextfield;
