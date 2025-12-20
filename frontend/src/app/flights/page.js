//  export default async function flightsPage() {
//   const res = await fetch("http://56.228.1.142:1337/api/flights?populate=*", {
//     cache: "no-store",
//   });

//   const result = await res.json();
//   const flights = result.data;

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "20px" }}>
//         ✈️ Available Flights to Manali
//       </h1>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr)) ",
//           gap: "20px",
//         }}
//       >
//         {flights?.map((flight) => (
//           <div
//             key={flight.id}
//             style={{
//               border: "1px solid #ddd",
//               borderRadius: "10px",
//               padding: "15px",
//               background: "text-gray-600",
//               boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
//             }}
//           >
//             {/* Image */}
//             <img
//               src={`http://56.228.1.142:1337${flight.Image[0].url}`}
//               alt={flight.AirlineName}
//               style={{
//                 width: "100%",
//                 height: "180px",
//                 objectFit: "cover",
//                 borderRadius: "10px",
//                 marginBottom: "15px",
//               }}
//             />

//             <h2 style={{ fontSize: "22px", marginBottom: "5px" }}>
//               {flight.AirlineName}
//             </h2>

//             <p style={{ marginBottom: "5px" }}>
//               <strong>Flight Code:</strong> {flight.Flightcode}
//             </p>

//             <p style={{ marginBottom: "5px" }}>
//               <strong>From:</strong> {flight.Departure}
//             </p>

//             <p style={{ marginBottom: "5px" }}>
//               <strong>To:</strong> {flight.Destination}
//             </p>

//             <p style={{ marginBottom: "5px" }}>
//               <strong>Duration:</strong> {flight.Duration}
//             </p>

//             <p style={{ marginBottom: "5px" }}>
//               <strong>Price:</strong> ₹{flight.Price}
//             </p>

//             <p style={{ marginTop: "10px", lineHeight: "22px" }}>
//               {flight.Description[0]?.children[0]?.text}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import Link from "next/link";
import { getApiUrl, getImageUrl } from "@/lib/api";

export default async function flightsPage() {
  try {
    const res = await fetch(getApiUrl("/api/flights?populate=*"), {
      cache: "force-cache",
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch flights: ${res.status}`);
    }

    const result = await res.json();
    const flights = result.data || [];
    console.log(JSON.stringify(flights))

    if (flights.length === 0) {
      return (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "20px", color: "red" }}>
            No flights available at the moment
          </h1>
        </div>
      );
    }

    return (
      <div style={{ padding: "20px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "20px" }}>
          ✈️ Available Flights to Manali
        </h1>  

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr)) ",
            gap: "20px",
          }}
        >
          {flights?.map((flight) => {
            const f = flight; // shorter

            return (
              <Link
                key={f.id}
                href={`/flights/${f.slug}`}   // ⭐ correct slug
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "15px",
                    background: "black",
                    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
                    cursor: "pointer",
                  }}
                >
                  {/* Image */}
                  <img
                    src={getImageUrl(f.Image?.[0]?.url)}
                    alt={f.AirlineName || 'Flight'}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      marginBottom: "15px",
                    }}
                  />

                  <h2 style={{ fontSize: "22px", marginBottom: "5px" }}>
                    {f.AirlineName}
                  </h2>

                  <p><strong>Flight Code:</strong> {f.Flightcode}</p>
                  <p><strong>From:</strong> {f.Departure}</p>
                  <p><strong>To:</strong> {f.Destination}</p>
                  <p><strong>Duration:</strong> {f.Duration}</p>
                  <p><strong>Price:</strong> ₹{f.Price}</p>

                  <p style={{ marginTop: "10px", lineHeight: "22px" }}>
                    {Array.isArray(f.Description)
                      ? f.Description[0]?.children?.[0]?.text
                      : f.Description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading flights:', error);
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "20px", color: "red" }}>
          Unable to load flights. Please try again later.
        </h1>
      </div>
    );
  }
}
