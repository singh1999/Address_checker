import { AddressValidation } from './pages/addressValidation/addressValidation';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { Typography } from '@mui/material';

export const App = () => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h4">Address checker</Typography>
        </Toolbar>
      </AppBar>
      <AddressValidation />
    </>
  );
};
