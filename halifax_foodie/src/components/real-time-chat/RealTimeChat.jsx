//references
//https://www.youtube.com/watch?v=zQyrwxMPm88&t=60s

import React, { useEffect, useState } from "react";

import { Auth } from "aws-amplify";
import ChatRoom from "./ChatRoom";
import './RealTimeChat.scss'
import db from '../../firebase'
import {useNavigate} from 'react-router-dom'

import { CardContent, Card, Typography, Grid } from "@mui/material";

export default function RealTimeChat({sentBy}) {
    const [currentUser, setCurrentUser] = useState(null)
    const [customerList, setCustomerList] = useState([])
    const [selectedCustomer, setSelectedCustomer] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        getCurrentUser()
    }, [])

    async function getCurrentUser() {
        try {
            const user = await Auth.currentAuthenticatedUser({
                bypassCache: false
            })
            setCurrentUser({...user.attributes, role: user.storage?.getItem('Role')});

            if(currentUser?.role.toLowerCase() !== 'customer') {
                const users = await db.collection("users");
                const userData = await users.where("role", "==", 'Customer').get();

                userData.forEach((doc) => {
                    setCustomerList([...customerList, doc.data()]);
                });
            }
        } catch(error) {
            navigate('/')
        }
    }

    function SingleCustomer(props) {
        return (
            <Card>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {props.customer.email}
                    </Typography>
                </CardContent>
            </Card>
        )
    }

    function CustomersList(props) {
        return (
            <div>
                {
                    props.customerList && props.customerList.length && props.customerList.map(customer => <SingleCustomer onClick={setSelectedCustomer(customer)} customer={customer}/>)
                }

                {
                    props.customerList && props.customerList.length && 
                    <h1 style={{color: 'white', padding: '1rem'}}>
                        No Customers !!!
                    </h1>
                }
            </div>
        )
    }

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center" height={'100%'}>
            <Grid item={true} xs={2} sm={4} md={4}  className="chat-container">
                {
                    currentUser && currentUser.role.toLowerCase() === 'customer' && <ChatRoom currentUser={currentUser}/>
                }

                {
                    currentUser && currentUser.role.toLowerCase() !== 'customer' && selectedCustomer && <ChatRoom currentUser={currentUser} chatWith={selectedCustomer} />
                }

                {
                    currentUser && currentUser.role.toLowerCase() !== 'customer' && !selectedCustomer && <CustomersList customerList={customerList}/>
                }

                {
                    !currentUser &&
                    <h1 style={{color: 'white', padding: '1rem'}}>
                        Loading !!!!!!
                    </h1>
                }
            </Grid>
        </Grid>
    )

    }
