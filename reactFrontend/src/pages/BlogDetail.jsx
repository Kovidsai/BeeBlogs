import { Navigate, useParams } from "react-router-dom";
import { use, useEffect, useState } from "react";
import axios from "axios";
import LikeButton from "../components/LikeButton";
import CommentsMini from "../components/CommentsMini";

const BlogDetail = () => {
  const { blogId } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState({content: ""});
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');

  function handleCommentChange(e){
    setComment({[e.target.name] : e.target.value});
  }
  async function handleCommentSubmission(e){
    e.preventDefault();
    try{
      const response = axios.post(
        `http://localhost:8080/api/${blogId}/comment`,
        comment,
        {
          headers : {Authorization : `Bearer ${localStorage.getItem("token")}`,}
        }
      );
      alert((await response).data.message);
      // console.log(response);
    } catch(error){
      console.error(error);
    }
  }

  function handleSeeAllComments(){
    
  }

  useEffect(() => {
    async function fetchBlogDetails() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/blog/${blogId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBlog(response.data.data);
        setLiked(response.data.liked);
      } catch {
        console.error("Error fetching blog", error);
      }
    }
    fetchBlogDetails();
  }, [blogId]);

  if (!blog) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p className="text-gray-600 mt-4">{blog.content}</p>
      <div className="flex mt-6 text-gray-500 text-sm gap-2">
        <span>
          <LikeButton
            liked={liked}
            setLiked={setLiked}
            likesCount={blog.likes_count}
          />
        </span>{" "}
        | <span>💬 {blog.comments_count}</span>
      </div>
      <div>
        <form onSubmit={handleCommentSubmission}>
          <input type="text" placeholder="write a comment" name="content" onChange={handleCommentChange} />
          <button type="submit">post</button>
        </form>
      </div>
      <CommentsMini blogId={blogId} openSidebar={handleSeeAllComments} />
    </div>
  );
};

export default BlogDetail;
