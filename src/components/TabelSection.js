
import arrow from "../images/up-arrow.svg";
import React, { useState, useEffect } from "react";



const TabelSection = (props) => {
   

    const [sortType,setSortType ] = useState("")



    const sortData = (sortType)=>{
        setSortType(sortType)
       props.sortData(sortType)
    }

 
return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="text-xs p-4 whitespace-nowrap text-gray-900 dark:text-white"
              >
                <p className="flex items-center">
               <span className="mr-1"> Log ID</span>
               <span onClick={() => sortData(sortType == 'AscendingLogID'?'DescendingLogID':'AscendingLogID')}  className=" cursor-pointer p-[2px] bg-blue-200 rounded-full w-3 h-3 flex justify-center items-center"> 
                     {
                        sortType == 'AscendingLogID' ? <img src={arrow} className="h-full" />:
                        sortType == 'DescendingLogID' ? <img src={arrow} className="h-full rotate-180" />:
                        <span className="w-[2px] h-[2px] bg-slate-500 rounded-full"></span>
                     }
                        
                </span>
                </p>
              </th>
              <th
                scope="col"
                className="text-xs p-4 whitespace-nowrap text-gray-900 dark:text-white"
              >
                <p className="flex items-center">
               <span className="mr-1"> Application Type</span>
               <span onClick={() => sortData(sortType == 'AscendingApplicationType'?'DescendingApplicationType':'AscendingApplicationType')}  className=" cursor-pointer p-[2px] bg-blue-200 rounded-full w-3 h-3 flex justify-center items-center"> 
                     {
                        sortType == 'AscendingApplicationType' ? <img src={arrow} className="h-full" />:
                        sortType == 'DescendingApplicationType' ? <img src={arrow} className="h-full rotate-180" />:
                        <span className="w-[2px] h-[2px] bg-slate-500 rounded-full"></span>
                     }
                        
                </span>
                </p>
              </th>

              <th
                scope="col"
                className="text-xs p-4 whitespace-nowrap text-gray-900 dark:text-white"
              >
                <p className="flex items-center">
               <span className="mr-1"> Application ID</span>
               <span onClick={() => sortData(sortType == 'AscendingApplicationID'?'DescendingApplicationID':'AscendingApplicationID')}  className=" cursor-pointer p-[2px] bg-blue-200 rounded-full w-3 h-3 flex justify-center items-center"> 
                     {
                        sortType == 'AscendingApplicationID' ? <img src={arrow} className="h-full" />:
                        sortType == 'DescendingApplicationID' ? <img src={arrow} className="h-full rotate-180" />:
                        <span className="w-[2px] h-[2px] bg-slate-500 rounded-full"></span>
                     }
                        
                </span>
                </p>
              </th>
              
              <th
                scope="col"
                className="text-xs p-4 whitespace-nowrap text-gray-900 dark:text-white"
              >
                <p className="flex items-center">
               <span className="mr-1"> Action</span>
               <span onClick={() => sortData(sortType == 'AscendingAction'?'DescendingAction':'AscendingAction')}  className=" cursor-pointer p-[2px] bg-blue-200 rounded-full w-3 h-3 flex justify-center items-center"> 
                     {
                        sortType == 'AscendingAction' ? <img src={arrow} className="h-full" />:
                        sortType == 'DescendingAction' ? <img src={arrow} className="h-full rotate-180" />:
                        <span className="w-[2px] h-[2px] bg-slate-500 rounded-full"></span>
                     }
                        
                </span>
                </p>
              </th>

              <th
                scope="col"
                className="text-xs p-4 whitespace-nowrap text-gray-900 dark:text-white"
              >
                 <p className="flex items-center">
               <span className="mr-1"> Action Details</span>
               <span onClick={() => sortData(sortType == 'AscendingActionDetails'?'DescendingActionDetails':'AscendingActionDetails')}  className=" cursor-pointer p-[2px] bg-blue-200 rounded-full w-3 h-3 flex justify-center items-center"> 
                     {
                        sortType == 'AscendingActionDetails' ? <img src={arrow} className="h-full" />:
                        sortType == 'DescendingActionDetails' ? <img src={arrow} className="h-full rotate-180" />:
                        <span className="w-[2px] h-[2px] bg-slate-500 rounded-full"></span>
                     }
                        
                </span>
                </p>
              </th>
            

              <th
                scope="col"
                className="text-xs p-4 whitespace-nowrap text-gray-900 dark:text-white"
              >
                <p className="flex items-center">
               <span className="mr-1">  Date : Time</span>
               <span onClick={() => sortData(sortType == 'AscendingDate'?'DescendingDate':'AscendingDate')}  className=" cursor-pointer p-[2px] bg-blue-200 rounded-full w-3 h-3 flex justify-center items-center"> 
                     {
                        sortType == 'AscendingDate' ? <img src={arrow} className="h-full" />:
                        sortType == 'DescendingDate' ? <img src={arrow} className="h-full rotate-180" />:
                        <span className="w-[2px] h-[2px] bg-slate-500 rounded-full"></span>
                     }
                        
                </span>
                </p>
              </th>
            
             
             
            </tr>
          </thead>
          <tbody>
            {props.mainData[props.pagination]
              ? props.mainData[props.pagination].map((opject, i) => {
                  return (
                    <tr
                      key={i}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td
                        scope="row"
                        className="text-xs p-4 whitespace-nowrap text-gray-900 dark:text-white  "
                      >
                        {opject.logId}
                      </td>
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
              :  <tr><td> NO Data</td></tr>}
          </tbody>
        </table>

)



}

export default TabelSection;











































 