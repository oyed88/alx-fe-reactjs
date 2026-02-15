# Recipe Sharing Platform

A modern, responsive web application for sharing and discovering delicious recipes. Built with React, React Router, and Tailwind CSS.

## Features

### ✅ Implemented Features

1. **Home Page**
   - Grid layout displaying all available recipes
   - Recipe cards with images, titles, and summaries
   - Hover effects and smooth animations
   - Responsive design for mobile, tablet, and desktop
   - Navigation to Add Recipe form

2. **Recipe Detail Page**
   - Complete recipe information display
   - Ingredients list with bullet points
   - Step-by-step cooking instructions
   - Chef's tips section
   - Back navigation to home page
   - Responsive layout with proper spacing

3. **Add Recipe Form**
   - Form fields for recipe title, ingredients, and preparation steps
   - Real-time form validation
   - User-friendly error messages
   - Success notification on submission
   - Clear form functionality
   - Helpful tips for writing great recipes
   - Fully responsive design

## Technologies Used

- **React** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and development server

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14 or higher)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/alx-fe-reactjs.git
   cd alx-fe-reactjs/recipe-sharing-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

   This will install:
   - React and React DOM
   - React Router DOM
   - Tailwind CSS and its dependencies
   - Vite and related tools

3. **Install React Router (if not already installed)**
   ```bash
   npm install react-router-dom
   ```

## Running the Application

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   - Navigate to `http://localhost:5173` (or the URL shown in your terminal)

3. **Explore the application**
   - Browse recipes on the home page
   - Click on any recipe to view details
   - Click "Add Recipe" to submit a new recipe

## Project Structure

```
recipe-sharing-platform/
├── src/
│   ├── components/
│   │   ├── HomePage.jsx          # Main page with recipe grid
│   │   ├── RecipeDetail.jsx      # Individual recipe details
│   │   └── AddRecipeForm.jsx     # Form to add new recipes
│   ├── data.json                 # Recipe data
│   ├── App.jsx                   # Main app with routing
│   └── main.jsx                  # Entry point
├── public/
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Routes

- `/` - Home page with all recipes
- `/recipe/:id` - Detail page for a specific recipe
- `/add-recipe` - Form to add a new recipe

## Form Validation Rules

The Add Recipe Form includes the following validations:

1. **Recipe Title**
   - Required field
   - Minimum 3 characters

2. **Ingredients**
   - Required field
   - Must have at least 2 ingredients (one per line)

3. **Preparation Steps**
   - Required field
   - Minimum 10 characters for detailed instructions

## Styling Features

- **Responsive Design**: Adapts to mobile, tablet, and desktop screens
- **Tailwind CSS Utilities**: Clean, maintainable styling
- **Hover Effects**: Interactive card animations
- **Color Scheme**: Warm orange and amber gradients
- **Accessibility**: Proper color contrast and semantic HTML

## Sample Recipes

The application comes with 6 pre-loaded recipes:
1. Classic Spaghetti Carbonara
2. Homemade Margherita Pizza
3. Chocolate Chip Cookies
4. Thai Green Curry
5. Caesar Salad
6. Beef Tacos

Each recipe includes:
- Title and summary
- High-quality image
- Complete ingredients list
- Step-by-step instructions
- Chef's tips

## Future Enhancements

Potential features for future development:
- Recipe search and filtering
- User authentication
- Recipe ratings and reviews
- Image upload for user-submitted recipes
- Save favorite recipes
- Print recipe functionality
- Social sharing
- Cooking timer integration

## Contributing

This project is part of the ALX Frontend Development program. Contributions, issues, and feature requests are welcome!

## Repository Information

- **GitHub repository**: `alx-fe-reactjs`
- **Directory**: `recipe-sharing-platform`

## License

This project is part of the ALX Software Engineering program.

## Acknowledgments

- Recipe images from Unsplash
- Built as part of the ALX Frontend React curriculum
- Tailwind CSS for the utility-first approach to styling

---

**Happy Cooking! 🍳👨‍🍳👩‍🍳**
