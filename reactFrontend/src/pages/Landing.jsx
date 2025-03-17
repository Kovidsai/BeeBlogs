import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center px-6">
      <h1 className="text-5xl font-bold">Welcome to BeeBlogs</h1>
      <p className="mt-4 text-lg max-w-2xl">
        A minimal blogging platform where users can share thoughts, read blogs,
        and connect with others.
      </p>
      <div className="mt-6 space-x-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 bg-green-500 rounded-lg hover:bg-green-600"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default Landing;
