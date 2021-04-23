const newComment = document.querySelector(".comment-btn");
const commentForm = document.querySelector(".comment-form");

newComment.addEventListener('click', function (event) {
  event.preventDefault();
  newComment.style.display = 'none';
  commentForm.style.display = 'inline';
})