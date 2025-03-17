import { useEffect, useState } from "react";
import CommentPreview from "./CommentPreview";
import axios from "axios";

export default function CommentsMini({ blogId, openSidebar }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchLatestComments() {
      try {
        const response = await axios.get(`http://localhost:8080/api/latestcomments/${blogId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log((await response).data);
        setComments(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLatestComments();
  }, [blogId]);

  return (
    <div className="mt-4">
    {!comments && <p>No Comments available.</p>}

    { comments &&
    <div>

      {comments.map((comment) => (
        <CommentPreview key={comment.id} comment={comment} />
      ))}
      </div>
    }
     { comments &&
     ( <button className="text-blue-500 mt-2">
        See All Comments
      </button>)
      }
    </div>
  );
}
