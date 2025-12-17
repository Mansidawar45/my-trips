// import Link from "next/link";

// export default async function SingleFlightPage({ params }) {
//   const { slug } =  await params;

//   // Fetch all flights (no /slug endpoint)
//   const res = await fetch("http://localhost:1337/api/flights?populate=*", {
//     cache: "no-store",
//   });

//   const result = await res.json();
//   const flights = result.data;

//   // Match based on YOUR structure → flight.slug (not flight.attributes.slug)
//   const flight = flights.find((f) => f.slug === slug);

//   if (!flight) {
//     return <h1 className="text-center mt-20 text-3xl">Flight Not Found ❌</h1>;
//   }

//   const f = flight; // easier variable

//   const imgUrl =
//     f.Image?.[0]?.url
//       ? "http://localhost:1337" + f.Image[0].url
//       : "/no-image.jpg";

//   // Rich text description fix
//   const descriptionText = Array.isArray(f.Description)
//     ? f.Description?.[0]?.children?.[0]?.text
//     : f.Description;

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <Link href="/flights" className="text-blue-600 underline mb-4 inline-block">
//         ← Back to Flights
//       </Link>

//       {/* MAIN IMAGE */}
//       <img
//         src={imgUrl}
//         className="w-full h-72 object-cover rounded-xl shadow-lg mb-6"
//         alt={f.AirlineName}
//       />

//       <h1 className="text-4xl font-bold">{f.AirlineName}</h1>
//       <p className="text-gray-600 text-lg mt-2">
//         ✈️ {f.Flightcode} • {f.Departure} → {f.Destination}
//       </p>

//       {/* PRICE BOX */}
//       <div className="bg-blue-50 p-5 rounded-xl mt-6 border shadow-sm">
//         <h2 className="text-2xl font-bold text-blue-800">₹ {f.Price}</h2>
//         <p className="text-gray-600">Duration: {f.Duration}</p>
//       </div>

//       {/* TRAVELLER SELECT */}
//       <div className="mt-8">
//         <h3 className="text-xl font-semibold mb-3">🧍 Travellers & Class</h3>

//         <select className="p-3 border rounded-lg w-full mb-4 text-white">
//           <option className="hover:text-white text-black">1 Traveller, Economy</option>
//           <option className= "hover:text-white text-black">2 Travellers, Economy</option>
//           <option className= "hover:text-white text-black">1 Traveller, Business</option>
//           <option className= "hover:text-white text-black">2 Travellers, Business</option>
//         </select>     
//       </div>     

//       {/* DATE PICKER */}
//       <div className="mt-6">
//         <h3 className="text-xl font-semibold mb-3">📅 Departure Date</h3>

//         <input type="date" className="p-3 border rounded-lg w-full" />
//       </div>

//       {/* DESCRIPTION */}
//       <div className="mt-10">
//         <h3 className="text-2xl font-semibold mb-3">📘 Flight Details</h3>
//         <p className="text-white-700 leading-relaxed text-lg">
//           {descriptionText || "No description available."}
//         </p>
//       </div>

//       <div className="text-center mt-10">
//         <button className="px-8 py-3 bg-green-600 text-white rounded-xl text-lg font-bold hover:bg-green-700">
//           Book Flight
//         </button>
//       </div>
//     </div>
//   );
// }





// import Link from "next/link";
// import { getApiUrl, getImageUrl } from "@/lib/api";

// // ======================================
// // 1️⃣ Generate all static slugs
// // ======================================
// export async function generateStaticParams() {
//   try {
//     const res = await fetch(
//       getApiUrl("/api/flights?fields=slug"),
//       { 
//         next: { revalidate: 60 },
//         headers: {
//           'Accept': 'application/json',
//         }
//       }
//     );

//     if (!res.ok) {
//       console.warn(`Failed to fetch flights for static generation: ${res.status}`);
//       return [{ slug: 'placeholder' }];
//     }

//     const json = await res.json();

//     if (!json?.data || !Array.isArray(json.data)) {
//       console.warn('Invalid data format from API');
//       return [{ slug: 'placeholder' }];
//     }

//     // Map all flight slugs
//     const params = json.data
//       .filter(flight => flight?.attributes?.slug)
//       .map((flight) => ({
//         slug: flight.attributes.slug,
//       }));

//     return params.length > 0 ? params : [{ slug: 'placeholder' }];
//   } catch (err) {
//     console.error("Error generating static params:", err);
//     return [{ slug: 'placeholder' }];
//   }
// }

// // ======================================
// // 2️⃣ Fetch single flight by slug
// // ======================================
// async function getSingleFlight(slug) {
//   try {
//     const res = await fetch(
//       getApiUrl(`/api/flights?filters[slug][$eq]=${slug}&populate=*`),
//       { 
//         cache: "force-cache",
//         headers: {
//           'Accept': 'application/json',
//         }
//       }
//     );

//     if (!res.ok) {
//       console.error(`Failed to fetch flight: ${res.status}`);
//       return null;
//     }

//     const json = await res.json();
//     return json.data?.[0] ?? null;
//   } catch (err) {
//     console.error("Error fetching flight:", err);
//     return null;
//   }
// }

// // ======================================
// // 3️⃣ Page Component
// // ======================================
// export default async function SingleFlightPage({ params }) {
//   const { slug } = await params;  // ✅ Must await params in Next.js 15+

//   const flight = await getSingleFlight(slug);

//   if (!flight) {
//     return (
//       <div className="max-w-5xl mx-auto p-6">
//         <Link
//           href="/flights"
//           className="text-blue-600 underline mb-4 inline-block"
//         >
//           ← Back to Flights
//         </Link>
//         <h1 className="text-center mt-20 text-3xl text-red-500">
//           Flight Not Found ❌
//         </h1>
//       </div>
//     );
//   }

//   const f = flight;

//   // IMAGE FIX
//   const imgUrl = getImageUrl(f.Image?.[0]?.url);

//   // DESCRIPTION FIX FOR STRAPI RICH TEXT
//   const descriptionText =
//     Array.isArray(f.Description)
//       ? f.Description
//           .map((block) =>
//             block.children?.map((child) => child.text).join(" ")
//           )
//           .join("\n")
//       : f.Description;

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <Link
//         href="/flights"
//         className="text-blue-600 underline mb-4 inline-block"
//       >
//         ← Back to Flights
//       </Link>

//       {/* MAIN IMAGE */}
//       <img
//         src={imgUrl}
//         className="w-full h-72 object-cover rounded-xl shadow-lg mb-6"
//         alt={f.AirlineName || 'Flight'}
//       />

//       <h1 className="text-4xl font-bold">{f.AirlineName}</h1>
//       <p className="text-gray-600 text-lg mt-2">
//         ✈️ {f.Flightcode} • {f.Departure} → {f.Destination}
//       </p>

//       {/* PRICE BOX */}
//       <div className="bg-blue-50 p-5 rounded-xl mt-6 border shadow-sm">
//         <h2 className="text-2xl font-bold text-blue-800">₹ {f.Price}</h2>
//         <p className="text-gray-600">Duration: {f.Duration}</p>
//       </div>

//       {/* TRAVELLER SELECT */}
//       <div className="mt-8">
//         <h3 className="text-xl font-semibold mb-3">🧍 Travellers & Class</h3>
//         <select className="p-3 border rounded-lg w-full mb-4 text-black">
//           <option>1 Traveller, Economy</option>
//           <option>2 Travellers, Economy</option>
//           <option>1 Traveller, Business</option>
//           <option>2 Travellers, Business</option>
//         </select>
//       </div>

//       {/* DATE PICKER */}
//       <div className="mt-6">
//         <h3 className="text-xl font-semibold mb-3">📅 Departure Date</h3>
//         <input type="date" className="p-3 border rounded-lg w-full" />
//       </div>

//       {/* DESCRIPTION */}
//       <div className="mt-10">
//         <h3 className="text-2xl font-semibold mb-3">📘 Flight Details</h3>
//         <p className="leading-relaxed text-lg text-gray-700 whitespace-pre-line">
//           {descriptionText || "No description available."}
//         </p>
//       </div>

//       <div className="text-center mt-10">
//         <button className="px-8 py-3 bg-green-600 text-white rounded-xl text-lg font-bold hover:bg-green-700">
//           Book Flight
//         </button>
//       </div>
//     </div>
//   );
// }



export const dynamic = 'force-static';
import Link from "next/link";
import { getApiUrl, getImageUrl } from "@/lib/api";

// 1️⃣ Generate Static Params (REQUIRED FOR S3 EXPORT)
export async function generateStaticParams() {
  try {
    // Fetch only slugs
    const res = await fetch(
      getApiUrl("/api/flights?fields=slug"),
      { cache: "force-cache" }
    );

    const json = await res.json();

    // Make sure data exists
    if (!json?.data || !Array.isArray(json.data)) {
      console.warn("⚠ No flights found. Using fallback slug.");
      return [{ slug: "placeholder-flight" }];
    }

    // Extract slugs
    const params = json.data
      .filter(item => item?.slug)
      .map(item => ({
        slug: item.slug,
      }));

           console.log("abc ", params)

    // If empty → use fallback
    return params.length > 0 ? params : [{ slug: "placeholder-flight" }];
  } catch (err) {
    console.error("❌ Error generating flight static params:", err);
    return [{ slug: "placeholder-flight" }];
  }
}

// 2️⃣ Fetch single flight by slug
async function getSingleFlight(slug) {
  try {
    const res = await fetch(
      getApiUrl(`/api/flights?filters[slug][$eq]=${slug}&populate=*`),
      { cache: "force-cache" }
    );

    if (!res.ok) {
      console.error("❌ Failed to fetch flight:", res.status);
      return null;
    }

    const json = await res.json();
    console.log(json)
    return json.data?.[0] ?? null;
  } catch (err) {
    console.error("❌ Error getting flight:", err);
    return null;
  }
}

// 3️⃣ PAGE COMPONENT
export default async function FlightDetailsPage({ params }) {
  const { slug } = await params;

  if (!slug) {
    return (
      <div className="p-10 text-red-500 text-center text-xl">
        ❌ Invalid flight slug!
      </div>
    );
  }
         generateStaticParams()
  // Fetch flight
  const flight = await getSingleFlight(slug);

  if (!flight) {
    return (
      <div className="p-10 text-red-500 text-center text-xl">
        ❌ Flight not found!
      </div>
    );
  }
     console.log(flight)
  const f = flight;
  const imgUrl = f?.Image?.data ? getImageUrl(f.Image[0]?.url):getImageUrl(f.Image[0]?.url) || "";
  console.log(imgUrl)

  return (
    <div className="max-w-3xl mx-auto p-6 text-black">
      <Link href="/flights" className="underline text-blue-600 mb-4 inline-block">
        ← Back to Flights
      </Link>

      <h1 className="text-3xl font-bold mb-4">{f.AirlineName}</h1>

      {imgUrl && (
        <img
          src={imgUrl}
          alt={f.AirlineName}
          className="w-full h-64 object-cover rounded-xl shadow mb-6"
        />
      )}

      <p className="text-lg mb-2">
        <strong>From:</strong> {f.Departure}
      </p>

      <p className="text-lg mb-2">
        <strong>To:</strong> {f.Destination}
      </p>

      <p className="text-lg mb-2">
        <strong>Airline:</strong> {f.Airline}
      </p>

      <p className="text-xl text-green-600 font-semibold mb-4">
        ₹ {f.Price}
      </p>

      <p className="text-gray-700 leading-relaxed bg-gray-100 p-4 rounded-lg">
        {f.Description[0].children[0].text ?? "No description available."}
      </p>
    </div>
  );
}
