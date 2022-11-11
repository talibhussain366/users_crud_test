import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { NavBar } from 'app/components/NavBar';
import { PageWrapper } from 'app/components/PageWrapper';
import { useAddUser } from './requests';
import { AddUserForm } from './types';
import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import styled from 'styled-components/macro';

export const AddPost = () => {
  const navigate = useNavigate();
  const { mutateAsync: addUser, isLoading: requestingPost } = useAddUser();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<AddUserForm>({
    resolver: yupResolver(addUserSchema),
  });

  const handleSave = (data: AddUserForm) => {
    addUser(data, {
      onSuccess: () => {
        toast('User added successfully');
        reset();
        navigate('/');
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
      <NavBar />
      <PageWrapper>
        <PageBody>
          Add User
          <PostForm>
            <InputWrapper>
              <Title placeholder="Enter name" {...register('name')} />
              {!!errors.name && <Error>{errors.name.message}</Error>}
            </InputWrapper>
            <InputWrapper>
              <Description placeholder="Enter job" {...register('job')} />
              {!!errors.job && <Error>{errors.job.message}</Error>}
            </InputWrapper>
            <ActionsSection>
              <Action
                onClick={handleSubmit(handleSave)}
                disabled={requestingPost}
              >
                Save
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

const Description = styled.textarea`
  color: black;
  font-size: 12px;
  width: 100%;
  min-height: 70px;
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
  padding: 5px 10px;
`;

const addUserSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  job: Yup.string().required('Job is required'),
});
