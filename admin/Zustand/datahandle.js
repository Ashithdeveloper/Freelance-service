import { create } from "zustand";
import axiosInstance from "../axois";
import { toast } from "react-toastify";


const useDataStore = create((set) => ({
  projects: [],
  services: [],
  webContact: null,
  webcontent: null,
  setWebContact: (webContact) => set({ webContact }),
  setProjects: (projects) => set({ projects }),
  setService: (service) => set({ service }),
  setWebcontent: (webcontent) => set({ webcontent }),
  deleteProject: async (id) => {
    try {
      await axiosInstance.delete(`/deleteProject/${id}`);

      set((state) => ({
        projects: state.projects.filter((p) => p._id !== id),
      }));
      toast.success("Project deleted successfully");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  },
  editProject :async (id , data) =>{
    try {
      const res = await axiosInstance.put(`/editProject/${id}` , data);
      console.log("res", res.data);
       set((state) => ({
         projects: state.projects.map((p) =>
           p._id === id ? res.data.project : p,
         ),
       }));
       toast.success("Project updated successfully");
    } catch (error) {
      console.log(error);
    }
  },
  addProject : async (data) => {
    try {
      const res = await axiosInstance.post("/addProject", data);
      console.log("res", res.data);
      set((state) => ({
        projects: [...state.projects, res.data.project],
      }));
      toast.success("Project added successfully");
    } catch (error) {
      console.log(error);
    }
  }
}));

export default useDataStore