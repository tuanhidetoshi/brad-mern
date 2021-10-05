import React from 'react';
import Spinner from '../../components/layout/Spinner';
import { getPosts } from '../../actions/post';
import { useDispatch, useSelector } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = () => {
    const dispatch = useDispatch();
    const {posts, loading} = useSelector(state => state.post);

    React.useEffect(() => {
        dispatch(getPosts());
    }, [dispatch])

    return loading ? <Spinner /> : (
        <>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome to the community
            </p>
            <PostForm />
            <div className="posts">
                {posts.map(post => (
                    <PostItem key={post._id} post={post} />
                ))}
            </div>
        </>
    )
}

export default Posts;