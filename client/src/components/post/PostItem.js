import React, { useContext } from 'react';
import PostContext from '../../context/post/postContext';

const PostItem = () => {
	const postContext = useContext(PostContext);
	const { posts, deleteItem, setEditItem, setIsChecked } = postContext;

	return (
		<div className="blog-post">
			{!posts.length ? null : (
				posts.map((item) => (
					<div key={item._id} className="blog-post__display">
						<div
							className="blog-post-message"
							style={item.isChecked ? { textDecoration: 'line-through', color: 'gray' } : null}
							onClick={() => setIsChecked(item)}
						>
							<h3>{item.title}</h3>
							<p>{item.body}</p>
						</div>
						<div className="item-buttons">
							<i
								className="fas fa-pencil-alt"
								onClick={() => setEditItem(item._id, item.title, item.body)}
							/>
							{/* <i className="far fa-trash-alt" onClick={() => deleteItem(item._id)} /> */}
						</div>
					</div>
				))
			)}
		</div>
	);
};

export default PostItem;
