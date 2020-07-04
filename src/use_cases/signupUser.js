import UserStore from "../store/UserStore";

const signupUser = ({ email, password }) => {
  const userStore = new UserStore();

  return userStore.create({ email, password });
}

export default signupUser;
