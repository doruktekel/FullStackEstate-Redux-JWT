import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 12);
  } catch (error) {
    console.log(error);
  }
};

const comparePassword = async (password, clientPassword) => {
  try {
    return await bcrypt.compare(password, clientPassword);
  } catch (error) {
    console.log(error);
  }
};

export { hashPassword, comparePassword };
