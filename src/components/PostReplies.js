import Post from './Post';
import "../index.css"

const PostReplies = ({ posts, onDelete, onUpVote, onDownVote , onShowReplyForm }) => {
    return (
        <>
            <section className="posts">
                {posts.map((post) => (
                   
                    post.postParentId !== post.id
                    ?
                    <div>
                        <Post key={post.id} post={post} onDelete={onDelete} onUpVote={onUpVote} onDownVote={onDownVote} onShowReplyForm={onShowReplyForm} />
                    </div>
                    : null
               
                ))}
            </section>
            
            <style jsx>
            {`
                .posts {
                    margin-top: 3rem;
                    background-color: var(--theme-color-accent);
                }
            `}
            </style>
        </>
    )
}

export default PostReplies;
