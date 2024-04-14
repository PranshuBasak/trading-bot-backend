# Backend Developer Assignment README

## Assignment Overview

In this assignment, the goal is to develop a basic backend system that interacts with a chosen broker's API. The specific tasks include fetching current holdings, placing buy and sell orders, receiving postbacks from the broker, and getting prices from a WebSocket.

## Chosen Broker

For this assignment, I have chosen Alpaca as the broker to work with. Please note that this excludes Zerodha and Groww as per the assignment requirements.

## Technologies Used

- Node.js
- Express.js
- Axios (for API requests)
- WebSocket (for real-time price updates)
- Joi (for schema validations)

# Trading App Backend API Documentation

## Overview

This document provides details about the API endpoints available for the Trading App Backend. The endpoints cover functionalities such as retrieving account details, managing orders, subscribing to account status updates, and fetching market data.

## Base URL

The base URL for the API endpoints is `http://localhost:3000`. Please replace `{_.url}` with the appropriate base URL in your environment.

## Endpoints

### 1. Home Page
- **URL:** `http://{{ _.url }}`
- **Method:** GET
- **Description:** Retrieves the home page of the trading app.

### 2. Account Details
- **URL:** `http://{{ _.url }}/api/v1/account`
- **Method:** GET
- **Description:** Retrieves the details of the user's trading account.

### 3. Get All Orders
- **URL:** `http://{{ _.url }}/api/v1/order/all`
- **Method:** GET
- **Description:** Retrieves all orders placed by the user.

### 4. Subscribe to Account Status
- **URL:** `http://{{ _.url }}/api/v1/events/accounts/status`
- **Method:** POST
- **Description:** Subscribes to account status updates for specified parameters.

### 5. Delete All Orders
- **URL:** `http://{{ _.url }}/api/v1/order/all`
- **Method:** DELETE
- **Description:** Deletes all orders placed by the user.

### 6. Delete Single Order
- **URL:** `http://{{ _.url }}/api/v1/order/all/{order_id}`
- **Method:** DELETE
- **Description:** Deletes a specific order identified by its ID.

### 7. Get All Orders ID
- **URL:** `http://{{ _.url }}/api/v1/order/all/id`
- **Method:** GET
- **Description:** Retrieves all order IDs.

### 8. Get Single Order
- **URL:** `http://{{ _.url }}/api/v1/order/{order_id}`
- **Method:** GET
- **Description:** Retrieves details of a specific order by its ID.

### 9. Place Single Order
- **URL:** `http://{{ _.url }}/api/v1/order/placeorder`
- **Method:** POST
- **Description:** Places a single order with specified parameters.

### 10. Patch Single Order
- **URL:** `http://{{ _.url }}/api/v1/order/patch/{order_id}`
- **Method:** PATCH
- **Description:** Updates a specific order identified by its ID.

### 11. Holding Details
- **URL:** `http://{{ _.url }}/api/v1/holdings`
- **Method:** GET
- **Description:** Retrieves details of the user's holdings.

### 12. Market Price
- **URL:** `http://{{ _.url }}/api/v1/market/{symbol}`
- **Method:** GET
- **Description:** Retrieves the current market price for a specified symbol.

## Environment Variables

The following environment variables are used:

- Base URL: `localhost:3000`

## Additional Information

- **Authentication:** No authentication details are required for accessing these endpoints.
- **Request Headers:** User-Agent: insomnia/8.6.1

---

## Setup and Usage

1. Clone the Repository:
   ```
   git clone https://github.com/PranshuBasak/trading-bot-backend.git
   ```

2. Navigate to the Project Directory:
   ```
   cd trading-bot-backend
   ```

3. Install Dependencies:
   ```
   npm install
   ```

4. Set Environment Variables:
   - Create a `.env` file based on the `.env.example` template.
   - Provide necessary API credentials and configuration details in the `.env` file.
   - User need to add user key and secret from alpaca .  

5. Start the Server:
   ```
   npm start
   ```

6. Access Endpoints:
   - The server will run on `http://localhost:3000` by default.
   - Use appropriate API endpoints mentioned above to interact with the backend.

## Important Notes

- Ensure that the provided API credentials and configurations are accurate.
- Handle API responses and errors gracefully within the codebase.
- Utilize appropriate error handling and validation techniques.
- Monitor WebSocket connections for real-time updates efficiently.

## Contact Information

If you have any questions or require further assistance regarding the assignment or codebase, please feel free to reach out.

- Email: pranshubasak@gmail.com

Thank you for the opportunity, and I look forward to your feedback.

Best regards,
Prasnhu Basak