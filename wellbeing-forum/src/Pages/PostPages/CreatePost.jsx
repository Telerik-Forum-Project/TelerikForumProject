
export default function CreatePost() {



    return (<>
        <form>
            <h2>Create Post</h2>
            <label className="title-label">Title: 
                <input type="text" 
                       placeholder="Enter title here..."
                      />
            </label><br />
            <br />
            <label className="comment-label">Description: 
                <textarea type="text" 
                          placeholder="Enter description here..."
                          />
            </label><br />
            <button>Create new Post</button>
        </form>
    </>);
}