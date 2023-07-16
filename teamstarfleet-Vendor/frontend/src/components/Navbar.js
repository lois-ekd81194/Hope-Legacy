import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import PropTypes from "prop-types";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';
import theme from '../theme'
import { ThemeProvider } from '@material-ui/core/styles';

function NavbarTitle(url) {
    if (url.indexOf("food") > -1){
        return "Food Details";
    }
    if (url.indexOf("menu") > -1){
        return "Menu";
    }
    if (url.indexOf("order") > -1){
        return "Order Details";
    }
    if (url.indexOf("payment") > -1){
        return "Payment";
    }
}

class Navbar extends Component {

static propTypes = {
    history: PropTypes.object.isRequired
};

render(){
  return (
    <div>
        <Box display="flex" width="100%">
            <AppBar position="relative" color="primary" margin="0">
                <Toolbar>
                    <Grid item xs={1}>
                        <Box display="flex" width="100%" justifyContent="left">
                            <IconButton onClick={this.props.history.goBack}>
                                <ArrowBackIcon color="secondary" fontSize="large"/>
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid item xs={10}>
                        <Box display="flex" width="100%" justifyContent="center">
                        <ThemeProvider theme={theme}>
                            <Typography variant="h2">
                                {NavbarTitle(window.location.href)}
                            </Typography>
                        </ThemeProvider>
                        </Box>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Toolbar>
            </AppBar>
        </Box>
    </div>
  );
}}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withRouter(Navbar);