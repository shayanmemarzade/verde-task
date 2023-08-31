import Navbar from '../components/Navbar';

function Layout({ children }) {
  return (
    <div className="py-5">
      <Navbar />
      {children}
    </div>
  )
}

export default Layout
