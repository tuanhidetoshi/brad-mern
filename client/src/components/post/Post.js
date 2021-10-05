import React from 'react';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import { getPost } from '../../actions/post';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ match }) => {
    const dispatch = useDispatch();
    const { post, loading } = useSelector(state => state.post)

    React.useEffect(() => {
        dispatch(getPost(match.params.id))
    }, [dispatch, match.params.id])

    return loading || post === null ? <Spinner /> : <>
        <Link to="/posts" className="btn">Back To Posts</Link>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        <div className="comments">
            {post.comments.map(comment => (
                <CommentItem key={comment._id} comment={comment} postId={post._id} />
            ))}
        </div>
    </>
}

export default Post;