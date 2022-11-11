export interface UserDTO {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
};

export interface SupportDTO {
  text: string;
  url: string;
};

export interface GetPostsResponse {
  data: Array<UserDTO>,
  page: number,
  per_page: number,
  support: SupportDTO,
  total: number,
  total_pages: number,
};
