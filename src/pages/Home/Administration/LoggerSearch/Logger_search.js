import React, { useState, useEffect } from "react";
import { fetchData } from "../../../../store/actions";
import { useSearchParams } from "react-router-dom";

import FiltrationsSection from "../../../../components/FiltrationsSection";
import TabelSection from "../../../../components/TabelSection";
import PaginationSection from "../../../../components/PaginationSection";

const LoggerSearch = ({ data, dispatch }) => {
  const [mainData, setData] = useState("");
  const [applicationsTypes, setApplicationsTypes] = useState("");
  const [actionsTypes, setActionTypes] = useState("");

  const [pagination, setPagination] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (
    employeeName,
    applicationType,
    actionType,
    fromDate,
    toDate,
    applicationID
  ) => {
    const params = new URLSearchParams(window.location.search);

    setSearchParams({
      pagination: params.get("pagination") | 0,
      "employee-name": employeeName,
      "application-type": applicationType,
      "action-type": actionType,
      "from-date": fromDate,
      "to-date": toDate,
      "application-id": applicationID,
    });

    let data = data.data.result.auditLog;

    if (applicationID) {
      data = data.filter(
        (obj) =>
          obj.applicationId &&
          obj.applicationId.toString().includes(applicationID)
      );
    }
    if (applicationType) {
      data = data.filter(
        (obj) =>
          obj.applicationType &&
          obj.applicationType.toString().includes(applicationType)
      );
    }
    if (actionType) {
      data = data.filter(
        (obj) =>
          obj.actionType && obj.actionType.toString().includes(actionType)
      );
    }
    if (employeeName) {
      data = data.filter(
        (obj) =>
          obj.userAgent && obj.userAgent.toString().includes(employeeName)
      );
    }
    if (toDate) {
      data = data.filter(
        (obj) =>
          obj.creationTimestamp &&
          new Date(
            new Date(obj.creationTimestamp.split(" ")[0]).toLocaledatatring()
          ).valueOf() <=
            new Date(new Date(toDate).toLocaledatatring()).valueOf()
      );
    }
    if (fromDate) {
      data = data.filter(
        (obj) =>
          obj.creationTimestamp &&
          new Date(
            new Date(obj.creationTimestamp.split(" ")[0]).toLocaledatatring()
          ).valueOf() >=
            new Date(new Date(fromDate).toLocaledatatring()).valueOf()
      );
    }

    setData([...chunks(data, 10)]);
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
    setPagination(parseInt(params.get("pagination")) | 0);

    if (data) {
      setApplicationsTypes([
        ...new Set(
          data.data.result.auditLog
            .filter((obj) => obj.applicationType != null)
            .map((obj) => obj.applicationType)
        ),
      ]);
      setActionTypes([
        ...new Set(
          data.data.result.auditLog
            .filter((obj) => obj.actionType != null)
            .map((obj) => obj.actionType)
        ),
      ]);

      setData([...chunks(data.data.result.auditLog, 10)]);
    }
  }, [data]);

  return (
    <div>
      <FiltrationsSection
        handleSearch={handleSearch}
        applicationsTypes={applicationsTypes}
        actionsTypes={actionsTypes}
      />

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <TabelSection mainData={mainData} pagination={pagination} />
        <PaginationSection
          setPagination={setPagination}
          mainData={mainData}
          pagination={pagination}
          data={data}
        />
      </div>
    </div>
  );
};

export default LoggerSearch;
