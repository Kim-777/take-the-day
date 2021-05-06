import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
    try {
        console.log('테스트 시작 여기까지왔음');
        const postMessages = await PostMessage.find();

        // console.log(postMessages);
        console.log('테스트 끝');
        return res.status(200).json(postMessages);
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);

    try {
        await newPost.save();

        return res.status(201).json(newPost);

    } catch (error) {
        return res.status(409).json({message: error.message});
    }
}

export const updatePost = async ( req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('입력된 포스트가 존재 하지 않습니다.');
    }



    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true});

    return res.json(updatedPost);

}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('입력된 포스트가 존재 하지 않습니다.');
    }

    await PostMessage.findByIdAndRemove(_id);

    console.log('delete');
    return res.json({message: 'Post deleted successfully'});

}

export const likePost = async (req, res) => {
    const { id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('입력된 포스트가 존재 하지 않습니다.');
    }

    const post = await PostMessage.findById(_id);
    console.log('post._id', post._id);
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {likeCount: post.likeCount + 1}, { new: true });

    
    return res.json(updatedPost);
}