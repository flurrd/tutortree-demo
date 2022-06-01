import { useState } from 'react';

const AddPost = ({ onSave, overlayClick, postParentId }) => {
    const [author, setPostAuthor] = useState('');
    const [text, setPostText] = useState('');
    const [voteCount, setPostVoteCount] = useState(0);

    const [replyText, setReplyText] = useState('');

    const onSubmit = (e) => {

        e.preventDefault();

        onSave({ author, text, voteCount, postParentId, replyText });

        setPostAuthor('');
        setPostText('');
        setPostVoteCount('');
        setReplyText('');
    }

    return (
        <div className='modal'>
            <div className="modal__overlay" onClick={overlayClick}></div>
            <form className="modal__form" onSubmit={onSubmit}>


            {/* Show post text or reply input on has parent id condition */}
                {!postParentId &&
                    <div className="form-control">
                        <textarea type="text" rows="4" placeholder="Write your post..." value={text} onChange={(e) => setPostText(e.target.value)} required />
                    </div>
                }
                {postParentId &&
                    <div className="form-control">
                        <textarea type="text" rows="4" placeholder="Write your reply..." value={replyText} onChange={(e) => setReplyText(e.target.value)} required />
                    </div>
                }

                <div className="form-control">
                    <input type="text" placeholder="Enter your pseudonym" value={author} onChange={(e) => setPostAuthor(e.target.value)} required />
                </div>
                <input type="submit" className="btn" value="Post" />
            </form>
            <style jsx>
                {`

                    .modal {
                        position: fixed;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        height: 100vh;
                    }

                    .modal__overlay {
                        background: rgba(0,0,0,0.3);
                        position: absolute;
                        width: 100vw;
                        height: 100vh;
                        z-index:1;
                    }

                    .modal__form {
                        width: 80%;
                        max-width: 650px;
                        background: white;
                        z-index: 2;
                        padding: 2rem;

                    }

                    body {
                        overflow-Y:hidden;
                    }
                    .modal__form textarea {
                    display: block;
                    overflow: hidden;
                    height: auto;
                    }
                `}
            </style>
        </div>
    )
}

export default AddPost
