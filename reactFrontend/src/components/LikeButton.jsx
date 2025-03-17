import { useParams } from "react-router-dom";
import { useState } from "react";
import { Heart } from "lucide-react";
import axios from "axios";

export default function LikeButton({liked, setLiked, likesCount}){
    const { blogId } = useParams(); // Get the blog ID from the URL
    

    async function toggleLike(){
        try{
            let response;
            if(!liked){
                response = await axios.post(
                    `http://localhost:8080/api/like/${blogId}`,
                    {},
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                    }
                );
            }
            else{
                response = await axios.delete(
                    `http://localhost:8080/api/unlike/${blogId}`,
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                    }
                ); 
            }

            setLiked(!liked);

        } catch(error){
            console.error(error);
        }
    }

    return (
        <button onClick={toggleLike} className="flex items-center space-x-2">
            <Heart
                size={24}
                className={`transition-colors duration-300 ${
                    liked ? "fill-red-500 text-red-500" : "text-gray-500"
                  }`}
            />
            <span className="text-gray-700">{likesCount}</span>
        </button>
    );
}