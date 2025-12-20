export default function DestinationCard({ destination }) {
  // ✅ Your destination object has fields directly (no .attributes)
  if (!destination) return null;

  const { Title, shortDescription, slug, coverimage } = destination;

  // ✅ Correct image path
  const imgUrl = coverimage?.url
    ? `http://56.228.1.142:1337${coverimage.url}`
    : "";

  return (
    <div className="border rounded-xl shadow-md hover:shadow-xl transition p-4 bg-white">
      {imgUrl && (
        <img
          src={imgUrl}
          alt={Title}
          className="rounded-lg w-full h-48 object-cover mb-3"
        />
      )}

      <h3 className="font-bold text-xl mb-2 text-gray-800">{Title}</h3>
      <p className="text-gray-600 mb-3">{shortDescription}</p>

      <a
        href={`/destinations/${slug}`}
        className="text-blue-600 font-medium underline hover:text-blue-800"
      >
        View Details →
      </a>
    </div>
  );
}
