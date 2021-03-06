import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts } from './modules/posts';
import mainWhale from './images/main-whale.png';
import useStyles from './styles';


const App = () => {

    const [currentId, setCurrentId] = useState(null);

    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        console.log('???');
        dispatch(getPosts());
    }, [currentId, dispatch]);

    useEffect(() => {
        console.log('currentId 변경!', currentId);
    }, [currentId]);

    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Take The Day</Typography>
                <img className={classes.image} src={mainWhale} alt="main" height="60" width="60"/>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts  setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}


export default App;