const { Autocomplete, TextField } = require("@mui/material");

const CustomAutocompleteCustomer = ({ options, onChange, onInputChange, defaultValue, label }) => {
    return (
      <Autocomplete
        options={options}
        id="free-solo-demo1x"
        onInputChange={onInputChange}
        onChange={onChange}
        defaultValue={defaultValue}
        getOptionLabel={option => option.nama || ''}
        renderInput={props => <TextField  {...props} fullWidth  label={'Nama Customer'} />}
      />
    );
  }

  export default CustomAutocompleteCustomer;