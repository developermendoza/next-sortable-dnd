import React from "react";

const DataTable = ({ submitData, humanFileSize }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Is this a file?
            </th>
            <th scope="col" className="px-6 py-3">
              Size
            </th>
            <th scope="col" className="px-6 py-3">
              Location
            </th>
          </tr>
        </thead>
        <tbody>
          {submitData.map((data) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={data.id}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {data.file ? data.file.name : data.name}
              </th>
              <td>{data.file ? "Yes" : "No"}</td>
              <td className="truncate">
                {data.file
                  ? humanFileSize(data.file.size)
                  : humanFileSize(data.size)}
              </td>
              <td>{data.file ? null : data.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
