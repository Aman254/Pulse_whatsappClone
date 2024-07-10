export const create_open_conversation = async (req, res, next) => {
  try {
    res.send("Hello Bhaio");
  } catch (error) {
    next(error);
  }
};
