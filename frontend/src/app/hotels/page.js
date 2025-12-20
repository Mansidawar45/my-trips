  

// import Link from "next/link";

// export default async function hotelsPage() {
//   const res = await fetch("http://56.228.1.142:1337/api/hotels?populate=*", {
//     cache: "no-store",
//   });

//   const data = await res.json();
//   const hotels = data.data;
//   console.log("data",hotels);  

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Hotels in All Destinations</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {hotels.map((hotel) => {
//           const imgUrl =
//             hotel.Image?.length > 0
//               ? "http://56.228.1.142:1337" + hotel.Image[0].url
//               : "/no-image.jpg";  

//           return (
//             <Link href={`/hotels/${hotel.slug}`} key={hotel.id}>
//               <div className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-xl transition">
//                 <img
//                   src={imgUrl}
//                   alt={hotel.Name}
//                   className="rounded-lg mb-4 h-40 w-full object-cover"
//                 />

//                 <h2 className="text-xl text-black font-bold">{hotel.Name}</h2>

//                 <p className="text-gray-600 mt-1">⭐ Rating: {hotel.Rating}</p>

//                 <p className="text-gray-700 mt-1 font-semibold">
//                   ₹ {hotel.PricePerNight} / night   
//                 </p>    

//                 {hotel.destination?.Title && (
//                   <p className="text-gray-500 mt-2 text-sm">
//                     📍 {hotel.destination.Title}
//                   </p>
//                 )}
//               </div>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
//  }
import Link from "next/link";
import { getApiUrl, getImageUrl } from "@/lib/api";

export async function generateStaticParams() {
  try {
    // Fetch all entries from Strapi
    const res = await fetch(getApiUrl("/api/hotels?populate=*"), {
      next: { revalidate: 60 },
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!res.ok) {
      console.warn('Failed to fetch trips for static generation');
      return [];
    }

    const data = await res.json();

    if (!data?.data || !Array.isArray(data.data)) {
      return [];
    }

    return data.data.map((trip) => ({
      id: trip.id.toString(), // must be string
    }));
  } catch (error) {
    console.error('Error in generateStaticParams for hotels:', error);
    return [];
  }
}

async function getTrip(id) {
  try {
    const res = await fetch(getApiUrl(`/api/hotels?populate=*`), {
      next: { revalidate: 60 },
      headers: {
        'Accept': 'application/json',
      }
    });
       const response = await res.json()
       console.log(response)
    if (!res.ok) {
      return null;
    }

    return response

  } catch (error) {
    console.error('Error fetching trip:', error);
    return null;
  }
}

export default async function TripPage({ params }) {
  const id = await params;
  console.log(id)
  const trip = await getTrip(id);

  if (!trip || !trip.data) {
    return (
      <div>
        <h1 className="text-center mt-10 text-2xl text-red-500">Trip Not Found</h1>
        <Link href="/trips" className="block text-center text-blue-600 underline mt-4">
          Back to Trips
        </Link>
      </div>
    );
  }
     const hotels= trip.data
  return (
    // <div>
    //   <h1>{trip.data?.attributes?.title}</h1>
    //   <p>{trip.data?.attributes?.description}</p>

    //   <Link href="/trips">Back to Trips</Link>
    // </div>
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Hotels in All Destinations</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {hotels.map((hotel) => {
          const imgUrl =
            hotel.Image?.length > 0
              ? "" + hotel.Image[0].url
              : "/no-image.jpg";  

          return (
            <Link href={`/hotels/${hotel.slug}`} key={hotel.id}>
              <div className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-xl transition">
                <img
                  src={'http://56.228.1.142:1337' + imgUrl}
                  alt={hotel.Name}
                  className="rounded-lg mb-4 h-40 w-full object-cover"
                />

                <h2 className="text-xl text-black font-bold">{hotel.Name}</h2>

                <p className="text-gray-600 mt-1">⭐ Rating: {hotel.Rating}</p>

                <p className="text-gray-700 mt-1 font-semibold">
                  ₹ {hotel.PricePerNight} / night   
                </p>    

                {hotel.destination?.Title && (
                  <p className="text-gray-500 mt-2 text-sm">
                    📍 {hotel.destination.Title}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
