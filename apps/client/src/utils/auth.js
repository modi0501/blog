import jwtDecode from "jwt-decode";
import { AUTH_TOKEN } from "../constants";
export const isLoggedIn = () => {
  // const token =
  //   JSON.parse(localStorage.getItem(AUTH_TOKEN))
  //   &&
  //   JSON.parse(localStorage.getItem(AUTH_TOKEN))["token"];
  //   console.log(token);
  if(!localStorage.getItem(AUTH_TOKEN)) return false;
  console.log(jwtDecode(localStorage.getItem(AUTH_TOKEN)));
  // if (!token) return false;
  if (jwtDecode(localStorage.getItem(AUTH_TOKEN)).exp < Date.now() / 1000) {
    console.log("===========Expired=============");
    localStorage.clear();
    return false;
  }
  console.log("===========Not Expired=============");
  return true;
};
