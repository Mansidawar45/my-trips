//  // app/trains/page.js

// import Link from "next/link";

// async function getTrains() {
//   const res = await fetch("http://localhost:1337/api/trains?populate=*", {
//     next: { revalidate: 0 },
//   });
//   const data = await res.json();
//   return data?.data || [];
// }

// export default async function TrainPage() {
//   const trains = await getTrains();

//   if (!trains || trains.length === 0) {
//     return <p className="text-center mt-10">No Trains Found</p>;
//   }

//   return (
//     <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {trains.map((train) => {
//         const imgUrl =
//           train.attributes.image?.data?.attributes?.url
//             ? `http://localhost:1337${train.attributes.image.data.attributes.url}`
//             : "/placeholder.jpg";

//         return (
//           <Link
//             key={train.id}
//             href={`/trains/${train.attributes.slug}`}
//             className="block border rounded-xl shadow hover:shadow-lg transition overflow-hidden"
//           >
//             <img src={imgUrl} className="w-full h-48 object-cover" />

//             <div className="p-4">
//               <h2 className="text-lg font-bold">
//                 {train.attributes.TrainName}
//               </h2>

//               <p className="text-gray-600">
//                 {train.attributes.From} ➝ {train.attributes.To}
//               </p>

//               <p className="text-blue-600 font-semibold mt-2">
//                 ₹ {train.attributes.Price}
//               </p>

//               <p className="text-gray-500">
//                 Duration: {train.attributes.Duration}
//               </p>
//             </div>
//           </Link>
//         );
//       })}
//     </div>
//   );
// }

import Link from "next/link";

async function getTrains() {
  const res = await fetch("http://localhost:1337/api/trains?populate=Image", {
    next: { revalidate: 0 },
  });

  const data = await res.json();
  return data?.data || [];   
}

export default async function TrainPage() {
  const trains = await getTrains();

  if (!trains || trains.length === 0) {
    return (
      <p className="text-center mt-10 text-red-500 text-xl">
        No Trains Found
      </p>
    );
  }    

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {trains.map((train) => {
        const firstImage =
          train?.Image?.[0]?.url ||
          train?.Image?.[0]?.formats?.small?.url ||
          null;

        const imgUrl = firstImage
          ? `http://localhost:1337${firstImage}`
          : "/placeholder.jpg";

        return (
          <Link
            key={train.id}
            href={`/trains/${train.slug}`}
            className="block border rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img src={imgUrl} className="w-full h-48 object-cover" />

            <div className="p-4">
              <h2 className="text-lg font-bold">{train.TrainName}</h2>

              <p className="text-gray-600">
                {train.from} ➝ {train.to}
              </p>

              <p className="text-blue-600 font-semibold mt-2">
                ₹ {train.Price}
              </p>

              <p className="text-gray-500">
                Duration: {train.Duration}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
