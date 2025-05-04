import React from 'react'
import AddProduct from '../AddProduct'
import EditProducts from '../../components/Dashboard/EditProducts'
import ViewOrders from '../../components/Dashboard/ViewOrders'
import AddUser from '../../components/Dashboard/AddUser'
import EditUser from '../../components/Dashboard/EditUser'

const Dashboardbody = ({activeCompnent,setActiveComponent,currentUser}) => {
  return (

    <div className="w-full max-w-[1400px] flex flex-col  px-4 py-8">

<h1 className='text-5xl'>hi 
  <span className='animate-bounce inline-block'>👋🏼</span>
  {currentUser?.name ? ` ${currentUser?.name}` :"User"  }</h1>

    
    <div className="mt-10">
      {activeCompnent === "AddProduct"  && <AddProduct/>}
      {activeCompnent === "EditProducts"  && <EditProducts/>}
      {activeCompnent === "viewOrders"  && <ViewOrders/>}
      {activeCompnent === "addUser"  && <AddUser/>}
      {activeCompnent === "EditUser"  && <EditUser/>}
    </div>

{/* temp  */}
    {/* <AddProduct/> */}
{/* temp  */}

</div>
  )
}

export default Dashboardbody