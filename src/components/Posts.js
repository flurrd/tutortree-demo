import Post from './Post';
import "../index.css"

const Posts = ({ posts, onDelete, onUpVote, onDownVote , onShowReplyForm }) => {
    return (
        <>
            <section className="posts">
                {posts.map((post) => (

                    post.postParentId
                    ? null
                    : <Post key={post.id} post={post} posts={posts} onDelete={onDelete} onUpVote={onUpVote} onDownVote={onDownVote} onShowReplyForm={onShowReplyForm} />

                ))}
            </section>
            
            <style jsx>
            {`
                .posts {

                    background-color: var(--theme-color-accent);
                }
            `}
            </style>
        </>
    )
}

export default Posts;
