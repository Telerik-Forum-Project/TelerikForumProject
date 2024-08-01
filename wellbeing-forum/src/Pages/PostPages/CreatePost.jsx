import { useState } from "react";

export default function CreatePost() {

    const [newTopicName, setNewTopicName] = useState("");
    const [newTopicDescription, setNewTopicDescription] = useState("");

    function handleInputTopicChange(e) {
        setNewTopicName(e.target.value);
    }

    function handleInputDescriptionChange(e) {
        setNewTopicDescription(e.target.value);
    }


    return (<>
        <form>
            <h2>Create Post</h2>
            <label className="title-label">Title: 
                <input type="text" 
                       placeholder="Enter title here..."
                       value={newTopicName}
                       onChange={handleInputTopicChange}/>
            </label><br />
            <br />
            <label className="comment-label">Description: 
                <textarea type="text" 
                          placeholder="Enter description here..."
                          value={newTopicDescription}
                          onChange={handleInputDescriptionChange}/>
            </label><br />
            <button>Create new Post</button>
        </form>
    </>);
}