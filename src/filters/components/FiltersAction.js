import { useContext } from "react";
import FilterContext from "../contexts/FilterContext";

const FiltersAction = ({ clear, apply, children, component, ...props }) => {
  const filterContext = useContext(FilterContext);
  const Component = component;

  const handleClick = (e) => {
    if (clear) {
      filterContext.clear();
    } else if (apply) {
      filterContext.apply();
    }
  };

  return component ? (
    <Component onClick={handleClick} {...props}>
      {children}
    </Component>
  ) : (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  );
};

export default FiltersAction;
