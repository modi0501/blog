import * as bcrypt from "bcrypt";

const encrypt = async (password: string) => {
  return await bcrypt.hash(password, 2);
};

const verify = async (password: string, userPassword: any) => {
  return await bcrypt.compare(password, userPassword);
};

export default {
  encrypt,
  verify,
};
