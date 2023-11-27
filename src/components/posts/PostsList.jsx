import { useSelector } from "react-redux";
import { PostsListItem } from "./PostsListItem";

export const PostsList = () => {
  const posts = useSelector(state => state.posts.posts);
  const postsList = posts.map(post => {
    return (
      <div key={post.id}>
        <PostsListItem post={post} />
      </div>
    );
  });

  return (
    <div className="container w-50">
      {postsList}
    </div>
  );
};
