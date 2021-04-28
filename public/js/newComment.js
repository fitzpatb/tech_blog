const newComment = document.querySelector(".comment-btn");
const commentForm = document.querySelector(".comment-form");


newComment.addEventListener('click', function (event) {
  event.preventDefault();
  newComment.style.display = 'none';
  commentForm.style.display = 'block';
});

commentForm.addEventListener("submit", async function(event) {
  //event.preventDefault();
  const comment = document.getElementById("comment").value.trim();
  newComment.style.display = 'block';
  commentForm.style.display = 'none';
  if (comment) {
    const post = await fetch('/api/dashboard/comment', {
      method: 'POST',
      body: JSON.stringify({
        comment: comment
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (post.ok) {
      document.location.reload();
    } else {
      alert('didnt work');
    }
  }
})