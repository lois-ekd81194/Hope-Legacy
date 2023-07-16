import React, { useState,useEffect ,Component}from "react";
import { NavLink, useHistory} from "react-router-dom";
import { useVendorOrder,useOutstandingOrders,useFulfilledOrders,useHistoryOrders, useUpdateFulfilled, useUpdatePickedUp, useStopSelling, useStartAgain} from "../api";
import moment from 'moment';
import '../App.css';
import "../icofont/icofont.min.css";
moment().format();

export default function OutstandingOrders({match:{params:{vid}}}) {
  const { loading, outstandingOrders, error } = useOutstandingOrders(vid);
  console.log(outstandingOrders);
  
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  return (
    <section class="outstandingOrders vendorBody">
      <nav className="vendorNav">  
        <NavLink to= {"/vendor/orders/outstanding/" + vid} ><i class="icofont-tasks-alt"></i>Outstanding</NavLink><hr/>
        <NavLink to= {"/vendor/orders/fulfilled/"+ vid} ><i class="icofont-ui-clip-board"></i>Fulfilled</NavLink><hr/>
        <NavLink to= {"/vendor/orders/history/"+ vid} ><i class="icofont-history"></i>History</NavLink>
        <NavLink to= {"/vendor/stopselling/"+ vid} ><i class="icofont-ui-pause"></i>Stop selling</NavLink>
        <NavLink to= {"/vendor/startagain/"+ vid} ><i class="icofont-ui-play"></i>Start selling</NavLink>
        <br></br>
        <hr></hr>
      </nav> 
      <h1 class = "outstandingHeader">Outstanding Orders</h1>
        <ul class="outstandingList">
          {outstandingOrders.map(outstandingOrders => (
            <Order key={outstandingOrders._id} {...outstandingOrders} />
          ))}
        </ul>
    </section>
  );
}

export function FulfilledOrders({match:{params:{vid}}}) {
  const { loading, fulfilledOrders, error } = useFulfilledOrders(vid);
  console.log(fulfilledOrders);
  
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  return (
    <section class="fulfilledOrders vendorBody">
      <link rel="stylesheet" href="../icofont/css/icofont.min.css"></link>
      <nav class="vendorNav"> 
        <NavLink to= {"/vendor/orders/outstanding/" + vid} ><i class="icofont-tasks-alt"></i>Outstanding</NavLink><hr/>
        <NavLink to= {"/vendor/orders/fulfilled/"+ vid} ><i class="icofont-ui-clip-board"></i>Fulfilled</NavLink><hr/>
        <NavLink to= {"/vendor/orders/history/"+ vid} ><i class="icofont-history"></i>History</NavLink>
        <NavLink to= {"/vendor/stopselling/"+ vid} ><i class="icofont-ui-pause"></i>Stop selling</NavLink>
        <NavLink to= {"/vendor/startagain/"+ vid} ><i class="icofont-ui-play"></i>Start selling</NavLink>
        <br></br>
        <hr></hr>
      </nav>   
      <h1 class = "fulfilledHeader">Fulfilled Orders</h1>
        <ul class="fulfilledList">
          {fulfilledOrders.map(fulfilledOrders => (
            <Order key={fulfilledOrders._id} {...fulfilledOrders} />
          ))}
        </ul>
    </section>
  );
}

export function HistoryOrders({match:{params:{vid}}}) {
  const { loading, historyOrders, error } = useHistoryOrders(vid);
  console.log(historyOrders);
  
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  return (
    <section class="outstandingOrders vendorBody">
      <link rel="stylesheet" href="../icofont/css/icofont.min.css"></link>

      <nav className="vendorNav">  
        <NavLink to= {"/vendor/orders/outstanding/" + vid} ><i class="icofont-tasks-alt"></i>Outstanding</NavLink><hr/>
        <NavLink to= {"/vendor/orders/fulfilled/"+ vid} ><i class="icofont-ui-clip-board"></i>Fulfilled</NavLink><hr/>
        <NavLink to= {"/vendor/orders/history/"+ vid} ><i class="icofont-history"></i>History</NavLink>
        <NavLink to= {"/vendor/stopselling/"+ vid} ><i class="icofont-ui-pause"></i>Stop selling</NavLink>
        <NavLink to= {"/vendor/startagain/"+ vid} ><i class="icofont-ui-play"></i>Start selling</NavLink>
        <br></br>
        <hr></hr>
      </nav>
     
      <h1 class ="historyHeader">History Orders</h1>
        <ul class="historyList">
          {historyOrders.map(historyOrder => (
            <Order key={historyOrder._id} {...historyOrder} />
          ))}
        </ul>
    </section>
  );
}


function Order(order) {
  const { _id, status, orderNum, time,items,quantities } = order;
  var itemList = items.map(item =>(Object.values(item)[1]))
  itemList = itemList.map((itemName) =>
  <td>{itemName}</td>
  );

  var quantityList = quantities.map((quantity) =>
  <td>{quantity}</td>
  );

  function renderTableRow(){
    var orderTable = []
    for (var i=0;i<quantityList.length;i++){
      orderTable.push(<tr>{itemList[i]}&nbsp;&nbsp;&nbsp;&nbsp;{quantityList[i]}</tr>)
    }
    return orderTable
  }


  const time_formatted = moment(time).format("dddd, MMMM Do YYYY, h:mm:ss a");
  const time_lateOrder = moment(time).add(15, 'minutes').format("dddd, MMMM Do YYYY, h:mm:ss a");
  const time_now = moment()
  const time_sinceorder = time_now.diff(moment(time),"minute");

  return (
    <li class = "vendorOrder">
      <div>
        <h3>{status}</h3>
        <h4>{orderNum}</h4>
        <h4>{time_formatted}</h4>
        <tr><td>Become Late Order After:</td></tr>
        <h4>&nbsp;&nbsp;&nbsp;&nbsp;{time_lateOrder}</h4>
        <table>
          {renderTableRow()}
        </table>
        <tr><td><a href={"/vendor/order/"+ _id}>Details</a></td></tr>
      </div>
    </li>      
  );
}

export function VendorOrderDetails({match:{params:{oid}}}) {
  
  const { loading, order, error } = useVendorOrder(oid);
  let history = useHistory();
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  const time_formatted = moment(order[0].time).format("dddd, MMMM Do YYYY, h:mm:ss a");

  const time_lateOrder = moment(order[0].time).add(15, 'minutes').format("dddd, MMMM Do YYYY, h:mm:ss a");  
  const time_now = moment()
  const time_left = time_now.diff(moment(order[0].time).add(15, 'minutes'),"minute");

  var itemList = order[0].items.map(item =>(Object.values(item)[1]))
  itemList = itemList.map((itemName) =>
  <td>{itemName}</td>
  );

  var quantityList = order[0].quantities.map((quantity) =>
  <td>{quantity}</td>
  );

  function renderTableRow(){
    var orderTable = []
    for (var i=0;i<quantityList.length;i++){
      orderTable.push(<tr>{itemList[i]}{quantityList[i]}&nbsp;&nbsp;&nbsp;&nbsp;<td>{order[0].items[i].price}</td></tr>)
    }
    return orderTable
  }

  function changeStatus() {
    if (order[0].status === "preparing"){
      return <td><a href={"/vendor/order/markfulfilled/"+ order[0]._id}>Mark As Fulfilled</a></td>
    }
    if (order[0].status === "fulfilled"){
      return <td><a href={"/vendor/order/markpickedup/"+ order[0]._id}>Mark As Picked Up</a></td>
    }
  }

  var price = 0;
  for (var i=0;i<quantityList.length;i++){
    price += order[0].quantities[i]*order[0].items[i].price
  }


  return (
    <div>
      <h1>Order Details</h1>
      <table class="center">
        <tr><td>Order Number:&nbsp;&nbsp;&nbsp;&nbsp;{order[0].orderNum}&nbsp;&nbsp;&nbsp;&nbsp;{changeStatus()}</td></tr>  
				<tr><td>Status:&nbsp;&nbsp;&nbsp;&nbsp;{order[0].status}</td></tr> 
				<tr><td>Customer:&nbsp;&nbsp;&nbsp;&nbsp;{order[0].customer[0].givenName}</td></tr>
        <tr><td>Time:&nbsp;&nbsp;&nbsp;&nbsp;{time_formatted}</td></tr>
        <tr><td>Minutes left before discount:{time_left}</td></tr>
        <tr><td>Become Late Order After:</td></tr>
        <tr><td>{time_lateOrder}</td></tr>  
        {renderTableRow()}
        <tr><td>Total price:&nbsp;&nbsp;&nbsp;&nbsp;{price}</td></tr>
      </table>
      <button onClick={history.goBack}>Back</button>
    </div>
        
  );
}

export function MarkFulfilled({match:{params:{oid}}}){
  let history = useHistory();
  const { loading, markFulfilledOrder, error } = useUpdateFulfilled(oid);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  return (
    <div>
      <h1>Successfully Marked As Fullfilled</h1>
      <button onClick={history.goBack}>Back</button>
    </div>
  )
  
  
}

export function MarkPickedUp({match:{params:{oid}}}){
  let history = useHistory();
  const { loading, markPickedUpOrder, error } = useUpdatePickedUp(oid);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  if (markPickedUpOrder[0].status === "picked up"){
    return <h1>Successfully Marked As Picked Up</h1>
  } 

  return (
    <div>
      <h1>Successfully Marked As Picked Up</h1>
      <button onClick={history.goBack}>Back</button>
    </div>
  )

}

export function StopSelling({match:{params:{vid}}}){
  const { loading, van, error } = useStopSelling(vid);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }


  return (
    <div>
      <nav className="vendorNav">  
        <NavLink to= {"/vendor/orders/outstanding/" + vid} ><i class="icofont-tasks-alt"></i>Outstanding</NavLink><hr/>
        <NavLink to= {"/vendor/orders/fulfilled/"+ vid} ><i class="icofont-ui-clip-board"></i>Fulfilled</NavLink><hr/>
        <NavLink to= {"/vendor/orders/history/"+ vid} ><i class="icofont-history"></i>History</NavLink>
        <br></br>
        <hr></hr>
      </nav>
      <h1>Successfully Stopped Selling</h1>
    </div>
  )

}

export function StartAgain({match:{params:{vid}}}){
  const { loading, van, error } = useStartAgain(vid);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }


  return (
    <div>
      <nav className="vendorNav">  
        <NavLink to= {"/vendor/orders/outstanding/" + vid} ><i class="icofont-tasks-alt"></i>Outstanding</NavLink><hr/>
        <NavLink to= {"/vendor/orders/fulfilled/"+ vid} ><i class="icofont-ui-clip-board"></i>Fulfilled</NavLink><hr/>
        <NavLink to= {"/vendor/orders/history/"+ vid} ><i class="icofont-history"></i>History</NavLink>
        <br></br>
        <hr></hr>
      </nav>
      <h1>Successfully Started Selling</h1>
    </div>
  )

}