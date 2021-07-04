import React from "react";
import getPosts from "../api/getPosts";
import Header from "./Header";
import Footer from "./Footer";
import "../Styles/home.css";

const Home = () => {
  const [state, setState] = React.useState({
    loading: false,
    posts: [],
    error: null,
  });

  const { loading, posts, error } = state;

  React.useEffect(() => {
    const doFetchPosts = async () => {
      setState({
        loading: true,
        posts: [],
        error: null,
      });
      try {
        const { data } = await getPosts();
        setState({
          loading: false,
          posts: data,
          error: null,
        });
      } catch (e) {
        setState({
          loading: false,
          posts: [],
          error: e.message,
        });
      }
    };

    doFetchPosts();
  }, []);

  if (loading) {
    return <h3 className="loading">loading...</h3>;
  } else if (error) {
    return <h3>{error}</h3>;
  }
  return (
    <div>
      <Header />
      <div className="container-home">
        {posts.map((post) => (
          <div className="container-posts" key={post.id}>
            <h1 className="posts-title">{post.title}</h1>
            <p className="posts-text">{post.body}</p>
          </div>
        ))}
        <Footer />
      </div>
    </div>
  );
};
export default Home;
