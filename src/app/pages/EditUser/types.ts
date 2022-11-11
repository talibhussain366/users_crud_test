export type EditUserForm = {
  first_name: string;
  email: string;
};

export interface UserDTO {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
};
