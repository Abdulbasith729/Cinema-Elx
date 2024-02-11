import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function SideBar() {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleReadClick = () => {
        navigate('/OtherReview'); // Corrected route path
    };

    const handleMyAccountClick = () => {
        navigate('/MyReview');
    };

    return (
        <div style={{ height: '100vh', borderRight: '1px solid grey', width: '50px' }}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2 }}
            >
                <MenuIcon style={{ height: 50, width: 50 }} />
            </IconButton>
            <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
                <List>
                    <ListItem button onClick={handleHomeClick}>
                        <ListItemIcon>
                            <HomeIcon style={{ height: 50, width: 50 }} />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem button onClick={handleReadClick}>
                        <ListItemIcon>
                            <DescriptionIcon style={{ height: 50, width: 50 }} />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem button onClick={handleMyAccountClick}>
                        <ListItemIcon>
                            <AccountCircleIcon style={{ height: 50, width: 50 }} />
                        </ListItemIcon>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
}
