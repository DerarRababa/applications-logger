
import React, { useState, useEffect } from "react";




const FiltrationsSection = (props) => {

    const [employeeName,setEmployeeName ] = useState("")

    const [applicationType,setApplicationType ] = useState("")
  
    const [actionType,setActionType ] = useState("")
  
    const [fromDate,setFromDate ] = useState("")
  
    const [toDate,setToDate ] = useState("")
  
    const [applicationID,setApplicationID ] = useState("")

    useEffect(() => { 
      const params = new URLSearchParams(window.location.search);
      params.get("application-id")?setApplicationID(params.get("application-id")):setApplicationID('');
      params.get("employee-name")?setEmployeeName(params.get("employee-name")):setEmployeeName('');
      params.get("to-date")?setToDate(params.get("to-date")):setToDate('');
      params.get("from-date")?setFromDate(params.get("from-date")):setFromDate('');
      params.get("action-type")?setActionType(params.get("action-type")):setActionType('');
      params.get("application-type")?setApplicationType(params.get("application-type")):setApplicationType('');
    }, []);
  
 
return (
    <section className=" flex items-center flex-wrap">

    <div  className=" w-[150px] mr-4 ">
          <label htmlFor="employee_name" className="block mb-1 text-xs text-gray-900 dark:text-gray-300">Employee Name</label>
          <input value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} type="text" id="employee_name" className="block px-2  py-1 mb-6 w-full text-xs text-gray-500  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" />
      </div>

          <div className=" w-[150px] mr-4 ">
          <label htmlFor="small" className="block mb-1 text-xs text-gray-900 dark:text-gray-300">Application Type</label>
          <select value={applicationType}  onChange={(e) => setApplicationType(e.target.value)}  id="small" className="block px-2  py-1 mb-6 w-full text-xs text-gray-500  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value=""></option>
          {props.applicationsTypes
            ? props.applicationsTypes.map((opject, i) => {
                return (
                  <option key={i} value={opject}>{opject}</option>
                );
              })
            :<option value="No Data">No Data</option>}
          </select>
          </div>

          <div className=" w-[150px] mr-4 ">
          <label htmlFor="small" className="block mb-1 text-xs text-gray-900 dark:text-gray-300">Action Type</label>
          <select  value={actionType}  onChange={(e) => setActionType(e.target.value)}  id="small" className="block px-2  py-1 mb-6 w-full text-xs text-gray-500  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value=""></option>
          {props.actionsTypes
            ? props.actionsTypes.map((opject, i) => {
                return (
                  <option  key={i+'ActionType'} value={opject}>{opject}</option>
                );
              })
            :<option value="No Data">No Data</option>}
          </select>
          </div>


          <div  className=" w-[150px] mr-4 ">
          <label htmlFor="first_name" className="block mb-1 text-xs text-gray-900 dark:text-gray-300">From Date</label>
          <input  value={fromDate}  onChange={ (e) => setFromDate(e.target.value)}  type="date" id="first_name" className="block px-2  py-1 mb-6 w-full text-xs text-gray-500  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           placeholder="Select date" />
      </div>
      <div  className=" w-[150px] mr-4 ">
          <label htmlFor="first_name" className="block mb-1 text-xs text-gray-900 dark:text-gray-300">To Date</label>
          <input value={toDate} onChange={(e) => setToDate(e.target.value)} type="date" id="first_name" className="block px-2  py-1 mb-6 w-full text-xs text-gray-500  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           placeholder="Select date" />
      </div>

      <div  className=" w-[150px] mr-4 ">
          <label htmlFor="first_name" className="block mb-1 text-xs text-gray-900 dark:text-gray-300">Application ID</label>
          <input value={applicationID} onChange={(e) => setApplicationID(e.target.value)} type="text" id="first_name" className="block px-2  py-1 mb-6 w-full text-xs text-gray-500  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           placeholder="Select date" />
      </div>

      <button   onClick={() => props.handleSearch(employeeName,applicationType,actionType,fromDate,toDate,applicationID)}   type="submit" className="text-white  w-[150px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search Logger </button>


    </section>
)



}

export default FiltrationsSection;











































 