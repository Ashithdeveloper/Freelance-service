import { create } from "zustand";


const useDataStore = create((set) => ({
    contact : null,
    projects : null,
    service : null,
    webcontent : null,
    setContact : (contact) => set({ contact }),
    setProjects : (projects) => set({ projects }),
    setService : (service) => set({ service }),
    setWebcontent : (webcontent) => set({ webcontent }),

}));

export default useDataStore