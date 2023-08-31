import Header from './Header';

function Layout({ children }) {
  return (
    <>
      <div className="py-5">
        <Header />
        {children}
      </div>
    </>
  )
}

export default Layout
