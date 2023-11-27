import { Card, CardBody, CardText, CardHeader } from "reactstrap";
import PostImagesCarousel from "./PostImagesCarousel";

export const PostsListItem = ({ post }) => {
  const postImages = post.images_urls;

  return (
    <Card className="mb-4">
      <CardHeader>
        {post.user.username}
      </CardHeader>
      <PostImagesCarousel images={postImages} />
      <CardBody>
        <CardText>
          {post.caption}
        </CardText>
      </CardBody>
    </Card>
  );
};
