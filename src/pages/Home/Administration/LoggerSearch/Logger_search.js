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

    setSearchParams();

    var paramsOpj = {
      pagination: params.get("pagination") | 0,
      "employee-name": employeeName,
      "application-type": applicationType,
      "action-type": actionType,
      "from-date": fromDate,
      "to-date": toDate,
      "application-id": applicationID,
    };
    for (var key in paramsOpj) {
      if (!paramsOpj[key]) {
        delete paramsOpj[key];
      }
    }
    setSearchParams(paramsOpj);

    let dataResult = data.data.result.auditLog;

    if (applicationID) {
      dataResult = dataResult.filter(
        (obj) =>
          obj.applicationId &&
          obj.applicationId.toString().includes(applicationID)
      );
    }
    if (applicationType) {
      dataResult = dataResult.filter(
        (obj) =>
          obj.applicationType &&
          obj.applicationType.toString().includes(applicationType)
      );
    }
    if (actionType) {
      dataResult = dataResult.filter(
        (obj) =>
          obj.actionType && obj.actionType.toString().includes(actionType)
      );
    }
    if (employeeName) {
      dataResult = dataResult.filter(
        (obj) =>
          obj.userAgent && obj.userAgent.toString().includes(employeeName)
      );
    }
    if (toDate) {
      dataResult = dataResult.filter(
        (obj) =>
          obj.creationTimestamp &&
          new Date(
            new Date(obj.creationTimestamp.split(" ")[0]).toLocaleDateString()
          ).valueOf() <=
            new Date(new Date(toDate).toLocaleDateString()).valueOf()
      );
    }
    if (fromDate) {
      dataResult = dataResult.filter(
        (obj) =>
          obj.creationTimestamp &&
          new Date(
            new Date(obj.creationTimestamp.split(" ")[0]).toLocaleDateString()
          ).valueOf() >=
            new Date(new Date(fromDate).toLocaleDateString()).valueOf()
      );
    }

    setData([...chunks(dataResult, 10)]);
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
