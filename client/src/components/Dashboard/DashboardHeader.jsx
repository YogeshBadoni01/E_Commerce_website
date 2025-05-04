import React, { useState } from "react";
import { headerSection } from "../../utils/data";
import { Link } from "@mui/material";

const DashboardHeader = ({activeCompnent,setActiveComponent}) => {
  const [open, setOpen] = useState(null);

  
  const handleClick = (e, inx) => {
    // e.preventDefault;
    e.preventDefault()
    setOpen(!open === inx ? null : inx);
  };

  return (
    <div className="border-r-8 py-5 ">
      <h1 className="font-bold text-4xl px-5"> Admin Menu</h1>
      <div className="mt-10 shadow-sm ">
        <ul className="flex flex-col text-2xl font-semibold gap-5 px-5 pb-6">
          {headerSection.map((item,inx) => (
            <li className="" key={item.names} onClick={(e) =>handleClick(e,inx)}>
              <Link href="#">{item.names}</Link>
              <ul className={`text-base p-2 ${open !== inx ? "hidden" : `block `}   `}>
                {item.items.map((element,i) => (
                    // {setActiveComponent(element[inx])}
                  <li key={i}>
                    <Link href="#" onClick={()=>{
                        setActiveComponent(element);
                         }}>{element}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
         
        </ul>
      </div>
    </div>
  );
};

export default DashboardHeader;
