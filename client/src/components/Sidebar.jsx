import React from 'react'
import { 
    Box, //Component like division which allows inline css
    Divider, 
    Drawer, //Drawer component from mui that opens and close on click.(sidebar)
    IconButton, //Button component with custom icon
    List, //List components including item, button, icon and text.
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material" ; //Importing components from MUI

import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined
} from "@mui/icons-material" ; //Importing icons from MUI

import {useEffect, useState} from 'react'
import { useLocation, useNavigate} from 'react-router-dom'
import FlexBetween from './FlexBetween';
import profileImage from 'assets/profile.jpeg';

//For items in sidebar, we create an array of objects that has a text and icon related to the item.
//Instead of manually adding all the items, we loop through this array using map function of react and render it on screen
const navItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />
    },
    {
        text: "Client Facing",
        icon: null
    },
    {
        text: "Products",
        icon: <ShoppingCartOutlined />
    },
    {
        text: "Customers",
        icon: <Groups2Outlined />
    },
    {
        text: "Transactions",
        icon: <ReceiptLongOutlined />
    },
    {
        text: "Geography",
        icon: <PublicOutlined />
    },
    {
        text: "Sales",
        icon: null
    },
    {
        text: "Overview",
        icon: <PointOfSaleOutlined />
    },
    {
        text: "Daily",
        icon: <TodayOutlined />
    },
    {
        text: "Monthly",
        icon: <CalendarMonthOutlined />
    },
    {
        text: "Breakdown",
        icon: <PieChartOutlined/>
    },
    {
        text: "Management",
        icon: null
    },
    {
        text: "Admin",
        icon: <AdminPanelSettingsOutlined/>
    },
    {
        text: "Performance",
        icon: <TrendingUpOutlined />
    }
];


const Sidebar = ({
    user, //From database to use its attributes.
    drawerWidth,
    isSideBarOpen,
    setIsSidebarOpen,
    isNonMobile
}) => {
    const { pathname } = useLocation(); //For current location i.e page we are on
    const [active, setActive] = useState("");
    const navigate = useNavigate(); //To navigate where the user clicks
    const theme = useTheme();
    useEffect(() => {
        setActive(pathname.substring(1)); //Where the user clicks, pathname is rendered
    }, [pathname])

  return (
    <Box component="nav">
      {isSideBarOpen && ( //If side bar is open
        <Drawer //Drawer component from MUI
         open={isSideBarOpen}
         onClose={() => setIsSidebarOpen(false)}
         variant='persistent'
         anchor='left'
         sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": { //Custom css
                color: theme.palette.secondary[200],
                backgroundColor: theme.palette.background.alt,
                boxSizing: "border-box",
                borderWidth: isNonMobile ? 0 : "2px",
                width: drawerWidth
            }
         }}
        >
            <Box width="100%">
                <Box m="1.5rem 2rem 2rem 3rem">
                    <FlexBetween color={theme.palette.secondary.main}>
                        <Box display="flex" alignItems="center" gap="0.5rem">
                            <Typography variant="h4" fontWeight="bold">
                                CEO DashBoard
                            </Typography>
                        </Box>
                        { !isNonMobile && (
                            <IconButton onClick={() => setIsSidebarOpen(!isSideBarOpen)}>
                                <ChevronLeft />
                            </IconButton>
                        )}
                    </FlexBetween>
                </Box>
                <List>
                    {navItems.map(({ text, icon }) => { //Using map function to render each option on the sidebar
                        if(!icon) {
                            return (
                                <Typography key={text} sx={{m: "2.25rem 0 1rem 3rem"}}>
                                    {text} {/* Text from the object in the array */}
                                </Typography>
                            )
                        }
                        const lcText = text.toLowerCase();

                        return (
                            <ListItem key = {text} disablePadding>
                                <ListItemButton
                                 onClick={() => {  //This highlights the item clicked on the sidebar
                                    navigate(`/${lcText}`); //Here we navigate to /itemclicked. eg if dashboard is clicked, user is redirected to /dashboard
                                    setActive(lcText); //Here the clicked item is set to active
                                    }}
                                    sx={{ //SX is used to edit css in MUI components
                                        backgroundColor: active === lcText ? theme.palette.secondary[300] : "transparent",
                                        color: active === lcText ? theme.palette.primary[600] : theme.palette.secondary[200],
                                    }}
                                >
                                 <ListItemIcon
                                   sx={{
                                    ml: "2rem",
                                    color: active === lcText ? theme.palette.primary[600] : theme.palette.secondary[200],

                                   }}
                                 >
                                 {icon} {/*Icon from navitems array */}
                                 </ListItemIcon>
                                 <ListItemText primary={text} />
                                 {active === lcText && (
                                    <ChevronRightOutlined sx={{ ml: "auto"}} />
                                 )}
                          
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
            
            <Box position="absolute" bottom="2rem">
                <Divider />
                <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                    <Box
                     component="img"
                     alt="profile"
                     src={profileImage}
                     height="40px"
                     width="40px"
                     borderRadius="50%"
                     sx={{objectFit: "cover"}}
                    />
                        <Box textAlign="left">
                             <Typography fontWeight="bold" fontSize="0.9rem" sx={{ color: theme.palette.secondary[100]}} >
                                {user.name}
                             </Typography>
                             <Typography fontWeight="bold" fontSize="0.8rem" sx={{ color: theme.palette.secondary[200]}} >
                                CEO
                             </Typography>
                        </Box>
                        <SettingsOutlined 
                          sx = {{ color: theme.palette.secondary[300], fontSize: "25"}}
                        /> 
                </FlexBetween>
            </Box>
        </Drawer>
      )}
    </Box>
  )
}

export default Sidebar;