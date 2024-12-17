"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function GPT() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (message.trim() === "") return;

    // Add user's message to messages array
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: message },
    ]);

    // Clear the message input
    setMessage("");

    setIsLoading(true);
    setError(null);

    try {
      const res: Response = await fetch("http://localhost:5001/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const data: { message: string } = await res.json();

      // Add assistant's response to messages array
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: data.message },
      ]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        // Optionally, add error message to messages array
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: `Error: ${err.message}` },
        ]);
      } else {
        setError("An unexpected error occurred.");
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: "An unexpected error occurred." },
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-8 py-8 w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl text-gray-100 font-bold">Robotaxi GPT</h1>
      </div>

      <div className="bg-gray-800 shadow rounded-lg p-6 flex flex-col h-[85vh]">
        <div className="flex-1 overflow-y-auto mb-4">
          <div className="flex flex-col space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex text-sm ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg p-3 max-w-xs md:max-w-md text-sm ${
                    msg.role === "user"
                      ? "bg-violet-600 text-white"
                      : "bg-gray-700 text-gray-100"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex">
          <textarea
            id="chatbox"
            name="chatbox"
            placeholder="Ask a question to Robotaxi GPT."
            value={message}
            onChange={handleChange}
            className="flex-1 p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-700 text-white resize-none"
            required
            rows={1}
          />
          <button
            type="submit"
            className="ml-4 bg-violet-600 text-gray-100 p-3 rounded-md hover:bg-violet-700 transition text-sm font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
    </div>
  );
}
