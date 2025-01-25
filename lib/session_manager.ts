// export const setSessionToken = (accesstoken: string, refreshToken: string) => {
//   sessionStorage.setItem("accessToken", accesstoken);
//   sessionStorage.setItem("refreshToken", refreshToken);
// };

// export const getSessionToken = () => {
//     const atoken = sessionStorage.getItem("accessToken");
//     const rtoken = sessionStorage.getItem("refreshToken");
//     return { atoken, rtoken };
// };

// export const removeSessionToken = () => {
//   sessionStorage.removeItem("accessToken");
//   sessionStorage.removeItem("refreshToken");
// };

import Cookies from "js-cookie"

export const setSessionToken = (accesstoken: string, refreshToken: string) => {
  Cookies.set("accessToken", accesstoken);
  Cookies.set("refreshToken", refreshToken);
};

export const getSessionToken = () => {
    const atoken = Cookies.get("accessToken");
    const rtoken = Cookies.get("refreshToken");
    return { atoken, rtoken };
};

export const removeSessionToken = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};
