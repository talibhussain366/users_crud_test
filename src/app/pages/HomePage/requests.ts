import { ENDPOINTS } from '../../../types/endpoints';
import { useQuery, useMutation } from '@tanstack/react-query';
import { axios } from '../../../utils/axios';

export const getUsersAPI = () => {
  return axios.get(ENDPOINTS.USERS);
};

export const useGetUsers = () => {
  return useQuery(['users'], () => getUsersAPI());
};

export const deleteUserAPI = async (id: number) => {
  return axios.delete(`${ENDPOINTS.USERS}/${id}`);
};

export const useDeleteUser = () => {
  return useMutation(deleteUserAPI);
};
