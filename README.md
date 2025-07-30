# Mini Webshop Frontend

This project is a simple webshop built with **Next.js** and **Tailwind CSS**.
It implements a basic storefront for guests and an admin dashboard for product
and order management.

## Installation

Install Node.js (version 22 or newer) and then install the project dependencies:

```bash
npm install
```

### Development

Start the development server with:

```bash
npm run dev
```

### Production

Build and start the production server:

```bash
npm run build
npm start
```

The API base URL can be configured via the `NEXT_PUBLIC_API_BASE_URL` environment
variable.

### Docker

You can also run the application inside a Docker container:

Firstly create a `.env` file from the `.env.sample` file

```bash
docker build -t neptis-webshop-frontend .
docker run -p 3000:3000 neptis-webshop-frontend
```

## Functionality

### Guest Webshop
- Browse products with search
- View product details and add to cart
- Cart management and checkout form

### Admin Dashboard
- Login with username and password
- Manage products (create, edit, delete)
- View orders and update their status

Both interfaces are responsive.
