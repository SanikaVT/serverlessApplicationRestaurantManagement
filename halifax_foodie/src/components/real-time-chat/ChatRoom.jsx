//references
//https://www.youtube.com/watch?v=zQyrwxMPm88&t=60s

import React, {useState, useRef} from 'react'
import db from "../../firebase";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import ChatMessage from './ChatMessage'
import { Button, OutlinedInput } from '@mui/material';
import axios from "axios";
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';

export default function ChatRoom({currentUser, chatWith}) {

    const [formValue, setFormValue] = useState("");
    const sentBy = currentUser.role?.toLowerCase() === 'customer' ? currentUser.email : 'restaurant'
    const sentTo = chatWith ? chatWith.email : 'restaurant'

    const messagesRef = db.collection("messages");
    const query = messagesRef.where('sentBy', 'in', [sentBy, sentTo]).orderBy("createdAt").limit(25);
    const [messages] = useCollectionData(query, { idField: "id" });

    const dummy = useRef();
    useEffect(() => {
     localStorage.setItem("isChat","true");
    }, [])
    
    function getFilteredMessages() {
        if(!messages)return
        const usersSet = new Set([sentBy, sentTo]);
        return messages.filter(message => usersSet.has(message.sentTo))
    }

    const sendMessage = async (e) => {
        e.preventDefault();

        try {
            await messagesRef.add({
                text: formValue,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                sentBy,
                sentTo
            });

            setFormValue("");
            dummy.current.scrollIntoView({ behavior: "smooth" });
        } catch (error) {
            console.log(error)
        }

    };

    const updateCheck= async ()=>{
        await axios
    .post(
      "https://vvzh0tcvl0.execute-api.us-east-1.amazonaws.com/default/updatecheck",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
        console.log(response)
        localStorage.setItem("isChat","false");
        window.location.reload();
    }); 

    db.collection("users")
            .doc(currentUser.email)
            .update({
              hasComplaint: false,
            })
            .then((doc) => {})
            .catch((err) => {});

    };

    return (
        <>
        <main>
            {getFilteredMessages() &&
            getFilteredMessages().map((msg) => <ChatMessage key={msg.id} message={msg} currentUser={currentUser} />)}

            <span ref={dummy}></span>
        </main>

        <form onSubmit={sendMessage} className="message-form">
            <OutlinedInput
                placeholder="Type message ..."
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}/>

                <Button style={{marginLeft:'10px'}} type="submit" variant="contained" color="success" disabled={!formValue}>
                    Send
                </Button>
                <Button style={{marginLeft:'10px'}} variant="contained" color="success" onClick={updateCheck}>
                    <NavLink style={{textDecoration: 'none', color: 'white', cursor: 'pointer'}} to={'/'}> Close</NavLink>
    
                </Button>
        </form>
        </>
    );
}
