// import Image from "next/image";

// export async function generateStaticParams() {
//   const res = await fetch("http://localhost:1337/api/destinations?populate=*");
//   const data = await res.json();

//   return data.data
//     .filter((item) => item?.attributes?.slug)
//     .map((item) => ({
//       slug: item.attributes.slug,
//     }));
// }

// export default async function DestinationPage({ params }) {
//   const { slug } = await params; // ✅ FIXED

//   const res = await fetch(
//     `http://localhost:1337/api/destinations?filters[slug][$eq]=${slug}&populate=*`,
//     { cache: "no-store" }
//   );
//   const data = await res.json();


//   const destination = data.data[0];
// console.log ("destination",JSON.stringify(destination))

//   if (!destination) {
//     return <h2 className="text-center text-lg mt-10">Destination not found</h2>;
//   }

//   const d = destination; // ✅ use directly since your JSON is flat


//  const bannerImageUrl =
//   d?.bannerImage && d.bannerImage.length > 0
//     ? `http://localhost:1337${d.bannerImage[0].url}`
//     : "/no-image.jpg";


//   const coverImage =
//   d?.coverimage?.url
//     ? `http://localhost:1337${d.coverimage.url}`
//     : "/no-image.jpg";


//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <div className="w-full h-80 relative mb-8">
//         <Image
//   src={bannerImageUrl}   // ✅ changed from bannerImage to bannerImageUrl
//   alt={d.Title}
//   fill
//   className="object-cover rounded-xl"
//         />
//       </div>

//       <h1 className="text-4xl font-bold mb-3">{d.Title}</h1>
//       <p className="text-gray-600 mb-1">{d.Country}</p>
//       <p className="text-gray-600 mb-4">{d.State}</p>
//       <p className="text-gray-700 text-lg mb-6">{d.shortDescription}</p>

//       <Image
//         src={coverImage}
//         alt={d.Title}
//         width={800}
//         height={500}
//         className="rounded-lg mb-6"
//       />

//       {d.activities?.data?.length > 0 && (
//         <>
//           <h2 className="text-2xl font-semibold mt-8 mb-3">Activities</h2>
//           <div className="grid md:grid-cols-2 gap-4">
//             {d.activities.data.map((act) => {
//               const activity = act.attributes;
//               return (
//                 <div key={act.id} className="p-4 border rounded-lg shadow-sm">
//                   <h3 className="text-xl font-bold mb-2">{activity.Name}</h3>
//                   <p className="text-gray-700 text-sm mb-2">
//                     {activity.Description}
//                   </p>
//                   <p className="font-medium text-gray-600">
//                     Price: {activity.PriceRange}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

import Image from "next/image";

// ======================================
// ✅ Generate static params for SSG
// ======================================
export async function generateStaticParams() {
  try {
    const res = await fetch("http://localhost:1337/api/destinations?fields=slug", {
      cache: "force-cache", // Required for static export
    });

    if (!res.ok) throw new Error("Failed to fetch destination slugs");

    const json = await res.json();

    return json.data
      .filter((item) => item?.attributes?.slug)
      .map((item) => ({
        slug: item.attributes.slug,
      }));
  } catch (err) {
    console.error("Error generating static params:", err);
    return [];
  }
}

// ======================================
// ✅ Main Page Component
// ======================================
export default async function DestinationPage({ params }) {
  const slug = params.slug; // params is already an object, no await needed

  if (!slug) {
    return (
      <h2 className="text-center text-lg mt-10 text-red-500">
        Invalid destination slug
      </h2>
    );
  }

  // Fetch destination by slug
  const res = await fetch(
    `http://localhost:1337/api/destinations?filters[slug][$eq]=${slug}&populate=*`,
    { cache: "force-cache" }
  );

  if (!res.ok) {
    return (
      <h2 className="text-center text-lg mt-10 text-red-500">
        Failed to fetch destination
      </h2>
    );
  }

  const data = await res.json();
  const destination = data.data?.[0]?.attributes;

  if (!destination) {
    return <h2 className="text-center text-lg mt-10">Destination not found</h2>;
  }

  // Banner and Cover Images
  const bannerImageUrl =
    destination.bannerImage?.data?.[0]?.attributes?.url
      ? `http://localhost:1337${destination.bannerImage.data[0].attributes.url}`
      : "/no-image.jpg";

  const coverImageUrl =
    destination.coverimage?.data?.attributes?.url
      ? `http://localhost:1337${destination.coverimage.data.attributes.url}`
      : "/no-image.jpg";

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Banner */}
      <div className="w-full h-64 relative mb-8">
        <Image
          src={bannerImageUrl}
          alt={destination.Title}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      <h1 className="text-4xl font-bold mb-3">{destination.Title}</h1>
      <p className="text-gray-600 mb-1">{destination.Country}</p>
      <p className="text-gray-600 mb-4">{destination.State}</p>
      <p className="text-gray-700 text-lg mb-6">{destination.shortDescription}</p>

      {/* Cover Image */}
      <div className="mb-8">
        <Image
          src={coverImageUrl}
          alt={destination.Title}
          width={800}
          height={500}
          className="object-cover rounded-xl"
        />
      </div>

      {/* Activities */}
      {destination.activities?.data?.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-3">Activities</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {destination.activities.data.map((act) => {
              const activity = act.attributes;
              return (
                <div key={act.id} className="p-4 border rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-2">{activity.Name}</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    {activity.Description?.[0]?.children?.[0]?.text || ""}
                  </p>
                  <p className="font-medium text-gray-600">
                    Price: {activity.PriceRange}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Places */}
      {destination.places?.data?.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mt-10 mb-3">Places to Visit</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {destination.places.data.map((place) => {
              const p = place.attributes;
              return (
                <div
                  key={place.id}
                  className="p-4 border rounded-lg shadow-sm flex flex-col items-center"
                >
                  {p.image?.data?.attributes?.url && (
                    <Image
                      src={`http://localhost:1337${p.image.data.attributes.url}`}
                      alt={p.Name}
                      width={250}
                      height={150}
                      className="rounded-lg mb-2 object-cover"
                    />
                  )}
                  <h3 className="text-lg font-bold mb-1">{p.Name}</h3>
                  <p className="text-gray-700 text-sm text-center">
                    {p.Description?.[0]?.children?.[0]?.text || ""}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
