export interface IAuth_admin_login {
  username: string;
  password: string;
}

export interface IAuth_admin_login_Res {
  status: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
  data: {
    user: {
      _id: string;
      firstname: string;
      lastname: string;
      username: string;
      password: string;
      phoneNumber: string;
      address: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      __v: number | 0;
      refreshToken: string;
    };
  };
}

export interface IAuth_user_signup {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  phoneNumber: string;
  address: string;
}

export interface IAuth_user_signup_Res {
  status: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
  data: {
    user: {
      firstname: string;
      lastname: string;
      username: string;
      password: string;
      phoneNumber: string;
      address: string;
      role: string;
      _id: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
      refreshToken: string;
    };
  };
}
