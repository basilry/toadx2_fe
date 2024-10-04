// "use client"
//
// import nProgress from "nprogress"
// import axiosInstance from "@lib/api/axiosInstance"
//
// const startLoading = (): nProgress.NProgress => nProgress.start()
// const endLoading = (): nProgress.NProgress => nProgress.done()

// export const callApi = (params: any): Promise<IResultSet> => {
//     return new Promise((resolve: (value: any) => void) => {
//         startLoading()
//         axiosInstance.post(postUrl, boundParams).then((res) => {
//             if (res?.data) {
//                 if (res.data.serverCode === "0") {
//                     endLoading()
//
//                     resolve(res.data)
//                 } else {
//                     endLoading()
//                     resolve({
//                         ...res.data,
//                         returnMessage: res.data.serverMessage,
//                     })
//                 }
//             }
//         })
//     })
// }
