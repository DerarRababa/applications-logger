



const TabelSection = (props) => {
  
 
return (
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











































 