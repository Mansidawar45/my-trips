// import Link from "next/link";

// export default async function SingleTrainPage({ params }) {
//   const { slug } = await params;
  
//   // ✅ Fetch trains with images
//   const res = await fetch(
//     `http://56.228.1.142:1337/api/trains?populate=Image`,
//     { cache: "no-store" }
//   );

//   const data = await res.json();
//   const trains = data?.data || [];  
  
//   // ✅ Find the train that matches the slug
//   const train = trains.find((item) => item.slug === slug);

//   if (!train) {
//     return (
//       <h1 className="text-center mt-10 text-2xl">
//         Train Not Found
//       </h1>
//     );
//   }

//   // ✅ Train Image
//   const firstImage =
//     train?.Image?.[0]?.url ||
//     train?.Image?.[0]?.formats?.small?.url ||
//     null;
   
    
//   const imgUrl = firstImage
//     ? `http://56.228.1.142:1337${firstImage}`
//     : "/placeholder.jpg";

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       {/* Back Button */}
//       <Link href="/trains" className="text-blue-600 underline mb-4 inline-block">
//         ← Back to Trains
//       </Link>

//       {/* Title */}
//       <h1 className="text-4xl font-bold mb-2">{train.TrainName}</h1>

//       <p className="text-gray-600 text-lg mb-4">
//         🛤 {train.from} ➝ {train.to}
//       </p>

//       {/* Image */}
//       <img
//         src={imgUrl}
//         alt={train.TrainName}
//         className="w-full h-80 object-cover rounded-2xl shadow-lg"
//       />

//       {/* Price & Timing */}
//       <div className="bg-blue-50 p-5 rounded-2xl mt-6 shadow-sm border">
//         <h2 className="text-2xl font-bold text-blue-800">
//           ₹ {train.Price}
//         </h2>

//         <p className="text-gray-600 mt-1">
//           ⏳ Duration: {train.Duration}
//         </p>
        

//         <p className="text-gray-600 mt-1">
//           🚆 Train Type: {train.Type ?? "Not Available"}
//         </p>
//       </div>

//       {/* Description */}
//       <div className="mt-8">
//         <h3 className="text-2xl font-semibold mb-3">📘 About This Train</h3>
//         <p className="text-gray-700 leading-relaxed text-lg">
//           {train.Description ?? "No description available."}
//         </p>
//       </div>
//     </div>
//   );
// }

import Link from "next/link";
import { getApiUrl } from "@/lib/api";

// =======================================
// 🚀 generateStaticParams (for SSG)
// =======================================
export async function generateStaticParams() {
  try {
    const res = await fetch(
      getApiUrl("/api/trains?fields=slug"),
      { 
       cache: "force-cache",
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    if (!res.ok) {
      console.warn(`Failed to fetch trains for static generation: ${res.status}`);
      // Return a placeholder to satisfy Next.js requirement
      return [{ slug: 'placeholder' }];
    }

    const data = await res.json();

    if (!data?.data || !Array.isArray(data.data)) {
      console.warn('Invalid data format from API');
      return [{ slug: 'placeholder' }];
    }

    const params = data.data.map((item) => ({
      slug: item.slug || item.attributes?.slug,
    })).filter(item => item.slug);

    // If no data, return placeholder to satisfy Next.js
    return params.length > 0 ? params : [{ slug: 'placeholder' }];
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    // Return a placeholder to satisfy Next.js requirement
    return [{ slug: 'placeholder' }];
  }
}

// =======================================
// 🚀 Page Component
// =======================================
export default async function SingleTrainPage({ params }) {
  const { slug } = await params;  // ✅ Must await params in Next.js 15+

  try {
    // Fetch trains with images
    const res = await fetch(
      getApiUrl("/api/trains?populate=Image"),
      { 
        cache: "force-cache", // Required for static export
        headers: {
          'Accept': 'application/json',
        }
      }
    );     

    if (!res.ok) {
      console.error(`Failed to fetch trains: ${res.status}`);
      return (
        <div className="max-w-5xl mx-auto p-6">
          <Link href="/trains" className="text-blue-600 underline mb-4 inline-block">
            ← Back to Trains
          </Link>
          <h1 className="text-center mt-10 text-2xl text-red-500">
            Unable to load train data. Please try again later.
          </h1>
        </div>
      );
    }

    const data = await res.json();
    const trains = data?.data || [];

    // ❗ FIX: Strapi returns attributes inside attributes
    const train = trains.find((item) => item?.slug === slug);

    if (!train) {
      return (
        <div className="max-w-5xl mx-auto p-6">
          <Link href="/trains" className="text-blue-600 underline mb-4 inline-block">
            ← Back to Trains
          </Link>
          <h1 className="text-center mt-10 text-2xl">
            Train Not Found   
          </h1>
        </div>
      );
    }

    const t = train;

    // Image Fix
    const firstImage =
      t.Image?.[0]?.url ||
      t.Image?.data?.[0]?.attributes?.formats?.small?.url ||
      null;

    const imgUrl = firstImage
      ? `${process.env.NEXT_PUBLIC_API_URL || 'http://56.228.1.142:1337'}${firstImage}`
      : "/placeholder.jpg";

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Back Button */}
      <Link href="/trains" className="text-blue-600 underline mb-4 inline-block">
        ← Back to Trains
      </Link>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-2">{t.TrainName}</h1>

      <p className="text-gray-600 text-lg mb-4">
        🛤 {t.from} ➝ {t.to}
      </p>

      {/* Image */}
      <img
        src={imgUrl}
        alt={t.TrainName}
        className="w-full h-80 object-cover rounded-2xl shadow-lg"
      />

      {/* Price & Timing */}
      <div className="bg-blue-50 p-5 rounded-2xl mt-6 shadow-sm border">
        <h2 className="text-2xl font-bold text-blue-800">
          ₹ {t.Price}
        </h2>

        <p className="text-gray-600 mt-1">
          ⏳ Duration: {t.Duration}
        </p>

        <p className="text-gray-600 mt-1">
          🚆 Train Type: {t.Type ?? "Not Available"}
        </p>
      </div>

      {/* Description */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-3">📘 About This Train</h3>
        <p className="text-gray-700 leading-relaxed text-lg">
          {t.Description ?? "No description available."}
        </p>
      </div>
    </div>
  );
  } catch (error) {
    console.error('Error loading train:', error);
    return (
      <div className="max-w-5xl mx-auto p-6">
        <Link href="/trains" className="text-blue-600 underline mb-4 inline-block">
          ← Back to Trains
        </Link>
        <h1 className="text-center mt-10 text-2xl text-red-500">
          An error occurred while loading train data.
        </h1>
      </div>
    );
  }
}
