import React,{useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmojiFoodBeverage from '@material-ui/icons/EmojiFoodBeverage';
import {useCustomerDtatil} from "../api";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn"
import Map from "../components/Map"
import {returnStyle, Linke} from "../components/CustomerStyle";

const textStyle = {
    display: "inline-flex",
    color: 'white',
    fontSize: 20,
    fontWeight: "bold"
}

export default function CustomerHome() {
    const history = useHistory();
    const data = localStorage.getItem("email");
    //get customer detail by email
    const {loading, customer, error} = useCustomerDtatil(data);
    
    const [title,setTitle] = useState('');
    const [orderButton, setVisiable] = useState(false);
    
   
    useEffect(()=>{
        if(customer){
            localStorage.setItem("customerID",customer._id);
            setTitle('Welcome' + (customer.givenName ? ", "+customer.givenName : ""));
            setVisiable(true);
            
        }else{
            setTitle("Welcome");
            setVisiable(false);
           
        }
    },[customer])
    function pushCustomerDetail(){
        if(customer){
            history.push('/customer/profile', {
                customer: customer
            })
        }else{
            history.push('/customer/login')
        }
    } 
    if (loading) {
        return <p>Loading...</p>;
    }
        

    return (
        <div>
            <header style = {{ backgroundColor: "rgb(241, 196, 15)"}}>
            {!orderButton&&<Linke href = {'/'}><KeyboardReturn style = {returnStyle}/> </Linke>}
               <AccountCircle style = {{color: "white", fontSize: 75, position:"relative",top:"10",left:"5"}}
                    onClick = { pushCustomerDetail}/>
                <span style ={textStyle}>{title} </span>
                {orderButton && (<EmojiFoodBeverage 
                style={{ position: "relative", top: "5",left: "5", fontSize: 40}}
                onClick = {()=>{window.location.href ="/customer/order/"+customer.currentOrder}}>    
                </EmojiFoodBeverage>)}
                
    
            </header>
            <Map/>
        </div>
    );   
}