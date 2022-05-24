import { checkAuth, deleteBunny, getFamilies, logout } from '../fetch-utils.js';

checkAuth();

const familiesEl = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

async function displayFamilies() {
    const families = await getFamilies();

    familiesEl.textContent = '';
    for (let family of families) {
        const familyDiv = document.createElement('div');
        familyDiv.classList.add('family');

        const h3 = document.createElement('h3');
        h3.textContent = family.name;

        const bunniesDiv = document.createElement('div');

        bunniesDiv.classList.add('bunnies');
        for (let bunny of family.fuzzy_bunnies) {
            const bunnyDiv = document.createElement('div');
            bunnyDiv.classList.add('bunny');
            bunnyDiv.textContent = bunny.name;

            bunnyDiv.addEventListener('click', async () => {
                await deleteBunny(bunny.id);
                displayFamilies();
            });
            bunniesDiv.append(bunnyDiv);
        }

        familyDiv.append(h3, bunniesDiv);
        familiesEl.append(familyDiv);
    }

    // append the bunniesEl and nameEl to the familyEl

    // append the familyEl to the familiesEl
}
displayFamilies();
