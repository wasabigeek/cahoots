import UserStore from "../store/UserStore";

const getCurrentUser = () => {
  const userStore = new UserStore();

  return new Promise(resolve => userStore.onCurrentUserChange(resolve));
}

export default getCurrentUser;
