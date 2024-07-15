import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// components/Drawer.js
const Drawer = ({ isOpen, onClose, onToggleDarkMode, darkMode }) => {
    return (
        <div className={`fixed inset-0 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black opacity-0" onClick={onClose}></div>

            {/* Drawer Content */}
            <div className={`relative w-64 bg-white dark:bg-slate-800 p-4 h-full`}>
                {/*<button className="mb-4 text-white" onClick={onToggleDarkMode}>*/}
                {/*    {darkMode ? 'Light Mode' : 'Dark Mode'}*/}
                {/*</button>*/}
                <div className={`p-4 flex justify-between items-center ${darkMode ? 'bg-telegram-dark-bg-secondary' : 'bg-telegram-bg-darker'}`}>
                    <h1 className="text-2xl font-bold text-white"></h1>
                    <div

                        className={`px-4 py-2 rounded ${darkMode ? 'bg-telegram-bg-darker text-white' : 'bg-telegram-bg-main text-telegram-bg-darker'}`}
                    >
                        <FormGroup>
                            <FormControlLabel onClick={onToggleDarkMode}
                                control={<MaterialUISwitch/>}
                                              InputProps={{
                                                  style: {
                                                      backgroundColor: darkMode ? '#475569' : '#e0e0e0',
                                                      color: darkMode ? '#fff' : '#000',
                                                      borderRadius: '25px',
                                                      height: '40px',
                                                      border: 'none',
                                                  },
                                                  disableUnderline: true,
                                              }}


                            />
                        </FormGroup>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&::before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

export default Drawer;
