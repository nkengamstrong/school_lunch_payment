import axios from "axios";

export const checkAuthentication = async () => {
  axios.defaults.withCredentials = true;
  try {
    const res = await axios.get("http://localhost:5000/auth");
    if (res.data.message === "Authenticated") {
      console.log("Auth ", res.data);
      return {
        isAuthenticated: true,
        name: res.data.name,
        parentId: res.data.parentId,
      };
    } else {
      return { isAuthenticated: false, name: "" };
    }
  } catch (err) {
    console.log(err);
    return { isAuthenticated: false, name: "" };
  }
};
