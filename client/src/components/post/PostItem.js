import React, { useContext } from 'react';
import PostContext from '../../context/post/postContext';

const PostItem = () => {
	const postContext = useContext(PostContext);
	const { posts, deleteItem, setEditItem } = postContext;

	return (
		<div className="blog-post">
			{!posts.length ? null : (
				posts.map((item) => (
					<div key={item._id} className="blog-post__display">
						<div className="blog-post-message">
							<h3>{item.title}</h3>
							<p>{item.body}</p>
						</div>

						<div className="item-buttons">
							<button onClick={() => deleteItem(item._id)}>
								<i className="far fa-trash-alt" />
							</button>
							<button onClick={() => setEditItem(item._id, item.title, item.body)}>
								<i className="fas fa-pencil-alt" />
							</button>
						</div>
					</div>
				))
			)}
		</div>
	);
};

export default PostItem;
