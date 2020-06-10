import React, { useContext } from 'react';
import PostContext from '../../context/post/postContext';
import TodoContext from '../../context/todo/todoContext';

const PostForm = () => {
	const postContext = useContext(PostContext);
	const { title, body, handleSubmit, setTitle, setBody, editMessage, updateItem, setEditItem } = postContext;

	const todoContext = useContext(TodoContext);
	const { isEdit } = todoContext;

	return isEdit ? (
		<div className="post-form">
			<h2>Uppdatera förslag: </h2>
			<form onSubmit={(e) => updateItem(e, editMessage.id, editMessage.title, editMessage.body)}>
				<div className="form-input">
					<input
						autoComplete="off"
						type="text"
						name="title"
						value={editMessage.title}
						onChange={(e) => setEditItem(editMessage.id, e.target.value, editMessage.body)}
					/>
				</div>
				<div className="form-input">
					<textarea
						name="body"
						value={editMessage.body}
						cols="30"
						rows="10"
						onChange={(e) => setEditItem(editMessage.id, editMessage.title, e.target.value)}
					/>
				</div>
				<button type="submit">Uppdatera</button>
			</form>
		</div>
	) : (
		<div className="post-form">
			<h2>Förslag på förbättringar: </h2>
			<form onSubmit={handleSubmit}>
				<div className="form-input">
					<input
						autoComplete="off"
						type="text"
						name="title"
						placeholder="Förbättring"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="form-input">
					<textarea
						name="body"
						placeholder="Meddelande"
						value={body}
						cols="30"
						rows="10"
						onChange={(e) => setBody(e.target.value)}
					/>
				</div>
				<button type="submit">Skicka</button>
			</form>
		</div>
	);
};

export default PostForm;
