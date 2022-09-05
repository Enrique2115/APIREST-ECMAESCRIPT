import bcrypt from "bcryptjs";

const { compare } = bcrypt;

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (inputPassword, passwordBD) =>
  await compare(inputPassword, passwordBD);
