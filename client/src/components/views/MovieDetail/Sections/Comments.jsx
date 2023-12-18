import React, { useState } from 'react'
import { Button, Input, Typography } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
const { TextArea } = Input;
const { Title } = Typography;
function Comments(props) {
    const user = useSelector(state => state.user)
    const [Comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in first');
        }

        const variables = {
            content: Comment,
            writer: user.userData._id,
            postId: props.postId
        }
        console.log(variables)

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setComment("")
                    props.refreshFunction(response.data.result)
                    console.log('saveSuccess');
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

    return (
        <div>
            <br />
            <Title level={3} >
                <strong style={{ fontWeight: 'bold', color: '#333' }}>{props.movieTitle}</strong>
                <span style={{ fontWeight: 'normal' }}> 에 대한 의견을 남겨주세요</span>
            </Title>
            <hr />
            {/* Comment Lists  */}
            {/* {console.log(props.CommentLists)} */}

            {props.CommentLists && props.CommentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment key={index}>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
            ))}

            {props.CommentLists && props.CommentLists.length === 0 &&
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }} >
                    이 영화에 대한 생각을 가장 먼저 공유해보세요!
                </div>
            }

            {/* Root Comment Form */}
            <form style={{ display: 'flex', justifyContent: 'space-between' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '80%', borderRadius: '5px', resize: 'none' }}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="댓글을 작성하세요"
                />
                <br />
                <Button style={{ width: '19.7%', height: '52px' }} onClick={onSubmit}>작성</Button>
            </form>

        </div>
    )
}

export default Comments
