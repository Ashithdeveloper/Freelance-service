import { create } from "zustand";
import axiosInstance from "../axois";


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
    } catch (error) {
      console.error("Delete failed:", error);
    }
  },
}));

export default useDataStore