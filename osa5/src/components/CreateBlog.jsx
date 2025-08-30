const CreateBlog = ({ user, title, author, url, setTitle, setAuthor, setUrl, addBlog }) => {

    if (user) {
        return (
            <div>
                <form onSubmit={addBlog}>
                    <div>
                        <label>
                            title:
                            <input
                            type="text"
                            value={title}
                            onChange={({ target }) => setTitle(target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            author:
                            <input
                            type="text"
                            value={author}
                            onChange={({ target }) => setAuthor(target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                        url:
                        <input
                        type="text"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                        />
                        </label>
                    </div>
                <button type="submit">
                    create
                </button>
                </form>
                <br></br>
            </div>
        )
    }

}

export default CreateBlog