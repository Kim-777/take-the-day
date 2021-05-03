import * as api from '../api';

// 액션 타입
const FETCH_ALL = 'posts/FETCH_ALL';
const CREATE = 'posts/CREATE';

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
        default: 
            return posts;
    }


}

export default posts;