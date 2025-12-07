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

import Link from "next/link";
import { getApiUrl, getImageUrl } from "@/lib/api";

// ======================================
// 1️⃣ Generate all static slugs
// ======================================
export async function generateStaticParams() {
  try {
    const res = await fetch(
      getApiUrl("/api/flights?fields=slug"),
      { 
        cache: "force-cache",
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    if (!res.ok) {
      console.warn(`Failed to fetch flights for static generation: ${res.status}`);
      return [{ slug: 'placeholder' }];
    }

    const json = await res.json();

    if (!json?.data || !Array.isArray(json.data)) {
      console.warn('Invalid data format from API');
      return [{ slug: 'placeholder' }];
    }

    // Map all flight slugs
    const params = json.data
      .filter(flight => flight?.attributes?.slug)
      .map((flight) => ({
        slug: flight.attributes.slug,
      }));

    return params.length > 0 ? params : [{ slug: 'placeholder' }];
  } catch (err) {
    console.error("Error generating static params:", err);
    return [{ slug: 'placeholder' }];
  }
}

// ======================================
// 2️⃣ Fetch single flight by slug
// ======================================
async function getSingleFlight(slug) {
  try {
    const res = await fetch(
      getApiUrl(`/api/flights?filters[slug][$eq]=${slug}&populate=*`),
      { 
        cache: "force-cache",
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    if (!res.ok) {
      console.error(`Failed to fetch flight: ${res.status}`);
      return null;
    }

    const json = await res.json();
    return json.data?.[0] ?? null;
  } catch (err) {
    console.error("Error fetching flight:", err);
    return null;
  }
}

// ======================================
// 3️⃣ Page Component
// ======================================
export default async function SingleFlightPage({ params }) {
  const { slug } = params;

  const flight = await getSingleFlight(slug);

  if (!flight) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <Link
          href="/flights"
          className="text-blue-600 underline mb-4 inline-block"
        >
          ← Back to Flights
        </Link>
        <h1 className="text-center mt-20 text-3xl text-red-500">
          Flight Not Found ❌
        </h1>
      </div>
    );
  }

  const f = flight.attributes;

  // IMAGE FIX
  const imgUrl = getImageUrl(f.Image?.data?.[0]?.attributes?.url);

  // DESCRIPTION FIX FOR STRAPI RICH TEXT
  const descriptionText =
    Array.isArray(f.Description)
      ? f.Description
          .map((block) =>
            block.children?.map((child) => child.text).join(" ")
          )
          .join("\n")
      : f.Description;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Link
        href="/flights"
        className="text-blue-600 underline mb-4 inline-block"
      >
        ← Back to Flights
      </Link>

      {/* MAIN IMAGE */}
      <img
        src={imgUrl}
        className="w-full h-72 object-cover rounded-xl shadow-lg mb-6"
        alt={f.AirlineName || 'Flight'}
      />

      <h1 className="text-4xl font-bold">{f.AirlineName}</h1>
      <p className="text-gray-600 text-lg mt-2">
        ✈️ {f.Flightcode} • {f.Departure} → {f.Destination}
      </p>

      {/* PRICE BOX */}
      <div className="bg-blue-50 p-5 rounded-xl mt-6 border shadow-sm">
        <h2 className="text-2xl font-bold text-blue-800">₹ {f.Price}</h2>
        <p className="text-gray-600">Duration: {f.Duration}</p>
      </div>

      {/* TRAVELLER SELECT */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3">🧍 Travellers & Class</h3>
        <select className="p-3 border rounded-lg w-full mb-4 text-black">
          <option>1 Traveller, Economy</option>
          <option>2 Travellers, Economy</option>
          <option>1 Traveller, Business</option>
          <option>2 Travellers, Business</option>
        </select>
      </div>

      {/* DATE PICKER */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">📅 Departure Date</h3>
        <input type="date" className="p-3 border rounded-lg w-full" />
      </div>

      {/* DESCRIPTION */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-3">📘 Flight Details</h3>
        <p className="leading-relaxed text-lg text-gray-700 whitespace-pre-line">
          {descriptionText || "No description available."}
        </p>
      </div>

      <div className="text-center mt-10">
        <button className="px-8 py-3 bg-green-600 text-white rounded-xl text-lg font-bold hover:bg-green-700">
          Book Flight
        </button>
      </div>
    </div>
  );
}
