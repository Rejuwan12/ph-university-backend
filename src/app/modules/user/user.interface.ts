export type Tuser = {
  id: string;
  password: string;
  needsPasswordChange: string;
  role: 'admin' | 'user' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};
