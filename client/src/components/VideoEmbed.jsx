
export default function VideoEmbed({ url, title = "Video" }) {
  if (!url) return <p>Invalid URL</p>;

  let embedUrl = "";
  if (url.includes("youtube") || url.includes("youtu.be")) {
    const id = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/)?.[1] || url.split("/").pop();
    embedUrl = `https://www.youtube.com/embed/${id}`;
  } else if (url.includes("vimeo")) {
    const id = url.split("/").pop();
    embedUrl = `https://player.vimeo.com/video/${id}`;
  } else {
    return <a href={url} target="_blank" className="text-blue-600 underline">Open Video →</a>;
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl">
      <iframe
        src={embedUrl}
        title={title}
        className="absolute inset-0 w-full h-full"
        allowFullScreen
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
}