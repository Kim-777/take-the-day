import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from './styles';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPost } from '../../modules/posts';

const Form = () => {

    const[postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
    })
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleSubmit  = e => {
        e.preventDefault();

        dispatch(createPost(postData));
    };

    const onChangeInput = (e) => {
        setPostData({
            ...postData,
            [e.target.name]: e.target.value,
        })
    }

    const onFileDone = ({base64}) => setPostData({
        ...postData,
        selectedFile: base64
    });

    const clear = () => {

    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">Creating a Memory</Typography>
                <TextField 
                    name="creator" 
                    variant="outlined" 
                    label="Creator" 
                    fullWidth 
                    value= {postData.creator}
                    onChange={onChangeInput}
                />
                <TextField 
                    name="title" 
                    variant="outlined" 
                    label="Title" 
                    fullWidth 
                    value= {postData.title}
                    onChange={onChangeInput}
                />
                <TextField 
                    name="message" 
                    variant="outlined" 
                    label="Message" 
                    fullWidth 
                    value= {postData.message}
                    onChange={onChangeInput}
                />
                <TextField 
                    name="tags" 
                    variant="outlined" 
                    label="Tags" 
                    fullWidth 
                    value= {postData.tags}
                    onChange={onChangeInput}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={onFileDone}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="medium" type="submit" fullWidth>Click</Button>
                <Button variant="contained" color="secondary" size="medium" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;
