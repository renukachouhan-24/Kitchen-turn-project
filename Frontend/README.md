# KitchenFlow

KitchenFlow is a web application built by Navgurukul students to manage kitchen duties efficiently and fairly. It streamlines daily kitchen operations, team rotations, menu management, feedback, and more for student communities.

## Features

- **Role Selection:** Students and coordinators have different dashboards and permissions.
- **Kitchen Team Rotation:** Automatic daily rotation of kitchen teams.
- **Menu Management:** Add, update, and view daily meal menus.
- **Photo Upload:** Upload and view meal photos.
- **Feedback & Ratings:** Submit and view feedback for kitchen teams.
- **Skip Requests:** Request to skip kitchen duty and manage requests (coordinator).
- **User Management:** Coordinators can manage student roles and statuses.
- **Firebase Analytics:** Integrated for usage tracking.
- **Responsive UI:** Built with React and Vite.

## Tech Stack

- **Frontend:** React, Vite, CSS Modules
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Cloudinary:** For photo uploads
- **Firebase Analytics:** For tracking usage
- **Deployment:** Render (Backend), Vercel (Frontend)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```bash
git clone https://github.com/renukachouhan-24/Kitchen-turn-project.git
cd Kitchen-turn-project/Frontend
npm install
```

### Running Locally

```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

### Build for Production

```bash
npm run build
```

## Environment Variables

- See `.env.example` for required environment variables (if any).

## Project Structure

- `src/components/` — React components
- `src/firebase.js` — Firebase Analytics initialization
- `src/App.jsx` — Main app routes
- `src/main.jsx` — App entry point

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](../LICENSE)

---

Made with ❤️ by Navgurukul students.
