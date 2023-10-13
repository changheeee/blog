import React, { useEffect, useState } from 'react';
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';

function LikeDislikes(props) {
    const user = useSelector((state) => state.user);

    const [Likes, setLikes] = useState(0);
    const [Dislikes, setDislikes] = useState(0);
    const [LikeAction, setLikeAction] = useState(null);
    const [DislikeAction, setDislikeAction] = useState(null);
    const variable = {};

    if (props.video) {
        variable.videoId = props.videoId;
    } else {
        variable.commentId = props.commentId;
    }

    useEffect(() => {
        Axios.post('/api/like/getLikes', variable)
            .then((response) => {
                if (response.data.success) {
                    setLikes(response.data.likes.length);
                    response.data.likes.forEach((like) => {
                        if (like.userId === props.userId) {
                            setLikeAction('liked');
                        }
                    });
                } else {
                    alert('Failed to get likes');
                }
            });

        Axios.post('/api/like/getDislikes', variable)
            .then((response) => {
                if (response.data.success) {
                    setDislikes(response.data.dislikes.length);
                    response.data.dislikes.forEach((dislike) => {
                        if (dislike.userId === props.userId) {
                            setDislikeAction('disliked');
                        }
                    });
                } else {
                    alert('Failed to get dislikes');
                }
            });
    }, [props.userId, variable]);

    const onLikeOrDislike = (action) => {
        if (user.userData && !user.userData.isAuth) {
            return alert('Please log in first');
        }

        if ((action === 'like' && LikeAction === null) || (action === 'dislike' && DislikeAction !== null)) {
            Axios.post(`/api/like/up${action.charAt(0).toUpperCase() + action.slice(1)}`, variable)
                .then((response) => {
                    if (response.data.success) {
                        if (action === 'like') {
                            setLikes(Likes + 1);
                            setLikeAction('liked');
                            if (DislikeAction !== null) {
                                setDislikeAction(null);
                                setDislikes(Dislikes - 1);
                            }
                        } else {
                            setDislikes(Dislikes + 1);
                            setDislikeAction('disliked');
                            if (LikeAction !== null) {
                                setLikeAction(null);
                                setLikes(Likes - 1);
                            }
                        }
                    } else {
                        alert(`Failed to increase ${action}`);
                    }
                });
        } else {
            Axios.post(`/api/like/un${action.charAt(0).toUpperCase() + action.slice(1)}`, variable)
                .then((response) => {
                    if (response.data.success) {
                        if (action === 'like') {
                            setLikes(Likes - 1);
                            setLikeAction(null);
                        } else {
                            setDislikes(Dislikes - 1);
                            setDislikeAction(null);
                        }
                    } else {
                        alert(`Failed to decrease ${action}`);
                    }
                });
        }
    };

    return (
        <React.Fragment>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon
                        type="like"
                        theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                        onClick={() => onLikeOrDislike('like')}
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
            </span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon
                        type="dislike"
                        theme={DislikeAction === 'liked' ? 'filled' : 'outlined'}
                        onClick={() => onLikeOrDislike('dislike')}
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Dislikes}</span>
            </span>
        </React.Fragment>
    );
}

export default LikeDislikes;
