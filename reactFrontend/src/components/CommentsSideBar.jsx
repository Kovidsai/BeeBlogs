import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";

export default function CommentsSidebar() {
  const { id } = useParams(); // Get post ID from URL
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView(); // Detect when last comment is in view

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/comments/${id}?page=${page}`
        );
        if (res.data.comments.length === 0) {
          setHasMore(false);
        } else {
          setComments((prev) => [...prev, ...res.data.comments]);
          setPage((prev) => prev + 1);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
    if (inView && hasMore) {
      fetchComments();
    }
  }, [inView]);

  return (
    <div className="sidebar">
      <h2>Comments</h2>
      {comments.map((comment, index) => (
        <div key={comment.id} className="comment">
          <p>{comment.text}</p>
          <small>By {comment.user.username}</small>
        </div>
      ))}
      {hasMore && (
        <div ref={ref} className="loading">
          Loading more...
        </div>
      )}
    </div>
  );
}
