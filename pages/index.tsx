import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import React from 'react';
import ReactJson from 'react-json-view'
import dynamic from 'next/dynamic'
const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(6, 0, 3),
    },
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

export default function Index () {
  const classes = useStyles();
  const [linhaDigitavel, setLinhaDigitavel] = React.useState<string>('21290001192110001210904475617405975870000002000');
  const [response, setResponse] = React.useState<any>({});

  const consultar = async () => {
    const response = await fetch(`/api/boleto/${linhaDigitavel}`)
    setResponse(await response.json())
  }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>Teste Prático</Typography>

        <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Bar Code</InputLabel>
          <OutlinedInput value={linhaDigitavel} onChange={event => setLinhaDigitavel(event.target.value)} labelWidth={50} />
          <Button onClick={consultar}>Consultar</Button>
        </FormControl>

        <DynamicReactJson src={response} />

        <Typography className={classes.root} color="textSecondary">
          <Link href="https://github.com/ymoreiratiti/"><GitHubIcon /> GitHub</Link>
        </Typography>

      </Box>
    </Container>
  );
}
