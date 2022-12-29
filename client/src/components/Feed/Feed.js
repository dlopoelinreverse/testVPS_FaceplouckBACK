import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/posts.actions";
import { isEmpty } from "../../utils/Utils";
import PostCard from "../Post/PostCard";

const Feed = () => {
  const [loadPosts, setLoadPosts] = useState(true);
  const [count, setCount] = useState(5);
  const dipsatch = useDispatch();
  const postsData = useSelector((state) => state.postsReducer);

  const loadMorePosts = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 300 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPosts(true);
      setCount(count + 5);
    }
  };
  useEffect(() => {
    if (loadPosts) {
      dipsatch(getPosts(count));
      setLoadPosts(false);
    }

    window.addEventListener("scroll", loadMorePosts);
    return () => window.removeEventListener("scroll", loadMorePosts);
  }, [loadPosts, dipsatch, count]);
  return (
    <div className="feed-container">
      <ul>
        {!isEmpty(postsData) &&
          postsData.map((post) => (
            <PostCard
              key={post._id}
              postId={post._id}
              postsData={postsData}
              type="feed"
            />
          ))}
      </ul>
    </div>
  );
};

export default Feed;
