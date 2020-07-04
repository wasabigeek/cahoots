import UserStore from "../store/UserStore";

const loginUser = ({ email, password }) => {
  const userStore = new UserStore();

  return userStore.login({ email, password });
}

export default loginUser;
