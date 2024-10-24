import { create, StateCreator } from "zustand"
import { persist } from "zustand/middleware"

interface IChatUserStore {
    userSessionId: string
    setUserSessionId: (sessionId: string) => void
}

export const userStore: StateCreator<IChatUserStore> = (set) => ({
    userSessionId: "",
    setUserSessionId: (sessionId: string) => set({ userSessionId: sessionId }),
})

export const useUserStore = create<IChatUserStore>()(persist(userStore, { name: "user-session-id" }))
