import { useState, useEffect } from 'react';

import Header from './components/Header';
import Posts from './components/Posts';
import AddPost from './components/AddPost';

// Custom hooks for fixing react sync issue with local storage changes TBC
import useLocalStorageNonString from './useLocalStorageNonString';
import useLocalStorage from './useLocalStorage';

import { v4 as uuidv4 } from 'uuid';


function App() {


    const [posts, setPosts] = useState([]); // Post State
    const [showAddPost, setShowAddPost] = useState(false); // To reveal add post form
    const [postParentId, setPostParentId] = useState(false); // To reveal add post form

    // Fetch posts from Local Storage
    const getPosts = JSON.parse(localStorage.getItem("postAdded"));

    useEffect(() => {
        if (getPosts == null) {
        } else {
            setPosts(getPosts);
        }
    }, [])


    //Open form modal and carry the parent post id value
    const showPostForm = (parentId) => {
        setPostParentId(parentId);
        setShowAddPost(!showAddPost)
    }

    
    //Close modal when overlay click
    const closeForm = () => {
        setShowAddPost(!showAddPost)
    }

    // Add Post
    const addPost = (post) => {
        const id = uuidv4();
        const newPost = { id, ...post }
        setPosts([...posts, newPost]);
        localStorage.setItem("postAdded", JSON.stringify([...posts, newPost]));
        setShowAddPost(!showAddPost)
        setPostParentId(false);

        //Hack force reload and render until state / render managment complete
        window.location.reload();
    }


    // Delete Post
    const deletePost = (id) => {
        const deletePost = posts.filter((post) => post.id !== id);
        setPosts(deletePost);
        localStorage.setItem("postAdded", JSON.stringify(deletePost));
    }



    const addPostVote = (id, voteCount) => {

        const postVoteCount = voteCount + 1;
        let data = JSON.parse(localStorage.getItem('postAdded'));
        const myData = data.map(x => {
            if (x.id === id) {
                return {
                    ...x,
                    voteCount: postVoteCount,
                }
            }
            return x;
        })

        localStorage.setItem("postAdded", JSON.stringify(myData));

        window.location.reload();

    }

    const removePostVote = (id, voteCount) => {

        const postVoteCount = voteCount - 1;
        let data = JSON.parse(localStorage.getItem('postAdded'));
        const myData = data.map(x => {
            if (x.id === id) {
                return {
                    ...x,
                    voteCount: postVoteCount,
                }
            }
            return x;
        })

        localStorage.setItem("postAdded", JSON.stringify(myData));

        //Hack until local storage change calls react re-render
        window.location.reload();

    }


    return (
        <>
            {
                <div className='d-flex flex-col'>

                    <Header className="container-max-width" showForm={() => setShowAddPost(!showAddPost)} />

                    {/* Revealing of Add Post Form */}
                    {showAddPost && <AddPost onSave={addPost} postParentId={postParentId} overlayClick={closeForm} />}


                    {/* Display Posts */}
                    {
                        posts.length > 0
                            ?
                            <section className="posts-section">
                            <Posts posts={posts} onDelete={deletePost} onShowReplyForm={showPostForm} onUpVote={addPostVote} onDownVote={removePostVote} />)
                            </section>
                            :
                            <div className='posts-empty'></div>
                    }
                </div>
            }
            <style jsx>
            {`
                .posts-section {
                    margin-top: 100px;
                    padding-top: 8rem;
                    background-color: var(--theme-color-accent);
                }
            `}
            </style>
        </>
        
    )
}

export default App;