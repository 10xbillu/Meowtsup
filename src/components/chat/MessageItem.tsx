import type { Message } from "@/types/firestore";
import { Avatar } from "../ui";

function MessageItem({ message }: Message) {
  return (
    <div key={message.id} className="flex py-3 items-start space-x-4">
      <Avatar value={message.sender.name[0].toUpperCase()} />

      {/* Message content */}
      <div className="flex flex-col">
        <p className="text-sm font-semibold text-neutral-200 capitalize">
          {message.sender.name}
        </p>
        <p className="text-sm text-neutral-100 mt-1">{message.text}</p>
      </div>
    </div>
  );
}

export default MessageItem;
