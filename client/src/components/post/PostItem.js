import React, { useContext } from 'react';
import PostContext from '../../context/post/postContext';

const PostItem = () => {
	const postContext = useContext(PostContext);
	const { displayPosts, posts } = postContext;
	return <div className="blog-post">{displayPosts(posts)}</div>;
};

export default PostItem;
