export const normalizeCardNumber = (value) => {
  return value
    .replace(/\D/g, "")
    .match(/.{1,4}/g)
    ?.join(" ")
    .substr(0, 19) || ""
}

export const normalizeCardCode = (value) => {
  return value
    .replace(/\D/g, "")
    .substr(0, 3) || ""
}

export const normalizeCardDate = (value) => {
  const v = value.replace(/\D/g, "").substr(0,6)
  if (!v) return ""
  if (v[0]!=="0" && v[0]!=="1") return ""
  if (v[1]) {
    if(v[0]==="0" && !["1","2","3","4","5","6","7","8","9"].includes(v[1])) return "0"
    if(v[0]==="1" && !["0","1","2"].includes(v[1])) return "1"
  } else return v[0]

  const month = v.slice(0,2)
  const year = v.slice(2,6)
  const today = new Date()
  if (year.length < 4 || (+month < today.getMonth() && +year===today.getFullYear()) ) return month + "/202"

  return month + "/" + year
}

export const normalizeCardHolder= (value) => {
  return  value.replace(/[^a-z\s]/gi, "").replace(/\s{2,}/g, " ").toUpperCase()
}
