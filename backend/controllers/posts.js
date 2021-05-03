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