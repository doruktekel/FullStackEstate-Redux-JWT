import bcryptjs from "bcryptjs";

const hashPassword = async (password) => {
  try {
    return await bcryptjs.hash(password, 12);
  } catch (error) {
    console.log(error);
  }
};

const comparePassword = async (password, clientPassword) => {
  return await bcryptjs.compare(password, clientPassword);
};

export { hashPassword, comparePassword };
