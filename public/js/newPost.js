const newPostBtn = document.getElementById("add");
const newPostDiv = document.getElementById('new-post');
const newPostForm = document.getElementById("new-post-form");


newPostBtn.addEventListener('click', function(event) {
  event.preventDefault();
  newPostBtn.style.display = 'none';
  newPostDiv.style.display = "block";

})

newPostForm.addEventListener("submit", async function(event) {
  event.preventDefault();
  const newPostTitle = document.getElementById("post-title").value.trim();
  const newPostContent = document.getElementById("post-content").value.trim();
  console.log(newPostTitle);
  newPostBtn.style.display = 'block';
  newPostDiv.style.display = 'none';
  if (newPostTitle && newPostContent) {
    const post = await fetch('/api/dashboard/post', {
      method: 'POST',
      body: JSON.stringify({
        post_title: newPostTitle,
        post_content: newPostContent
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (post.ok) {
      document.location.replace("/dashboard")
    } else {
      alert('didnt work');
    }
  }



})