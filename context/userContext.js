let currentUser = null;

const setCurrentUser = (user) => {
  currentUser = user;
}

const getCurrentUser = () => {
  return currentUser;
}

module.exports = { setCurrentUser, getCurrentUser };
