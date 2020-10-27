module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === '') {
    errors.username = 'Hmmm... you forgot a username.';
  }
  if (email.trim() === '') {
    errors.email = 'Uh oh, you forgot your email!';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = `Email typo detected... we're looking for something like "johnsmith@gmail.com"`;
    }
  }
  if (password === '') {
    errors.password =
      'Empty passwords are too easy to hack. Pick something with at least 1 character.';
  } else if (password !== confirmPassword) {
    errors.confirmPassword =
      'Dang... there was a typo in your confirm password field. Try again.';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
