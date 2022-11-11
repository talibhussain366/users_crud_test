import { useState } from 'react';
import { NavBar } from 'app/components/NavBar';
import { PageWrapper } from 'app/components/PageWrapper';
import styled from 'styled-components/macro';
import { useGetUsers, useDeleteUser } from './requests';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { UserDTO } from './types';
import { Post } from './components/Post';
import { Title } from './components/Title';
import { Description } from './components/Description';
import { ActionsSection } from './components/ActionsSection';
import { Action } from './components/Action';

import { toast } from 'react-toastify';

export const HomePage = () => {
  const navigate = useNavigate();
  const [deletedIds, setDeletedIds] = useState<Array<number>>([]);
  const { data: users, isLoading: requestingUser, refetch } = useGetUsers();
  const { mutateAsync: deleteUser, isLoading: requestingDelete } =
    useDeleteUser();

  const handleDelete = async (id: number) => {
    deleteUser(id, {
      onSuccess: () => {
        toast('User deleted successfully');
        setDeletedIds([...deletedIds, id]);
        refetch();
      },
      onError: error => {
        if (error instanceof AxiosError) {
          toast(error.response?.data.message || 'Failed to delete user');
        }
      },
    });
  };

  const handleEdit = async (user: UserDTO) =>
    navigate('/edit-user', { state: user });

  return (
    <>
      <NavBar />
      <PageWrapper>
        <PageBody>
          All Users
          {requestingUser ? (
            <span>Loading...</span>
          ) : (
            users?.data
              .filter(user => !deletedIds.includes(user.id))
              .map((user, i) => (
                <Post key={i}>
                  <Title>{`${user.first_name}. ${user.last_name}`}</Title>
                  <Description>{user.email}</Description>
                  <ActionsSection>
                    <Action
                      onClick={() => handleDelete(user.id)}
                      disabled={requestingDelete}
                    >
                      Delete
                    </Action>
                    <Action onClick={() => handleEdit(user)}>Edit</Action>
                  </ActionsSection>
                </Post>
              ))
          )}
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
