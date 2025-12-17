
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
  const [selectedCourse, setSelectedCourse] = useState(""); // or "basic"

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
    `w-full p-4 border-2 rounded-xl text-lg focus:outline-none transition ${touched && hasError
      ? "border-red-500 bg-red-50"
      : "border-gray-300 focus:border-blue-500"
    }`;

  const materialInputClass = (index) =>
    `p-3 border rounded-lg transition ${touched && errors.materials[index]
      ? "border-red-500 bg-red-50"
      : "border-gray-300 focus:border-blue-500 focus:outline-none"
    }`;

  const materialBlockClass = (index) =>
    `bg-gray-50 rounded-2xl p-6 mb-6 border-2 transition ${touched && errors.materials[index] ? "border-red-300" : "border-gray-200"
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
          {/* <div>
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
          </div> */}


          {/* Course Type */}
          <div className="mb-6">
            <label className="block text-xl font-bold mb-3 text-gray-700">
              Course Type <span className="text-red-500">*</span>
            </label>

            <select
              value={selectedCourse}
              onChange={(e) => {
                const val = e.target.value;

                // update both states together
                setSelectedCourse(val);
                setCourseType(val);

                let prefix = "";
                if (val === "basic") prefix = "B-";
                if (val === "intermediate") prefix = "I-";
                if (val === "advanced") prefix = "A-";

                // update title prefix
                setTitle((prev) => {
                  const cleaned = prev.replace(/^(B-|I-|A-)/, "");
                  return prefix + cleaned;
                });
              }}
              className="cursor-pointer w-full p-4 border-2 border-gray-300 rounded-xl text-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select Course Type</option>
              <option value="basic">Basic Course</option>
              <option value="intermediate">Intermediate Course</option>
              <option value="advanced">Advanced Course</option>
            </select>
          </div>

          {/* Module Title */}
          <div>
            <label className="block text-xl font-bold mb-3 text-gray-700">
              Module Title <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="B-Module 1 | I-Module 1 | A-Module 1"
              value={title}
              onChange={(e) => {
                const input = e.target.value;

                const prefixMap = {
                  basic: "B-",
                  intermediate: "I-",
                  advanced: "A-",
                };

                const prefix = prefixMap[selectedCourse] || "";

                const cleaned = input.replace(/^(B-|I-|A-)/, "");
                setTitle(prefix + cleaned);
              }}
              className={inputClass(errors.title)}
            />

            {touched && errors.title && (
              <p className="text-red-600 text-sm mt-2">Module title is required</p>
            )}
          </div>



          {/* Title */}

          {/* 
          <div>
            <label className="block text-xl font-bold mb-3 text-gray-700">
              Module Title <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="B-Module 1 | I-Module 1 | A-Module 1"
              value={title}
              onChange={(e) => {
                const input = e.target.value;

                // prevent user from removing prefix
                const prefixMap = {
                  basic: "B-",
                  intermediate: "I-",
                  advanced: "A-",
                };

                const prefix = prefixMap[selectedCourse] || "";

                // always keep prefix at start
                const cleaned = input.replace(/^(B-|I-|A-)/, "");
                setTitle(prefix + cleaned);
              }}
              className={inputClass(errors.title)}
            />

            {touched && errors.title && (
              <p className="text-red-600 text-sm mt-2">Module title is required</p>
            )}
          </div> */}


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
            className="cursor-pointer w-full py-4 rounded-2xl text-2xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-700 hover:shadow-2xl transition disabled:opacity-60"
          >
            {loading ? "Creating Module..." : "Create Module"}
          </button>
        </form>
      </div>
    </div>
  );
}