import { Avatar } from "@mui/material";

function MessageBubble({ message = {} }) {
  return (
    <div className={`flex items-start w-full mb-1 `}>
      <div className="p-2 gap-3 flex w-full items-start justify-start ">
        <Avatar>A</Avatar>
        <div className="text-gray-200 w-full">
          <h2 className="mb-1 text-normal font-medium tracking-tight">
            {message.user}
          </h2>
          <p className="text-sm/tight tracking-wide">{message?.text}</p>
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;
