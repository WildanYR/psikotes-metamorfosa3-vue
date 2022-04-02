import sha1 from 'js-sha1'

export const hashObject = (object) => {
  const objValuesStr = Object.values(object).join('')
  return sha1(objValuesStr)
}

export const compareHashObject = (object, hash) => {
  const objValuesStr = Object.values(object).join('')
  const hashObj = sha1(objValuesStr)
  return hashObj === hash
}
