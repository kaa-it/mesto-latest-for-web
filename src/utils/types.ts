export type TUserData = {
  about: string;
  avatar: string;
  cohort: string;
  name: string;
  _id: string;
};

export type TCardData = {
  createdAt: string;
  likes: Array<TUserData>;
  link: string;
  name: string;
  owner: TUserData;
  _id: string;
};

export type TAuthData = {
  email: string;
  password?: string;
};

export type TAuthToken = {
  token: string
}