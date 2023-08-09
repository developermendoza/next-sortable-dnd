import React from "react";
import Image from "next/image";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

function humanFileSize(size) {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    " " +
    ["B", "kB", "MB", "GB", "TB"][i]
  );
}

const FilePreview = ({ id, item, index, loadFile, remove, isDragging }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    zIndex: "50",
    WebkitUserDrag: "none",
    WebkitTouchCallout: "none",
    paddingTop: "100%",
    touchAction: "none",
    userDrag: "none", // Try this CSS property
    userSelect: "none", // Try this CSS property
  };

  return (
    <div
      key={index}
      className={`relative flex flex-col items-center overflow-hidden text-center bg-gray-100 border rounded  select-none `}
      style={style}
      ref={setNodeRef}
    >
      <button
        className="absolute top-0 right-0 z-50 p-1 bg-white rounded-bl focus:outline-none"
        type="button"
        onClick={() => remove(index)}
      >
        <svg
          className="w-4 h-4 text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
      <button
        {...listeners}
        {...attributes}
        className="absolute top-0 cursor-grab left-0 z-50 p-1 bg-white rounded-bl focus:outline-none"
        type="button"
      >
        <Image alt="drag" src="/images/drag.png" height={18} width={18} />
      </button>
      {item.file && item.file.type.includes("audio/") && (
        <svg
          className="absolute w-12 h-12 text-gray-400 transform top-1/2 -translate-y-2/3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
          />
        </svg>
      )}
      {(item.file && item.file.type.includes("application/")) ||
      (item.file && item.file.type === "") ? (
        <svg
          className="absolute w-12 h-12 text-gray-400 transform top-1/2 -translate-y-2/3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ) : null}

      {item.file && !isDragging && item.file.type.includes("image/") ? (
        <Image
          className="absolute inset-0 z-0 object-cover w-full h-full border-4 border-white preview"
          alt={item.file.name}
          src={loadFile(item.file)}
          placeholder="blur" // Use Next.js image optimization for placeholder blur
          blurDataURL={item.placeholderDataURL} // You'll need to generate this placeholder image yourself
          fill
        />
      ) : (
        <Image
          className="absolute inset-0 z-0 object-cover w-full h-full border-4 border-white preview"
          alt={item.name ? item.name : "placeholder"}
          src={item.url ? item.url : item.placeholderDataURL}
          placeholder="blur" // Use Next.js image optimization for placeholder blur
          blurDataURL={item.placeholderDataURL} // You'll need to generate this placeholder image yourself
          fill
        />
      )}

      {/* {item.file && item.file.type.includes("image/") ? (
        <Image
          className="absolute inset-0 z-0 object-cover w-full h-full border-4 border-white preview"
          alt={item.file.name}
          src={loadFile(item.file)}
          placeholder="blur" // Use Next.js image optimization for placeholder blur
          blurDataURL={item.placeholderDataURL} // You'll need to generate this placeholder image yourself
          fill
        />
      ) : (
        <Image
          className="absolute inset-0 z-0 object-cover w-full h-full border-4 border-white preview"
          alt={item.name}
          src={item.url}
          placeholder="blur" // Use Next.js image optimization for placeholder blur
          blurDataURL={item.placeholderDataURL} // You'll need to generate this placeholder image yourself
          fill
        />
      )} */}
      {item.file && item.file.type.includes("video/") ? (
        <video className="absolute inset-0 object-cover w-full h-full border-4 border-white pointer-events-none preview">
          <source src={loadFile(item.file)} type="video/mp4" />
        </video>
      ) : (
        <video className="absolute inset-0 object-cover w-full h-full border-4 border-white pointer-events-none preview">
          <source src={item.url} type="video/mp4" />
        </video>
      )}

      <div className="absolute bottom-0 left-0 right-0 flex flex-col p-2 text-xs bg-white bg-opacity-50">
        <span className="w-full font-bold text-gray-900 truncate">
          {item.name ? item.name : item.file.name}
        </span>
        {item.file && (
          <span className="w-full font-bold text-gray-900 truncate">
            {humanFileSize(item.file.size)}
          </span>
        )}
      </div>
    </div>
  );
};

export default FilePreview;
