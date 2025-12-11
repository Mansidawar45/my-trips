// // app/buses/page.js
// export default async function BusPage() {
//   let buses = [];
//   let errorMsg = null;

//   try {
//     const res = await fetch("http://localhost:1337/api/buses?populate=*", {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error(`API error: ${res.status} ${res.statusText}`);
//     }

//     const json = await res.json();

//     // defensive: some Strapi setups return { data: null } or different shape
//     if (Array.isArray(json?.data)) {
//       buses = json.data;
//     } else if (Array.isArray(json)) {
//       // in case API returns an array directly (unlikely for Strapi)
//       buses = json;
//     } else {
//       buses = [];
//     }
//   } catch (err) {
//     // log on server console for debugging
//     // (Next.js server component logs will appear in terminal)
//     console.error("Failed to load buses:", err);
//     errorMsg = err.message || "Failed to load buses";
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Buses to Manali</h1>

//       {errorMsg && (
//         <div className="mb-6 p-4 bg-red-50 text-red-700 rounded">
//           Error: {errorMsg}. <br />
//           Make sure Strapi is running and the endpoint <code>/api/buses?populate=*</code> is correct.
//         </div>
//       )}

//       {buses.length === 0 && !errorMsg && (
//         <div className="p-6 bg-yellow-50 text-yellow-800 rounded">
//           No buses found. Check your Strapi Content Manager or visit{" "}
//           <code>http://localhost:1337/api/buses?populate=*</code> to inspect the JSON.
//         </div>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {buses.map((bus) => {
//           // If your bus object is wrapped in .attributes (older Strapi), handle it:
//           const b = bus?.attributes ? bus.attributes : bus;

//           // Image handling (Image is an array in your JSON)
//           const imgUrl =
//             b?.Image?.length > 0
//               ? `http://localhost:1337${b.Image[0].url}`
//               : "/no-image.jpg";

//           return (
//             <div
//               key={bus?.id ?? Math.random()}
//               className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
//             >
//               <img
//                 src={imgUrl}
//                 alt={b?.BusName ?? "Bus"}
//                 className="rounded-lg mb-4 h-40 w-full object-cover"
//               />

//               <h2 className="text-xl font-bold">{b?.BusName ?? "Unnamed Bus"}</h2>

//               <p className="text-gray-600 mt-1">🚌 Type: {b?.BusType ?? "-"}</p>

//               <p className="text-gray-600 mt-1">
//                 📍 {b?.From ?? "-"} → {b?.To ?? "-"}
//               </p>

//               <p className="text-gray-500 mt-1">⏱ Duration: {b?.Duration ?? "-"}</p>

//               <p className="text-gray-700 mt-2 font-semibold">₹ {b?.Price ?? "-"}</p>

//               {b?.destination?.Title && (
//                 <p className="text-gray-500 text-sm mt-2">🏔 Destination: {b.destination.Title}</p>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// app/buses/page.js
import Link from "next/link";
import { getApiUrl, getImageUrl } from "@/lib/api";

export default async function BusPage() {
  let buses = [];
  let errorMsg = null;

  try {
    const res = await fetch(getApiUrl("/api/buses?populate=*"), {
      cache: "force-cache",
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();

    if (Array.isArray(json?.data)) {
      buses = json.data;
    } else if (Array.isArray(json)) {
      buses = json;
    } else {
      buses = [];
    }
  } catch (err) {
    console.error("Failed to load buses:", err);
    errorMsg = err.message || "Failed to load buses";
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Buses to Manali</h1>

      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded">
          Error: {errorMsg}. <br />
          Make sure Strapi is running and the endpoint <code>/api/buses?populate=*</code> is correct.
        </div>
      )}

      {buses.length === 0 && !errorMsg && (
        <div className="p-6 bg-yellow-50 text-yellow-800 rounded">
          No buses found. Check your Strapi Content Manager or visit{" "}
          <code>http://localhost:1337/api/buses?populate=*</code>.
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {buses.map((bus) => {
          const b = bus?.attributes ? bus.attributes : bus;

          // SAFE SLUG — fallback to ID if missing
          const safeSlug = b?.slug ?? bus?.id;

          // IMAGE handling
          const imgUrl = getImageUrl(b?.Image?.[0]?.url);

          return (
            <Link
              key={bus.id}
              href={`/buses/${safeSlug}`}
              className="block bg-white shadow-md rounded-lg p-4 hover:shadow-lg hover:scale-[1.02] transition"
            >
              <img
                src={imgUrl}
                alt={b?.BusName ?? "Bus"}
                className="rounded-lg mb-4 h-40 w-full object-cover"
              />

              <h2 className="text-xl font-bold">{b?.BusName ?? "Unnamed Bus"}</h2>

              <p className="text-gray-600 mt-1">🚌 Type: {b?.BusType ?? "-"}</p>

              <p className="text-gray-600 mt-1">
                📍 {b?.From ?? "-"} → {b?.To ?? "-"}
              </p>

              <p className="text-gray-500 mt-1">⏱ Duration: {b?.Duration ?? "-"}</p>

              <p className="text-gray-700 mt-2 font-semibold">₹ {b?.Price ?? "-"}</p>

              {b?.destination?.Title && (
                <p className="text-gray-500 text-sm mt-2">
                  🏔 Destination: {b.destination.Title}
                </p>
              )}
            </Link>
          );
        })}

      </div>
    </div>
  );
}
