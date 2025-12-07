// import axios from "axios";
// import DestinationCard from "./components/destinationcard";

// export default async function HomePage() {
//   try {
//     const res = await axios.get("http://localhost:1337/api/destinations?populate=*");
//     const destinations = res.data.data; // array of objects

//     console.log("Fetched destinations:", destinations); // ✅ Debug check

//     return (
      
//       <div className="max-w-6xl mx-auto p-6">
//         <h1 className="text-3xl font-bold mb-6 text-center">
//           Explore Beautiful Destinations
//         </h1>

//          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8"> 
        
//           {destinations.map((destination) => (
//             <DestinationCard key={destination.id} destination={destination} />
//           ))}
//         </div>     
//       </div>
//     );
//   } catch (error) {
//     console.error("Failed to fetch destinations:", error);
//     return <p className="text-center text-red-500">Failed to load destinations.</p>;
//   }
// }
import axios from "axios";
import DestinationCard from "./components/destinationcard";
import { getApiUrl } from "@/lib/api";

export default async function HomePage() {
  try {
    const res = await axios.get(getApiUrl("/api/destinations?populate=*"), {
      headers: {
        'Accept': 'application/json',
      },
      timeout: 10000, // 10 second timeout
    });
    
    const destinations = res.data.data || [];

    return (
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: "url('/bg-travel.jpg')", // 👈 Your background image
        }}
      >
        {/* DARK OVERLAY FOR READABILITY */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

        {/* CONTENT WRAPPER */} 
        <div className="relative z-10 max-w-6xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">
            Explore Beautiful Destinations
          </h1>

          {destinations.length === 0 ? (
            <p className="text-center text-white text-xl">
              No destinations available at the moment.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {destinations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch destinations:", error);
    return (
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: "url('/bg-travel.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-6xl mx-auto p-6">
          <p className="text-center text-red-500 text-xl">
            Failed to load destinations. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
