//references
//https://www.youtube.com/watch?v=zQyrwxMPm88&t=60s

import React, { useEffect, useState } from "react";

import { Auth } from "aws-amplify";
import ChatRoom from "./ChatRoom";
import './RealTimeChat.scss'
import db from '../../firebase'
import {useHistory} from 'react-router-dom'

import { CardContent, Card, Typography, Grid, CardHeader } from "@mui/material";

export default function RealTimeChat({sentBy}) {
    const [currentUser, setCurrentUser] = useState(null)
    const [customerList, setCustomerList] = useState([])
    const [selectedCustomer, setSelectedCustomer] = useState(null)
    // const navigate = useNavigate()
    const history = useHistory();

    useEffect(() => {
        getCurrentUser()
    }, [])

    async function getCurrentUser() {
        let localStorageCurrentUser = localStorage.getItem('currentUser')
        if(!localStorageCurrentUser || localStorageCurrentUser === 'null') {
            history.push('/')
            return
        }
        setCurrentUser(JSON.parse(localStorageCurrentUser));

        if(currentUser?.role.toLowerCase() !== 'customer') {
            const users = await db.collection("users");
            const userData = await users.where("role", "==", 'Customer').get();

            const customerData = []
            userData.forEach((doc) => {
                customerData.push(doc.data())
            });
            setCustomerList(customerData)
        }
    }

    function SingleCustomer(props) {
        return (
            <Card style={{marginBottom: '1rem', cursor: 'pointer'}}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {props.customer.email}
                    </Typography>
                </CardContent>
            </Card>
        )
    }

    function getCardHeading() {
        return 'Chat'
    }

    function selectCustomerToChatWith(customer) {
        setSelectedCustomer(customer)
    }

    function CustomersList(props) {
        return (
            <div className="customers-list">
                {
                    props.customerList
                    && props.customerList.length
                    && props.customerList.map((customer, index) =>
                        <div key={index} onClick={(e) => selectCustomerToChatWith(customer)}>
                            <SingleCustomer customer={customer}/>
                        </div>
                    )
                }

                {
                    props.customerList
                    && !props.customerList.length
                    &&
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
                <Card variant="outlined">
                    <CardHeader style={{borderBottom: '1px solid lightgray'}} title={getCardHeading()}/>
                    <CardContent>
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
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )

    }
