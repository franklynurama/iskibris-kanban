import React from 'react'
// import { Admin, Resource, EditGuesser, ShowGuesser } from "react-admin";
// import dataProvider from "./dataProvider";
// import { PostList } from "./posts";
import ApplicationsKanban from "./ApplicationsKanban";

export const App = () => {

  const [applications, setApplications] = React.useState<any>([])

  React.useEffect(() => {
    setApplications([
      {id: 1, name: "Dummy Applicant", status_id_enum: "NEW"},
      {id: 2, name: "Dummy Applicant 1", status_id_enum: "HIRED"},
      {id: 3, name: "Dummy Applicant 3", status_id_enum: "REJECTED"},
    ])
  }, [])

  const handleApplicationStatusUpdated = async (application: any, newStatus: any) => {
    console.log("Application changed: ", application, newStatus)
  }

  const handleApplicationPreview = (application: any) => {
    console.log("Application changed: ", application)
  }

  const columns = [
    {name: 'NEW', label: "New"},
    {name: 'REJECTED', label: "Rejected"},
    {name: 'HIRED', label: "Hired"},
  ]

  return (
    <ApplicationsKanban
      items={applications}
      columns={columns}
      onPreviewApplication={handleApplicationPreview}
      onApplicationStatusChanged={handleApplicationStatusUpdated}
    />
  )

  // return (
  //   <Admin dataProvider={dataProvider}>
  //     <Resource
  //       name="posts"
  //       list={PostList}
  //       edit={EditGuesser}
  //       show={ShowGuesser}
  //     />
  //   </Admin>
  // )
}

