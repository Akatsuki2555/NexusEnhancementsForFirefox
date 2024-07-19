let blockedUsers = browser.storage.local.get({ blockedUsers: [] });

blockedUsers.then((result) => {
    let users = result.blockedUsers;
    let usersList = document.getElementById("blocked-users");
    users.forEach((user) => {
        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = removeUser(user);

        let userItem = document.createElement("div");
        userItem.textContent = user;
        userItem.appendChild(removeButton);
        usersList.appendChild(userItem);
    });
});

function removeUser(user) {
    return function () {
        let users = blockedUsers.blockedUsers;
        let index = users.indexOf(user);
        users.splice(index, 1);
        browser.storage.local.set({ blockedUsers: users });
        let usersList = document.getElementById("blocked-users");
        usersList.removeChild(usersList.childNodes[index]);
    };
}

function addUser() {
    let userName = document.getElementById("user-name").value;
    let users = blockedUsers.blockedUsers;
    users.push(userName);
    browser.storage.local.set({ blockedUsers: users });
    location.reload();
}

document.getElementById("add-user-btn").onclick = addUser;