// export default function Header() {
//   return (
//     <header className="bg-blue-600 text-white p-4">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-2xl font-bold">Travel App</h1>
//       </div>
      
//     </header>
//   );
// }


// "use client";
// import { useState } from "react";
// import { ChevronDown } from "lucide-react";
// import Link from "next/link";


// export default function Header() {
//   const [open, setOpen] = useState(false);

//   return (
//     <header className="bg-blue-600 text-white p-4">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
//         <h1 className="text-2xl font-bold">Travel App</h1>
        
        
//         <div className="flex items-left gap-2">
//           <img 
//             src="/logo.png" 
//             alt="logo" 
//             className="w-28 cursor-pointer"
//           />
//         </div> 

       


//         {/* -------- NAV MENU -------- */}
//         <nav className="hidden md:flex items-center gap-6 font-medium text-white-700">
//           {/* <a className="hover:text-gray-600 cursor-pointer">Flights</a> */}
//           <a href="/flights" className="hover:text-gray-600 cursor-pointer">
//       Flights
//        </a>

//           {/* <a className="hover:text-gray-600 cursor-pointer">Hotels</a> */}
//           <a href="/hotels" className="hover:text-gray-600 cursor-pointer">
//        Hotels
//        </a>

//           {/* <a className="hover:text-gray-600 cursor-pointer">Trains</a> */}
//             <a href="/trains" className="hover:text-gray-600 cursor-pointer">
//        Trains
//        </a>
          
         

//           {/* <a className="hover:text-gray-600 cursor-pointer">Buses</a> */}
//           <a href="/buses" className="hover:text-gray-600 cursor-pointer">Buses</a>

//           {/* <a className="hover:text-gray-600 cursor-pointer">Cabs</a> */}

//           {/* More Dropdown */}
//           <div className="relative">
//             <button 
//               onClick={() => setOpen(!open)} 
//               className="flex items-center gap-1 hover:text-gray-600"
//             >
//               More <ChevronDown size={18} />
//             </button>
                      
//             {open && (
//               <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 p-3 text-gray-700">
//                 <p className="p-2 hover:bg-black-100 rounded cursor-pointer">Where2Go</p>
//                 <p className="p-2 hover:bg-gray-100 rounded cursor-pointer">Giftcards</p>
//                 <p className="p-2 hover:bg-gray-100 rounded cursor-pointer">Tours & Attractions</p>
//                 <p className="p-2 hover:bg-black-100 rounded cursor-pointer">Cruise</p>
//               </div>
//             )}
//           </div>
//         </nav>

//         {/* -------- LOGIN BUTTON -------- */}
//         {/* <button className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
//           Login / Signup
//         </button>
//       </div> */}
//        <Link href="/login">
//           <button className="hidden md:block bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200 font-semibold">
//             Login / Signup
//           </button>
//         </Link>
//       </div>

     
  

//       {/* -------- Mobile Menu -------- */}
//       <div className="md:hidden bg-blue-600 text-white p-3 text-center">
//         Menu
//       </div>
//     </header>
//   );
// }


"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white py-4">
     {/* <header
      className="text-white py-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/header-bg.jpg')" }}  // 👈 ADD YOUR IMAGE HERE
    > */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">

        {/* LEFT SIDE — LOGO + TITLE */}
        <div className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="logo" 
            className="w-20 h-auto cursor-pointer rounded-md bg-white p-1"
          />
          <h1 className="text-xl font-semibold">Travel App</h1>
        </div>

        {/* CENTER — NAVIGATION MENU */}
        <nav className="hidden md:flex items-center gap-6 font-medium">
          <a href="/flights" className="hover:text-gray-200">Flights</a>
          <a href="/hotels" className="hover:text-gray-200">Hotels</a>
          <a href="/trains" className="hover:text-gray-200">Trains</a>
          <a href="/buses" className="hover:text-gray-200">Buses</a>

          {/* More Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setOpen(!open)} 
              className="flex items-center gap-1 hover:text-gray-200"
            >
              More <ChevronDown size={18} />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 p-3 text-gray-700 z-50">
                <p className="p-2 hover:bg-gray-100 rounded cursor-pointer">Where2Go</p>
                <p className="p-2 hover:bg-gray-100 rounded cursor-pointer">Giftcards</p>
                <p className="p-2 hover:bg-gray-100 rounded cursor-pointer">Tours & Attractions</p>
                <p className="p-2 hover:bg-gray-100 rounded cursor-pointer">Cruise</p>
              </div>
            )}
          </div>
        </nav>

        {/* RIGHT — LOGIN BUTTON */}
        <Link href="/login">
          <button className="hidden md:block bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200 font-semibold">
            Login / Signup
          </button>
        </Link>
      </div>

      {/* MOBILE MENU */}
      <div className="md:hidden bg-blue-600 text-white p-3 text-center">
        Menu
      </div>
    </header>
  );
}


