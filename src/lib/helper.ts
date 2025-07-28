export const chatExists = (chats, participants) => {
  return !chats.every((chat) => chat.participants === participants.sort());
};
