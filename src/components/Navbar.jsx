

// import React, { useState } from "react";
// import { useCart } from "../context/CartContext";
// import { Menu, X } from "lucide-react";

// function IconCart(props) {
//   return (
//     <svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...props}>
//       <path
//         d="M3 3h2l.9 5.4A3 3 0 0 0 8.8 11h8.9a1 1 0 0 0 .96-.75L21 6H6"
//         stroke="currentColor"
//         strokeWidth="1.4"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <circle cx="10" cy="20" r="1" fill="currentColor" />
//       <circle cx="18" cy="20" r="1" fill="currentColor" />
//     </svg>
//   );
// }

// export default function Navbar({ onCartOpen }) {
//   const { count } = useCart();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <header className="fixed inset-x-0 top-0 z-40 bg-white/80 backdrop-blur border-b">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="h-16 flex items-center justify-between">
//           {/* Logo */}
//           <a href="#home" className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
//               <span className="font-bold text-primary">PMS</span>
//             </div>
//             <div className="hidden sm:block">
//               <h1 className="text-lg font-semibold text-primary leading-none">ProseMediStore</h1>
//               <p className="text-xs text-gray-500 -mt-0.5">Trusted online pharmacy</p>
//             </div>
//           </a>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center gap-6">
//             <a href="#shop" className="text-sm font-medium text-gray-700 hover:text-primary">Shop</a>
//             <a href="#how" className="text-sm font-medium text-gray-700 hover:text-primary">How it works</a>
//             <a href="#chat" className="text-sm font-medium text-gray-700 hover:text-primary">Consult</a>
//           </nav>

//           {/* Desktop Auth Buttons */}
//             <div className="hidden md:flex items-center gap-3">
//             <a
//                 href="/login"
//                 className="text-sm font-medium text-gray-700 hover:text-primary"
//             >
//                 Login
//             </a>
//             <a
//                 href="/register"
//                 className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-all"
//             >
//                 Register
//             </a>
//             </div>

//           {/* Right Section */}
//           <div className="flex items-center gap-3">
//             <div className="hidden sm:flex">
//               <input
//                 aria-label="Search medicines"
//                 placeholder="Search medicines"
//                 className="px-3 py-2 border rounded-lg w-48 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//             </div>

//             {/* Cart Button */}
//             <button
//               onClick={onCartOpen}
//               aria-label="Open cart"
//               className="relative p-2 bg-primary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40"
//             >
//               <IconCart className="text-white" />
//               {count > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1.5 leading-4">
//                   {count}
//                 </span>
//               )}
//             </button>

//             {/* Mobile Menu Button */}
//             <button
//               className="md:hidden p-2 text-gray-700 hover:text-primary focus:outline-none"
//               onClick={() => setIsMenuOpen(true)}
//               aria-label="Open menu"
//             >
//               <Menu className="w-6 h-6" />
//             </button>

            
//           </div>
//         </div>
//       </div>

//       {/* Mobile Drawer Menu */}
//       {isMenuOpen && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end md:hidden">
//           <div className="bg-white w-3/4 max-w-xs h-full shadow-xl flex flex-col p-6">
//             <div className="flex justify-between items-center mb-8">
//               <h2 className="text-lg font-semibold text-primary">Menu</h2>
//               <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
//                 <X className="w-6 h-6 text-gray-700 hover:text-primary" />
//               </button>
//             </div>

//             <nav className="flex flex-col gap-5">
//               <a
//                 href="#shop"
//                 onClick={() => setIsMenuOpen(false)}
//                 className="text-gray-700 text-base hover:text-primary"
//               >
//                 Shop
//               </a>
//               <a
//                 href="#how"
//                 onClick={() => setIsMenuOpen(false)}
//                 className="text-gray-700 text-base hover:text-primary"
//               >
//                 How it works
//               </a>
//               <a
//                 href="#chat"
//                 onClick={() => setIsMenuOpen(false)}
//                 className="text-gray-700 text-base hover:text-primary"
//               >
//                 Consult
//               </a>

                
//                 <a
//                 href="/login"
//                 className="text-gray-700 hover:text-primary font-medium"
//                 >
//                 Login
//                 </a>
//                 <a
//                 href="/register"
//                 className="bg-primary text-white text-center py-2 rounded-lg hover:bg-primary/90 transition-all font-medium"
//                 >
//                 Register
//                 </a>

//             </nav>

//             <div className="mt-auto border-t border-gray-100 pt-6">
//               <button
//                 onClick={() => {
//                   onCartOpen();
//                   setIsMenuOpen(false);
//                 }}
//                 className="flex items-center gap-2 text-gray-700 hover:text-primary text-base"
//               >
//                 <IconCart className="w-5 h-5" /> View Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
function IconCart(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...props}>
      <path
        d="M3 3h2l.9 5.4A3 3 0 0 0 8.8 11h8.9a1 1 0 0 0 .96-.75L21 6H6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="20" r="1" fill="currentColor" />
      <circle cx="18" cy="20" r="1" fill="currentColor" />
    </svg>
  );
}
export default function Navbar({ onCartOpen }) {
  const { count } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="font-bold text-primary text-lg">PMS</span>
          </div>
          <div className="block">
            <h1 className="text-lg font-semibold text-primary leading-none">
              ProseMediStore
            </h1>
            <p className="text-xs text-gray-500 -mt-0.5">
              Trusted online pharmacy
            </p>
          </div>
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#shop" className="text-gray-700 hover:text-primary font-medium">
            Shop
          </a>
          <a href="#how" className="text-gray-700 hover:text-primary font-medium">
            How it works
          </a>
          <a href="#chat" className="text-gray-700 hover:text-primary font-medium">
            Consult
          </a>
        </div>
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-medium text-gray-700 hover:text-primary"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-all"
          >
            Register
          </Link>
          <button
            onClick={onCartOpen}
            aria-label="Open cart"
            className="relative p-2 bg-primary text-white rounded-lg focus:outline-none hover:bg-primary/90 transition-all"
          >
            <IconCart className="text-white" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1.5 leading-4">
                {count}
              </span>
            )}
          </button>
        </div>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-700"
          onClick={toggleDrawer}
          aria-label="Toggle menu"
        >
          {drawerOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="font-bold text-primary text-lg">PMS</span>
            </div>

            <h1 className="font-semibold text-primary text-lg">Menu</h1>
          </div>
          <button
            onClick={toggleDrawer}
            className="p-1 rounded-lg hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>
        <div className="flex flex-col mt-6 space-y-4 px-5">
          <a
            href="#shop"
            className="text-gray-700 hover:text-primary font-medium"
            onClick={toggleDrawer}
          >
            Shop
          </a>
          <a
            href="#how"
            className="text-gray-700 hover:text-primary font-medium"
            onClick={toggleDrawer}
          >
            How it works
          </a>
          <a
            href="#chat"
            className="text-gray-700 hover:text-primary font-medium"
            onClick={toggleDrawer}
          >
            Consult
          </a>
          <Link
            to="/login"
            onClick={toggleDrawer}
            className="text-gray-700 font-medium hover:text-primary"
          >
            Login
          </Link>
          <Link
            to="/register"
            onClick={toggleDrawer}
            className="bg-primary text-white text-center py-2 rounded-lg font-medium hover:bg-primary/90 transition-all"
          >
            Register
          </Link>
          <button
            onClick={() => {
              onCartOpen();
              toggleDrawer();
            }}
            className="flex items-center gap-2 text-gray-700 hover:text-primary text-base border-t border-gray-100 pt-4 mt-4"
          >
            <IconCart className="w-5 h-5" /> View Cart
            {count > 0 && (
              <span className="ml-1 text-xs bg-red-500 text-white px-2 rounded-full">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
      {/* Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={toggleDrawer}
        ></div>
      )}
    </nav>
  );
}






