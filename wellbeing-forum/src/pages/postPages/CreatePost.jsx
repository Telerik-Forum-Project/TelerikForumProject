import { useState, useContext } from "react";
import { AppContext } from "../../state/app.context";
import { createPost } from "../../services/posts.service";

export default function CreatePost() {
    const [post, setPost] = useState({
        title: '',
        content: '',
    });
    const { userData } = useContext(AppContext);

    const updatePost = (key, value) => {
        setPost({
            ...post,
            [key]: value,
        });
    };

    const handleCreatePost = async () => {
        if (post.title.length < 3) {
            return alert('Title too short!');
        }
        if (post.content.length < 3) {
            return alert('Content too short!');
        }

        if (!userData || !userData.handle) {
            return alert('User data is not available');
        }

        try {
            await createPost(userData.handle, post.title, post.content);
            setPost({ title: '', content: '' });
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h1>Create Post</h1>
            <label htmlFor="title">Title: </label>
            <input value={post.title} onChange={e => updatePost('title', e.target.value)} type="text" name="title" id="title" /><br />
            <label htmlFor="content">Content: </label>
            <textarea value={post.content} onChange={e => updatePost('content', e.target.value)} name="content" id="content" /><br /><br />
            <button onClick={handleCreatePost}>Create Post</button>
        </div>
    )
}


// import { useState } from "react";

// export default function CreatePost() {

//     const [newTopicName, setNewTopicName] = useState("");
//     const [newTopicDescription, setNewTopicDescription] = useState("");

//     function handleInputTopicChange(e) {
//         setNewTopicName(e.target.value);
//     }

//     function handleInputDescriptionChange(e) {
//         setNewTopicDescription(e.target.value);
//     }


//     return (<>
//         <form>
//             <h2>Create Post</h2>
//             <label className="title-label">Title:
//                 <input type="text"
//                        placeholder="Enter title here..."
//                        value={newTopicName}
//                        onChange={handleInputTopicChange}/>
//             </label><br />
//             <br />
//             <label className="comment-label">Description:
//                 <textarea type="text"
//                           placeholder="Enter description here..."
//                           value={newTopicDescription}
//                           onChange={handleInputDescriptionChange}/>
//             </label><br />
//             <button>Create new Post</button>
//         </form>
//     </>);
// }