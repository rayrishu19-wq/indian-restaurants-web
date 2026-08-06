# 🍽️ Aura | Premium Fine Dining Landing Page Experience

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) ![Responsive](https://img.shields.io/badge/Responsive-Yes-brightgreen?style=flat-square)

A beautifully designed, responsive single-page web application for a fine dining restaurant, built using Vanilla HTML, CSS, and pure JavaScript. This project emphasizes modern UI/UX trends like glassmorphism and smooth animations.

## 🎯 Project Goal
The objective of this project is to showcase professional-grade design using standard web technologies (no frameworks) while maintaining high performance and accessibility.

## 🚀 Learning the Git Workflow

Since your goal is to learn the workflow and push this project to GitHub, follow these exact steps within this directory. This guide assumes you have a GitHub account and Git installed on your absolute environment.

### 1. Stage the files
"Staging" files tells Git that you want to include these current changes in your next commit.
Run this command in the terminal (inside `restaurant-app` folder):
```bash
git add .
```
*(The `.` means "all files" in the current directory).*

### 2. Commit the changes
A "commit" takes a snapshot of your staged files and saves it permanently in your local history.
```bash
git commit -m "Initial commit: Add premium restaurant landing page"
```

### 3. Create a GitHub Repository
1. Go to [github.com](https://github.com) and log in.
2. Click the `+` icon in the top right corner and select **New repository**.
3. Name it `restaurant-app`, leave it Public, and **do NOT check** "Add a README file" (we already made one!).
4. Click **Create repository**.

### 4. Link & Push
Link your local repository to the empty GitHub repository you just created, and push your code!
Copy the commands from your GitHub repo page (under "...or push an existing repository from the command line"), or run:
```bash
git remote add origin https://github.com/YOUR_USERNAME/restaurant-app.git
git branch -M main
git push -u origin main
```
*(Don't forget to replace `YOUR_USERNAME` with your actual GitHub username!)*

---

## 🎨 Features
- **Menu Category Filters:** Interactive tabs to filter signature selections dynamically between Main Course, Exquisite Desserts, and Beverages.
- **Local Storage Bookings Manager:** Simulated reservation manager that allows users to view, search, and cancel active reservations client-side.
- **Guest Testimonial Submission Form:** Star rating review submission picker that appends guest experiences directly to the landing page with LocalStorage persistence.
- **English-Hindi Translation Toggle:** Floating button in the navbar to instantly translate the user interface between English and Hindi.
- **Responsive Layout:** Works beautifully on mobile, tablet, and desktop screens.
- **ScrollSpy Highlighting:** Dynamically highlights the current section in the navigation menu as you scroll.
- **Improved Accessibility (a11y):** Full keyboard support (Enter/Space triggers) and standard ARIA markup (`aria-expanded`, `aria-controls`) for the mobile menu.
- **Date Restriction Validation:** Reservation date input dynamically blocks past dates, ensuring only current or future bookings are allowed.
- **Dynamic Copyright Year:** Automatically renders the current calendar year in the footer.
- **Clean Stylesheet Architecture:** Extracted inline styling into clean, maintainable CSS classes.
- **Glassmorphism:** A modern UI trend used in the reservation form and navbar.
- **Dark Theme:** High contrast, elegant dark mode for a premium "midnight dining" feel.
- **Social Sharing:** Optimized with Open Graph and Twitter meta tags for professional social media links.
- **Back to Top:** Smooth scrolling back-to-top button for improved navigation.
- **Enhanced Footer:** Brand-focused footer with social media links and elegant typography.
- **Dynamic Elements:** Visual fading animation effects on scroll using IntersectionObserver.

## 🔮 Future Enhancements
- **Dynamic Menu:** Fetch menu items from a JSON file or API.
- **Table Booking System:** Integrate with a backend for real-time table availability.
- **Dark/Light Mode Toggle:** Allow users to choose between light and dark themes.

## 🏃‍♀️ How to run locally
No compilation step `npm install` is needed! Just open the `index.html` file in your favorite web browser or right-click `index.html` and use a VS Code extension like "Live Server".

## 💡 Tip
For the best experience on mobile, ensure you view the site in portrait mode.




## 🗺️ Project Roadmap
- [x] Responsive layout optimization.
- [x] Smooth scrolling dynamic navigation.
- [x] Adding dessert card modules.
- [x] Dynamic table booking backend simulation.
- [x] Multi-language English/Hindi translation support.


## 👥 Authors & Contributors
- **Rishu Ray** - *Lead Developer* - [rayrishu19-wq](https://github.com/rayrishu19-wq)
