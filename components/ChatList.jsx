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

    return (
        <div className={`flex flex-col w-full sm:w-1/3 border-r ${darkMode ? 'bg-telegram-dark-bg-main border-gray-700' : 'bg-telegram-bg-main border-gray-300'} overflow-y-auto h-screen`}>
            <div className={`sticky top-0 p-4 z-10 ${darkMode ? 'bg-telegram-dark-bg-secondary text-telegram-dark-fg-main' : 'bg-gray-50 text-white'}`}>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full p-2 rounded-full focus:outline-none placeholder-black placeholder:font-light ${darkMode ? 'bg-telegram-dark-bg-main text-telegram-dark-fg-main' : 'bg-gray-300 text-gray-900'}`}
                />
            </div>
            <List sx={{ width: '100%', bgcolor: darkMode ? 'background.paper' : 'background.paper' }}>
                {filteredChats.map((chat, index) => (
                    <React.Fragment key={chat.id}>
                        <ListItem alignItems="flex-start" onClick={() => onSelectChat({
                            chatid: chat.id,
                            creator: chat.creator,
                        })} className={`cursor-pointer ${darkMode ? 'hover:bg-gray-500' : 'hover:bg-gray-300'} transition-colors duration-200`}>
                            <ListItemAvatar>
                                    <Avatar alt={chat.creator.name || "Unknown"} src={chat.creator.avatarUrl || "/static/images/avatar/default.jpg"} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={chat.creator.name || "Unknown"}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
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
    );
};

export default ChatList;
