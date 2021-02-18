import { readFileSync, writeFileSync } from 'fs';
import { StoredUserType } from '../../types/user';

const getUserList = () => {
  const usersBuffer = readFileSync('data/users.json');
  const usersString = usersBuffer.toString();

  if (!usersString) {
    return [];
  }

  const users: StoredUserType[] = JSON.parse(usersString);

  return users;
};

const existEmail = ({ email }: { email: string }): boolean => {
  const users = getUserList();

  return users.some((user) => user.email === email);
};

const saveUsers = async (users: StoredUserType[]) => {
  writeFileSync('data/users.json', JSON.stringify(users));
};

const findUser = ({ email, id }: { id?: number; email?: string }) => {
  const users = getUserList();

  return users.find((user) => user.email === email || user.id === id);
};

export default { getUserList, existEmail, saveUsers, findUser };
