import "./styles.css";

import Filters from "./filters/components/Filters";
import MuiFilter from "./filters/components/MuiFilter";
import MuiFilterTags from "./filters/components/MuiFilterTags";
import FiltersAction from "./filters/components/FiltersAction";
import { useState } from "react";

import {
  TextField,
  InputAdornment,
  NoSsr,
  makeStyles,
  colors
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  searchGrid: {
    zIndex: 3,
    position: "relative"
  },
  textField: {
    width: "100%"
  },
  searchButton: {
    width: "100%",
    height: "100%"
  },
  searchIcon: {
    color: colors.grey[600]
  },
  divider: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10
  },
  cardContent: {
    padding: "32px 24px 12px"
  },
  searchChip: {
    marginRight: 10
  }
}));

const filters = {
  search: {
    type: "Text",
    label: "Zoeken"
  },
  checkboxes: {
    type: "Checkboxes",
    label: "Checkboxes",
    options: [
      { value: "one", label: "One" },
      { value: "two", label: "Two" },
      { value: "three", label: "Three" }
    ]
  },
  radio: {
    type: "Radio",
    label: "Radio buttons",
    options: [
      { value: "one", label: "One" },
      { value: "two", label: "Two" },
      { value: "three", label: "Three" }
    ]
  },
  select: {
    type: "Select",
    label: "Select dropdown",
    options: [
      { value: "one", label: "One" },
      { value: "two", label: "Two" },
      { value: "three", label: "Three" }
    ]
  },
  range: {
    type: "Range",
    label: "Range value"
  }
};

const makeQueryString = (filters, wrap) => {
  if (!filters) return "";

  return Object.keys(filters)
    .map((name) => {
      const key = wrap ? `${wrap}[${name}]` : name;
      if (typeof filters[name][0] === "object") {
        return `${key}[gte]=${filters[name][0].min}&${key}[lte]=${filters[name][0].max}`;
      }
      return filters[name].map((value) => `${key}[]=${value}`).join("&");
    })
    .join("&");
};

const SearchField = ({ label, set, unset, fieldValue }) => {
  const classes = useStyles();
  const searchTerm = (fieldValue?.length && fieldValue[0]) || "";

  const setSearchTerm = (value) => {
    if (value) {
      set(value);
    } else {
      unset();
    }
  };

  return (
    <TextField
      label={label}
      variant="outlined"
      className={classes.textField}
      value={searchTerm}
      size="medium"
      onChange={(e) => setSearchTerm(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <NoSsr>
              <i className="fas fa-search" />
            </NoSsr>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            {searchTerm && (
              <NoSsr>
                <i
                  onClick={() => setSearchTerm("")}
                  style={{
                    cursor: "pointer"
                  }}
                  className="fas fa-times"
                />
              </NoSsr>
            )}
          </InputAdornment>
        )
      }}
    />
  );
};

export default function App() {
  const [queryString, setQueryString] = useState("");
  const handleChange = (values) => {
    setQueryString(makeQueryString(values, "f"));
  };

  return (
    <div className="App">
      <p>
        Query string:{" "}
        <span style={{ fontFamily: "Menlo,monospace" }}>{queryString}</span>
      </p>

      <Filters handleChange={handleChange}>
        <MuiFilterTags />

        <MuiFilter
          name="query"
          label="Functie, trefwoord of bedrijf..."
          infieldLabel
          component={SearchField}
          config={{ type: "Text" }}
        />

        {Object.keys(filters).map((name) => {
          return (
            <MuiFilter
              key={name}
              name={name}
              label={filters[name].label}
              config={filters[name]}
            />
          );
        })}
        <FiltersAction apply>Filters toepassen</FiltersAction>
      </Filters>
    </div>
  );
}
