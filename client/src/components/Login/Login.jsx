import React, { useState, useContext } from 'react';
import { GlobalState } from '../../Context/GlobalState'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom"
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm, Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  email: {
    paddingTop: 0
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [backendErr, setBackendErr] = useState('')
  const { handleSubmit, control, reset } = useForm();
  const { login: [, setLogin], loginUser, verifyUserLogin } = useContext(GlobalState)

  const onSubmit = async (data) => {
    const res = await loginUser(data)
    if (!res.success) {
      setBackendErr(res.message)
      return
    }
    reset()
    localStorage.setItem('token', res.token)
    const verified = await verifyUserLogin()
    if (verified) {
      setLogin(true)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          {backendErr.error && <Box mb={2}>
            <Typography variant="body1" style={{ color: 'red' }}>
              {backendErr.error}
            </Typography>
          </Box>
          }
          <Controller
            name="email"
            as={
              <TextField
                className={classes.email}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="email"
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                error={backendErr.email && true}
                helperText={backendErr.email && backendErr.email}
              />
            }
            control={control}
            defaultValue=""
            rules={{
              required: 'Required',
            }}
          />
          <Controller
            name="password"
            as={
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={backendErr.password && true}
                helperText={backendErr.password && backendErr.password}
              />
            }
            control={control}
            defaultValue=""
            rules={{
              required: 'Required',
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Typography variant="body2">
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                  Don't have an account? Sign Up
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}