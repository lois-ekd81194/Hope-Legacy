import React, {useState, useEffect} from 'react';
import { GoogleMap, 
  withGoogleMap,
  withScriptjs, 
  Marker,InfoWindow} from 'react-google-maps';
import{useVans, usePosition} from '../api.js';
import mapStyles from "./MapStyle.js";



 
//find 5 closest van
function Nearest5(vans, position){
  var nearest5 =[];
  const len = vans.length;
  if(len<5){
    nearest5 = vans.slice();
  }else{
    const nvans = vans.slice();
    nvans.sort((a,b)=>Haversine(a, position)>Haversine(b, position) ? 1: -1);
    nearest5 = nvans.slice(0,5);
  }
  return nearest5;
}

//calculate dist
var toRad = function (num) {
  return num * Math.PI / 180
}
function Haversine(pos1, pos2){
  var R = 6371;
  var dLat = toRad(pos1.lat-pos2.lat);
  var dLng = toRad(pos1.lng-pos2.lng);
  var lat1 = toRad(pos1.lat);
  var lat2 = toRad(pos2.lat);
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLng/2) * Math.sin(dLng/2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return c*R;
}

//map functions
const containerStyle = {
  width: '90%',
  height: '90%'
};
const defaultMapOptions = {
  styles: mapStyles,
  mapTypeControl: false,
  fullscreenControl:false,
  streetViewControl: false
}


function InitMap() {
  const [selectedVan, setselectedVan]= useState(null);
  const {loading, vans, error} = useVans();
  const {position, p_error} = usePosition();
  
  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setselectedVan(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);
 
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error || p_error) {
    return <p>Something went wrong: {error.message}</p>;
  }else{
    var currentSellingVan = [];
    for (var v of vans){
      if(v.currentlySelling === true){
        currentSellingVan.push(v);
      }
    }
    const nearest5 = Nearest5(currentSellingVan, position);
    return  (
      <div>
        
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{lat:parseFloat(position.lat), lng: parseFloat(position.lng)}}
          zoom={15}
          defaultOptions={defaultMapOptions}
          
        >
          <Marker
          icon={{url:"/Customer.png", 
          scaledSize:new window.google.maps.Size(50,50)}} 
          position = {{lat:parseFloat(position.lat), lng: parseFloat(position.lng)}}
          animation= {1}
           />
          {nearest5.map(van=>(
          <Marker
            icon = {{url:"/v1.png", 
            scaledSize:new window.google.maps.Size(40,40)}}  
            key = {van.name} 
            position = {{lat:parseFloat(van.location.lat),lng: parseFloat(van.location.lng)}}
            animation= {2}
            onClick={() => {
              setselectedVan(van);
            }}
          />
          ))}
          {selectedVan &&(
              <InfoWindow
              onCloseClick={() => {
                setselectedVan(null);
              }}
              position = {{lat:parseFloat(selectedVan.location.lat),lng: parseFloat(selectedVan.location.lng)}}>
                <div>
                <a href = {`/customer/menu/van/${selectedVan._id}`}>
                  <button className = "vanButton">{selectedVan.name}</button>
                  </a>
                </div>
                </InfoWindow>
            )}
        </GoogleMap>
      </div>
        
    ) 
  }
  
}
const MapWrapped = withScriptjs(withGoogleMap(InitMap));

export default function Map() {
  
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCONErTJ4-giBzJL34fFSFdJV0T1fFCtj8`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      >
        
      </MapWrapped>
    </div>
  );
}


