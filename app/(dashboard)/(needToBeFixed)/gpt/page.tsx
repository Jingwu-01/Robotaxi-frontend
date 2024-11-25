"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

export default function GPT() {
  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState<string>("");
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

    setIsLoading(true);
    setError(null);
    setResponse("");

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
      setResponse(data.message);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-8 py-8 w-full max-w-[96rem] mx-auto">
      <div className="mb-8">
          <h1 className="text-3xl text-gray-100 font-bold">
            Robotaxi GPT
          </h1>
      </div>

      <div className="grid grid-cols-12 gap-6">
          <div className="bg-gray-800 shadow rounded-lg p-6 col-span-12">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <textarea
                id="chatbox"
                name="chatbox"
                placeholder="Ask a question to Robotaxi GPT."
                value={message}
                onChange={handleChange}
                className="p-3 border border-gray-600 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                required
                rows={3}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-violet-600 text-gray-100 p-3 rounded-md hover:bg-violet-700 transition text-sm font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send"}
                </button>
              </div>
            </form>

            <div>
              {error && <div className="text-red-500">{error}</div>}
              {response && (
                <div className="p-4 text-gray-100 rounded-md">
                  {response}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}