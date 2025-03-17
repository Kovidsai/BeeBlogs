import axios from "axios";
import { useState } from "react";

export default function NewPost({ onClose }) {
  const [blogContent, setBlogContent] = useState({ title: "", content: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setBlogContent({ ...blogContent, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.post(
        "http://localhost:8080/api/uploadblog",
        blogContent,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Blog Uploaded Successfully!");
      setBlogContent({ title: "", content: "" });
      onClose(); // Close modal after successful post
    } catch (err) {
      setError("Failed to upload blog. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
        onClick={onClose} // Close modal when clicking outside
      >
        {/* Form Container */}
        <div
          className="bg-gray-900 p-6 rounded-lg shadow-xl w-[400px] relative"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
            onClick={onClose}
          >
            ✖
          </button>

          {/* Heading */}
          <h2 className="text-2xl font-semibold mb-5 text-center text-white">
            📝 Create a Blog
          </h2>

          {/* Error Message */}
          {error && <p className="text-red-400 text-center mb-2">{error}</p>}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-gray-300 text-sm">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={blogContent.title}
                placeholder="Enter Blog Title"
                onChange={handleChange}
                required
                className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-gray-300 text-sm">
                Content
              </label>
              <textarea
                name="content"
                value={blogContent.content}
                placeholder="Write your blog here..."
                onChange={handleChange}
                required
                rows="5"
                className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 p-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              {loading ? "Posting..." : "Post Blog"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
