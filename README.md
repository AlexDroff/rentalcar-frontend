## RentalCar

Frontend for a car rental application. Browse a catalog of cars, filter by various criteria, view detailed information, and send a booking request for a selected car.

### Main features

- **Car catalog**: paginated list of available rental cars.
- **Filtering**: filter cars by **brand**, **price**, and **mileage (from / to)**.
- **Pagination with "Load more"**: fetches additional cars from the backend via API (server-side pagination).
- **Favorites**: mark cars as favorites; favorites are stored in `localStorage` and persist across sessions.
- **Car details page**: dedicated page with full car information, specifications, and image.
- **Booking form**: submit a booking request for a specific car via a form on the details page.

### Tech stack

- **Next.js** (App Router)
- **TypeScript**
- **Zustand** for state management
- **Axios** for HTTP requests
- **CSS Modules** for styling

### Getting started

#### 1. Install dependencies

```bash
npm install
# or
yarn install
```

#### 2. Configure environment variables

Create a `.env.local` file in the project root with the following variables:

```bash
NEXT_PUBLIC_API_URL=https://car-rental-api.goit.global
RESEND_API_KEY=your_resend_api_key_here
EMAIL_TO=your_booking_notifications_email@example.com
```

- **NEXT_PUBLIC_API_URL**: base URL of the car rental API (must match the GoIT car rental API or your backend).
- **RESEND_API_KEY**: API key for [Resend](https://resend.com) to send booking emails.
- **EMAIL_TO**: email address where booking requests will be delivered.

#### 3. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open `http://localhost:3000` in your browser to see the application.

### Scripts

- **`npm run dev`** – start the development server.
- **`npm run build`** – build the production bundle.
- **`npm run start`** – start the app in production mode (after `npm run build`).
- **`npm run lint`** – run ESLint.

### Project structure (high level)

- `app/` – Next.js App Router pages and layouts.
  - `/` – home page with hero banner.
  - `/catalog` – car catalog with filters and pagination.
  - `/catalog/[id]` – car details page with specs and booking form.
- `components/` – UI components (catalog, car details, common UI elements).
- `lib/api/` – Axios instance and car API service.
- `lib/store/` – Zustand store for cars, filters, pagination, and favorites.
- `types/` – shared TypeScript types.
- `utils/` – helpers for formatting and other utilities.
