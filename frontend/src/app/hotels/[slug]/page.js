//  import Link from "next/link";

// export default async function SingleHotelPage({ params }) {
//   const { slug } = await params;
// const res = await fetch("http://localhost:1337/api/hotels?populate=*", {
//     cache: "no-store",
//   });

//   const data = await res.json();
//   const hotels = data.data;
//   const hotel=hotels.filter(item=>item.slug==slug)
//   console.log("data",JSON.stringify(hotel))
//   if (!hotel) {
//     return <h1 className="text-center mt-10 text-2xl">Hotel Not Found</h1>;
//   }

//   // Main Image
//   const mainImg =
//     hotel.Image?.length > 0
//       ? "http://localhost:1337" + hotel.Image[0].url
//       : "/no-image.jpg";

//   return (
//     <div className="max-w-6xl mx-auto p-6">
      
//       {/* Back Button */}
//       <Link href="/hotels" className="text-blue-600 underline mb-4 inline-block">
//         ← Back to Hotels
//       </Link>

//       {/* Title */}
//       <h1 className="text-4xl font-bold mb-2">{hotel.Name}</h1>

//       <p className="text-gray-600 text-lg mb-4">
//         ⭐ {hotel.Rating} • {hotel.destination?.Title}
//       </p>

//       {/* Main Image */}
//       <img
//         src={mainImg}
//         alt={hotel.Name}
//         className="w-full h-80 object-cover rounded-2xl shadow-lg"
//       />

//       {/* Info Box */}
//       <div className="bg-blue-50 p-5 rounded-2xl mt-6 shadow-sm border">
//         <h2 className="text-2xl font-bold text-blue-800">₹ {hotel.PricePerNight} / night</h2>
//         <p className="text-gray-600 mt-1">
//           Includes free WiFi, parking & room service
//         </p>

//         <a
//           href={hotel.LocationMapLink}
//           target="_blank"
//           className="block w-max px-5 py-2 bg-blue-600 text-white rounded-xl mt-4 hover:bg-blue-700 transition"
//         >
//           📍 View Location on Map
//         </a>
//       </div>

//       {/* Description */}
//       <div className="mt-8">
//         <h3 className="text-2xl font-semibold mb-3">📘 About This Hotel</h3>
//         <p className="text-gray-700 leading-relaxed text-lg">
//           {hotel.Description || "No description available."}
//         </p>
//       </div>

//       {/* Amenities Section */}
//       <div className="mt-10">
//         <h3 className="text-2xl font-semibold mb-4">🏨 Amenities</h3>

//         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-700">
//           <p>✔ Free WiFi</p>
//           <p>✔ Room Service</p>
//           <p>✔ Mountain View</p>
//           <p>✔ Geyser</p>
//           <p>✔ Parking</p>
//           <p>✔ Power Backup</p>
//         </div>
//       </div>

//       {/* Gallery */}
//       {hotel.Image?.length > 1 && (
//         <div className="mt-10">
//           <h3 className="text-2xl font-semibold mb-4">🖼 Photo Gallery</h3>

//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             {hotel.Image.map((img, index) => (
//               <img
//                 key={index}
//                 src={`http://localhost:1337${img.url}`}
//                 className="rounded-xl object-cover h-40 w-full shadow"
//                 alt={`Hotel Image ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Book Button */}
//       <div className="text-center mt-10">
//         <button className="px-8 py-3 bg-green-600 text-white font-bold rounded-xl text-lg hover:bg-green-700 transition">
//           Book Now
//         </button>
//       </div>
//     </div>
//   );
// }


// import Link from "next/link";

// export default async function SingleHotelPage({ params }) {
//   const { slug } = await params;

//   // Fetch only 1 hotel using slug filter
// //   const res = await fetch(
// //     `http://localhost:1337/api/hotels?filters[slug][$eq]=${slug}&populate=*`,
// //     { cache: "no-store" }
// //   );

// //   const data = await res.json();
// //   const hotel = data.data[0]; // STRAPI RETURNS AN ARRAY → get first item

//  const res = await fetch("http://localhost:1337/api/hotels?populate=*", {
//     cache: "no-store",
//   });

//   const data = await res.json();
//   const hotels = data.data;
//   const hotel=hotels.filter(item=>item.slug==slug)?.[0]
//   console.log("data",hotel);

//   if (!hotel) {
//     return <h1 className="text-center mt-10 text-2xl">Hotel Not Found</h1>;
//   }

//   // Convert Strapi Rich Text Description to plain text
//   const descriptionText = hotel.Description
//     ? hotel.Description.map((block) =>
//         block.children?.map((child) => child.text).join(" ")
//       ).join("\n")
//     : "No description available.";

//   // Main Image
//   const mainImg =
//     hotel.Image?.length > 0
//       ? "http://localhost:1337" + hotel.Image[0].url
//       : "/no-image.jpg";

//     return (
//     <div className="max-w-6xl mx-auto p-6">
//       {/* Back */}
//       <Link href="/hotels" className="text-blue-600 underline mb-4 inline-block">
//         ← Back to Hotels
//       </Link>

//       {/* Title + meta */}
//       <h1 className="text-4xl font-bold mb-2">{hotel.Name}</h1>
//       <p className="text-white-600 text-lg mb-4">
//         ⭐ {hotel.Rating ?? "—"} • {hotel.destination?.Title ?? "Unknown"}
//       </p>

//       {/* Main Image */}
//       <img
//         src={
//           hotel.Image?.length > 0
//             ? `http://localhost:1337${hotel.Image[0].url}`
//             : "/no-image.jpg"
//         }
//         alt={hotel.Name ?? "Hotel image"}
//         className="w-full h-80 object-cover rounded-2xl shadow-lg"
//       />

//       {/* Price / Map box */}
//       <div className="bg-blue-50 p-5 rounded-2xl mt-6 shadow-sm border flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h2 className="text-2xl font-bold text-blue-800">
//             ₹ {hotel.PricePerNight ?? "N/A"} / night
//           </h2>
//           <p className="text-gray-600 mt-1">
//             {hotel.destination?.Title ? `Located in ${hotel.destination.Title}` : ""}
//           </p>
//         </div>

//         <div className="flex gap-3">
//           <a
//             href={hotel.LocationMapLink}
//             target="_blank"
//             rel="noreferrer"
//             className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
//           >
//             📍 View Location on Map
//           </a>

//           <button
//             className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
//             // add onClick handler later for booking
//           >
//             Book Now
//           </button>
//         </div>
//       </div>

//       {/* Description (Strapi rich text blocks -> paragraphs) */}
//       <div className="mt-8">
//         <h3 className="text-2xl font-semibold mb-3">📘 About This Hotel</h3>

//         <div className="text-white-700 leading-relaxed text-lg space-y-4">
//           {Array.isArray(hotel.Description) && hotel.Description.length > 0 ? (
//             hotel.Description.map((block, i) => {
//               // block.children is an array of text nodes
//               const paragraph = (block.children || [])
//                 .map((child) => child?.text ?? "")
//                 .join("");
//               return (
//                 <p key={i} className="whitespace-pre-line">
//                   {paragraph}
//                 </p>
//               );
//             })
//           ) : (
//             <p>No description available.</p>
//           )}
//         </div>
//       </div>

//       {/* Amenities (static placeholders — replace with real data if you add fields) */}
//       <div className="mt-10">
//         <h3 className="text-2xl font-semibold mb-4">🏨 Amenities</h3>
//         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-white-700">
//           <div>✔ Free WiFi</div>
//           <div>✔ Room Service</div>
//           <div>✔ Mountain View</div>
//           <div>✔ Geyser/Heater</div>
//           <div>✔ Parking</div>
//           <div>✔ Power Backup</div>
//         </div>
//       </div>

//       {/* Gallery */}
//       {Array.isArray(hotel.Image) && hotel.Image.length > 1 && (
//         <div className="mt-10">
//           <h3 className="text-2xl font-semibold mb-4">🖼 Photo Gallery</h3>

//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             {hotel.Image.map((img, index) => (
//               <img
//                 key={index}
//                 src={`http://localhost:1337${img.url}`}
//                 className="rounded-xl object-cover h-40 w-full shadow"
//                 alt={img.alternativeText ?? `Hotel Image ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Fallback if no gallery */}
//       {(!Array.isArray(hotel.Image) || hotel.Image.length === 0) && (
//         <div className="mt-6 text-gray-500">No images available.</div>
//       )}
//     </div>
//   );

// }


// import Link from "next/link";

// async function getHotel(slug) {
//   const res = await fetch(
//     `http://localhost:1337/api/hotels?filters[slug][$eq]=${slug}&populate=*`,
//     {
//       cache: "force-cache", // important for static export
//     }
//   );

//   if (!res.ok) return null;

//   const json = await res.json();
//   return json.data?.[0] ?? null;
// }

// export default async function SingleHotelPage({ params }) {
//   const { slug } = params;

//   const hotel = await getHotel(slug);

//   if (!hotel) {
//     return (
//       <h1 className="text-center mt-10 text-2xl">Hotel Not Found</h1>
//     );
//   } 

//   const h = hotel.attributes ?? hotel;

//   const mainImg =
//     h.Image?.length > 0 
//       ? `http://localhost:1337${h.Image[0].url}`
//       : "/no-image.jpg";

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <Link href="/hotels" className="text-blue-600 underline mb-4 inline-block">
//         ← Back to Hotels
//       </Link>

//       <h1 className="text-4xl font-bold mb-2">{h.Name}</h1>
//       <p className="text-gray-600 text-lg mb-4">
//         ⭐ {h.Rating ?? "—"} • {h.destination?.data?.attributes?.Title ?? "Unknown"}
//       </p>

//       <img
//         src={mainImg}
//         alt={h.Name}
//         className="w-full h-80 object-cover rounded-2xl shadow-lg"
//       />

//       {/* YOU CAN PUT REST OF YOUR CODE HERE */}
//     </div>
//   );
// }



import Link from "next/link";
import { getApiUrl, getImageUrl } from "@/lib/api";

// =======================================
// 🚀 generateStaticParams (for SSG)
// =======================================
export async function generateStaticParams() {
  try {
    const res = await fetch(
      getApiUrl("/api/hotels?fields=slug"),
      { 
        next: { revalidate: 60 },
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    if (!res.ok) {
      console.warn(`Failed to fetch hotels for static generation: ${res.status}`);
      return [{ slug: 'placeholder' }];
    }

    const data = await res.json();

    if (!data?.data || !Array.isArray(data.data)) {
      console.warn('Invalid data format from API');
      return [{ slug: 'placeholder' }];
    }

    const params = data.data
      .filter(item => item?.slug)
      .map((item) => ({
        slug: item.slug,
      }));

    return params.length > 0 ? params : [{ slug: 'placeholder' }];
  } catch (error) {
    console.error('Error in generateStaticParams for hotels:', error);
    return [{ slug: 'placeholder' }];
  }
}

// =======================================
// 🔥 Get a single hotel
// =======================================
async function getHotel(slug) {
  try {
    const res = await fetch(
      getApiUrl(`/api/hotels?filters[slug][$eq]=${slug}&populate=*`),
      { 
        cache: "force-cache",
        headers: {
          'Accept': 'application/json',
        }
      }
    );
      
    if (!res.ok) {
      console.error(`Failed to fetch hotel: ${res.status}`);
      return null;
    }

    const json = await res.json();
    console.log(json)
    return json.data?.[0] ?? null;
  } catch (error) {
    console.error('Error fetching hotel:', error);
    return null;
  }
}

// =======================================
// 🔥 Page Component
// =======================================
export default async function SingleHotelPage({ params }) {
  const { slug } = await params;

  const hotel = await getHotel(slug);

  if (!hotel) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <Link href="/hotels" className="text-blue-600 underline mb-4 inline-block">
          ← Back to Hotels
        </Link>
        <h1 className="text-center mt-10 text-2xl">
          Hotel Not Found
        </h1>
      </div>
    );
  }

  const h = hotel.attributes ?? hotel;

  // Image Fix for Strapi v4 structure
  const mainImg = getImageUrl(h.Image?.data?.[0]?.attributes?.url || h.Image?.[0]?.url);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Link href="/hotels" className="text-blue-600 underline mb-4 inline-block">
        ← Back to Hotels
      </Link>

      <h1 className="text-4xl font-bold mb-2">{h.Name}</h1>

      <p className="text-gray-600 text-lg mb-4">
        ⭐ {h.Rating ?? "—"} •{" "}
        {h.destination?.data?.attributes?.Title ?? "Unknown"}
      </p>

      <img
        src={mainImg}
        alt={h.Name || 'Hotel'}
        className="w-full h-80 object-cover rounded-2xl shadow-lg"
      />

      {/* Price & Info Box */}
      <div className="bg-blue-50 p-5 rounded-2xl mt-6 shadow-sm border">
        <h2 className="text-2xl font-bold text-blue-800">
          ₹ {h.PricePerNight ?? "N/A"} / night
        </h2>
        <p className="text-gray-600 mt-1">
          Includes free WiFi, parking & room service
        </p>

        {h.LocationMapLink && (
          <a
            href={h.LocationMapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-max px-5 py-2 bg-blue-600 text-white rounded-xl mt-4 hover:bg-blue-700 transition"
          >
            📍 View Location on Map
          </a>
        )}
      </div>

      {/* Description */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-3">📘 About This Hotel</h3>
        <div className="text-gray-700 leading-relaxed text-lg">
          {Array.isArray(h.Description) && h.Description.length > 0 ? (
            h.Description.map((block, i) => {
              const paragraph = (block.children || [])
                .map((child) => child?.text ?? "")
                .join("");
              return (
                <p key={i} className="mb-3 whitespace-pre-line">
                  {paragraph}
                </p>
              );
            })
          ) : (
            <p>{h.Description || "No description available."}</p>
          )}
        </div>
      </div>

      {/* Amenities Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">🏨 Amenities</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-700">
          <div>✔ Free WiFi</div>
          <div>✔ Room Service</div>
          <div>✔ Mountain View</div>
          <div>✔ Geyser/Heater</div>
          <div>✔ Parking</div>
          <div>✔ Power Backup</div>
        </div>
      </div>

      {/* Photo Gallery */}
      {((h.Image?.data && Array.isArray(h.Image.data) && h.Image.data.length > 1) ||
        (Array.isArray(h.Image) && h.Image.length > 1)) && (
        <div className="mt-10">
          <h3 className="text-2xl font-semibold mb-4">🖼 Photo Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(h.Image?.data || h.Image)?.map((img, index) => {
              const imageUrl = getImageUrl(
                img?.attributes?.url || img?.url
              );
              return (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Hotel Image ${index + 1}`}
                  className="rounded-xl object-cover h-40 w-full shadow"
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Book Button */}
      <div className="text-center mt-10">
        <button className="px-8 py-3 bg-green-600 text-white font-bold rounded-xl text-lg hover:bg-green-700 transition">
          Book Now
        </button>
      </div>
    </div>
  );
}
