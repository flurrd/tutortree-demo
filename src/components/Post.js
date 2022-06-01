
import { useState, useEffect } from 'react';
import "../index.css"
import Button from './Button';
import PostReplies from './PostReplies';

const Post = ({ post, posts, onUpVote, onDownVote, onShowReplyForm, showPostForm }) => {

    const [postReplies, setPostReplies] = useState([]); 

    //Filter posts by post parent id

    useEffect(() => {
        if (posts == null) {
            setPostReplies([])
        } else {
            setPostReplies(posts.filter(x => x.postParentId === post.id));
        }
    }, [])
    
    return (
        <>
            <article className="post">
                <section className="post__vote-counter-wrap">
                    <div className="post__vote-counter">
                        <div className="post__vote-action" onClick={() => onUpVote(post.id, post.voteCount)}>
                            <svg viewBox="0 0 448 512"><path d="M416 352c-8.188 0-16.38-3.125-22.62-9.375L224 173.3l-169.4 169.4c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25C432.4 348.9 424.2 352 416 352z" /></svg>
                        </div>
                        <span className="post__vote-counter-number">{post.voteCount}</span>
                        <div className="post__vote-action" onClick={() => onDownVote(post.id, post.voteCount)}>
                            <svg viewBox="0 0 448 512"><path d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z" /></svg>
                        </div>
                    </div>
                </section>
                <section className="post__panel">
                    <div className="post__content">
                        <h3>
                            {post.author}
                        </h3>
                        <p>{post.text}</p>
                        <p>{post.replyText}</p>
                       
                    </div>
                    <div className="post__actions">
                        <Button text={'Reply'} onClick={() => onShowReplyForm(post.id)} className={'btn btn-light'} />
                    </div>
                </section>
            </article>
            <section className="post__replies">
                <PostReplies posts={postReplies} onShowReplyForm={showPostForm} />
            </section>
            
            <style jsx>
                {`
                    .post {
                        max-width: 1000px;
                        width: 100%;
                        display: flex;
                        margin: 5px auto;
                        cursor: pointer;
                        display: flex;
                        justify-content: space-between;
                    }

                    .post__vote-counter-wrap {
                        display: flex;
                        align-items: center;
                        color: white;
                        margin: 0 1rem;
                    }

                    .post__vote-counter {
                        border: 3px solid rgba(255, 255, 255, 0.5);
                        border-radius: 1rem;
                        width: 45px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding: 0.5rem 0;
                    }
                    .post__vote-counter-number{
                        padding: 0 0 0;
                        font-size: 1.15rem;
                        line-height: 100%;
                    }

                    .post__vote-counter svg {
                       width: 1rem;
                     
                    }

                    .post__vote-counter svg path {
                        fill: rgba(255, 255, 255, 0.5);
                    }

                    .post__vote-action:hover svg path, .post__vote-action:active svg path {
                        fill: rgba(255, 255, 255, 1);
                    }

                    .post__panel {
                        background: white;
                        padding: 3rem 3rem 3rem;
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                    }

                    .post__content {
                        flex: 1;
                    }
                    .post__actions {
                        display: flex;
                        justify-content: flex-end;
                        padding-top: 2rem;
                    }

                    .post h3 {
                        margin-bottom: 2rem;
                    }
                    .post__replies {
                        padding-left: 3rem;
                    }

                    .post__content h3 {
                        font-size: 2rem;
                    }

                `}
            </style>
        </>
    )
}

export default Post
