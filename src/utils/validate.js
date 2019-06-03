/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return str.length > 5 // && valid_map.indexOf(str.trim()) >= 0
}

export function isvalidEmail(str) {
  let regex = /^[a-zA-z0-9]+@[a-zA-z0-9]+\.[a-zA-z0-9]+$/g
  return regex.test(str)
}
