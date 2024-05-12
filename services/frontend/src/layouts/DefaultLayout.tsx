import { Box, Grid } from '@mui/material';
import { PropChildren } from '@/types/UtilityProps';
import Footer from '@/components/Footer/Footer';
import { useRouter } from 'next/router';

const DefaultLayout = ({ children }: PropChildren) => {
  const router = useRouter();

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      minHeight={'100vh'}
      height={'100%'}
      sx={{
        minHeight: '100dvh',
      }}
    >
      {/*<Header opeFooter.tsxn={open} handleDrawerToggle={handleDrawerToggle} />*/}
      {/*<Drawer open={open} handleDrawerToggle={handleDrawerToggle} />*/}
      <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        {router.isReady && children}
      </Box>
      <Footer />
    </Grid>
  );
};

export default DefaultLayout;
