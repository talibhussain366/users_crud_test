import { ENDPOINTS } from '../../../types/endpoints';
import { useMutation } from '@tanstack/react-query';
import { axios } from '../../../utils/axios';
import { EditUserForm } from './types';

export const addUserAPI = async (data: EditUserForm) => {
  return axios.post(ENDPOINTS.USERS, data);
};

export const useAddUser = () => {
  return useMutation(addUserAPI);
};
