export const setSessionToken = (accesstoken: string, refreshToken: string) => {
  sessionStorage.setItem("accessToken", accesstoken);
  sessionStorage.setItem("refreshToken", refreshToken);
};

export const getSessionToken = () => {
  const atoken = sessionStorage.getItem("accessToken");
  const rtoken = sessionStorage.getItem("refreshToken");
  return {atoken, rtoken}
  
};

export const removeSessionToken = () => {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
};
