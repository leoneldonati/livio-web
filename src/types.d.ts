type Asset = {
  secureUrl: string;
  publicId: string;
  width: number;
  height: number;
};
type Location = {
  country: string;
  city: string;
};
type Follower = {
  _id: string;
  name: string;
  avatar: Asset | null;
};

export interface User {
  _id: string;
  email: string;
  password: string;
  name: string;
  username: string;
  created: string;
  modified: string;
  headerPhoto: null | Asset;
  avatar: null | Asset;
  bio: string | null;
  webSite: string | null;
  othersLinks: null | string[];
  location: Location | null;
  bornDate: string | null;
  followers: Follower[];
  followed: Follower[];
}


export interface Post {}
