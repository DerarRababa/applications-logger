import light from "../images/light.svg";
import dark from "../images/dark.svg";
import React, { useState, useEffect } from "react";
import { fetchData } from "../store/actions";
import { Outlet, Link } from "react-router-dom";

const Appointments = ({ dates, dispatch }) => {
  const [mode, setMode] = useState("light");

  const [mainData, setData] = useState("");

  const [pagination, setPagination] = useState(0);

  const chandeMode = (userMode) => {
    document.documentElement.classList.remove(mode);
    document.documentElement.classList.add(userMode);
    setMode(userMode);
  };

  function* chunks(arr, n) {
    for (let i = 0; i < arr.length; i += n) {
      yield arr.slice(i, i + n);
    }
  }

  useEffect(() => {
    fetchData(dispatch);
  }, []);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPagination(parseInt(params.get("pagination")));

    if (dates) {
      let someArray = dates.data.result.auditLog;

      setData([...chunks(someArray, 10)]);
    }
  }, [dates]);

  return (
    <div className=" px-4">
      <header className="flex flex-row-reverse p-4">
         <img
            src={mode == "dark" ? dark : light}
            onClick={() => chandeMode(mode == "dark" ? "light" : "dark")}
            className="w-7 mx-2 cursor-pointer "
          />
      </header>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="text-xs p-4 whitespace-nowrap text-gray-900 dark:text-white"
              >
                Log ID
              </th>
              <th
                scope="col"
                className="text-xs p-4 whitespace-nowrap text-gray-900 dark:text-white"
              >
                Application Type
              </th>
              <th
                scope="col"
                className="text-xs p-4 whitespace-nowrap text-gray-900 dark:text-white"
              >
                Application ID
              </th>
              <th
                scope="col"
                className="text-xs p-4 whitespace-nowrap text-gray-900 dark:text-white"
              >
                Action
              </th>
              <th
                scope="col"
                className="text-xs p-4 whitespace-nowrap text-gray-900 dark:text-white"
              >
                Action Details
              </th>
              <th
                scope="col"
                className="text-xs p-4 whitespace-nowrap text-gray-900 dark:text-white"
              >
                Date : Time
              </th>
            </tr>
          </thead>
          <tbody>
            {mainData[pagination]
              ? mainData[pagination].map((opject, i) => {
                  return (
                    <tr
                      key={i}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="text-xs p-4 whitespace-nowrap text-gray-900 dark:text-white  "
                      >
                        {opject.logId}
                      </th>
                      <td className="text-xs p-4 whitespace-nowrap text-gray-900 dark:text-white">
                        {opject.applicationType}
                      </td>
                      <td className="text-xs p-4 whitespace-nowrap text-gray-900 dark:text-white">
                        {opject.applicationId}
                      </td>
                      <td className="text-xs p-4 whitespace-nowrap text-gray-900 dark:text-white">
                        {opject.actionType}
                      </td>
                      <td className="text-xs p-4 whitespace-nowrap text-gray-900 dark:text-white">
                        {opject.logInfo}
                      </td>
                      <td className="text-xs p-4 whitespace-nowrap text-gray-900 dark:text-white">
                        {opject.creationTimestamp}
                      </td>
                    </tr>
                  );
                })
              : "NO data"}
          </tbody>
        </table>

        <nav
          className="flex justify-between flex-col-reverse items-center pt-4 text-xs  whitespace-nowrap text-gray-900 dark:text-white
          bg-gray-50 dark:bg-gray-700 
          "
          aria-label="Table navigation"
        >
          <span className="text-sm mt-4 mb-2 font-normal">
            Showing{" "}
            <span className="font-semibold ">
              {pagination}-{mainData ? mainData.length : 0}
            </span>{" "}
            of{" "}
            <span className="font-semibold ">
              {dates ? dates.data.result.auditLog.length : 0}
            </span>
          </span>
          <ul className="inline-flex items-center -space-x-px">
            {pagination > 0 ? (
              <Link
                onClick={() => setPagination(pagination - 1)}
                to={"/?pagination=" + (pagination - 1)}
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            ) : (
              ""
            )}

            {mainData
              ? mainData.map((number, i) => {
                  return (
                    <li key={i + "pagination"}>
                      <Link
                        onClick={() => setPagination(i)}
                        to={"/?pagination=" + i}
                        className=" px-1 leading-tight text-gray-500  hover:text-blue-500"
                      >
                        {i + 1}
                      </Link>
                    </li>
                  );
                })
              : "0"}

            {pagination < mainData.length - 1 ? (
              <Link
                onClick={() => setPagination(pagination + 1)}
                to={"/?pagination=" + (pagination + 1)}
              >
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </Link>
            ) : (
              ""
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Appointments;
