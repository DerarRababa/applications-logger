import light from "../images/light.svg";
import dark from "../images/dark.svg";
import React, { useState, useEffect } from "react";
import { fetchData } from "../store/actions";
import { Outlet, Link ,useSearchParams} from "react-router-dom";

const LoggerSearch = ({ dates, dispatch }) => {
  const [mode, setMode] = useState("light");

  const [mainData, setData] = useState("");
  const [applicationsTypes,setApplicationsTypes ] = useState("")
  const [actionsTypes,setActionTypes ] = useState("")

  const [employeeName,setEmployeeName ] = useState("")

  const [applicationType,setApplicationType ] = useState("")

  const [actionType,setActionType ] = useState("")

  const [fromDate,setFromDate ] = useState("")

  const [toDate,setToDate ] = useState("")

  const [applicationID,setApplicationID ] = useState("")


  const [pagination, setPagination] = useState(0);


  const [searchParams, setSearchParams] = useSearchParams();

  

  const chandeMode = (userMode) => {
    document.documentElement.classList.remove(mode);
    document.documentElement.classList.add(userMode);
    setMode(userMode);
  };

  const handleChangeEmployeeName = e => {
    setEmployeeName(e.target.value);
};

const handleChangeApplicationType = e => {
  setApplicationType(e.target.value);
};

const handleChangeActionType = e => {
  setActionType(e.target.value);
};
const handleChangeFromDate= e => {
  setFromDate(e.target.value);
};
const handleChangeToDate = e => {
  setToDate(e.target.value);
};
const handleChangeApplicationID = e => {
  setApplicationID(e.target.value);
};

const handleSearch = ()=>{
  const params = new URLSearchParams(window.location.search);

  setSearchParams({pagination: params.get("pagination")|0,"employee-name":employeeName,"application-type":applicationType,"action-type":actionType,"from-date":fromDate,"to-date":toDate,"application-id":applicationID});
  filterMainData()
}


const filterMainData = ()=>{
  
  let data =  dates.data.result.auditLog
 
    if(applicationID){
      data = data.filter((obj)=>obj.applicationId && obj.applicationId.toString().includes(applicationID))
    }
    if(applicationType){
      data = data.filter((obj)=>obj.applicationType && obj.applicationType.toString().includes(applicationType))
    }
    if(actionType){
      data = data.filter((obj)=>obj.actionType && obj.actionType.toString().includes(actionType))
    }
    if(employeeName){
      data = data.filter((obj)=>obj.userAgent && obj.userAgent.toString().includes(employeeName))
    }
    if(toDate){
      data = data.filter((obj)=>obj.creationTimestamp &&( new Date( new Date(obj.creationTimestamp.split(' ')[0]).toLocaleDateString()).valueOf() <= new Date(new Date(toDate).toLocaleDateString()).valueOf() ))
    }
    if(fromDate){
      data = data.filter((obj)=>obj.creationTimestamp &&( new Date( new Date(obj.creationTimestamp.split(' ')[0]).toLocaleDateString()).valueOf() >= new Date(new Date(fromDate).toLocaleDateString()).valueOf() ))
    }


    setData([...chunks( data, 10)]);
}

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
    setPagination(parseInt(params.get("pagination"))|0);
    setApplicationID(params.get("application-id"));
    setEmployeeName(params.get("employee-name"));
    setToDate(params.get("to-date"));
    setFromDate(params.get("from-date"));
    setActionType(params.get("action-type"))
    setApplicationType(params.get("application-type"))

    if (dates) {
      setApplicationsTypes([...new Set( dates.data.result.auditLog.filter((obj)=> obj.applicationType != null).map((obj)=>obj.applicationType))])
      setActionTypes([...new Set( dates.data.result.auditLog.filter((obj)=> obj.actionType != null).map((obj)=>obj.actionType))])

      setData([...chunks( dates.data.result.auditLog, 10)]);
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


      <section className=" flex items-center flex-wrap justify-center">

      <div  className=" w-[150px] mr-4">
            <label for="employee_name" className="block mb-1 text-sm text-gray-900 dark:text-gray-300">Employee Name</label>
            <input value={employeeName} onChange={handleChangeEmployeeName} type="text" id="employee_name" className="block px-2  py-1 mb-6 w-full text-sm text-gray-500  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" />
        </div>

            <div className=" w-[150px] mr-4">
            <label for="small" className="block mb-1 text-sm text-gray-900 dark:text-gray-300">Application Type</label>
            <select value={applicationType}  onChange={handleChangeApplicationType}  id="small" className="block px-2  py-1 mb-6 w-full text-sm text-gray-500  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value=""></option>
            {actionsTypes
              ? actionsTypes.map((opject, i) => {
                  return (
                    <option value={opject}>{opject}</option>
                  );
                })
              :<option value="No Data">No Data</option>}
            </select>
            </div>

            <div className=" w-[150px] mr-4">
            <label for="small" className="block mb-1 text-sm text-gray-900 dark:text-gray-300">Action Type</label>
            <select  value={actionType}  onChange={handleChangeActionType}  id="small" className="block px-2  py-1 mb-6 w-full text-sm text-gray-500  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value=""></option>
            {actionsTypes
              ? actionsTypes.map((opject, i) => {
                  return (
                    <option value={opject}>{opject}</option>
                  );
                })
              :<option value="No Data">No Data</option>}
            </select>
            </div>


            <div  className=" w-[150px] mr-4">
            <label for="first_name" className="block mb-1 text-sm text-gray-900 dark:text-gray-300">From Date</label>
            <input  value={fromDate} onChange={handleChangeFromDate}  type="date" id="first_name" className="block px-2  py-1 mb-6 w-full text-sm text-gray-500  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             placeholder="Select date" />
        </div>
        <div  className=" w-[150px] mr-4">
            <label for="first_name" className="block mb-1 text-sm text-gray-900 dark:text-gray-300">To Date</label>
            <input value={toDate} onChange={handleChangeToDate} type="date" id="first_name" className="block px-2  py-1 mb-6 w-full text-sm text-gray-500  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             placeholder="Select date" />
        </div>

        <div  className=" w-[150px] mr-4">
            <label for="first_name" className="block mb-1 text-sm text-gray-900 dark:text-gray-300">Application ID</label>
            <input value={applicationID} onChange={handleChangeApplicationID} type="text" id="first_name" className="block px-2  py-1 mb-6 w-full text-sm text-gray-500  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             placeholder="Select date" />
        </div>

        <button   onClick={() => handleSearch()}   type="submit" className="text-white  w-[150px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search Logger </button>


      </section>
      

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
                  className="w-5 h-5"
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

export default LoggerSearch;
