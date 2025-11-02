# 🍳 Kitchen Turn Project

🚀 **Solved: The Kitchen Duty Chaos!** 🚀
A full-stack MERN application designed to **automate and simplify kitchen duty rotation** in hostels and shared living spaces — ensuring **fairness, transparency, and zero manual effort**.

🔗 **Live Project:** [Kitchen Turn Project]([https://lnkd.in/gHkrX-kq](https://kitchen-turn-project-iwjf.vercel.app/))

---

## 💡 Problem Statement

Managing kitchen duty manually often leads to:

* Unfair or uneven rotations
* Missed turns
* Miscommunication and conflicts

To eliminate these issues, we built an **automated solution** that manages daily rotations, handles leave requests, and keeps everyone accountable.

---

## 💻 Our Solution

The **Kitchen Turn Project** automates kitchen duty scheduling using a smart rotation system that updates daily at midnight.
Admins and students can both interact with the system in real-time for smooth coordination.

---

## ✨ Key Features

### 🔄 **Dynamic Rotation**

* Automatic student rotation every midnight using cron jobs.
* Ensures fair turn distribution without manual input.

### 🧑‍🍳 **Team & Leave Management**

* Admins can mark students as *active* or *on leave*.
* System automatically adjusts the rotation list accordingly.

### 🕐 **Skip Request System**

* Students can formally request to skip their turn through the app.
* Admins can review and approve or decline requests.

### ☁️ **Cloud Integration**

* Uses **Cloudinary** for image uploads.
* Seamless **Axios** integration for API communication.

### 💬 **Real-Time Dashboard**

* Displays daily kitchen duty status.
* Auto-refreshes after each rotation update.

---

## 🧠 Tech Stack

| Category           | Technology                 |
| ------------------ | -------------------------- |
| **Frontend**       | React (Vite), Tailwind CSS |
| **Backend**        | Node.js, Express.js        |
| **Database**       | MongoDB                    |
| **Image Handling** | Cloudinary                 |
| **Scheduling**     | Node-Cron                  |
| **API Calls**      | Axios                      |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/kitchen-turn-project.git
cd kitchen-turn-project
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory with the following values:

```
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_URL=your_cloudinary_url
PORT=5000
```

### 4️⃣ Run the Project

#### Backend:

```bash
npm run server
```

#### Frontend:

```bash
npm run dev
```

The app will now be running locally 🚀

---

## 🧩 Known Issues

* Sometimes, students are not visible in the dashboard and the rotation gets stuck.
* The rotation (which runs every midnight) may occasionally mix today’s and tomorrow’s students.
  📌 [See GitHub Issue → “Students Not Visible & Rotation Stuck in Between”](#)

---

## 👨‍💻 Contributors

* **Renuka Chouhan** 
* **Nikita Panwar**
* **Prachi Kurwale**
* **Respected Brigadier (Dr) Kishor Jadhav Sir** – President - AJMF

---

## ❤️ Acknowledgements

Huge thanks to our mentors and collaborators for their constant support and guidance throughout this project.

---

## 🤝 Let’s Connect

Open to collaborations, contributions, and discussions related to:

* Community Management Systems
* Full-Stack MERN Development
* Automation Projects

