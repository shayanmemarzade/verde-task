import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Layout from './layouts/Layout';

import PostList from './routes/PostList';
import PostDetail from './routes/PostDetail';
import AddPost from './routes/AddPost';
import NotFound from './routes/NotFound';

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/add-post" element={<AddPost />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router >
      </Provider>
    </>
  )
}

export default App
