import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

function Navbar() {
  const posts = useSelector((state) => state.posts);
  return (
    <nav className="mb-5">
      <div className=" bg-white border-gray-300 border-b max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 rounded-sm">
        <Link to="/" className="mx-auto mb-5 lg:mb-0 lg:mx-0 flex items-center">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">Arbit Blog</span>
        </Link>
        <div className='mx-auto lg:mx-0 flex'>
          <div className="relative inline-flex items-center p-3">
            <b>Posts</b>
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-green-950 bg-green-400 rounded-full -top-1 -right-1">
              {posts.list.length}
            </div>
          </div>
          <div className="relative inline-flex items-center p-3">
            <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
              <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
            </svg>
          </div>
          <div className="relative inline-flex items-center p-3">
            <svg className="w-[25px] h-[25px] text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
              <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
            </svg>
          </div>
          <div className="flex items-center md:order-2">
            <button className="flex p-0 border-0 rounded-full" >
              <img className="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="user photo" />
            </button>
          </div>
        </div>

      </div>
    </nav>

  );
}

export default Navbar;