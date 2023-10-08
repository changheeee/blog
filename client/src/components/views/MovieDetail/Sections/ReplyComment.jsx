import React, { useEffect, useState } from 'react';
import SingleComment from './SingleComment';

function ReplyComment(props) {
    const [ChildCommentNumber, setChildCommentNumber] = useState(0);
    const [OpenReplyComments, setOpenReplyComments] = useState(false);

    useEffect(() => {
        let commentNumber = 0;
        props.CommentLists.forEach((comment) => {
            if (comment.responseTo === props.parentCommentId) {
                commentNumber++;
            }
        });
        setChildCommentNumber(commentNumber);
    }, [props.CommentLists, props.parentCommentId]);

    const filteredReplyComments = props.CommentLists.filter(
        (comment) => comment.responseTo === props.parentCommentId
    );

    const renderReplyComments = (comments) => {
        return comments.map((comment, index) => (
            <div key={comment._id} style={{ width: '80%', marginLeft: '40px' }}>
                <SingleComment
                    comment={comment}
                    postId={props.postId}
                    refreshFunction={props.refreshFunction}
                />
                <ReplyComment
                    CommentLists={props.CommentLists}
                    parentCommentId={comment._id}
                    postId={props.postId}
                    refreshFunction={props.refreshFunction}
                />
            </div>
        ));
    };

    const handleChange = () => {
        setOpenReplyComments(!OpenReplyComments);
    };

    return (
        <div>
            {ChildCommentNumber > 0 && (
                <p
                    style={{ fontSize: '14px', margin: 0, color: 'gray' }}
                    onClick={handleChange}
                >
                    View {ChildCommentNumber} more comment(s)
                </p>
            )}

            {OpenReplyComments && renderReplyComments(filteredReplyComments)}
        </div>
    );
}

export default ReplyComment;
