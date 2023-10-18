import React, {useState} from 'react'
import { Box, useMediaQuery} from "@mui/material"
import { Outlet } from "react-router-dom"
import { useSelector } from 'react-redux'
import Navbar from "components/Navbar"
import Sidebar from "components/Sidebar"
import { useGetUserQuery } from 'state/api' //Importing api call query from the api.js file.

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)"); //Returns true if the website is being viewed on non mobile devices
  const [isSideBarOpen, setIsSidebarOpen] = useState(true); //Sets sidebar is open at default
  const userId = useSelector((state) => state.global.userId); //Getting user id
  const { data } = useGetUserQuery(userId); //Passing it to the api in order to get data
  
  return (
    <Box display="flex" width="100%" height="100%">
      <Sidebar
        user={data || {}}
        isNonMobile = {isNonMobile}
        drawerWidth = "250px"
        isSideBarOpen= {isSideBarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      /> 
      <Box flexGrow={1}> {/* flex grow allows to push items in the corner of the viewport */}
        <Navbar 
          user={data || {}}
          isSideBarOpen = {isSideBarOpen}
          setIsSidebarOpen = {setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout