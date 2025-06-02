# 🛒 ShopHub - Modern E-commerce Platform

A full-stack e-commerce application built with React, Redux Toolkit, and modern web technologies. ShopHub provides a seamless shopping experience with a clean, responsive design and powerful features for both customers and administrators.

## Backend-Repo => https://github.com/RahulGurav82/Ecommerce-Backend

## 🌟 Features

### 🛍️ Customer Features
- **Product Browsing**: Browse products with advanced filtering and search capabilities
- **Product Details**: Detailed product pages with images, descriptions, and customer reviews
- **Shopping Cart**: Add/remove items with real-time cart updates
- **User Authentication**: Secure registration and login system
- **Payment Integration**: Seamless checkout with Razorpay payment gateway
- **Order Management**: Track order history and status
- **Customer Reviews**: Rate and review products
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🔧 Admin Features
- **Product Management**: Add, edit, and delete products
- **Order Management**: View and manage customer orders
- **User Management**: Monitor user accounts and activities
- **Dashboard Analytics**: Sales insights and performance metrics

### 🎨 UI/UX Features
- **Modern Design**: Clean and intuitive interface using shadcn/ui components
- **Dark/Light Theme**: Toggle between themes with next-themes
- **Smooth Animations**: Enhanced user experience with Framer Motion
- **Toast Notifications**: Real-time feedback using Sonner
- **Loading States**: Skeleton loaders and loading indicators

## 🚀 Live Demo

Visit the live application: [ShopHub](https://ecommerce-frontend-nine-rouge.vercel.app/)

## 📸 Screenshots

### 🏠 Home Page
![ShopHub Home Page](https://github.com/user-attachments/assets/ebe58331-037a-4da1-9837-e599f30948ad)
*Modern, responsive home page with featured products and intuitive navigation*

### 🏠 Admin Dashboard
![ShopHub Admin Page](https://github.com/user-attachments/assets/b5e8a126-0bba-4c41-8f6b-2c450e3f1f93)
*Modern, responsive admin page with featured products and orders navigation*

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Framer Motion** - Smooth animations and transitions
- **Axios** - HTTP client for API calls

### UI Components & Libraries
- **ShadCN UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Sonner** - Toast notifications
- **React Motion** - Animation

### Development Tools
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting
- **TypeScript Support** - Type-safe development

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Clone the Repository
```bash
git clone https://github.com/RahulGurav82/Ecommerce-frontend
cd Ecommerce-frontend
```

### Install Dependencies
```bash
npm install
# or
yarn install
```

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_BASE_URL=http://localhost:5000
```

### Run Development Server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
# or
yarn build
```

### Preview Production Build
```bash
npm run preview
# or
yarn preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── common/         # Common components
│   └── features/       # Feature-specific components
├── pages/              # Application pages/routes
├── store/              # Redux store configuration
│   ├── slices/         # Redux slices
│   └── api/           # API service layers
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── lib/                # Library configurations
└── assets/             # Static assets
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Styling & Theming

ShopHub uses Tailwind CSS 4 with a custom design system:

- **Typography**: Optimized font scales and spacing
- **Components**: Consistent component library with shadcn/ui
- **Responsive Design**: Mobile-first approach

## 🔒 Authentication & Security

- JWT-based authentication
- Protected routes for authenticated users
- Role-based access control (Customer/Admin)
- Secure API communication

## 📱 Responsive Design

ShopHub is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📟 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1280px+)

## 🚀 Performance Optimizations

- **Code Splitting**: Route-based code splitting
- **Lazy Loading**: Components and images loaded on demand
- **Bundle Optimization**: Minimized bundle size with Vite
- **Caching**: Efficient API response caching
- **Image Optimization**: Responsive images with proper formats

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Radix UI** for accessible component primitives
- **Vercel** for seamless deployment
- React and Vite communities for excellent tooling

## 📞 Support

If you have any questions or run into issues, please:
- Open an issue on GitHub
- Check the documentation
- Contact the development team

---

<div align="center">
  <p>Built with ❤️ using React and modern web technologies</p>
  <p>
    <a href="https://ecommerce-frontend-nine-rouge.vercel.app/">View Live Demo</a> •
    <a href="#installation--setup">Get Started</a> •
    <a href="#contributing">Contribute</a>
  </p>
</div>