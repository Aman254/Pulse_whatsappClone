export const sendMessage = async (req, res, next) => {
  try {
    res.send("Helo from Send Message");
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    res.send("Hello from Get Messages");
  } catch (error) {
    next(error);
  }
};
