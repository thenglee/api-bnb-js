const isValidEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/
  return regEx.test(email)
}

const isEmpty = (input) => {
  if (input === undefined || input === '') {
    return true
  }
  return false
}

export {
  isValidEmail,
  isEmpty
}