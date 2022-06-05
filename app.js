import fetchAPI from './fetchAPI.js'


async function getUsers(num){
  const {data} = await fetchAPI(`https://randomuser.me/api/?results=${num}`)
  const users =  data.results
  return users
}


async function displayUsers(){
  const users = await getUsers(50)

  const usersContainer = document.querySelector('.users-container')
  createUserFromList(users, usersContainer)
  eventListeners(users)
}

function createUserFromList(users, container){
  users.forEach(user => {
    const div = document.createElement("div")
    div.className = 'user'

    div.innerHTML = `
     <img src=${user.picture.large}></img>
        <div class="user-informations">
           <h4 class="user-title">${user.name.first} ${user.name.last}</h4>
            <p class="user-locale">${user.location.city} - ${user.location.country}</p>
    `
    container.appendChild(div)
  });
}

function eventListeners(users){

  const searchUsers = document.querySelector("#search-users");
  searchUsers.addEventListener("input", () => {
    const usersContainer = document.querySelector(".users-container")

    const filterUsers = users.filter((user) =>
      `${user.name.first.toUpperCase()} ${user.name.last.toUpperCase()} `
        .includes(searchUsers.value.toUpperCase()))

    usersContainer.innerHTML = ''

    createUserFromList(filterUsers, usersContainer)
  })

}




displayUsers()



