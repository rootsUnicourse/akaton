// Fetch categories from the Open Trivia API
async function loadCategories() {
    const categoriesElement = document.getElementById('categories');
    categoriesElement.innerHTML = 'Loading...';

    try {
        const response = await fetch('https://opentdb.com/api_category.php');
        const data = await response.json();

        categoriesElement.innerHTML = ''; // Clear the loading text

        // Save categories globally
        window.categories = data.trivia_categories;

        // Display categories
        displayCategories(data.trivia_categories);
    } catch (error) {
        categoriesElement.innerHTML = 'Failed to load categories.';
        console.error('Error loading categories:', error);
    }
}

// Display categories
function displayCategories(categories) {
    const categoriesElement = document.getElementById('categories');
    categoriesElement.innerHTML = '';

    categories.forEach(category => {
        const li = document.createElement('li');
        li.textContent = category.name;
        li.addEventListener('click', () => {
            alert(`You selected: ${category.name}`);
            // Redirect or handle category selection here
        });
        categoriesElement.appendChild(li);
    });
}

// Filter categories based on search input
function filterCategories() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const filteredCategories = window.categories.filter(category =>
        category.name.toLowerCase().includes(searchInput)
    );

    displayCategories(filteredCategories);
}

// Event listeners for search and filters
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();

    // Add event listener to the search input
    document.getElementById('search').addEventListener('input', filterCategories);
});
