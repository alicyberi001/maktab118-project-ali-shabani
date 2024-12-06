export interface IUsers {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  phoneNumber: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUsersById {
  status: string;
  data: {
    user: {
      _id: string;
      firstname: string;
      lastname: string;
      username: string;
      phoneNumber: string;
      address: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  };
}
