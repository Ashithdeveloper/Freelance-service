import { create } from "zustand";
import axiosInstance from "../axois";
import { toast } from "react-toastify";

const useDataStore = create((set, get) => ({
  projects: [],
  services: [],
  webContact: null,
  webcontent: null,
  inquiries: [],
  inquiryStats: { total: 0, new: 0, in_discussion: 0, completed: 0 },
  loadingInquiries: false,

  setWebContact: (webContact) => set({ webContact }),
  setProjects: (projects) => set({ projects: Array.isArray(projects) ? projects : [] }),
  setService: (services) => set({ services: Array.isArray(services) ? services : [] }),
  setWebcontent: (webcontent) => set({ webcontent }),

  // Inquiries & Leads
  fetchInquiries: async (status = "all", search = "") => {
    try {
      set({ loadingInquiries: true });
      const res = await axiosInstance.get(`/inquiries?status=${status}&search=${encodeURIComponent(search)}`);
      if (res.data?.success) {
        set({
          inquiries: res.data.inquiries || [],
          inquiryStats: res.data.stats || { total: 0, new: 0, in_discussion: 0, completed: 0 },
        });
      }
    } catch (error) {
      console.warn("Fetch inquiries error:", error);
    } finally {
      set({ loadingInquiries: false });
    }
  },

  updateInquiryStatus: async (id, status) => {
    try {
      const res = await axiosInstance.put(`/inquiry/${id}`, { status });
      if (res.data?.success) {
        set((state) => ({
          inquiries: state.inquiries.map((inq) =>
            inq._id === id ? { ...inq, status } : inq
          ),
          inquiryStats: {
            ...state.inquiryStats,
            new: status === "new" ? state.inquiryStats.new + 1 : Math.max(0, state.inquiryStats.new - 1),
          },
        }));
        toast.success(`Inquiry status updated to ${status}`);
      }
    } catch (error) {
      console.error("Update inquiry status error:", error);
      toast.error("Failed to update inquiry status");
    }
  },

  deleteInquiry: async (id) => {
    try {
      const res = await axiosInstance.delete(`/inquiry/${id}`);
      if (res.data?.success) {
        set((state) => ({
          inquiries: state.inquiries.filter((inq) => inq._id !== id),
          inquiryStats: {
            ...state.inquiryStats,
            total: Math.max(0, state.inquiryStats.total - 1),
          },
        }));
        toast.success("Inquiry deleted successfully");
      }
    } catch (error) {
      console.error("Delete inquiry error:", error);
      toast.error("Failed to delete inquiry");
    }
  },

  // Projects CRUD
  deleteProject: async (id) => {
    try {
      await axiosInstance.delete(`/deleteProject/${id}`);
      set((state) => ({
        projects: state.projects.filter((p) => p._id !== id),
      }));
      toast.success("Project deleted successfully");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error(error.response?.data?.message || "Failed to delete project");
    }
  },

  editProject: async (id, data) => {
    try {
      const res = await axiosInstance.put(`/editProject/${id}`, data);
      set((state) => ({
        projects: state.projects.map((p) =>
          p._id === id ? res.data.project || { ...p, ...data } : p
        ),
      }));
      toast.success("Project updated successfully");
    } catch (error) {
      console.error("Edit failed:", error);
      toast.error(error.response?.data?.message || "Failed to update project");
    }
  },

  addProject: async (data) => {
    try {
      const res = await axiosInstance.post("/addProject", data);
      const newProj = res.data?.project || { ...data, _id: Date.now().toString() };
      set((state) => ({
        projects: [newProj, ...state.projects],
      }));
      toast.success("Project added successfully");
    } catch (error) {
      console.error("Add failed:", error);
      toast.error(error.response?.data?.message || "Failed to add project");
    }
  },

  // Web Content
  addWebContent: async (data) => {
    try {
      const res = await axiosInstance.post("/WebContent", data);
      set({
        webcontent: res.data?.webContent || data,
      });
      toast.success("Web Content saved successfully");
    } catch (error) {
      console.error("WebContent save failed:", error);
      toast.error(error.response?.data?.message || "Failed to save web content");
    }
  },

  // Services CRUD
  addService: async (data) => {
    try {
      const res = await axiosInstance.post("/addService", data);
      const newService = res.data?.service || { ...data, _id: Date.now().toString() };
      set((state) => ({
        services: [...state.services, newService],
      }));
      toast.success("Service added successfully");
    } catch (error) {
      console.error("Add service failed:", error);
      toast.error(error.response?.data?.message || "Failed to add service");
    }
  },

  editService: async (id, data) => {
    try {
      const res = await axiosInstance.put(`/editService/${id}`, data);
      set((state) => ({
        services: state.services.map((s) =>
          s._id === id ? res.data?.service || { ...s, ...data } : s
        ),
      }));
      toast.success("Service updated successfully");
    } catch (error) {
      console.error("Edit service failed:", error);
      toast.error(error.response?.data?.message || "Failed to update service");
    }
  },

  deleteService: async (id) => {
    try {
      await axiosInstance.delete(`/deleteService/${id}`);
      set((state) => ({
        services: state.services.filter((s) => s._id !== id),
      }));
      toast.success("Service deleted successfully");
    } catch (error) {
      console.error("Delete service failed:", error);
      toast.error(error.response?.data?.message || "Failed to delete service");
    }
  },

  // Web Contact
  updateWebContact: async (data) => {
    try {
      const res = await axiosInstance.post("/webContact", data);
      set({
        webContact: res.data?.webContact || data,
      });
      toast.success("Contact details updated successfully");
    } catch (error) {
      console.error("Contact update failed:", error);
      toast.error(error.response?.data?.message || "Failed to update contact");
    }
  },
}));

export default useDataStore;