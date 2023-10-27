import React, { Component } from "react";

// components
import Datatable from "./App";

// utilities
import makeData from "./makeInfo";

const data = makeData(20);

const columns = [
  {
    Header: "First Name",
    accessor: "firstName",
  },
  {
    Header: "Last Name",
    accessor: "lastName",
  },
  {
    Header: "Age",
    accessor: "age",
  },
  {
    Header: "Visits",
    accessor: "visits",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Profile Progress",
    accessor: "progress",
  },
];

class PeopleDataTable extends Component {
  // Loading must be handled here because DataTable MUST have data on load
  renderTable() {
    if (!data) {
      return <h1>Loading...</h1>;
    } else {
      return <Datatable data={data} columns={columns} />;
    }
  }

  render() {
    return <>{this.renderTable()}</>;
  }
}

export default PeopleDataTable;
