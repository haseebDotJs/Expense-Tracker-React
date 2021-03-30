import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link, useNavigate } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { GlobalState } from '../../Context/GlobalState'

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignUp = () => {
    const classes = useStyles();
    const [backendErr, setBackendErr] = useState('')

    const schema = Yup.object().shape({
        firstName: Yup
            .string()
            .min(3, "Minimum 3 characters required")
            .max(16, "Maximum 16 charactars allowed"),
        lastName: Yup
            .string()
            .min(3, "Minimum 3 characters required")
            .max(16, "Maximum 16 charactars allowed"),
        password: Yup
            .string()
            .min(8, 'Minimum 8 characters')
            .max(16, 'Maximum 16 characters')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])/, "Password must contain upper and lower case characters"),
    })

    const { handleSubmit, control, reset, errors } = useForm({
        resolver: yupResolver(schema),
    });
    const { signupUser } = useContext(GlobalState)
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        const res = await signupUser(data)
        if (!res.success) {
            setBackendErr(res.message)
            return
        }
        reset()
        navigate('/login')
    }
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>

                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    {/* backend response error printing */}
                    {backendErr.error && <Box mb={2}>
                        <Typography variant="body1" style={{ color: 'red' }}>
                            {backendErr.error}
                        </Typography>
                    </Box>
                    }
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="firstName"
                                as={
                                    <TextField
                                        autoComplete="fname"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        error={errors.firstName && true}
                                        helperText={errors.firstName && errors.firstName.message}
                                    />
                                }
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Required',
                                }}
                            />

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="lastName"
                                as={
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        autoComplete="lname"
                                        error={errors.lastName && true}
                                        helperText={errors.lastName && errors.lastName.message}
                                    />
                                }
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Required',
                                }}
                            />

                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="email"
                                as={
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        type="email"
                                        id="email"
                                        label="Email Address"
                                        autoComplete="email"
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
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="password"
                                as={
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        error={errors.password && true}
                                        helperText={errors.password && errors.password.message}

                                    />
                                }
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Required',
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Typography variant="body2">
                                <Link to="/login" style={{ textDecoration: 'none' }} >
                                    Already have an account? Login
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default SignUp