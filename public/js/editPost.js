const postsDiv = document.querySelector(".posts-div");
const posts = document.getElementsByClassName("posts");
const editDiv = document.getElementById('edit');
console.log(posts.length);

for (var i = 0; i < posts.length; i++) {
  console.log(posts[i]);
  posts[i].addEventListener("click", function(event) {
    const postNumber = this.value;
    fetch("http://localhost:3001/api/dashboard/post")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        for (var j = 0; j < data.length; j++) {
          if (data[j].id == postNumber) {
            editDiv.style.display = "block";
            postsDiv.style.display = "none";
            const title = document.getElementById("edit-title");
            const content = document.getElementById("edit-content");
            title.value = data[j].post_title;
            content.value = data[j].post_text;
            editDiv.addEventListener("submit", function(event) {
              const newTitle = title.value.trim();
              const newContent = content.value.trim();
              console.log(newContent);
              const update = fetch('api/dashboard/update', {
                method: 'PUT',
                body: JSON.stringify({
                  id: postNumber,
                  post_title: newTitle,
                  post_text: newContent
                }),
                headers: { 'Content-Type': 'application/json' },
              });
              document.location.replace("/dashboard");
            })
          }
        }

      })

  })
}
//posts.addEventListener("click", function(event) {
  //editDiv.style.display = "block";

//})