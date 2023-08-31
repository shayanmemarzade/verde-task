import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostById, getPostCommentsById, updatePost, removePost } from '../services/postService'
import { deletePost, editPost } from '../store/slices/postsSlice';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function PostDetail() {
  const postId = useParams().id;
  const posts = useSelector((state) => state.posts);
  const [post, setPost] = useState({ title: '', body: '' });
  const [comments, setComments] = useState([]);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (posts.list.length) {
      setPost(posts.list.find((postItem) => postItem.id === parseInt(postId)))
    } else {
      getPostById(postId)
        .then(data => {
          setPost(data)
        })
        .catch(error => console.error(error));
    }
    getPostCommentsById(postId)
      .then(data => {
        setComments(data)
      })
      .catch(error => console.error(error));

  }, [postId]);

  const onChange = (e) => {
    setPost((prevPost) => {
      return {
        ...prevPost,
        [e.target.name]: e.target.value
      }
    })
  }

  const updateBlogPost = () => {
    if (!post.title || !post.body) {
      toast('Please fill both fields')
      return
    }
    setLoadingUpdate(true)
    const postData = {
      id: postId,
      title: post.title,
      body: post.body,
      userId: 1
    }
    updatePost(postId, postData)
      .then(res => {
        setLoadingUpdate(false)
        dispatch(editPost(res))
        navigate('/')
      })
      .catch(() => {
        setLoadingUpdate(false);
        toast('Error happened')
      })
  }


  const deleteBlogPost = () => {
    setLoadingDelete(true)
    removePost(post.id)
      .then(() => {
        dispatch(deletePost(post.id))
        setLoadingDelete(false)
        navigate('/')
      })
      .catch(error => console.error(error));
  }

  return (
    <>
      <Toaster />
      <div className='max-w-screen-xl mx-auto bg-white rounded-sm'>
        <header className='flex items-center p-5'>
          <Link to={'/'} className="flex items-center font-bold text-2xl text-gray-800">
            <svg className="w-6 h-6 text-gray-800 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
            </svg>
            Posts
          </Link>
          <Link to={'/add-post'} className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 ml-auto">
            + New post
          </Link>
        </header>
        <div className="flex flex-col max-w-2xl p-5 mx-auto">
          <label>Title</label>
          <input value={post?.title} onChange={onChange} name="title" className="bg-gray-100 border border-gray-200 p-2 mb-4 outline-none" placeholder="Title" type="text" />
          <label>Description</label>
          <textarea value={post?.body} onChange={onChange} name="body" className="bg-gray-100 p-3 h-60 border border-gray-200 outline-none mb-10" placeholder="Describe everything about this post here"></textarea>
          <div className="flex">
            <button className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 ml-auto" onClick={deleteBlogPost}
              disabled={loadingDelete}>
              {loadingDelete && <> <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
              </svg>
                Loading...</>}
              {!loadingDelete && <>
                <svg className="inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                </svg>
                Delete
              </>}
            </button>
            <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 ml-5" onClick={updateBlogPost}
              disabled={loadingUpdate}>
              {loadingUpdate && <> <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
              </svg>
                Loading...</>}
              {!loadingUpdate && <>
                <svg className="inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m13.835 7.578-.005.007-7.137 7.137 2.139 2.138 7.143-7.142-2.14-2.14Zm-10.696 3.59 2.139 2.14 7.138-7.137.007-.005-2.141-2.141-7.143 7.143Zm1.433 4.261L2 12.852.051 18.684a1 1 0 0 0 1.265 1.264L7.147 18l-2.575-2.571Zm14.249-14.25a4.03 4.03 0 0 0-5.693 0L11.7 2.611 17.389 8.3l1.432-1.432a4.029 4.029 0 0 0 0-5.689Z" />
                </svg>
                Update
              </>}
            </button>
          </div>
        </div>
        <section className="bg-white py-8 lg:py-16">
          <div className="max-w-2xl mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">Comments ({comments.length})</h2>
            </div>
            {comments.map(comment => (
              <article key={comment.id} className="p-6 mb-6 text-base  border-t border-gray-200 ">
                <header className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                      alt="Bonnie Green" />
                    <span className="mr-3 text-sm text-gray-900">{comment.name}</span>
                  </div>
                </header>
                <p className="text-gray-500 ">
                  {comment.body}
                </p>
                <div className="flex items-center mt-4 space-x-4">
                  <button type="button"
                    className="flex items-center text-sm text-gray-500 hover:underline ">
                    <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                    Reply
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>
    </>

  );
}

export default PostDetail;
