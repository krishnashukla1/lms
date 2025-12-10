

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function ModuleView() {
  const { id } = useParams();
  const [moduleData, setModuleData] = useState(null);

  useEffect(() => {
    api.get(`/modules/${id}`)
      .then((res) => {
        setModuleData(res.data);
      })
      .catch((err) => {
        console.error("Error loading module", err);
      });
  }, [id]);

  if (!moduleData) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{moduleData.title}</h1>
      <p className="mt-2">{moduleData.description}</p>

      <h2 className="text-xl font-semibold mt-6">Materials</h2>

      <ul className="mt-3 space-y-2">
        {moduleData.materials?.map((item) => (
          <li key={item._id} className="border p-3 rounded">
            <strong>{item.type}</strong>:{" "}
            <a href={item.url} target="_blank" className="text-blue-600 underline">
              {item.url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
