
//=======================correct

// import { useState } from "react";
// import api from "../api/axios";
// import { FiX } from "react-icons/fi"; // Cross icon

// export default function AddModule() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [order, setOrder] = useState("");
//   const [materials, setMaterials] = useState([{ type: "", url: "" }]);
//   const [loading, setLoading] = useState(false);

//   const handleMaterialChange = (index, field, value) => {
//     const updated = [...materials];
//     updated[index][field] = value;
//     setMaterials(updated);
//   };

//   const addMaterialField = () => {
//     setMaterials([...materials, { type: "", url: "" }]);
//   };

//   const removeMaterialField = (index) => {
//     if (materials.length === 1) {
//       alert("At least one material is required!");
//       return;
//     }
//     const updated = [...materials];
//     updated.splice(index, 1);
//     setMaterials(updated);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title || !description || !order) {
//       alert("Please fill all required fields");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await api.post("/modules", { title, description, order, materials });

//       alert("Module Created Successfully!");
//       console.log(res.data);

//       // Reset form
//       setTitle("");
//       setDescription("");
//       setOrder("");
//       setMaterials([{ type: "", url: "" }]);
//     } catch (err) {
//       console.error(err);
//       alert("Error Creating Module");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-8 min-h-screen bg-gray-100 flex justify-center">
//       <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8">
//         <button
//           onClick={() => (window.location.href = "http://localhost:5173/admin")}
//           className="mb-6 flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition cursor-pointer"
//         >
//           ← Back to Admin Dashboard
//         </button>

//         <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">
//           ➕ Add New Module
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-6">

//           {/* Title */}
//           <div>
//             <label className="block font-semibold mb-2 text-gray-700">Module Title</label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Enter module title"
//               className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm hover:shadow-md transition"
//               required
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block font-semibold mb-2 text-gray-700">Description</label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Enter module description"
//               rows={4}
//               className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm hover:shadow-md transition"
//               required
//             />
//           </div>

//           {/* Order */}
//           <div>
//             <label className="block font-semibold mb-2 text-gray-700">Order</label>
//             <input
//               type="number"
//               value={order}
//               onChange={(e) => setOrder(e.target.value)}
//               placeholder="Enter module order"
//               className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm hover:shadow-md transition"
//               required
//             />
//           </div>

//           {/* Materials */}
//           {/* <div>
//             <h2 className="text-xl font-semibold mb-3 text-gray-800">Materials</h2>
//             <div className="space-y-4 space-x-15">
//               {materials.map((m, i) => (
//                 <div
//                   key={i}
//                   className="border p-4 rounded-xl shadow-sm hover:shadow-md transition relative space-y-2"
//                 >
              
//                   {materials.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeMaterialField(i)}
//                       className="cursor-pointer absolute top-2 right-2 flex items-center justify-center w-8 h-8 bg-white border border-gray-300 rounded-full shadow hover:bg-red-600 hover:text-white transition-all duration-200 focus:outline-none"
//                       title="Remove Material"
//                     >
//                       <FiX size={18} />
//                     </button>
//                   )}


//                   <select
//                     className="cursor-pointer w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
//                     value={m.type}
//                     onChange={(e) => handleMaterialChange(i, "type", e.target.value)}
//                     required
//                   >
//                     <option value="">Select Type</option>
//                     <option value="video">Video</option>
//                     <option value="pdf">PDF</option>
//                     <option value="link">Link</option>
//                   </select>

//                   <input
//                     type="text"
//                     placeholder="URL"
//                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
//                     value={m.url}
//                     onChange={(e) => handleMaterialChange(i, "url", e.target.value)}
//                     required
//                   />
//                 </div>
//               ))}
//             </div>

//             <button
//               type="button"
//               onClick={addMaterialField}
//               className="cursor-pointer mt-3 w-full py-3 bg-gray-700 text-white font-semibold rounded-xl hover:bg-gray-800 transition shadow-md hover:shadow-lg"
//             >
//               ➕ Add More Material
//             </button>
//           </div> */}



//           <div>
//             <h2 className="text-xl font-semibold mb-3 text-gray-800">Materials</h2>
//             <div className="space-y-6">
//               {materials.map((m, i) => (
//                 <div
//                   key={i}
//                   className="relative border border-gray-200 p-5 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow"
//                 >
//                   {/* Modern Cross Button - matches your screenshot */}
//                   {materials.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeMaterialField(i)}
//                       className="cursor-pointer absolute -top-3 -right-3 w-9 h-9 bg-white rounded-full shadow-lg border border-gray-300 flex items-center justify-center text-gray-500 hover:text-white hover:bg-red-500 hover:border-red-500 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-100"
//                       title="Remove Material"
//                       aria-label="Remove this material"
//                     >
//                       <FiX size={20} className="stroke-current" />
//                     </button>
//                   )}

//                   <div className="space-y-4">
//                     <select
//                       className="cursor-pointer w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                       value={m.type}
//                       onChange={(e) => handleMaterialChange(i, "type", e.target.value)}
//                       required
//                     >
//                       <option value="">Select Type</option>
//                       <option value="video">Video</option>
//                       <option value="pdf">PDF</option>
//                       <option value="link">Link</option>
//                     </select>

//                     <input
//                       type="text"
//                       placeholder="URL"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                       value={m.url}
//                       onChange={(e) => handleMaterialChange(i, "url", e.target.value)}
//                       required
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <button
//               type="button"
//               onClick={addMaterialField}
//               className="cursor-pointer mt-6 w-full py-3.5 bg-gray-800 text-white font-medium rounded-xl hover:bg-gray-900 active:bg-gray-950 transition-shadow shadow-md hover:shadow-lg flex items-center justify-center gap-2"
//             >
//               <span className="text-xl">➕</span> Add More Material
//             </button>
//           </div>


//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="cursor-pointer w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
//           >
//             {loading ? "Creating..." : "Create Module"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


//============stylish=============

// import { useState } from "react";
// import api from "../api/axios";
// import { FiX, FiPlus, FiArrowLeft, FiBook, FiFileText, FiLink, FiVideo } from "react-icons/fi";
// import { FaFilePdf } from "react-icons/fa";

// export default function AddModule() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [order, setOrder] = useState("");
//   const [materials, setMaterials] = useState([{ type: "", url: "" }]);
//   const [loading, setLoading] = useState(false);

//   const handleMaterialChange = (index, field, value) => {
//     const updated = [...materials];
//     updated[index][field] = value;
//     setMaterials(updated);
//   };

//   const addMaterialField = () => {
//     setMaterials([...materials, { type: "", url: "" }]);
//   };

//   const removeMaterialField = (index) => {
//     if (materials.length === 1) {
//       alert("At least one material is required!");
//       return;
//     }
//     const updated = [...materials];
//     updated.splice(index, 1);
//     setMaterials(updated);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title || !description || !order) {
//       alert("Please fill all required fields");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await api.post("/modules", { title, description, order, materials });

//       alert("Module Created Successfully!");
//       console.log(res.data);

//       // Reset form
//       setTitle("");
//       setDescription("");
//       setOrder("");
//       setMaterials([{ type: "", url: "" }]);
//     } catch (err) {
//       console.error(err);
//       alert("Error Creating Module");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getTypeIcon = (type) => {
//     switch (type) {
//       case "video": return <FiVideo className="text-red-500" size={18} />;
//       case "pdf": return <FaFilePdf className="text-red-500" size={18} />;
//       case "link": return <FiLink className="text-blue-500" size={18} />;
//       default: return <FiFileText className="text-gray-500" size={18} />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
//       {/* Background Decorative Elements */}
//       <div className="absolute top-0 left-0 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
//       <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      
//       <div className="relative w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/50 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
        
//         {/* Header Section */}
//         <div className="flex items-center justify-between mb-8">
//           <button
//             onClick={() => window.history.back()}
//             className="flex items-center gap-3 text-gray-600 hover:text-blue-700 font-semibold transition-all duration-300 hover:gap-4 group cursor-pointer bg-white/60 hover:bg-white/80 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100"
//           >
//             <FiArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
//             Back to Dashboard
//           </button>

//           <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
//             <FiBook className="text-white" size={28} />
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="text-center mb-10">
//           <h1 className="text-5xl font-black bg-linear-to-r from-purple-600 to-blue-700 bg-clip-text text-transparent mb-4">
//             Create New Module
//           </h1>
//           <p className="text-gray-600 text-lg font-medium max-w-md mx-auto">
//             Build engaging learning content with multimedia materials
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-8">
          
//           {/* Module Title */}
//           <div className="group">
//             <label className="block mb-3 font-semibold text-gray-700 text-lg">Module Title</label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                 <FiBook className="text-gray-400 group-focus-within:text-purple-500 transition-colors" size={20} />
//               </div>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="Enter module title (e.g., 'Introduction to React')"
//                 className="w-full p-4 pl-12 rounded-2xl border-2 border-gray-200 
//                          bg-white/60 backdrop-blur-sm
//                          focus:ring-4 focus:ring-purple-200 focus:border-purple-500 
//                          transition-all duration-300 placeholder-gray-400
//                          hover:border-gray-300 hover:bg-white/80
//                          text-lg font-medium cursor-text"
//                 required
//               />
//             </div>
//           </div>

//           {/* Description */}
//           <div className="group">
//             <label className="block mb-3 font-semibold text-gray-700 text-lg">Description</label>
//             <div className="relative">
//               <div className="absolute top-4 left-4 pointer-events-none">
//                 <FiFileText className="text-gray-400 group-focus-within:text-purple-500 transition-colors" size={20} />
//               </div>
//               <textarea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Describe what students will learn in this module..."
//                 rows={4}
//                 className="w-full p-4 pl-12 rounded-2xl border-2 border-gray-200 
//                          bg-white/60 backdrop-blur-sm
//                          focus:ring-4 focus:ring-purple-200 focus:border-purple-500 
//                          transition-all duration-300 placeholder-gray-400
//                          hover:border-gray-300 hover:bg-white/80
//                          text-lg font-medium cursor-text resize-none"
//                 required
//               />
//             </div>
//           </div>

//           {/* Order */}
//           <div className="group">
//             <label className="block mb-3 font-semibold text-gray-700 text-lg">Module Order</label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                 <span className="text-gray-400 group-focus-within:text-purple-500 transition-colors text-lg">#</span>
//               </div>
//               <input
//                 type="number"
//                 value={order}
//                 onChange={(e) => setOrder(e.target.value)}
//                 placeholder="Enter display order (e.g., 1, 2, 3...)"
//                 min="1"
//                 className="w-full p-4 pl-12 rounded-2xl border-2 border-gray-200 
//                          bg-white/60 backdrop-blur-sm
//                          focus:ring-4 focus:ring-purple-200 focus:border-purple-500 
//                          transition-all duration-300 placeholder-gray-400
//                          hover:border-gray-300 hover:bg-white/80
//                          text-lg font-medium cursor-text"
//                 required
//               />
//             </div>
//           </div>

//           {/* Materials Section */}
//           <div className="bg-linear-to-br from-gray-50 to-blue-50/30 rounded-3xl p-8 border border-gray-200/50">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-black bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//                 Learning Materials
//               </h2>
//               <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
//                 <FiLink className="text-blue-600" size={20} />
//               </div>
//             </div>

//             <div className="space-y-6">
//               {materials.map((material, index) => (
//                 <div
//                   key={index}
//                   className="relative group bg-white rounded-2xl p-6 border-2 border-gray-200/50 
//                            hover:border-purple-300/50 hover:shadow-lg transition-all duration-300
//                            backdrop-blur-sm"
//                 >
//                   {/* Remove Button */}
//                   {materials.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeMaterialField(index)}
//                       className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full shadow-xl 
//                                border-2 border-gray-300 flex items-center justify-center text-gray-500 
//                                hover:text-white hover:bg-red-500 hover:border-red-500 
//                                transition-all duration-300 cursor-pointer group/remove
//                                hover:scale-110 focus:ring-4 focus:ring-red-100"
//                       title="Remove Material"
//                       aria-label="Remove this material"
//                     >
//                       <FiX size={18} className="group-hover/remove:scale-110 transition-transform" />
//                     </button>
//                   )}

//                   <div className="space-y-4">
//                     {/* Material Type */}
//                     <div className="group/select">
//                       <label className="block mb-2 font-medium text-gray-700">Material Type</label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                           {getTypeIcon(material.type)}
//                         </div>
//                         <select
//                           className="cursor-pointer w-full p-4 pl-12 rounded-2xl border-2 border-gray-200 
//                                    bg-white/80 focus:ring-4 focus:ring-blue-200 focus:border-blue-500 
//                                    transition-all duration-300 appearance-none
//                                    hover:border-gray-300 text-lg font-medium"
//                           value={material.type}
//                           onChange={(e) => handleMaterialChange(index, "type", e.target.value)}
//                           required
//                         >
//                           <option value="">Select Material Type</option>
//                           <option value="video">🎥 Video Lesson</option>
//                           <option value="pdf">📄 PDF Document</option>
//                           <option value="link">🔗 External Link</option>
//                         </select>
//                         <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
//                           <span className="text-gray-400">▼</span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* URL Input */}
//                     <div className="group/input">
//                       <label className="block mb-2 font-medium text-gray-700">Material URL</label>
//                       <input
//                         type="text"
//                         placeholder="Paste your material URL here..."
//                         className="w-full p-4 rounded-2xl border-2 border-gray-200 
//                                  bg-white/80 focus:ring-4 focus:ring-blue-200 focus:border-blue-500 
//                                  transition-all duration-300 placeholder-gray-400
//                                  hover:border-gray-300 text-lg font-medium cursor-text"
//                         value={material.url}
//                         onChange={(e) => handleMaterialChange(index, "url", e.target.value)}
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Add More Materials Button */}
//             <button
//               type="button"
//               onClick={addMaterialField}
//               className="cursor-pointer w-full mt-6 py-4 bg-linear-to-r from-gray-700 to-gray-800 
//                        text-white font-bold rounded-2xl hover:from-gray-800 hover:to-gray-900 
//                        transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300
//                        flex items-center justify-center gap-3 group/add border-2 border-transparent 
//                        hover:border-gray-600/30 relative overflow-hidden"
//             >
//               {/* Shine effect */}
//               <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/add:translate-x-full transition-transform duration-1000"></div>
              
//               <FiPlus className="group-hover/add:scale-110 transition-transform" size={22} />
//               <span>Add Another Material</span>
//             </button>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="cursor-pointer w-full bg-linear-to-r from-purple-600 to-blue-700 
//                      text-white py-5 rounded-2xl text-xl font-bold
//                      hover:from-purple-700 hover:to-blue-800 
//                      transform hover:-translate-y-1 hover:shadow-2xl
//                      transition-all duration-300 disabled:opacity-50 
//                      disabled:transform-none disabled:hover:shadow-lg
//                      flex items-center justify-center gap-3
//                      border-2 border-transparent hover:border-purple-300/30
//                      relative overflow-hidden group/submit"
//           >
//             {/* Shine effect */}
//             <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/submit:translate-x-full transition-transform duration-1000"></div>
            
//             {loading ? (
//               <>
//                 <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
//                 <span className="animate-pulse">Creating Module...</span>
//               </>
//             ) : (
//               <>
//                 <FiBook className="group-hover/submit:scale-110 transition-transform" size={24} />
//                 <span>Create Learning Module</span>
//               </>
//             )}
//           </button>
//         </form>

//         {/* Additional Info */}
//         <div className="mt-10 p-6 bg-linear-to-br from-purple-50 to-blue-50/50 rounded-2xl border border-purple-100">
//           <div className="flex items-start gap-4">
//             <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
//               <span className="text-purple-600 text-lg">💡</span>
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-800 mb-2">Best Practices</h3>
//               <ul className="text-sm text-gray-600 space-y-1">
//                 <li>• Use clear, descriptive titles for better student understanding</li>
//                 <li>• Organize modules in logical learning sequence</li>
//                 <li>• Include multiple material types for varied learning styles</li>
//                 <li>• Test all URLs before publishing the module</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//=======================emebed=======
// import { useState } from "react";
// import api from "../api/axios";
// import { FiX, FiPlus, FiArrowLeft, FiBook, FiFileText, FiLink, FiVideo } from "react-icons/fi";
// import { FaFilePdf } from "react-icons/fa";

// export default function AddModule() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [order, setOrder] = useState("");
//   const [materials, setMaterials] = useState([{ type: "", url: "" }]);
//   const [loading, setLoading] = useState(false);

//   const handleMaterialChange = (index, field, value) => {
//     const updated = [...materials];
//     updated[index][field] = value;
//     setMaterials(updated);
//   };

//   const addMaterialField = () => {
//     setMaterials([...materials, { type: "", url: "" }]);
//   };

//   const removeMaterialField = (index) => {
//     if (materials.length === 1) {
//       alert("At least one material is required!");
//       return;
//     }
//     setMaterials(materials.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title || !description || !order) {
//       alert("Please fill all required fields");
//       return;
//     }

//     try {
//       setLoading(true);
//       await api.post("/modules", { title, description, order: Number(order), materials });
//       alert("Module Created Successfully!");
//       setTitle("");
//       setDescription("");
//       setOrder("");
//       setMaterials([{ type: "", url: "" }]);
//     } catch (err) {
//       console.error(err);
//       alert("Error Creating Module");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getTypeIcon = (type) => {
//     switch (type) {
//       case "video": return <FiVideo className="text-red-500" size={20} />;
//       case "pdf": return <FaFilePdf className="text-red-600" size={20} />;
//       case "link": return <FiLink className="text-blue-500" size={20} />;
//       default: return <FiFileText className="text-gray-500" size={20} />;
//     }
//   };

//   // Extract embed URL for YouTube/Vimeo
//   const getEmbedUrl = (url) => {
//     if (!url) return null;

//     if (url.includes("youtu.be")) {
//       const id = url.split("/").pop()?.split("?")[0];
//       return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
//     }
//     if (url.includes("youtube.com")) {
//       const id = url.split("v=")[1]?.split("&")[0];
//       return id ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1` : null;
//     }
//     if (url.includes("vimeo.com")) {
//       const id = url.split("/").pop()?.split("?")[0];
//       return `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0`;
//     }
//     return null;
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
//       {/* Background Blobs */}
//       <div className="absolute top-0 left-0 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
//       <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

//       <div className="relative w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/50">

//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <button
//             onClick={() => window.history.back()}
//             className="flex items-center gap-3 text-gray-600 hover:text-blue-700 font-semibold transition-all duration-300 hover:gap-4 group bg-white/60 hover:bg-white/80 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100"
//           >
//             <FiArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
//             Back to Dashboard
//           </button>
//           <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
//             <FiBook className="text-white" size={28} />
//           </div>
//         </div>

//         <div className="text-center mb-10">
//           <h1 className="text-5xl font-black bg-linear-to-r from-purple-600 to-blue-700 bg-clip-text text-transparent mb-4">
//             Create New Module
//           </h1>
//           <p className="text-gray-600 text-lg font-medium max-w-md mx-auto">
//             Build engaging learning content with multimedia materials
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-8">

//           {/* Module Title */}
//           <div className="group">
//             <label className="block mb-3 font-semibold text-gray-700 text-lg">Module Title</label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                 <FiBook className="text-gray-400 group-focus-within:text-purple-500 transition-colors" size={20} />
//               </div>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="Enter module title (e.g., 'Introduction to React')"
//                 className="w-full p-4 pl-12 rounded-2xl border-2 border-gray-200 bg-white/60 backdrop-blur-sm focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-300 placeholder-gray-400 hover:border-gray-300 hover:bg-white/80 text-lg font-medium"
//                 required
//               />
//             </div>
//           </div>

//           {/* Description */}
//           <div className="group">
//             <label className="block mb-3 font-semibold text-gray-700 text-lg">Description</label>
//             <div className="relative">
//               <div className="absolute top-4 left-4 pointer-events-none">
//                 <FiFileText className="text-gray-400 group-focus-within:text-purple-500 transition-colors" size={20} />
//               </div>
//               <textarea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Describe what students will learn in this module..."
//                 rows={4}
//                 className="w-full p-4 pl-12 rounded-2xl border-2 border-gray-200 bg-white/60 backdrop-blur-sm focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-300 placeholder-gray-400 hover:border-gray-300 hover:bg-white/80 text-lg font-medium resize-none"
//                 required
//               />
//             </div>
//           </div>

//           {/* Order */}
//           <div className="group">
//             <label className="block mb-3 font-semibold text-gray-700 text-lg">Module Order</label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                 <span className="text-gray-400 group-focus-within:text-purple-500 transition-colors text-lg">#</span>
//               </div>
//               <input
//                 type="number"
//                 value={order}
//                 onChange={(e) => setOrder(e.target.value)}
//                 placeholder="Enter display order (e.g., 1, 2, 3...)"
//                 min="1"
//                 className="w-full p-4 pl-12 rounded-2xl border-2 border-gray-200 bg-white/60 backdrop-blur-sm focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-300 placeholder-gray-400 hover:border-gray-300 hover:bg-white/80 text-lg font-medium"
//                 required
//               />
//             </div>
//           </div>

//           {/* Learning Materials */}
//           <div className="bg-linear-to-br from-gray-50 to-blue-50/30 rounded-3xl p-8 border border-gray-200/50">
//             <h2 className="text-2xl font-black bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
//               Learning Materials
//             </h2>

//             <div className="space-y-8">
//               {materials.map((material, index) => (
//                 <div key={index} className="relative bg-white rounded-2xl p-6 border-2 border-gray-200/50 hover:border-purple-300/50 hover:shadow-xl transition-all duration-300">

//                   {/* Remove Button */}
//                   {materials.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeMaterialField(index)}
//                       className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full shadow-xl border-2 border-gray-300 flex items-center justify-center text-gray-500 hover:text-white hover:bg-red-500 hover:border-red-500 transition-all z-10"
//                     >
//                       <FiX size={18} />
//                     </button>
//                   )}

//                   <div className="space-y-6">

//                     {/* Material Type */}
//                     <div>
//                       <label className="block mb-2 font-semibold text-gray-700">Material Type</label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                           {getTypeIcon(material.type)}
//                         </div>
//                         <select
//                           className="w-full pl-12 pr-10 py-4 rounded-2xl border-2 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all text-lg font-medium cursor-pointer appearance-none bg-white"
//                           value={material.type}
//                           onChange={(e) => handleMaterialChange(index, "type", e.target.value)}
//                           required
//                         >
//                           <option value="">Choose type...</option>
//                           <option value="video">Video Lesson (YouTube/Vimeo)</option>
//                           <option value="pdf">PDF Document</option>
//                           <option value="link">External Link</option>
//                         </select>
//                         <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">Down Arrow</div>
//                       </div>
//                     </div>

//                     {/* URL Input */}
//                     <div>
//                       <label className="block mb-2 font-semibold text-gray-700">URL</label>
//                       <input
//                         type="url"
//                         placeholder={
//                           material.type === "video"
//                             ? "https://youtube.com/watch?v=... or vimeo.com/..."
//                             : material.type === "pdf"
//                             ? "https://example.com/file.pdf"
//                             : "https://any-website.com"
//                         }
//                         className="w-full px-4 py-4 rounded-2xl border-2 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all text-lg"
//                         value={material.url}
//                         onChange={(e) => handleMaterialChange(index, "url", e.target.value)}
//                         required
//                       />
//                     </div>

//                     {/* Live Previews */}
//                     {material.type === "video" && getEmbedUrl(material.url) && (
//                       <div className="rounded-2xl overflow-hidden shadow-2xl bg-black">
//                         <div className="relative pb-[56.25%]">
//                           <iframe
//                             src={getEmbedUrl(material.url)}
//                             title="Video preview"
//                             className="absolute inset-0 w-full h-full"
//                             allowFullScreen
//                             allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//                           />
//                         </div>
//                         <div className="p-3 bg-linear-to-t from-black/80 to-transparent text-white text-center text-sm">
//                           Live Video Preview
//                         </div>
//                       </div>
//                     )}

//                     {material.type === "pdf" && material.url && (
//                       <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-200">
//                         <iframe
//                           src={`${material.url}#view=FitH&toolbar=1&navpanes=0`}
//                           title="PDF preview"
//                           className="w-full h-96 bg-white"
//                           frameBorder="0"
//                         />
//                         <div className="p-3 bg-linear-to-r from-purple-600 to-blue-600 text-white text-center text-sm font-medium">
//                           PDF Preview
//                         </div>
//                       </div>
//                     )}

//                     {material.type === "link" && material.url && (
//                       <a
//                         href={material.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="block rounded-2xl border-2 border-gray-200 hover:border-purple-400 overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
//                       >
//                         <div className="flex items-center gap-4 p-5 bg-linear-to-r from-purple-50 to-blue-50">
//                           <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center shrink-0">
//                             {material.url.includes("youtube") || material.url.includes("vimeo") ? (
//                               <FiVideo className="text-red-500" size={32} />
//                             ) : material.url.includes("drive.google") ? (
//                               <span className="text-3xl font-bold text-gray-700">G</span>
//                             ) : (
//                               <FiLink className="text-blue-600" size={32} />
//                             )}
//                           </div>
//                           <div className="flex-1">
//                             <p className="font-bold text-gray-800 group-hover:text-purple-700 transition-colors">
//                               {new URL(material.url).hostname.replace("www.", "")}
//                             </p>
//                             <p className="text-sm text-gray-600 truncate max-w-md">{material.url}</p>
//                           </div>
//                           <span className="text-purple-600 group-hover:translate-x-2 transition-transform">Right Arrow</span>
//                         </div>
//                       </a>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Add Another Material */}
//             <button
//               type="button"
//               onClick={addMaterialField}
//               className="w-full mt-8 py-5 bg-linear-to-r from-purple-600 to-blue-600 text-white font-bold text-xl rounded-2xl hover:from-purple-700 hover:to-blue-700 transform hover:-translate-y-1 hover:shadow-2xl transition-all flex items-center justify-center gap-3"
//             >
//               <FiPlus size={28} />
//               Add Another Material
//             </button>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-6 bg-linear-to-r from-purple-600 to-blue-700 text-white text-2xl font-bold rounded-2xl hover:from-purple-700 hover:to-blue-800 transform hover:-translate-y-1 hover:shadow-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-4"
//           >
//             {loading ? "Creating Module..." : "Create Learning Module"}
//           </button>
//         </form>

//         {/* Best Practices */}
//         <div className="mt-10 p-6 bg-linear-to-br from-purple-50 to-blue-50/50 rounded-2xl border border-purple-100">
//           <div className="flex items-start gap-4">
//             <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
//               <span className="text-purple-600 text-lg">Light Bulb</span>
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-800 mb-2">Best Practices</h3>
//               <ul className="text-sm text-gray-600 space-y-1">
//                 <li>• Use clear, descriptive titles for better student understanding</li>
//                 <li>• Organize modules in logical learning sequence</li>
//                 <li>• Include multiple material types for varied learning styles</li>
//                 <li>• Test all URLs before publishing the module</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
//==========kp==============


// import { useState } from "react";
// import api from "../api/axios";
// import { FiX, FiPlus, FiArrowLeft } from "react-icons/fi";

// export default function AddModule() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [courseType, setCourseType] = useState("basic");
//   const [order, setOrder] = useState("");
//   const [materials, setMaterials] = useState([
//     { materialType: "video", title: "", url: "" } // ← CHANGED FROM "type" to "materialType"
//   ]);
//   const [loading, setLoading] = useState(false);

//   const handleMaterialChange = (index, field, value) => {
//     const updated = [...materials];
//     updated[index][field] = value;
//     setMaterials(updated);
//   };

//   const addMaterialField = () => {
//     setMaterials([...materials, { materialType: "video", title: "", url: "" }]);
//   };

//   const removeMaterialField = (index) => {
//     if (materials.length === 1) {
//       alert("At least one material required");
//       return;
//     }
//     setMaterials(materials.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title || !description || !order || !courseType) {
//       alert("All fields are required");
//       return;
//     }

//     // Validate materials
//     for (let mat of materials) {
//       if (!mat.materialType || !mat.url) {
//         alert("All materials must have type and URL");
//         return;
//       }
//     }

//     const payload = {
//       courseType,
//       title,
//       description,
//       order: Number(order),
//       materials: materials.map(m => ({
//         materialType: m.materialType,  // ← This matches your backend
//         title: m.title || "",
//         url: m.url
//       }))
//     };

//     try {
//       setLoading(true);
//       await api.post("/modules", payload);
//       alert("Module created successfully!");
      
//       // Reset form
//       setTitle("");
//       setDescription("");
//       setOrder("");
//       setCourseType("basic");
//       setMaterials([{ materialType: "video", title: "", url: "" }]);
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Failed to create module");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 p-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
//         <button
//           onClick={() => window.history.back()}
//           className="cursor-pointer flex items-center gap-3 text-blue-600 hover:text-blue-800 font-bold mb-8"
//         >
//           <FiArrowLeft size={24} />
//           Back to Admin
//         </button>

//         <h1 className="text-4xl font-black text-center mb-10 bg-linear-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
//           Create New Module
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Course Type */}
//           <div>
//             <label className="block text-xl font-bold mb-3 text-gray-700">Course Type</label>
//             <select
//               value={courseType}
//               onChange={(e) => setCourseType(e.target.value)}
//               className="cursor-pointer w-full p-4 border-2 border-gray-300 rounded-xl text-lg focus:border-blue-500 focus:outline-none"
//             >
//               <option value="basic">Basic Course</option>
//               <option value="intermediate">Intermediate Course</option>
//               <option value="advanced">Advanced Course</option>
//             </select>
//           </div>

//           {/* Title */}
//           <div>
//             <label className="block text-xl font-bold mb-3 text-gray-700">Module Title</label>
//             <input
//               type="text"
//               placeholder="e.g. Introduction to React"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full p-4 border-2 border-gray-300 rounded-xl text-lg focus:border-blue-500 focus:outline-none"
//               required
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-xl font-bold mb-3 text-gray-700">Description</label>
//             <textarea
//               placeholder="What will students learn?"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               rows={4}
//               className="w-full p-4 border-2 border-gray-300 rounded-xl text-lg focus:border-blue-500 focus:outline-none resize-none"
//               required
//             />
//           </div>

//           {/* Order */}
//           <div>
//             <label className="block text-xl font-bold mb-3 text-gray-700">Display Order</label>
//             <input
//               type="number"
//               placeholder="1, 2, 3..."
//               value={order}
//               onChange={(e) => setOrder(e.target.value)}
//               className="w-full p-4 border-2 border-gray-300 rounded-xl text-lg focus:border-blue-500 focus:outline-none"
//               min="1"
//               required
//             />
//           </div>

//           {/* Materials */}
//           <div>
//             <h2 className="text-2xl font-bold mb-6 text-gray-800">Learning Materials</h2>
//             {materials.map((mat, i) => (
//               <div key={i} className="bg-gray-50 rounded-2xl p-6 mb-6 border-2 border-gray-200">
//                 <div className="grid md:grid-cols-3 gap-4">
//                   {/* Title */}
//                   <input
//                     type="text"
//                     placeholder="Material title (optional)"
//                     value={mat.title}
//                     onChange={(e) => handleMaterialChange(i, "title", e.target.value)}
//                     className="p-3 border rounded-lg"
//                   />

//                   {/* Type */}
//                   <select
//                     value={mat.materialType}
//                     onChange={(e) => handleMaterialChange(i, "materialType", e.target.value)}
//                     className="cursor-pointer p-3 border rounded-lg font-medium"
//                   >
//                     <option value="video">Video</option>
//                     <option value="pdf">PDF</option>
//                     <option value="link">Link</option>
//                     <option value="document">Document</option>
//                   </select>

//                   {/* URL */}
//                   <input
//                     type="url"
//                     placeholder="https://..."
//                     value={mat.url}
//                     onChange={(e) => handleMaterialChange(i, "url", e.target.value)}
//                     className="p-3 border rounded-lg"
//                     required
//                   />
//                 </div>

//                 {materials.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => removeMaterialField(i)}
//                     className="cursor-pointer mt-4 text-red-600 hover:text-red-800 font-medium"
//                   >
//                     Remove Material
//                   </button>
//                 )}
//               </div>
//             ))}

//             <button
//               type="button"
//               onClick={addMaterialField}
//               className="cursor-pointer w-full py-4 border-2 border-dashed border-blue-400 rounded-xl text-blue-600 font-bold hover:bg-blue-50 transition"
//             >
//               <FiPlus className="inline mr-2" /> Add Another Material
//             </button>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="cursor-pointer w-full bg-linear-to-r from-blue-600 to-purple-700 text-white py-6 rounded-2xl text-2xl font-bold hover:shadow-2xl transition disabled:opacity-60"
//           >
//             {loading ? "Creating Module..." : "Create Module"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

//=========with validation==============

import { useState } from "react";
import api from "../api/axios";
import { FiPlus, FiArrowLeft } from "react-icons/fi";

export default function AddModule() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courseType, setCourseType] = useState("basic");
  const [order, setOrder] = useState("");
  const [materials, setMaterials] = useState([
    { materialType: "video", title: "", url: "" }
  ]);
  const [loading, setLoading] = useState(false);

  // Validation errors — only shown after submit attempt
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    order: false,
    materials: [] // one boolean per material (true = has error)
  });
  const [touched, setTouched] = useState(false); // true only after first submit click

  const handleMaterialChange = (index, field, value) => {
    const updated = [...materials];
    updated[index][field] = value;
    setMaterials(updated);
  };

  const addMaterialField = () => {
    setMaterials([...materials, { materialType: "video", title: "", url: "" }]);
  };

  const removeMaterialField = (index) => {
    if (materials.length === 1) {
      alert("At least one material is required");
      return;
    }
    setMaterials(materials.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors = {
      title: !title.trim(),
      description: !description.trim(),
      order: !order.trim() || isNaN(order) || Number(order) < 1,
      materials: materials.map(mat => !mat.url.trim())
    };
    setErrors(newErrors);
    return !newErrors.title && !newErrors.description && !newErrors.order && !newErrors.materials.some(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true); // Now we show errors

    if (!validate()) {
      return; // Stop if validation fails
    }

    const payload = {
      courseType,
      title: title.trim(),
      description: description.trim(),
      order: Number(order),
      materials: materials.map(m => ({
        materialType: m.materialType,
        title: m.title?.trim() || "",
        url: m.url.trim()
      }))
    };

    try {
      setLoading(true);
      await api.post("/modules", payload);
      alert("Module created successfully!");

      // Reset form
      setTitle("");
      setDescription("");
      setOrder("");
      setCourseType("basic");
      setMaterials([{ materialType: "video", title: "", url: "" }]);
      setTouched(false);
      setErrors({ title: false, description: false, order: false, materials: [] });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create module");
    } finally {
      setLoading(false);
    }
  };

  // Conditional styling — only red if touched AND error
  const inputClass = (hasError) =>
    `w-full p-4 border-2 rounded-xl text-lg focus:outline-none transition ${
      touched && hasError
        ? "border-red-500 bg-red-50"
        : "border-gray-300 focus:border-blue-500"
    }`;

  const materialInputClass = (index) =>
    `p-3 border rounded-lg transition ${
      touched && errors.materials[index]
        ? "border-red-500 bg-red-50"
        : "border-gray-300 focus:border-blue-500 focus:outline-none"
    }`;

  const materialBlockClass = (index) =>
    `bg-gray-50 rounded-2xl p-6 mb-6 border-2 transition ${
      touched && errors.materials[index] ? "border-red-300" : "border-gray-200"
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
        <button
          onClick={() => window.history.back()}
          className="cursor-pointer flex items-center gap-3 text-blue-600 hover:text-blue-800 font-bold mb-8"
        >
          <FiArrowLeft size={24} />
          Back to Admin
        </button>

        <h1 className="text-4xl font-black text-center mb-10 bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
          Create New Module
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Course Type */}
          <div>
            <label className="block text-xl font-bold mb-3 text-gray-700">Course Type</label>
            <select
              value={courseType}
              onChange={(e) => setCourseType(e.target.value)}
              className="cursor-pointer w-full p-4 border-2 border-gray-300 rounded-xl text-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="basic">Basic Course</option>
              <option value="intermediate">Intermediate Course</option>
              <option value="advanced">Advanced Course</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xl font-bold mb-3 text-gray-700">
              Module Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              // placeholder="e.g. Introduction to React"
          placeholder="B-Module 1, B-Module 2 | I-Module 1, I-Module 2 | A-Module 1, A-Module 2"

              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass(errors.title)}
            />
            {touched && errors.title && (
              <p className="text-red-600 text-sm mt-2">Module title is required</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xl font-bold mb-3 text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="What will students learn?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className={`${inputClass(errors.description)} resize-none`}
            />
            {touched && errors.description && (
              <p className="text-red-600 text-sm mt-2">Description is required</p>
            )}
          </div>

          {/* Order */}
          <div>
            <label className="block text-xl font-bold mb-3 text-gray-700">
              Display Order <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="1, 2, 3..."
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className={inputClass(errors.order)}
              min="1"
            />
            {touched && errors.order && (
              <p className="text-red-600 text-sm mt-2">Please enter a valid number (1 or higher)</p>
            )}
          </div>

          {/* Materials */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Learning Materials <span className="text-red-500">*</span>
            </h2>

            {materials.map((mat, i) => (
              <div key={i} className={materialBlockClass(i)}>
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Title (optional) */}
                  <input
                    type="text"
                    placeholder="Material title (optional)"
                    value={mat.title}
                    onChange={(e) => handleMaterialChange(i, "title", e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />

                  {/* Type */}
                  <select
                    value={mat.materialType}
                    onChange={(e) => handleMaterialChange(i, "materialType", e.target.value)}
                    className="cursor-pointer p-3 border border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                  >
                    <option value="video">Video</option>
                    <option value="pdf">PDF</option>
                    <option value="link">Link</option>
                    <option value="document">Document</option>
                  </select>

                  {/* URL */}
                  <div>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={mat.url}
                      onChange={(e) => handleMaterialChange(i, "url", e.target.value)}
                      className={materialInputClass(i)}
                    />
                    {touched && errors.materials[i] && (
                      <p className="text-red-600 text-xs mt-1">URL is required</p>
                    )}
                  </div>
                </div>

                {materials.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMaterialField(i)}
                    className="mt-4 text-red-600 hover:text-red-800 font-medium text-sm"
                  >
                    Remove Material
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addMaterialField}
              className="cursor-pointer w-full py-4 border-2 border-dashed border-blue-400 rounded-xl text-blue-600 font-bold hover:bg-blue-50 transition flex items-center justify-center gap-2"
            >
              <FiPlus size={20} /> Add Another Material
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full py-6 rounded-2xl text-2xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-700 hover:shadow-2xl transition disabled:opacity-60"
          >
            {loading ? "Creating Module..." : "Create Module"}
          </button>
        </form>
      </div>
    </div>
  );
}