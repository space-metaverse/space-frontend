import { Typography, Box, TextField, Button } from "@mui/material"

const EmailSubscribe = () => {
  return (
    <Box sx={{ background: '#FAFAFC', p: 3, mt: 3 }}>
      <Typography variant="h2" align="center" p={3}>
        {`Don't miss your chance to win exclusive stuff!`}
      </Typography>
      <Box sx={(theme) => ({
        [theme.breakpoints.up('md')]: {
          width: '50%',
          margin: '0 auto',
        },
        p: 2,
      })}>
        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth />
        <Button variant="contained" fullWidth sx={{ mt: 2 }}>
          Subscribe
        </Button>
      </Box>
    </Box>
  )
}

export default EmailSubscribe