import { createBunny, getFamilies, checkAuth, logout } from '../fetch-utils.js';

const form = document.querySelector('.bunny-form');
const logoutButton = document.getElementById('logout');

form.addEventListener('submit', async (e) => {
    // prevent default
    e.preventDefault();
    // get the name and family id from the form
    const data = new FormData(form);
    // use createBunny to create a bunny with this name and family id
    const name = data.get('bunny-name');
    const family_id = data.get('family-id');
    const user_id = data.get('user_id');
    await createBunny({
        name: name,
        family_id: family_id,
        user_id: user_id,
    });
    form.reset();
    location.replace('/families');
});

window.addEventListener('load', async () => {
    // let's dynamically fill in the families dropdown from supabase
    // grab the select HTML element from the DOM
    const famSelect = document.querySelector('.family-id');
    const families = await getFamilies();
    // go get the families from supabase

    // for each family
    for (let family of families) {
        const famOption = document.createElement('option');
        famOption.value = family.id;
        famOption.textContent = family.name;

        famSelect.append(famOption);
    }
    // create an option tag

    // set the option's value and text content

    // and append the option to the select
});

checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});
