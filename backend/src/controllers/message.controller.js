export const sendMessage = async (req, res, next) => {
  try {
    res.send("Hello from Send Message");
  } catch (error) {
    next(error);
  }
};

export const getMessage = async (req, res, next) => {
  try {
    res.send("Hello from Get Message");
  } catch (error) {
    next(error);
  }
};
