const { Autocomplete, TextField } = require("@mui/material");

const CustomAutocompleteBarang = ({ options, onChange, onInputChange, defaultValue, label }) => {
    return (
      <Autocomplete
        options={options}
        id="free-solo-demo"
        onInputChange={onInputChange}
        onChange={onChange}
        defaultValue={defaultValue}
        getOptionLabel={option => option.nama || ''}
        renderInput={props => <TextField {...props} fullWidth  label={label} />}
      />
    );
  }

  export default CustomAutocompleteBarang;