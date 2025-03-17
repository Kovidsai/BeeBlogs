
let sideBarOn = false;

function displayBlogs(blogs){
    const blogContainer = document.getElementById("blogs");
    blogContainer.innerHTML = "";
    for (let blog of blogs){
        const blogPost = document.createElement("div");
        blogPost.classList.add("blog-post");

        blogPost.innerHTML = `
            <h3>${blog.title}</h3>
            <p>${blog.content}</p>
            <small>By ${blog.author} | ${new Date(blog.created_at).toDateString()}</small>
        `;
        blogContainer.appendChild(blogPost);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let offset = 0;
    const limit = 5;
    let loading = false;
    let hasMore = true;
    const limits = {
        offset: offset,
        limit: limit,
    }
    async function loadBlogs(){
        if(loading || !hasMore) return;
        loading = true;

        try{
            const response = await fetch('http://localhost:8080/blogs?limit=${limit}&offset=${offset}', {
                method: "GET",
                headers: {
                   "content-Type": "application/json",
                },
            });

            const result = await response.json();

            if(response.ok){
                if(result.blogs.length>1){
                    displayBlogs(result.blogs);
                    offset += limit;
                    hasMore = result.hasMore;
                }
                else{
                    hasMore =false;
                }
            }
            else{
                console.error("Error: ", result.error);
                alert("Error: " + result.error)
            }
        } catch(error){
            alert("Error: blah");
            console.error("Error Fetching blogs: ", error);
        } finally{
            loading = false;
        }
    };

    loadBlogs();


    window.addEventListener("scroll", function(){
        if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 100){
            loadBlogs();
        }
    });

});

profileIcon = document.getElementById("profileIcon");

profileIcon.addEventListener("click", function(){
    document.getElementById("sidebar").style.left = 0;
    sideBarOn = true;
});

document.addEventListener("click", function(){
    console.log("In");
    if(sideBarOn){
        document.getElementById("sidebar").style.left = -256;
        sideBarOn = false;
    }
});
