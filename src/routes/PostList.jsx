import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from '../services/postService';
import { setPosts } from '../store/slices/postsSlice';

function PostList() {
  const posts = useSelector((state) => state.posts);
  const [blogposts, setBlogPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (posts.list.length) {
      setBlogPosts(posts.list)
      return
    }
    getAllPosts()
      .then(data => {
        setBlogPosts(data)
        dispatch(setPosts(data))
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className='bg-white max-w-screen-xl mx-auto'>
      <div className='flex flex-wrap'>
        {blogposts.map(post => (
          <div className='lg:w-1/3 p-5' key={post.id}>
            <h1 className="text-xl font-bold line-clamp-2 h-14 mb-5">
              {post?.title}
            </h1>
            <p className="line-clamp-4 text-gray-500 mb-5">{post?.body}</p>
            <Link to={`/post/${post.id}`} className="text-blue-700">Read more</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostList
