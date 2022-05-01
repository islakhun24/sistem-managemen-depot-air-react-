const { Autocomplete, TextField } = require("@mui/material");

const CustomAutocompleteBank = ({ options, onChange, onInputChange, defaultValue, label }) => {
    return (
      <Autocomplete
        options={options}
        id="free-solo-demo"
        onInputChange={onInputChange}
        onChange={onChange}
        defaultValue={defaultValue}
        getOptionLabel={option => {
          const nama_akun = option.nama_akun || '';
          const nama_bank = option.nama_bank || '';
          const result = nama_akun === '' || nama_bank === '' ? '' : `${option.nama_akun} (${option.nama_bank|| ''})`;
          return result;
        }}
        renderInput={props => <TextField {...props} fullWidth  label={label} />}
      />
    );
  }

  export default CustomAutocompleteBank;