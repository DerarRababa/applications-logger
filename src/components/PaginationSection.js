
import {  Link } from "react-router-dom";



const PaginationSection = (props) => {
  
 
    return (
        <nav
        className="flex justify-between flex-col-reverse items-center pt-4 text-xs  whitespace-nowrap text-gray-900 dark:text-white
        bg-gray-50 dark:bg-gray-700 
        "
        aria-label="Table navigation"
      >
        <span className="text-sm mt-4 mb-2 font-normal">
          Showing{" "}
          <span className="font-semibold ">
            {props.pagination}-{props.mainData ? props.mainData.length : 0}
          </span>{" "}
          of{" "}
          <span className="font-semibold ">
            {props.data ? props.data.data.result.auditLog.length : 0}
          </span>
        </span>
        <ul className="inline-flex items-center -space-x-px">
          {props.pagination > 0 ? (
            <Link
              onClick={() => props.setPagination(props.pagination - 1)}
              to={"/?pagination=" + (props.pagination - 1)}
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

          {props.mainData
            ? props.mainData.map((number, i) => {
                return (
                  <li key={i + "pagination"}>
                    <Link
                      onClick={() =>  props.setPagination(i)}
                      to={"/?pagination=" + i}
                      className=" px-1 leading-tight text-gray-500  hover:text-blue-500"
                    >
                      {i + 1}
                    </Link>
                  </li>
                );
              })
            : "0"}

          {props.pagination < props.mainData.length - 1 ? (
            <Link
              onClick={() =>  props.setPagination(props.pagination + 1)}
              to={"/?pagination=" + (props.pagination + 1)}
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
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          ) : (
            ""
          )}
        </ul>
      </nav>
    )
    
    
    
    }
    
    export default PaginationSection;
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
     