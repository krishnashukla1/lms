// // src/components/VideoEmbed.jsx
// export default function VideoEmbed({ url, title = "Course Video" }) {
//   let embedUrl = "";
//   let platform = "";

//   // YouTube
//   if (url.includes("youtube.com") || url.includes("youtu.be")) {
//     platform = "youtube";
//     const videoId = url.includes("youtu.be")
//       ? url.split("/").pop()?.split("?")[0]
//       : url.split("v=")[1]?.split("&")[0];
//     if (!videoId) return <p className="text-red-500">Invalid YouTube URL</p>;
//     embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
//   }

//   // Vimeo
//   else if (url.includes("vimeo.com")) {
//     platform = "vimeo";
//     const videoId = url.split("/").pop();
//     embedUrl = `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`;
//   }

//   // Not supported
//   else {
//     return (
//       <a
//         href={url}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-indigo-600 underline hover:text-indigo-800"
//       >
//         Open Video (External Link)
//       </a>
//     );
//   }

//   return (
//     <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black">
//       <iframe
//         src={embedUrl}
//         title={title}
//         className="w-full aspect-video"
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//       ></iframe>
//     </div>
//   );
// }


//===========
// src/components/VideoEmbed.jsx
// export default function VideoEmbed({ url, title = "Course Video" }) {
//   let embedUrl = "";
//   let platform = "";

//   // YouTube
//   if (url.includes("youtube.com") || url.includes("youtu.be")) {
//     platform = "youtube";
//     const videoId = url.includes("youtu.be")
//       ? url.split("/").pop()?.split("?")[0]
//       : url.split("v=")[1]?.split("&")[0];
//     if (!videoId) return <p className="text-red-500">Invalid YouTube URL</p>;
//     embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
//   }
//   // Vimeo
//   else if (url.includes("vimeo.com")) {
//     platform = "vimeo";
//     const videoId = url.split("/").pop();
//     embedUrl = `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`;
//   }
//   // Not supported
//   else {
//     return (
//       <a
//         href={url}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-indigo-600 underline hover:text-indigo-800"
//       >
//         Open Video (External Link)
//       </a>
//     );
//   }

//   return (
//     <div className="relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-black">
//       {/* This wrapper controls the size */}
//       <div className="aspect-video w-full max-w-lg"> ← Control max width here
//         <iframe
//           src={embedUrl}
//           title={title}
//           className="absolute top-0 left-0 w-full h-full" // fills the wrapper completely
//           frameBorder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//         ></iframe>
//       </div>
//     </div>
//   );
// }

//============kp============
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