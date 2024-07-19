let blockedUsers = browser.storage.sync.get({ blockedUsers: [] });

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
        (async () => {
            let { blockedUsers } = await browser.storage.sync.get({ blockedUsers: [] });
            blockedUsers = blockedUsers.filter((u) => u !== user);
            await browser.storage.sync.set({ blockedUsers });
            location.reload();
        })();
    };
}

function addUser() {
    (async () => {
        let userName = document.getElementById("user-name").value;
        let { blockedUsers } = await browser.storage.sync.get({ blockedUsers: [] });
        blockedUsers.push(userName);
        await browser.storage.sync.set({ blockedUsers });
        document.getElementById('user-name').value = '';
        location.reload();
    })();
}

document.getElementById("add-user-btn").onclick = addUser;