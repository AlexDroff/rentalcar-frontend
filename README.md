## RentalCar

Frontend for a car rental application. Browse a catalog of cars, filter by various criteria, view detailed information, save favorites, and send a booking request for a selected car.

### Live Demo

- **Production**: https://rentalcar-frontend-six.vercel.app/

### Main Features

- **Home page** with a hero section and a direct link to the catalog.
- **Car catalog** with backend filtering by **brand**, **price**, and **mileage (from / to)**.
- **Pagination with "Load more"** powered by backend pagination.
- **Favorites** stored in `localStorage` and restored after page reload.
- **Car details page** with image, description, specifications, rental conditions, accessories, and functionalities.
- **Booking form** with client-side validation, async request handling, and success/error notifications.
- **Responsive layout** for home, catalog, and car details pages.

### Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Zustand** for state management
- **Axios** for HTTP requests
- **CSS Modules** for styling

### Getting Started

#### 1. Install dependencies

```bash
npm install
```

#### 2. Configure environment variables

Create a `.env.local` file in the project root with the following variables:

```bash
NEXT_PUBLIC_API_URL=https://car-rental-api.goit.global
RESEND_API_KEY=your_resend_api_key_here
EMAIL_TO=your_booking_notifications_email@example.com
```

- **NEXT_PUBLIC_API_URL**: base URL of the car rental API.
- **RESEND_API_KEY**: API key for [Resend](https://resend.com) to send booking emails.
- **EMAIL_TO**: email address that receives booking requests.

#### 3. Run the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Scripts

- **`npm run dev`** - start the development server
- **`npm run build`** - build the production bundle
- **`npm run start`** - start the production server
- **`npm run lint`** - run ESLint

### Project Structure

- `app/` - Next.js App Router pages, layouts, and API routes
  - `/` - home page
  - `/catalog` - catalog page with filters and pagination
  - `/catalog/[id]` - car details page
  - `/api/book-car` - booking API route
- `components/` - UI components for layout, catalog, details page, form, and shared elements
- `lib/api/` - Axios instance and API service layer
- `lib/store/` - Zustand stores
  - `cars.store.ts` - catalog state, filters, pagination, favorites
  - `car-details.store.ts` - details page loading, error, and selected car state
- `types/` - shared TypeScript types
- `utils/` - helpers for formatting and image fallback handling
- `public/images/` - static assets, icons, hero image, and fallback placeholder

### Notes

- Favorites persist after reload via Zustand `persist`.
- Catalog filtering and pagination are performed on the backend API.
- Booking requests are sent through the local Next.js API route using Resend.
- The project is deployed on **Vercel**.

### Author

- **Name**: Oleksandr Droff
- **GitHub**: [AlexDroff](https://github.com/AlexDroff)
