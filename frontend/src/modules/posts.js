import * as api from '../api';

// 액션 타입
const FETCH_ALL = 'posts/FETCH_ALL';
const CREATE = 'posts/CREATE';
const UPDATE = 'posts/UPDATE';
const DELETE = 'posts/DELETE';
const LIKEUP = 'posts/LIKEUP';


// 액션 생성 함수
export const getPosts = () => async dispatch => {
    console.log('test');
    try {
        const { data } = await api.fetchPosts();
        dispatch({type: FETCH_ALL, payload: data});
    } catch (error) {
        console.log(error.message);
    }

}

export const createPost = (post) => async dispatch => {
    try {
        const { data } = await api.createPost(post);
        dispatch({type: CREATE, payload: data})
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = (id, post) => async dispatch => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({type: UPDATE, payload: data})
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = id => async dispatch => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id});
    } catch (error) {
        console.log(error);
    }
};

export const likeUpPost = id => async dispatch => {
    try {
        const { data } = await api.likePost(id);

        dispatch({type:LIKEUP, payload:data})
    } catch (error) {
        console.log(error);
    }
}

// 이니셜 스테이트
const initialPosts = [];


// 리듀서 함수
const posts = (posts = initialPosts, action) => {

    switch(action.type) {
        case FETCH_ALL :
            return action.payload;
        case CREATE :
            return [...posts, action.payload];
        case UPDATE :
        case LIKEUP :
            return posts.map(post => post._id === action.payload._id ? action.payload : post);
        case DELETE :
            return posts.filter(post => post._id !== action.payload);
        default: 
            return posts;
    }


}

export default posts;