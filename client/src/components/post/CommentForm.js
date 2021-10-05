import React from 'react';
import { addComment } from '../../actions/post';
import { useDispatch } from 'react-redux';

const CommentForm = ({ postId }) => {
    const [text, setText] = React.useState('');

    const dispatch = useDispatch();
    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Leave a Comment</h3>
            </div>
            <form className="form my-1" onSubmit={e => {
                e.preventDefault();
                dispatch(addComment(postId, { text }));
                setText('');
            }}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Create a comment"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

export default CommentForm;