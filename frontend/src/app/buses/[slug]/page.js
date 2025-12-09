// app/buses/[slug]/page.js

// async function getSingleBus(slug) {
//   try {
//     const res = await fetch(
//       `http://localhost:1337/api/buses?filters[slug][$eq]=${slug}&populate=*`,
//       { cache: "no-store" }
//     );

//     if (!res.ok) throw new Error("Failed to fetch bus data");

//     const json = await res.json();

//     // No bus returned
//     if (!json?.data || json.data.length === 0) return null;

//     return json.data[0]; // Single bus object
//   } catch (err) {
//     console.error("Error fetching bus:", err);
//     return null;
//   }
// }

// export default async function BusDetailsPage({ params }) {
//   const { slug } = await params; // IMPORTANT FIX

//   const bus = await getSingleBus(slug);

//   if (!bus) {
//     return (
//       <div className="p-10 text-center text-red-500 text-xl">
//         ❌ Bus not found!
//       </div>
//     );
//   }

//   // Support both Strapi formats
//   const b = bus.attributes ? bus.attributes : bus;

//   // Safe fallback if missing fields
//   const BusName = b?.BusName ?? "Unknown Bus";
//   const From = b?.From ?? "N/A";
//   const To = b?.To ?? "N/A";
//   const BusType = b?.BusType ?? "N/A";
//   const Duration = b?.Duration ?? "N/A";
//   const Price = b?.Price ?? "N/A";
//   const Description = b?.Description ?? "No description available.";

//   const destinationTitle =
//     b?.destination?.data?.attributes?.Title ??
//     b?.destination?.Title ??
//     "No destination data";

//   // Image handling (safe)
//   const imgUrl =
//     b?.Image?.length > 0
//       ? `http://localhost:1337${b.Image[0].url}`
//       : "/no-image.jpg";

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4">{BusName}</h1>

//       <img
//         src={imgUrl}
//         alt={BusName}
//         className="w-full h-64 object-cover rounded-xl shadow mb-6"
//       />

//       <p className="text-lg mb-2">
//         <strong>Route:</strong> {From} → {To}
//       </p>

//       <p className="text-gray-700 mb-2">
//         <strong>Bus Type:</strong> {BusType}
//       </p>

//       <p className="text-gray-700 mb-2">
//         <strong>Duration:</strong> {Duration}
//       </p>

//       <p className="text-xl mb-4 font-semibold text-green-600">₹ {Price}</p>

//       <p className="text-gray-700 leading-relaxed bg-gray-100 p-4 rounded-lg">
//         {Description}
//       </p>

//       {/* <div className="mt-6 p-4 bg-blue-50 rounded-lg">
//         <h2 className="text-xl font-semibold mb-1">Destination</h2>
//         <p className="text-gray-700">{destinationTitle}</p>
//       </div> */}
//     </div>
//   );
// }

// ✅
// import Link from "next/link";

// // ======================================
// // ✅  STATIC PARAMS (required for S3 export)
// // ======================================
// export async function generateStaticParams() {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/buses?fields=slug`,
//     { cache: "force-cache" }   // IMPORTANT for output: export
//   );

//   const json = await res.json();

//   return json.data.map((bus) => ({
//     slug: bus.attributes.slug,
//   }));
// }

// // ======================================
// // Fetch single bus
// // ======================================
// async function getSingleBus(slug) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/buses?filters[slug][$eq]=${slug}&populate=*`,
//     { cache: "force-cache" }
//   );

//   const json = await res.json();
//   return json.data?.[0] ?? null;
// }

// // ======================================
// // Page Component
// // ======================================
// export default async function BusDetailsPage({ params }) {
//   const { slug } = params;

//   const bus = await getSingleBus(slug);

//   if (!bus) {
//     return (
//       <div className="p-10 text-center text-red-500 text-xl">
//         ❌ Bus not found!
//       </div>
//     );
//   }

//   const b = bus.attributes;

//   const imgUrl =
//     b?.Image?.data?.[0]?.attributes?.url
//       ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${b.Image.data[0].attributes.url}`
//       : "/no-image.jpg";

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4">{b.BusName}</h1>

//       <img
//         src={imgUrl}
//         alt={b.BusName}
//         className="w-full h-64 object-cover rounded-xl shadow mb-6"
//       />

//       <p className="text-lg mb-2">
//         <strong>Route:</strong> {b.From} → {b.To}
//       </p>

//       <p className="text-gray-700 mb-2">
//         <strong>Bus Type:</strong> {b.BusType}
//       </p>

//       <p className="text-gray-700 mb-2">
//         <strong>Duration:</strong> {b.Duration}
//       </p>

//       <p className="text-xl mb-4 font-semibold text-green-600">
//         ₹ {b.Price}
//       </p>

//       <p className="text-gray-700 leading-relaxed bg-gray-100 p-4 rounded-lg">
//         {b.Description}
//       </p>
//     </div>
//   );
// }
// import Link from "next/link";

// // ======================================
// // ✅ STATIC PARAMS (required for S3 export)
// // ======================================
// export async function generateStaticParams() {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}/api/buses?fields=slug`,
//       { cache: "force-cache" } // IMPORTANT for output: export
//     );

//     if (!res.ok) throw new Error("Failed to fetch bus slugs");

//     const json = await res.json();

//     // Safely filter out any undefined slugs
//     return json.data
//       .filter((bus) => bus?.attributes?.slug) // ✅ skip buses without slug
//       .map((bus) => ({
//         slug: bus.attributes.slug,
//       }));
//   } catch (err) {
//     console.error("Error generating static params:", err);
//     return []; // fallback empty array to avoid build errors
//   }
// }

// // ======================================
// // Fetch single bus
// // ======================================
// async function getSingleBus(slug) {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}/api/buses?filters[slug][$eq]=${slug}&populate=*`,
//       { cache: "force-cache" }
//     );

//     if (!res.ok) return null;

//     const json = await res.json();
//     return json.data?.[0] ?? null;
//   } catch (err) {
//     console.error("Error fetching single bus:", err);
//     return null;
//   }
// }

// // ======================================
// // Page Component
// // ======================================
// export default async function BusDetailsPage({ params }) {
//   const { slug } = params;

//   const bus = await getSingleBus(slug);

//   if (!bus || !bus.attributes) {
//     return (
//       <div className="p-10 text-center text-red-500 text-xl">
//         ❌ Bus not found!
//       </div>
//     );
//   }

//   const b = bus.attributes;

//   const imgUrl =
//     b?.Image?.data?.[0]?.attributes?.url
//       ? `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${b.Image.data[0].attributes.url}`
//       : "/no-image.jpg";

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <Link href="/buses" className="text-blue-600 underline mb-4 inline-block">
//         ← Back to Buses
//       </Link>

//       <h1 className="text-3xl font-bold mb-4">{b.BusName}</h1>

//       <img
//         src={imgUrl}
//         alt={b.BusName}
//         className="w-full h-64 object-cover rounded-xl shadow mb-6"
//       />

//       <p className="text-lg mb-2">
//         <strong>Route:</strong> {b.From} → {b.To}
//       </p>

//       <p className="text-gray-700 mb-2">
//         <strong>Bus Type:</strong> {b.BusType}
//       </p>

//       <p className="text-gray-700 mb-2">
//         <strong>Duration:</strong> {b.Duration}
//       </p>

//       <p className="text-xl mb-4 font-semibold text-green-600">
//         ₹ {b.Price}
//       </p>

//       <p className="text-gray-700 leading-relaxed bg-gray-100 p-4 rounded-lg">
//         {b.Description || "No description available."}
//       </p>
//     </div>
//   );
// } 
import Link from "next/link";
import { getApiUrl, getImageUrl } from "@/lib/api";

// 1️⃣ Generate static params
export async function generateStaticParams() {
  try {
    const res = await fetch(getApiUrl("/api/buses?fields=slug"), {
      cache: "force-cache",
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!res.ok) {
      console.warn(`Failed to fetch buses for static generation: ${res.status}`);
      return [{ slug: 'placeholder' }];
    }

    const json = await res.json();

    if (!json?.data || !Array.isArray(json.data)) {
      console.warn('Invalid data format from API');
      return [{ slug: 'placeholder' }];
    }

    const params = json.data
      .filter(bus => bus?.attributes?.slug)
      .map(bus => ({ slug: bus.attributes.slug }));

    return params.length > 0 ? params : [{ slug: 'placeholder' }];
  } catch (error) {
    console.error('Error in generateStaticParams for buses:', error);
    return [{ slug: 'placeholder' }];
  }
}

// 2️⃣ Fetch single bus
async function getSingleBus(slug) {
  try {
    const res = await fetch(
      getApiUrl(`/api/buses?filters[slug][$eq]=${slug}&populate=*`),
      { 
        cache: "force-cache",
        headers: {
          'Accept': 'application/json',
        }
      }
    );
       
    if (!res.ok) {
      console.error(`Failed to fetch bus: ${res.status}`);
      return null;
    }

    const json = await res.json();
    console.log(json)
    return json.data?.[0] ?? null;
  } catch (error) {
    console.error('Error fetching single bus:', error);
    return null;
  }
}

// 3️⃣ Page component
export default async function BusDetailsPage({ params }) {
  const { slug } = await params;  // ✅ Must await params in Next.js 15+

  if (!slug) {
    return (
      <div className="p-10 text-center text-red-500 text-xl">
        ❌ Invalid slug!
      </div>
    );
  }

  const bus = await getSingleBus(slug);

  if (!bus) {
    return (
      <div className="p-10 text-center text-red-500 text-xl">
        ❌ Bus not found!
      </div>
    );
  }

  const b = bus;

  const imgUrl = getImageUrl(b?.Image?.[0]?.url);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link href="/buses" className="text-blue-600 underline mb-4 inline-block">
        ← Back to Buses
      </Link>

      <h1 className="text-3xl font-bold mb-4">{b.BusName}</h1>

      <img
        src={imgUrl}
        alt={b.BusName || 'Bus'}
        className="w-full h-64 object-cover rounded-xl shadow mb-6"
      />

      <p className="text-lg mb-2">
        <strong>Route:</strong> {b.From} → {b.To}
      </p>

      <p className="text-gray-700 mb-2">
        <strong>Bus Type:</strong> {b.BusType}
      </p>

      <p className="text-gray-700 mb-2">
        <strong>Duration:</strong> {b.Duration}
      </p>

      <p className="text-xl mb-4 font-semibold text-green-600">
        ₹ {b.Price}
      </p>

      <p className="text-gray-700 leading-relaxed bg-gray-100 p-4 rounded-lg">
        {b.Description ?? "No description available."}
      </p>
    </div>
  );
}
