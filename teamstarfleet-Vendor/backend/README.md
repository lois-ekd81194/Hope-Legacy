**The University of Melbourne**

# INFO30005 – Web Information Technologies

# Group Project by Team Starfleet

## Table of Contents

- [INFO30005 – Web Information Technologies](#info30005--web-information-technologies)
- [Group Project by Team Starfleet](#group-project-by-team-starfleet)
  - [Table of Contents](#table-of-contents)
  - [Team Members](#team-members)
  - [Project Timeline](#project-timeline)
  - [Technologies](#technologies)
  - [API Demo](#api-demo)
    - [Homepage](#homepage)
    - [Customer App](#customer-app)
      - [Customer Homepage](#customer-homepage)
      - [View all snacks](#view-all-snacks)
      - [Find a snack by ID](#find-a-snack-by-id)
      - [Add a new order](#add-a-new-order)
    - [Vendor App](#vendor-app)

## Team Members

| Name         |  Task  |   State |
| :----------- | :----: | ------: |
| Henry Mcgee  | Task 1 | Working |
| Andy Tran    | Task 2 | Working |
| Chengkai Yao | Task 3 | Working |
| Marvin Chew  | Task 4 | Working |
| Yifei Wang   | Task 5 | working |

## Project Timeline

- [x] Read the Project handouts carefully
- [x] User Interface (UI)mockup
- [x] App server mockup
- [x] Front-end + back-end (one feature)
- [x] Complete system + source code
- [x] Report on your work(+ test1 feature)

## Technologies

This project was created using:

- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
***

## API Demo
Here is the URL for our live website:

https://info30005starfleet.herokuapp.com

The connection string to access our database is provided below:

mongodb+srv://Lois:wyf81194@cluster0.dbsqz.mongodb.net/INFO30005?retryWrites=true&w=majority

### Homepage
![homepage](screenshots/homepage.PNG)

### Customer App
#### Customer Homepage
![customer-homepage](screenshots/customer-homepage.PNG)

#### View all snacks
![menu](screenshots/menu.PNG)

#### Find a snack by ID
>customer can find items by its id
>e.g.`foodId: 6077a121a05fdbd564e3c0ba`

![find-a-snack](screenshots/find-snack.PNG)

#### Add a new order
>When add a new order, order number, food and the quatities of food are expected.
>At the same time the currentOrder of the corresponding customer will be updated(not shown here).
>
>An example structure is provided below, you can test add order feature by pasting it to the postman:
```Json
{
  "orderNum": "010",
  "items": ["6078df252c173c4de2cef7f2"],
  "quantities": [3]
}
```
the following picture is the result for success case

![add-order](screenshots/addorder.PNG)

### Vendor App
#### Vendor Homepage
![vendor-homepage](screenshots/vendor.PNG)

#### Check Outstanding Orders
>Picked-up orders will be available in the route /history in further development
>
![orders](screenshots/vendororders.PNG)

#### Mark Order as Fulfilled
>e.g.`orderId:608087d001d68f0203c643b6`

![fulfillorder](screenshots/fulfill-order.PNG)

#### Set Van Status
>Data type of geo-location will be changed in further development according or the Google Map API.
>
>expected structure to set van status:
```Json
{
  "currentlySelling": false,
  "locationDescription":"any place",
}
```

![setstatus](screenshots/status.PNG)

