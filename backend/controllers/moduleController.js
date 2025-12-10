import Module from "../models/Module.js";

// Add module
export const addModule = async (req, res) => {
  try {
    const moduleData = await Module.create(req.body);
    res.json({ message: "Module added", moduleData });
  } catch (err) {
    res.status(500).json({ message: "Error adding module", error: err.message });
  }
};

// Get all modules
export const getModules = async (req, res) => {
  try {
    const modules = await Module.find().sort({ order: 1 });
    res.json(modules);
  } catch (err) {
    res.status(500).json({ message: "Error fetching modules", error: err.message });
  }
};

// Get module by ID
export const getModuleById = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) return res.status(404).json({ message: "Module not found" });
    res.json({ module });
  } catch (err) {
    res.status(500).json({ message: "Error fetching module", error: err.message });
  }
};

// Update module
export const updateModule = async (req, res) => {
  try {
       console.log('UPDATE MODULE BODY:', JSON.stringify(req.body, null, 2)); // <--- add this
    const updatedModule = await Module.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedModule) return res.status(404).json({ message: "Module not found" });
    res.json({ message: "Module updated", updatedModule });
  } catch (err) {
    res.status(500).json({ message: "Error updating module", error: err.message });
  }
};

// Delete module
export const deleteModule = async (req, res) => {
  try {
    await Module.findByIdAndDelete(req.params.id);
    res.json({ message: "Module deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting module", error: err.message });
  }
};
