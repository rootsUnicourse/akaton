// Fetch categories and display them
async function loadCategories() {
    const categoriesElement = document.getElementById('categories');
    const levelElement = document.getElementById('level');
    categoriesElement.innerHTML = 'Loading...';

    try {
        const response = await fetch('https://opentdb.com/api_category.php');
        const data = await response.json();

        categoriesElement.innerHTML = ''; // Clear loading text

        // Display categories
        data.trivia_categories.forEach(category => {
            const li = document.createElement('li');
            li.textContent = category.name;
            li.addEventListener('click', () => {
                const difficulty = levelElement.value;
                startQuiz(category.id, difficulty);
            });
            categoriesElement.appendChild(li);
        });
    } catch (error) {
        categoriesElement.innerHTML = 'Failed to load categories.';
        console.error('Error loading categories:', error);
    }
}

// Redirect to the question page
function startQuiz(categoryId, difficulty) {
    location.href = `question.html?category=${categoryId}&difficulty=${difficulty}`;
}

// Load categories on page load
document.addEventListener('DOMContentLoaded', loadCategories);
