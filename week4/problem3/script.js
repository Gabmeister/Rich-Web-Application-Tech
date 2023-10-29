
function userfinder() {//userfinder() called on search btn onclick
    let input = document.querySelector("input").value;

    fetch("https://api.github.com/users/" + input)//fetch user info from github api
        .then((response) => response.json())
        .then((data) => { //update html elements with user info
            document.getElementById("pfp").src = data.avatar_url;
            document.getElementById("name").innerHTML = "Name: " + data.name;  
            document.getElementById("username").innerHTML = "Username: " + data.login;
            document.getElementById("email").innerHTML = "Email: " + data.email;     
            document.getElementById("location").innerHTML = "Location: " + (data.location || "Not available");
            document.getElementById("No-gist").innerHTML = "No. of Gists: " + data.public_gists;
    });
        
    fetch("https://api.github.com/users/" + input + "/repos")//fetch user repositories from github api
        .then((response) => response.json())
        .then((data) => {//map repo names and descriptions
            let name_desc = data.map((repo) => {
                return {
                name: repo.name,
                description: repo.description,
                };
            });

        let repo_container = document.querySelector(".repo-content");//get the repo container element

        repo_container.innerHTML = " ";//clear for new search

        for (let index = 0; index < name_desc.length; index++) {
            let temp = document.createElement("div"); //new container for every repo
            temp.classList.add("rep-container");
            let repoName = document.createElement("div");
            let repoDesc = document.createElement("div");

            repoName.innerHTML = "Name: " + name_desc[index].name;
            repoDesc.innerHTML = "Description: " + name_desc[index].description;

            temp.appendChild(repoName);
            temp.appendChild(repoDesc);
            repo_container.appendChild(temp);

            if (name_desc.length > 5) { //make repo list scrollable if number of repos > 5
            repo_container.style.overflowY = "auto";
            } else {
            repo_container.style.overflowY = "hidden";
            }
        }
    });
}