import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 6;
  const isFirstLoad = useRef(true); // Prevents double fetch in strict mode
  const navigate = useNavigate();
  // Function to fetch blogs
  const fetchBlogs = async () => {
    if (!hasMore) return;
    setLoading(true);

    try {
      const res = await axios.get(
        `http://localhost:8080/api/blogs?limit=${limit}&offset=${offset}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      console.log("API Response:", res.data); // Debugging

      if (Array.isArray(res.data.data)) {
        setBlogs((prevBlogs) => [...prevBlogs, ...res.data.data]);
        setOffset((prevOffset) => prevOffset + limit);
        setHasMore(res.data.hasMore);
      } else {
        console.error("Unexpected API response format:", res.data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load initial blogs
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false; // Ensures it runs only once
      fetchBlogs();
    }
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-900 text-white p-4 fixed h-full">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <ul>
          <li>
            <button
              onClick={() => {
                navigate("/profile");
              }}
            >
              Profile
            </button>
          </li>
          <li>
            <a href="/new-post">New Post</a>
          </li>
          <li>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      <div className="w-3/4 p-6 ml-[25%]">
        <h1 className="text-3xl font-bold mb-4">Latest Blogs</h1>

        {blogs.length === 0 && !loading && <p>No blogs available.</p>}

        {
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-200"
              >
                {/* Blog Title */}
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {blog.title}
                </h2>

                {/* Blog Content Preview (Only 3 Lines) */}
                <p className="line-clamp-3 text-gray-600">{blog.content}</p>

                {/* Likes & Comments */}
                <div className="flex justify-between items-center text-gray-500 text-sm mt-4">
                  <span>{blog.likes_count} 👍</span>
                  <span>{blog.comments_count} 💬</span>
                </div>

                {/* Read More Button */}
                <div className="mt-4">
                  <button
                    onClick={() => navigate(`/blog/${blog.id}`)}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        }

        {blogs.length !== 0 && hasMore && !loading && (
          <button
            onClick={fetchBlogs}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Load More
          </button>
        )}

        {loading && <p>Loading more blogs...</p>}
      </div>
    </div>
  );
}
