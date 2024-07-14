import bcryptjs from "bcryptjs";

const hashPassword = async (password) => {
  try {
    return await bcryptjs.hash(password, 12);
  } catch (error) {
    console.log(error);
  }
};

const comparePassword = async (password, clientPassword) => {
  try {
    return await bcryptjs.compare(password, clientPassword);
  } catch (error) {
    console.log(error);
  }
};

export { hashPassword, comparePassword };
