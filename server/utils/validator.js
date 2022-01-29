const { password } = require("pg/lib/defaults");

// check register valid
const creatUserValidator = (name, email, password) => {
  const errorMsg = {};
  if (name.trim() === "") {
    errorMsg.name = "No Name";
  }
  if (email.trim() === "") {
    errorMsg.email = "No Email";
  } else {
    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      errorMsg.email = "Not Valid Email Address";
    }
  }
  if (password.trim() === "") {
    errorMsg.password = "No Password";
  } else {
    if ([...password].length < 6) {
      errorMsg.password = "Password Must more than 6";
    }
  }
  return {
    valid: Object.keys(errorMsg).length < 1,
    errorMsg,
  };
};
// check login validator
const loginValidator = (email, password) => {
  const errorMsg = {};
  if (email.trim() === "") {
    errorMsg.email = "No Email";
  } else {
    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      errorMsg.email = "Not Valid Email Address";
    }
  }
  if (password.trim() === "") {
    errorMsg.password = "No Password";
  }
  return {
    valid: Object.keys(errorMsg).length < 1,
    errorMsg,
  };
};

// const postValidator = (post) => {
//   const errorMsg = {}
//   if(post.trim() === 0){
//     errorMsg.post = 'No post'
//   }
//   return {
//     valid: Object.keys(errorMsg).length < 1,
//     errorMsg,
//   };
// }

module.exports = { creatUserValidator, loginValidator };
