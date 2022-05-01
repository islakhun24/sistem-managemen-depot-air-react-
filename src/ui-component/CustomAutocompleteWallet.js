const { Autocomplete, TextField } = require("@mui/material");

const CustomAutocompleteWallet = ({ options, onChange, onInputChange, defaultValue, label }) => {
    return (
      <Autocomplete
        options={options}
        id="free-solo-demo"
        onInputChange={onInputChange}
        onChange={onChange}
        defaultValue={defaultValue}
        getOptionLabel={option => {
          const nama_wallet = option.nama_wallet || '';
          const nomor_hp = option.nomor_hp || '';
          const result = nama_wallet === '' || nomor_hp === '' ? '' : `${option.nama_wallet} (${option.nomor_hp|| ''})`;
          return result;
        }}
        renderInput={props => <TextField {...props} fullWidth  label={label} />}
      />
    );
  }

  export default CustomAutocompleteWallet;