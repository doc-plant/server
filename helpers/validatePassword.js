module.exports = {
  lowerCase: function (password) {
    const lowerCase = new RegExp("^(?=.*[a-z])");
    return new Promise((resolve, reject) => {
      if (!lowerCase.test(password)) {
        reject(false)
      } else {
        resolve(true)
      }
    });
  },
  upperCase: function (password) {
    const upperCase = new RegExp("^(?=.*[A-Z])");
    return new Promise((resolve, reject) => {
      if (!upperCase.test(password)) {
        reject(false)
      } else {
        resolve(true)
      }
    });
  },
  numberCase: function (password) {
    const number = new RegExp("^(?=.*[0-9])");
    return new Promise((resolve, reject) => {
      if (!number.test(password)) {
        reject(false)
      } else {
        resolve(true)
      }
    });
  },
  specialCase: function (password) {
    const specialCase = new RegExp("^(?=.*[!@#\$%\^&])");
    return new Promise((resolve, reject) => {
      if (!specialCase.test(password)) {
        reject(false)
      } else {
        resolve(true)
      }
    });
  }
};