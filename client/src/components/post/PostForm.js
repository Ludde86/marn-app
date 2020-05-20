import React, { useContext } from 'react';
import PostContext from '../../context/post/postContext';

const PostForm = () => {
	const postContext = useContext(PostContext);
	const { title, body, handleSubmit, setTitle, setBody } = postContext;

	return (
		<div>
			<h2>Create a post</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-input">
					<input
						autoComplete="off"
						type="text"
						name="title"
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="form-input">
					<textarea
						name="body"
						placeholder="Body"
						value={body}
						cols="30"
						rows="10"
						onChange={(e) => setBody(e.target.value)}
					/>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default PostForm;
