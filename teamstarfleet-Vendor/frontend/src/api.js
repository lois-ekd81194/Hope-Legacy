import { useState, useEffect } from "react";

import axios from "axios";
import { _isComputingDerivation } from "mobx";

const BASE_URL = "https://info30005starfleet.herokuapp.com";
//const BASE_URL = "http://localhost:8001";

function getMenuItem(id) {
  const endpoint = BASE_URL + `/customer/menu/food/` + id;
  return fetch(endpoint).then((res) => res.json());
}

function getMenu(id) {
  const endpoint = BASE_URL + `/customer/menu/van/` + id;
  return fetch(endpoint).then((res) => res.json());
}

export function postOrder(order) {
  const endpoint = BASE_URL + "/customer/addorder/";
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

export function cancelOrder(id) {
  const endpoint = BASE_URL + "/customer/order/" + id;
  return fetch(endpoint, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: "cancelled" }),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

export function changeOrder(vanId, orderId, order) {
  const endpoint =
    BASE_URL + "/customer/menu/van/" + vanId + "/order/" + orderId;
  return fetch(endpoint, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

export function useMenu(id) {
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState([]);
  const [van, setVan] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMenu(id)
      .then((data) => {
        setMenu(data.menu);
        setVan(data.van);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  }, []);
  return {
    loading,
    menu,
    van,
    error,
  };
}

//get  and van info from database
function getVan() {
  const endpoint = BASE_URL + `/customer/location/`;
  return fetch(endpoint).then((res) => res.json());
}

export function useVans() {
  const [loading, setLoading] = useState(true);
  const [vans, setVan] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getVan()
      .then((vans) => {
        setVan(vans);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, []);
  return {
    loading,
    vans,
    error,
  };
}
//get geolocation
export const usePosition = () => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  const onChange = ({ coords }) => {
    setPosition({
      lat: coords.latitude,
      lng: coords.longitude,
    });
  };
  const onError = (error) => {
    setError(error.message);
  };
  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError("Geolocation is not supported");
      return;
    }
    const watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);
  return { position, error };
};

axios.interceptors.request.use(
  (config) => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [BASE_URL];
    const token = localStorage.getItem("token"); // get the token
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = `Bearer ${token}`; // we put our token in the header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function useMenuItem(id) {
  const [loading, setLoading] = useState(true);
  const [menuItem, setMenuItem] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMenuItem(id)
      .then((menuItem) => {
        setMenuItem(menuItem);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  }, []);
  return {
    loading,
    menuItem,
    error,
  };
}

function getOrders(id) {
  const endpoint = BASE_URL + `/customer/orders/` + id;
  return fetch(endpoint).then((res) => res.json());
}

function getOrder(id) {
  const endpoint = BASE_URL + `/customer/order/` + id;
  return fetch(endpoint).then((res) => res.json());
}

export function useOrders(id) {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getOrders(id)
      .then((orders) => {
        setOrders(orders);
        console.log(orders);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    orders,
    error,
  };
}

export function useOneOrder(id) {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getOrder(id)
      .then((order) => {
        setOrder(order);
        setLoading(false);
      })
      .catch((e) => {
        console.log("no orders yet");
        setError(e);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    order,
    error,
  };
}
////////////////////////////////////////////////////////
function getOutstandingOrders(vid) {
  const endpoint = BASE_URL + `/vendor/orders/outstanding/` + vid;
  console.log(endpoint);
  return fetch(endpoint).then((res) => res.json());
}

export function useOutstandingOrders(vid) {
  const [loading, setLoading] = useState(true);
  const [outstandingOrders, setOutstandingOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getOutstandingOrders(vid)
      .then((outstandingOrders) => {
        setOutstandingOrders(outstandingOrders);
        console.log(outstandingOrders);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    outstandingOrders,
    error,
  };
}

function getFulfilledOrders(vid) {
  const endpoint = BASE_URL + `/vendor/orders/fulfilled/` + vid;
  return fetch(endpoint).then((res) => res.json());
}

export function useFulfilledOrders(vid) {
  const [loading, setLoading] = useState(true);
  const [fulfilledOrders, setFulfilledOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFulfilledOrders(vid)
      .then((fulfilledOrders) => {
        setFulfilledOrders(fulfilledOrders);
        console.log(fulfilledOrders);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    fulfilledOrders,
    error,
  };
}

function getHistoryOrders(vid) {
  const endpoint = BASE_URL + `/vendor/orders/history/` + vid;
  return fetch(endpoint).then((res) => res.json());
}

export function useHistoryOrders(vid) {
  const [loading, setLoading] = useState(true);
  const [historyOrders, setHistoryOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getHistoryOrders(vid)
      .then((historyOrders) => {
        setHistoryOrders(historyOrders);
        console.log(historyOrders);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    historyOrders,
    error,
  };
}

function getVendorOrder(oid) {
  const endpoint = BASE_URL + `/vendor/order/` + oid;
  return fetch(endpoint).then((res) => res.json());
}

export function useVendorOrder(oid) {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getVendorOrder(oid)
      .then((order) => {
        setOrder(order);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    order,
    error,
  };
}

function updateFulfilled(oid) {
  const endpoint = BASE_URL + `/vendor/order/markfulfilled/` + oid;
  return fetch(endpoint).then((res) => res.json());
}

export function useUpdateFulfilled(oid) {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    updateFulfilled(oid)
      .then((order) => {
        setOrder(order);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    order,
    error,
  };
}

function updatePickedUp(oid) {
  const endpoint = BASE_URL + `/vendor/order/markpickedup/` + oid;
  return fetch(endpoint).then((res) => res.json());
}

export function useUpdatePickedUp(oid) {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    updatePickedUp(oid)
      .then((order) => {
        setOrder(order);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    order,
    error,
  };
}

function stopSelling(vid) {
  const endpoint = BASE_URL + `/vendor/stopselling/` + vid;
  return fetch(endpoint).then((res) => res.json());
}

export function useStopSelling(vid) {
  const [loading, setLoading] = useState(true);
  const [van, setVan] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    stopSelling(vid)
      .then((van) => {
        setVan(van);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    van,
    error,
  };
}

function startAgain(vid) {
  const endpoint = BASE_URL + `/vendor/startagain/` + vid;
  return fetch(endpoint).then((res) => res.json());
}

export function useStartAgain(vid) {
  const [loading, setLoading] = useState(true);
  const [van, setVan] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    startAgain(vid)
      .then((van) => {
        setVan(van);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    van,
    error,
  };
}

////////////////////////////////////////////////////////

export async function startSelling(location) {
  const { locationText, coords } = location;

  if (!location) {
    alert("You must enter a location");
    return;
  }

  const endpoint = BASE_URL + `/vendor/selling`;

  axios({
    url: endpoint,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      vanName: localStorage.getItem("vanName"),
      locationText: locationText,
      location: {lat: coords.lat, lng: coords.lng},
    }),
  })
    .then((res) => {
      localStorage.setItem("vanID", res.data);
      console.log(localStorage.getItem("vanID"));
      window.location.href = "/vendor/orders/outstanding/"+localStorage.getItem("vanID");
    })
    .catch((e) => {
      console.log(e);
    });
}

// component for handling user login
export async function loginVendor(user) {
  const { name, password } = user;

  if (!name || !password) {
    alert("Must provide van name and password");
    return;
  }

  const endpoint = BASE_URL + `/vendor`;

  let data = await axios({
    url: endpoint,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(
      {
        name: name,
        password: password,
      },
      { withCredentials: true }
    ),
  })
    .then((res) => {
      localStorage.setItem("token", res.data);
      localStorage.setItem("vanName", name);
      window.location.href="/vendor/selling";
    })
    .catch((e) => {
      console.log(e);
      alert("Incorrect van name or password");
    });


  // put token ourselves in the local storage, we will
  // send the token in the request header to the API server
  localStorage.setItem("token", data);
  localStorage.setItem("vanName", name);

  // redirect to homepage -- another way to redirect
  // window.location.href = "/";
}

// component for handling user login
export async function LoginUser(user) {
  const { email, password } = user;

  if (!email || !password) {
    alert("must provide an email and a password");
    return;
  }

  const endpoint = BASE_URL + `/customer/login`;

  let data = await axios({
    url: endpoint,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(
      {
        email: email,
        password: password,
      },
      { withCredentials: true }
    ),
  })
    .then((res) => {
      localStorage.setItem("token", res.data);
      localStorage.setItem("email", email);
      window.location.href = "/customer";
    })
    .catch((e) => {
      console.log(e);
      alert("An error occured. Please enter credentials again");
      return;
    });
}

export async function signupUser(user) {
  const endpoint = BASE_URL + `/customer/signup`;

  const { email, password, password2 } = user;

  if (!email || !password || !password2) {
    alert("Must provide email and password");
    return;
  }

  if (password !== password2) {
    alert("Passwords do not match");
    return;
  }

  var length = false;
  var alpha = false;
  var numeric = false;
  if (password.length >= 8) {
    length = true;
  }
  for (var i = 0; i < password.length; i++) {
    if (password.charAt(i).toLowerCase !== password.charAt(i).toUpperCase) {
      alpha = true;
    }
    if (password.charAt(i) >= "0" && password.charAt(i) <= "9") {
      numeric = true;
    }
  }
  if (!length || !alpha || !numeric) {
    alert(
      "Password must be at least eight characters and contain at least one alphabet character and at least one numerical digit"
    );
    return;
  }

  axios({
    url: endpoint,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    data: {
      email: email,
      password: password,
    },
    
  })
    .then(() => {
      alert("Account created. Please login to continue");
      window.location.href = "/customer/login";
    })
    .catch((e) => {
      console.log(e);
      alert("An error occured");
    });
    
}

export async function changeName(user) {
  const endpoint = BASE_URL + `/customer/changename`;
  const { familyName, givenName } = user;
  if (!familyName && !givenName) {
    alert("You did't input anything!");
    return;
  }
  axios({
    url: endpoint,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    data: {
      email: localStorage.getItem("email"),
      familyName: familyName,
      givenName: givenName,
    },
    
  })
    .then((res) => {
      window.location.href="/customer"
    })
    .catch((e) => {
      console.log(e);
    });
}

export async function changePW(user) {
  const endpoint = BASE_URL + `/customer/changepw`;

  const { email, password, newPassword, newPassword2 } = user;

  if (!email || !password || !newPassword || !newPassword2) {
    alert("must provide email, current password and new password");
    return;
  }

  if (newPassword !== newPassword2) {
    alert("Passwords do not match");
    return;
  }

  if (newPassword === password) {
    alert("New password must be different than current password");
    return;
  }

  var length = false;
  var alpha = false;
  var numeric = false;
  if (newPassword.length >= 8) {
    length = true;
  }
  for (var i = 0; i < newPassword.length; i++) {
    if (
      newPassword.charAt(i).toLowerCase !== newPassword.charAt(i).toUpperCase
    ) {
      alpha = true;
    }
    if (newPassword.charAt(i) >= "0" && newPassword.charAt(i) <= "9") {
      numeric = true;
    }
  }
  if (!length || !alpha || !numeric) {
    alert(
      "New password must be at least eight characters and contain at least one alphabet character and at least one numerical digit"
    );
    return;
  }

  axios({
    url: endpoint,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    data: {
      email: email,
      password: password,
      newPassword: newPassword,
    },
  })
    .then((res) => {
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      window.location.href = "/customer/login";
    })
    .catch((e) => {
      console.log(e);
      alert("Incorrect email or password");
    });
    
}

function getCustomer(email) {
  const endpoint = BASE_URL + `/customer/` + email;
  return fetch(endpoint).then((res) => res.json());
}

export function useCustomerDtatil(email) {
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCustomer(email)
      .then((customer) => {
        setCustomer(customer);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  }, []);
  return {
    loading,
    customer,
    error,
  };
}
