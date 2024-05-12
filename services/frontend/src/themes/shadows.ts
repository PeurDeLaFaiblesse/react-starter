// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| DEFAULT THEME - CUSTOM SHADOWS  ||============================== //

const CustomShadows = () => ({
  button: '0 2px #0000000b',
  text: '0 -1px 0 rgb(0 0 0 / 12%)',
  z1: `0px 2px 8px ${alpha('#000', 0.15)}`,
  0: '0 1px 4px 1px rgba(0, 65, 203, 0.4)',
  1: '0 1px 4px 1px rgba(0, 65, 203, 0.2)',
  2: '0 4px 16px 1px rgba(0, 65, 203, 0.1)',
  3: '0 4px 16px 1px rgba(0, 65, 203, 0.05)',
  4: '0 4px 16px 1px rgba(0, 65, 203, 0.01)',
  5: '0 4px 16px 1px rgba(0, 65, 203, 0.01)',
  6: '0 4px 16px 1px rgba(0, 65, 203, 0.01)',
  7: '0 4px 16px 1px rgba(0, 65, 203, 0.01)',
  8: '0 4px 16px 1px rgba(0, 65, 203, 0.01)',
  9: '0 4px 16px 1px rgba(0, 65, 203, 0.01)',
});

export default CustomShadows;
