import LoggedInNavbar from '../components/loggedInNavbar';
import CreatePostComponent from '../pages/forum_page/create_post/CreatePost';

function CreatePost() {
  return (
    <>
      <LoggedInNavbar />
      <CreatePostComponent />
    </>
  );
}

export default CreatePost;
