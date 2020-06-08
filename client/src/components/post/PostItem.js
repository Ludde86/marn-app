import React, { useContext, useState } from 'react';
import PostContext from '../../context/post/postContext';

const PostItem = () => {
	const postContext = useContext(PostContext);
	const { posts, deleteItem, setEditItem, postChecked, handeIsChecked } = postContext;

	return (
		<div className="blog-post">
			{!posts.length ? null : (
				posts.map((item) => (
					<div key={item._id} className="blog-post__display">
						<div
							className="blog-post-message"
							style={item._id === postChecked ? { textDecoration: 'line-through', color: 'gray' } : null}
							onClick={() => handeIsChecked(item._id)}
						>
							<h3>{item.title}</h3>
							<p>{item.body}</p>
						</div>

						<div className="item-buttons">
							<i className="far fa-trash-alt" onClick={() => deleteItem(item._id)} />

							<i
								className="fas fa-pencil-alt"
								onClick={() => setEditItem(item._id, item.title, item.body)}
							/>
						</div>
					</div>
				))
			)}
		</div>
	);
};

export default PostItem;
