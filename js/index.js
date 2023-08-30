document.addEventListener("DOMContentLoaded",()=>{
    const form = document.querySelector("#github-form")

    form.addEventListener('submit',(event)=>{
        event.preventDefault()
        input = event.target.querySelector("#search")
        fetch(`https://api.github.com/search/users?q=${input.value}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/vnd.github.v3+json'
            }
        })
        .then(response=>response.json())
        .then(data=>{
            const uList = document.querySelector("#user-list")
            while(uList.firstChild){
                uList.firstChild.remove()
            }
            for(const user of data.items){
                uList.appendChild(userList(user))
            }
            
        })
})
})
function userList(obj){
    const listItem = document.createElement('li')
    const linkUsername = document.createElement('a')
    const pfp = document.createElement('img')
    linkUsername.textContent = obj.login
    linkUsername.href = `https://github.com/${obj.login}`
    pfp.src = obj.avatar_url
    listItem.style.display = 'flex';
    listItem.style.alignItems = 'center';
    pfp.style.width = '20%';
    pfp.style.height = "auto";
    linkUsername.style.padding = '10px';
    listItem.appendChild(pfp)
    listItem.appendChild(linkUsername)
    const reposBtn = document.createElement('button')
    reposBtn.textContent = "repos";
    reposBtn.addEventListener('click',()=>{
        fetch(`https://api.github.com/users/${obj.login}/repos`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/vnd.github.v3+json'
            }
        })
        .then(respone=>respone.json())
        .then(data=>{
            const reposList = document.querySelector("#repos-list")
            while(reposList.firstChild){
                reposList.firstChild.remove()
            }
            const userNameTitle = document.createElement('li')
            userNameTitle.textContent = obj.login + " repositorys"
            reposList.appendChild(userNameTitle)
            for(const repos of data){
                reposList.appendChild(userRepos(repos,obj.login));
            }
        })
    })
    listItem.appendChild(reposBtn)
    return listItem
}
function userRepos(obj,username){
    const listItem = document.createElement('li');
    const reposLink = document.createElement('a');
    reposLink.href = `https://github.com/${username}/${obj.name}`;
    reposLink.textContent = obj.name
    listItem.appendChild(reposLink)
    listItem.style.padding = '10px';
    return listItem
}
