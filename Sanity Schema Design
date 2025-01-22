Schema 
Authentication Schema

User:
{
  "userID": "string",
  "name": "string",
  "email": "string",
  "password": "hashed_string",
  "wishlist": ["array_of_productIDs"]
}


Product:
{
  "productID": "string",
  "name": "string",
  "description": "string",
  "price": "number",
  "category": "string",
  "stock": "number",
  "imageURL": "string"
}


Order:
{
  "orderID": "string",
  "userID": "string",
  "products": [
    {
      "productID": "string",
      "quantity": "number"
    }
  ],
  "totalPrice": "number",
  "orderStatus": "string",
  "shippingAddress": "string",
  "paymentStatus": "string"
}


Review:
{
  "reviewID": "string",
  "productID": "string",
  "userID": "string",
  "rating": "number",
  "comment": "string",
  "reviewDate": "string"
}



Shipping:
{
  "shippingID": "string",
  "orderID": "string",
  "shippingMethod": "string",
  "shippingCost": "number",
  "shippingDate": "string",
  "deliveryDate": "string"
}


Payments:
{
  "paymentID": "string",
  "orderID": "string",
  "paymentMethod": "string",
  "amount": "number",
  "paymentDate": "string",
  "paymentStatus": "string"
}
