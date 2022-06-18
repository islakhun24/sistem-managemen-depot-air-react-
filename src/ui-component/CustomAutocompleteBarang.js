const { Autocomplete, TextField } = require("@mui/material");

const CustomAutocompleteBarang = ({ options, onChange, onInputChange, defaultValue, label }) => {
    return (
      <Autocomplete
        options={options}
        id="free-solo-demo"
        onInputChange={onInputChange}
        onChange={onChange}
        defaultValue={defaultValue}
        getOptionLabel={option => {
          const nama = option.nama || '';
          const harga = option.harga || '';
          const result = nama === '' || harga === '' ? '' : `${option.nama} (Rp. ${option.harga|| '0'})`;
          return result;
        }}
        renderInput={props => <TextField {...props} fullWidth  label={label} />}
      />
    );
  }

  export default CustomAutocompleteBarang;
