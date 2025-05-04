import React, { useState } from 'react'
import DeshboardHeader from '../components/Dashboard/DashboardHeader'
import DeshboardBody from '../components/Dashboard/Dashboardbody'

const Deshboard = ({currentUsers}) => {

  const [activeCompnent,setActiveComponent] = useState("")
  return (
    <div className="px-[30px] py-[20px] md:px-3 bg-gray-100 min-h-screen overflow-y-scroll flex flex-col md:flex-row  gap-8 ">
    <DeshboardHeader activeCompnent={activeCompnent}  setActiveComponent={setActiveComponent} />
    <DeshboardBody currentUser={currentUsers}  activeCompnent={activeCompnent}  setActiveComponent={setActiveComponent} />
    {/* <DeshboardBody currentUser={currentUsers} /> */}

    </div>
  )
}

export default Deshboard