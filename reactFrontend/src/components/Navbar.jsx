import { Link } from "react-router-dom";

function Navbar(){
    return (
        <nav className="w-full h-15 flex items-center bg-gray-900 text-white text-lg">
            <h1 className="">BeeBlogs</h1>
            <ul className="flex ml-auto mr-4 w-max gap-4">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">Home</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;