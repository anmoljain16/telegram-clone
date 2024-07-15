import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ChatList = ({ onSelectChat, darkMode }) => {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.get('https://devapi.beyondchats.com/api/get_all_chats?page=1');
                const chatData = response.data.data.data;
                if (response.data && Array.isArray(chatData)) {
                    const updatedChats = await Promise.all(chatData.map(async (chat) => {
                        const lastMessageResponse = await axios.get(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chat.id}`);
                        const lastMessages = lastMessageResponse.data.data;
                        const lastMessage = lastMessages.length > 0 ? lastMessages[lastMessages.length - 1].message : '';
                        return {
                            ...chat,
                            lastMessage: lastMessage.length > 20 ? lastMessage.substring(0, 50) + '...' : lastMessage,
                        };
                    }));

                    setChats(updatedChats);
                } else {
                    throw new Error('Invalid chat data');
                }
            } catch (error) {
                setError('Error fetching chats');
                console.error('Error fetching chats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchChats();
    }, []);

    const filteredChats = chats.filter(chat => {
        const creatorName = chat.creator?.name?.toLowerCase() || '';
        const lastMessage = chat.lastMessage.toLowerCase();
        return creatorName.includes(searchQuery.toLowerCase()) || lastMessage.includes(searchQuery.toLowerCase());
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            text: {
                primary: darkMode ? '#fff' : '#000',
                secondary: darkMode ? '#cfebff' : '#043d83',
            },

        },
    });

    return (
        <ThemeProvider theme={theme}>
            <div className={`flex flex-col w-full sm:w-1/3 border-r ${darkMode ? 'bg-telegram-dark-bg-secondary border-gray-700' : 'bg-telegram-bg-main border-gray-300'}
             overflow-y-auto h-screen [&::-webkit-scrollbar]:[width:4px] [&::-webkit-scrollbar-thumb]:bg-slate-500 [&::-webkit-scrollbar]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full`}>
                <div className={`sticky top-0 p-4 z-10 ${darkMode ? 'bg-telegram-dark-bg-secondary text-telegram-dark-fg-main' : 'bg-gray-50 text-black'}`}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
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
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                        }}
                    />


                </div>
                <List sx={{ width: '100%' }}
                      InputProps={{
                    style: {
                        backgroundColor: darkMode ? '#1e293b' : '#e0e0e0',
                        color: darkMode ? '#fff' : '#000',

                    },
                    disableUnderline: true,
                }}>
                    {filteredChats.map((chat, index) => (
                        <React.Fragment key={chat.id}>
                            <ListItem alignItems="flex-start" onClick={() => onSelectChat({
                                chatid: chat.id,
                                creator: chat.creator,
                            })} className={`cursor-pointer ${darkMode ? 'hover:bg-slate-600 bg-telegram-dark-bg-secondary' : 'hover:bg-gray-300'} transition-colors duration-200`}>
                                <ListItemAvatar>
                                    <Avatar alt={chat.creator.name || "Unknown"} src={chat.creator.avatarUrl || "/static/images/avatar/default.jpg"} >

                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body1"
                                            color="text.primary"
                                        >
                                            {chat.creator.name || "Unknown"}
                                        </Typography>
                                    </React.Fragment>
                                    }
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                            </Typography>
                                            {`${chat.lastMessage}`}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            {index < filteredChats.length - 1 && <Divider variant="inset" component="li" />}
                        </React.Fragment>
                    ))}
                </List>
            </div>
        </ThemeProvider>
    );
};

export default ChatList;
