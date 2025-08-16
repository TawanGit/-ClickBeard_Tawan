import React from "react";
export type Props = {
  message: {
    text: string;
    type: "error" | "success";
  } | null;
};
function Message({ message }: Props) {
  return (
    <div>
      {message && (
        <div
          className={`mb-4 p-2 rounded text-center ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}

export default Message;
