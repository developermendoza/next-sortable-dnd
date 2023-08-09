"use client";
import React, { useState, useRef, useId, useEffect } from "react";
import createFileList from "create-file-list";
import FilePreview from "@/components/FilePreview";
import DropZone from "@/components/DropZone";
import { CSS } from "@dnd-kit/utilities";
import Resizer from "react-image-file-resizer";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import UseAnimations from "react-useanimations";
import loading2 from "react-useanimations/lib/loading2";
import FilePreviewLoader from "@/components/FilePreviewLoader";
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

function HomePage() {
  const [submitData, setSubmitData] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState({
    state: false,
    size: 0,
  });
  const [items, setItems] = useState([
    {
      id: 1,
      name: "item 1",
      url: "/images/item-1.jpeg",
      placeholderDataURL: "/images/no-image.jpg",
      isVisible: true,
    },
    {
      id: 2,
      name: "item 2",
      url: "/images/item-2.jpeg",
      placeholderDataURL: "/images/no-image.jpg",
      isVisible: true,
    },
    {
      id: 3,
      name: "item 3",
      url: "/images/item-3.jpeg",
      placeholderDataURL: "/images/no-image.jpg",
      isVisible: true,
    },
    // { id: 4, name: "item 4", url: "/images/item-4.jpeg", placeholderDataURL:"/images/no-image.jpg",isVisible: true  },
    // { id: 5, name: "item 5", url: "/images/item-5.jpeg", placeholderDataURL:"/images/no-image.jpg",isVisible: true },
    // { id: 6, name: "item 6", url: "/images/item-6.jpeg", placeholderDataURL:"/images/no-image.jpg",isVisible: true },
  ]);
  const dndRef = useRef(null);
  const uniqueId = uuidv4;

  const [isMounted, setIsMounted] = useState(false);
  const contextId = useId();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleDragStart = (event) => {
    setIsDragging(true);

    const { active, over } = event;

    // console.log("over: ", over);
    setItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === active.id ? { ...prevItem, isVisible: false } : prevItem
      )
    );
  };

  // function handleDragEnd(event) {
  //   const { active, over } = event;
  //   if (active && active.id !== over.id) {
  //     setItems((items) => {
  //       const oldIndex = items.findIndex((item) => item.id === active.id);
  //       const newIndex = items.findIndex((item) => item.id === over.id);

  //       return arrayMove(items, oldIndex, newIndex);
  //     });
  //   }
  // }

  function handleDragEnd(event) {
    const { active, over } = event;
    setIsDragging(false);
    setItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === active.id ? { ...prevItem, isVisible: true } : prevItem
      )
    );

    if (active && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const remove = (index) => {
    let updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const loadFile = (file) => {
    const previewElements = document.querySelectorAll(".preview");
    const blobUrl = URL.createObjectURL(file);

    previewElements.forEach((elem) => {
      elem.onload = () => {
        URL.revokeObjectURL(elem.src); // free memory
      };
    });

    return blobUrl;
  };

  const addFiles = async (e) => {
    const newFiles = [];
    setIsFileUploading({ state: true, size: e.target.files.length });
    try {
      for (const file of e.target.files) {
        const resizedFile = await resizeFile(file); // Resize each file
        newFiles.push({
          id: uniqueId(), // Replace this with your actual unique ID generation logic
          placeholderDataURL: "/images/no-image.jpg",
          file,
          url: resizedFile,
          isVisible: true,
          isFileUploading: true,
        });
      }

      setItems((prevItems) => [...prevItems, ...newFiles]);
    } catch (error) {
      console.log("error: ", error);
      setIsFileUploading({ state: false, size: 0 });
    } finally {
      setIsFileUploading({ state: false, size: 0 });
    }
  };

  const onDrop = async (e) => {
    e.preventDefault();

    dndRef.current.classList.remove("border-blue-400");
    dndRef.current.classList.remove("ring-4");
    dndRef.current.classList.remove("ring-inset");

    // Extract the files from the DataTransfer object and create a custom array
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (file) => file instanceof File
    );
    setIsFileUploading({ state: true, size: droppedFiles.length });
    const newFiles = [];

    try {
      for (const file of droppedFiles) {
        const resizedFile = await resizeFile(file); // Resize each file
        newFiles.push({
          id: uniqueId(), // Replace this with your actual unique ID generation logic
          placeholderDataURL: "/images/no-image.jpg",
          file,
          url: resizedFile,
          isVisible: true,
        });
      }

      setItems((prevItems) => [...prevItems, ...newFiles]);
    } catch (error) {
      console.log("error: ", error);
      setIsFileUploading({ state: false, size: 0 });
    } finally {
      setIsFileUploading({ state: false, size: 0 });
    }
  };

  const onDragEnter = (e) => {
    e.preventDefault();
    dndRef.current.classList.add("border-blue-400");
    dndRef.current.classList.add("ring-4");
    dndRef.current.classList.add("ring-inset");
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    dndRef.current.classList.remove("border-blue-400");
    dndRef.current.classList.remove("ring-4");
    dndRef.current.classList.remove("ring-inset");
  };

  const handleSubmit = () => {
    setSubmitData(items);
  };

  console.log("items: ", items);

  return (
    <div className="bg-white p7 rounded w-9/12 mx-auto">
      <div className="relative flex flex-col p-4 text-gray-400 border border-gray-200 rounded">
        <DropZone
          dndRef={dndRef}
          onDrop={onDrop}
          onDragLeave={onDragLeave}
          onDragEnter={onDragEnter}
          addFiles={addFiles}
        />
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          id={contextId}
        >
          {items.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-3 lg:grid-cols-4">
              <SortableContext items={items}>
                {items.map((item, index) => (
                  <FilePreview
                    key={item.id}
                    id={item.id}
                    index={index}
                    item={item}
                    remove={remove}
                    loadFile={loadFile}
                    isDragging={isDragging}
                  />
                ))}
              </SortableContext>
              {isFileUploading.state &&
                Array.from({ length: isFileUploading.size }, (_, index) => (
                  <FilePreviewLoader key={index} />
                ))}
            </div>
          )}
        </DndContext>
      </div>
      <div className="text-center my-4">
        <button
          type="button"
          onClick={handleSubmit}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-bold rounded-lg text-sm px-10 py-5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          SUBMIT
        </button>
      </div>
      <ul>
        {submitData && (
          <>
            <b>Data:</b>
            {submitData.map((data) => (
              <li key={data.id}>{data.file ? data.file.name : data.url}</li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
}

export default HomePage;
