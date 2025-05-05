type ChatMessageProps = {
  message: string;
  name: string;
  isSelf: boolean;
  hideName?: boolean;
};

export const ChatMessage = ({
  name,
  message,
  isSelf,
  hideName,
}: ChatMessageProps) => {
  return (
    <div className={`flex flex-col gap-1 ${hideName ? "pt-0" : "pt-6"}`}>
      {!hideName && (
        <div className={`text-${isSelf ? "black" : "black"} uppercase text-xs`}>
          {name}
        </div>
      )}
      <div
        className={`pr-4 text-sm whitespace-pre-line ${
          isSelf ? "bg-blue-600 text-white rounded-lg p-2" : "text-gray-400"
        }`}
      >
        {message}
      </div>
    </div>
  );
};
