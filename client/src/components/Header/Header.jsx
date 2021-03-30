import React, { useContext } from 'react';
import { GlobalState } from '../../Context/GlobalState'
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Box,
    Container,
    Toolbar,
    Typography,
    IconButton,
    MenuItem,
    Menu
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';



const useStyles = makeStyles((theme) => ({
    appBar: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontWeight: "bold"
    },
}));

export const Header = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { login: [, setLogin] } = useContext(GlobalState)

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        handleClose()
        localStorage.removeItem('token')
        setLogin(false)
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters={true}>
                        <Typography variant="h6" className={classes.title}>
                            Expense Tracker App
                        </Typography>
                        <Box >
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar >
        </div >
    );
}
