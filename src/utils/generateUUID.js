export function generateUUID() {
  const ua = navigator.userAgent
  const nowTime = new Date().getTime()
  return `${ua}---${nowTime}`
}
