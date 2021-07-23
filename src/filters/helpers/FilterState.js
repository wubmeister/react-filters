class FilterState {
  constructor(fields, onChange) {
    this.fields = fields ? { ...fields } : {};
    this.clear();
    this.onChange = onChange;
  }

  triggerChange(what, name, value) {
    if (this.onChange) {
      this.onChange(what, name, name && this.fields[name], value);
    }
  }

  _clearField(field) {
    field.options?.forEach((option) => {
      option.selected = false;
    });
    field.value = [];
  }

  clear() {
    for (let name in this.fields) {
      this._clearField(this.fields[name]);
    }
    this.triggerChange("clear");
  }

  apply() {
    this.triggerChange("apply");
  }

  field(name) {
    return this.fields[name];
  }

  addField(name, def, overwrite) {
    if (!overwrite && this.fields[name]) return;
    this.fields[name] = def;
    this._clearField(this.fields[name]);
  }

  select(name, value, reset) {
    const field = this.field(name);
    if (field) {
      if (!field.value) {
        field.value = [];
      }
      let changed;
      if (field.options) {
        changed = false;
        field.options.forEach((option) => {
          if (option.value === value) {
            if (!option.selected) changed = true;
            option.selected = true;
          } else if (reset) {
            option.selected = false;
          }
        });
      }

      changed = changed && field.value.indexOf(value) === -1;

      if (changed) {
        if (reset) {
          field.value = [value];
        } else {
          field.value.push(value);
        }
        this.triggerChange("select", name, value);
      }
    }
  }

  unselect(name, value) {
    const field = this.field(name);
    if (field) {
      if (!field.value) {
        return;
      }

      if (field.options) {
        field.options.forEach((option) => {
          if (option.value === value) {
            option.selected = false;
          }
        });
      }

      const index = field.value.indexOf(value);
      if (index > -1) {
        field.value.splice(index, 1);
        this.triggerChange("unselect", name, value);
      }
    }
  }

  toggle(name, value) {
    const field = this.field(name);
    if (field) {
      if (!field.value) {
        field.value = [];
      }
      let changed = true;
      if (field.options) {
        changed = false;
        field.options.forEach((option) => {
          if (option.value === value) {
            changed = true;
            if (!option.selected) {
              option.selected = true;
              if (field.value.indexOf(value) === -1) {
                field.value.push(value);
              }
            } else {
              option.selected = false;
              const index = field.value.indexOf(value);
              if (index > -1) {
                field.value.splice(index, 1);
              }
            }
          }
        });
      } else {
        const index = field.value.indexOf(value);
        if (index > -1) {
          field.value.splice(index, 1);
        } else {
          field.value.push(value);
        }
      }

      if (changed) {
        this.triggerChange("toggle", name, value);
      }
    }
  }

  set(name, value) {
    const field = this.field(name);
    if (field) {
      if (field.options) {
        this.select(name, value, true);
      } else if (
        !field.value ||
        field.value.length !== 1 ||
        (field.value.length === 1 && field.value[0] !== value)
      ) {
        field.value = [value];
        this.triggerChange("set", name, value);
      }
    }
  }

  unset(name) {
    const field = this.field(name);
    if (field) {
      this._clearField(field);
      this.triggerChange("unset", name);
    }
  }

  all() {
    return this.fields;
  }

  map(callback) {
    return Object.keys(this.fields).map((name, index) =>
      callback(this.fields[name], name, index)
    );
  }

  selected() {
    const selected = [];

    for (let name in this.fields) {
      const field = this.fields[name];
      if (field.value?.length) {
        selected.push({
          name: name,
          value: field.value
        });
      }
    }

    return selected;
  }

  getValues() {
    const values = [];

    for (let name in this.fields) {
      const field = this.fields[name];
      if (field.value?.length) {
        values[name] = [...field.value];
      }
    }

    return values;
  }

  selectedTags() {
    const selected = [];

    for (let name in this.fields) {
      const field = this.fields[name];
      if (field.value?.length) {
        if (field.options) {
          field.options.forEach((option) => {
            if (option.selected) {
              selected.push({
                name: name,
                label: field.label,
                value: option.value,
                valueLabel: option.label
              });
            }
          });
        } else {
          const value = field.value[0];
          let valueLabel = value;
          if (value && typeof value !== "string") {
            valueLabel = `${value.min} - ${value.max}`;
          }
          selected.push({
            name,
            label: field.label,
            value,
            valueLabel
          });
        }
      }
    }

    return selected;
  }
}

export default FilterState;
