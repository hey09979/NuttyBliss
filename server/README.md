# NuttyBliss Backend

This is the backend API for the NuttyBliss eCommerce platform.

## 🛠 Tech Stack
- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB (Mongoose)
- **Security:** JWT Authentication
- **Data Management:** Custom seeder script

## 🚀 Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   Create a `.env` file with the following:
   - `PORT`: Server port (default 5000)
   - `MONGO_URI`: MongoDB connection string
   - `JWT_SECRET`: Secret key for authentication
   - `ADMIN_PHONE`: Admin contact for WhatsApp orders

3. Seed the database:
   ```bash
   node seeder.js
   ```

4. Start the server:
   ```bash
   npm start # or node server.js
   ```
