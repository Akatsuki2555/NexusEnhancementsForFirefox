/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

console.log("Test");

(async() => {
    if (location.search.indexOf('tab=posts') > -1) {
        let blockedUsers = await browser.storage.local.get("blockedUsers");
        if (blockedUsers == null)
            blockedUsers = [];
    
        let comments = document.querySelectorAll(".comment");
        comments.forEach(element => {
            let commenter = element.children[1].children[1].children[0].children[0].textContent;
            let comment = element.children[2].textContent;
            console.log(commenter);
            console.log(comment);
            if (blockedUsers.contains(commenter)) {
                element.style.display = "none";
            }
        });
    }
    
})().then(x => {
    console.log("Execution of extension finished!");
})