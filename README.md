# CWIP Dashboard

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- Backend API running on `http://localhost:5001`

## Setup Instructions

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/cwip.git
   cd cwip
   ```

2. **Install frontend dependencies**
   ```sh
   npm install
   ```

3. **Start the frontend**
   ```sh
   npm start
   ```
   The app will run at [http://localhost:3000](http://localhost:3000).

4. **Start the backend**
   - Navigate to the backend folder:
     ```sh
     cd backend
     npm install
     node server.js
     ```
   - Ensure the backend is running at `http://localhost:5001`.

## Dependencies

- React
- react-router-dom
- react-icons
- recharts
- (Add any other dependencies from your `package.json`)

## Usage

- **Dashboard**: View summary cards and charts for aged, ongoing, and completed items.
- **Navigation**: Click cards to view detailed lists.
- **Data**: The app fetches data from the backend API endpoints:
  - `/api/aged-items`
  - `/api/ongoing-ontrack`
  - `/api/completed-items`

## Testing

To run tests:
```sh
npm test
```

## Build

To create a production build:
```sh
npm run build
```

## Troubleshooting

- Ensure the backend is running before starting the frontend.
- If you see CORS errors, check backend configuration.

## License

MIT (or your chosen license)