function MessageItem({ message }) {
  return (
    <>
      <div key={message.id} className="flex py-2 items-center justify-start ">
        <div className="w-10 mr-4 bg-neutral-600 flex items-center justify-center text-normal capitalize font-semibold h-10 rounded-full">
          {message.sender.name[0]}
        </div>
        <div>
          <p className="text-lg text-neutral-200 font-semibold tracking-normal">
            {message.sender.name}
          </p>
          <p className="text-neutral-100 tracking-tight text-sm">
            {message.text}
          </p>
        </div>
      </div>
    </>
  );
}

export default MessageItem;
