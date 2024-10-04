import { create } from "zustand/react"

interface IChatUserStore {
    chatUser: {
        chatUser: any
    }
    setChatUser: (chatUser: any) => void
}

export const useChatUserStore = create<IChatUserStore>((set) => ({
    chatUser: {
        chatUser: null,
    },
    setChatUser: (chatUser): void => {
        set({
            chatUser: {
                chatUser,
            },
        })
    },
}))
