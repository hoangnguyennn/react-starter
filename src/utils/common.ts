/** Thực hiện delay trong thời gian chỉ định */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
