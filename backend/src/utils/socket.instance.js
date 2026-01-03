let io;
export const setSocketInstance = (socket) => {
  io = socket;
};
export const getSocketInstance = () => {
  return io;
};
