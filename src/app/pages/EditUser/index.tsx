import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { NavBar } from 'app/components/NavBar';
import { PageWrapper } from 'app/components/PageWrapper';
import { useAddUser } from './requests';
import { EditUserForm, UserDTO } from './types';
import { useLocation } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import styled from 'styled-components/macro';

export const EditUser = () => {
  const { state } = useLocation();
  const [user, setUser] = useState<UserDTO | any>(state);
  const { mutateAsync: addUser, isLoading: requestingPost } = useAddUser();

  useEffect(() => {
    setUser(state);
    // eslint-disable-next-line
  }, []);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<EditUserForm>({
    resolver: yupResolver(editUserSchema),
    defaultValues: user,
  });

  const handleUpdate = (data: EditUserForm) => {
    addUser(data, {
      onSuccess: () => {
        toast('User updated successfully');
        reset();
      },
      onError: error => {
        if (error instanceof AxiosError) {
          toast(error.response?.data.message || 'Failed to add user');
        }
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>Edit User</title>
        <meta name="description" content="Home Page" />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <PageBody>
          Edit User
          <PostForm>
            <InputWrapper>
              <Title placeholder="Enter name" {...register('first_name')} />
              {!!errors.first_name && (
                <Error>{errors.first_name.message}</Error>
              )}
            </InputWrapper>
            <InputWrapper>
              <Title placeholder="Enter email" {...register('email')} />
              {!!errors.email && <Error>{errors.email.message}</Error>}
            </InputWrapper>
            <ActionsSection>
              <Action
                onClick={handleSubmit(handleUpdate)}
                disabled={requestingPost}
              >
                Update
              </Action>
            </ActionsSection>
          </PostForm>
        </PageBody>
      </PageWrapper>
    </>
  );
};

const PageBody = styled.div`
  color: white;
  padding-top: 50px;
  font-size: 22px;
`;

const PostForm = styled.div`
  color: white;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid white;
  border-radius: 5px;
`;

const InputWrapper = styled.div`
  margin-top: 10px;
`;

const Title = styled.input`
  color: black;
  font-size: 15px;
  width: 100%;
  height: 40px;
`;

const ActionsSection = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
`;

const Error = styled.span`
  font-size: 12px;
  color: red;
`;

const Action = styled.button`
  font-size: 12px;
  cursor: pointer;
  margin-left: 5px;
  margin-top: 15px;
  padding: 5px 10px;
`;

const editUserSchema = Yup.object().shape({
  first_name: Yup.string().required('Name is required'),
  email: Yup.string().required('Email is required'),
});
