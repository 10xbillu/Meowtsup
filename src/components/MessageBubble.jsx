import React from "react";
import { auth } from "../services/firebase.js";

function MessageBubble({ message = {} }) {
  return (
    <div
      className={`flex items-start w-full mb-1 ${
        message?.user === auth.currentUser.displayName
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div className="bg-gray-100 p-3 rounded-lg max-w-xs">
        <p className="text-sm text-gray-700">{message?.text}</p>
      </div>
    </div>
  );
}

export default MessageBubble;
