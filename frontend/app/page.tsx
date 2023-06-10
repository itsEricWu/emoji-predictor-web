"use client";
import { useState } from "react";
import { saveAs } from "file-saver";
import toast, { Toaster } from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";

export default function Home() {
  const [text, setText] = useState("good morning!");

  const [emojiUrl, setEmojiUrl] = useState("");
  const [alt, setAlt] = useState("");

  const downloadImage = (url: string, filename: string) => {
    saveAs(url, filename);
    toast.success(`Saved as ${filename}.png`);
  };

  const copyToClipboard = (url: string, alt: string) => {
    if (url.includes("http")) {
      navigator.clipboard.writeText(
        `<img src="${url}" alt="${alt}" width="25" height="25" />`
      );
    } else {
      navigator.clipboard.writeText(url);
    }
    toast.success("Copied to clipboard!");
  };

  function handleSubmit() {
    console.log("submit");
    fetch("http://127.0.0.1:5000/get_emoji", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data["src"]);
        setEmojiUrl(data["src"]);
        setAlt(data["alt"]);
        console.log(emojiUrl);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 text-center gap-8 px-4">
      <h1 className="text-5xl lg:text-8xl md:text-6xl font-extrabold text-gray-700">
        Emoji Finder
      </h1>
      <p className="text-sm lg:text-base text-gray-600">
        Enter text to find the perfect emoji!
      </p>
      <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md">
        <TextareaAutosize
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          minRows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text..."
        />
      </div>
      <button
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        onClick={handleSubmit}
      >
        Find Emoji
      </button>
      {emojiUrl !== "" && (
        <div className="hover:scale-110">
          {emojiUrl.includes("http") ? (
            <img src={emojiUrl} alt={alt} width="250" height="250" />
          ) : (
            <span className="text-9xl">{emojiUrl}</span>
          )}
        </div>
      )}
      {emojiUrl !== "" && (
        <div className="flex gap-4">
          {emojiUrl.includes("http") && (
            <button
              className="w-full rounded-md bg-blue-500 p-2 transition hover:opacity-75"
              onClick={() => downloadImage(emojiUrl, alt)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M9.75 6.75h-3a3 3 0 00-3 3v7.5a3 3 0 003 3h7.5a3 3 0 003-3v-7.5a3 3 0 00-3-3h-3V1.5a.75.75 0 00-1.5 0v5.25zm0 0h1.5v5.69l1.72-1.72a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 111.06-1.06l1.72 1.72V6.75z"
                  clipRule="evenodd"
                />
                <path d="M7.151 21.75a2.999 2.999 0 002.599 1.5h7.5a3 3 0 003-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 01-4.5 4.5H7.151z" />
              </svg>
            </button>
          )}
          <button
            className="w-full rounded-md bg-blue-500 p-2 transition hover:opacity-75"
            onClick={() => copyToClipboard(emojiUrl, alt)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <Toaster />
        </div>
      )}
    </div>
  );
}
