How to access the project
git clone the repo into your local machine. 
Then cd into swift-booking. This is the react app.
Run npm install and then npm start to view in the web.

While working on individual components of the application,
Create a new branch and checkout to that branch using the command git checkout -b <branch-name>
Work from the branch then push your changes to github. Make sure you set upstream.
Do not review your own work. Someone else will review and merge if there are no conflicts.
Once merged, you can delete your branch.

db.json structure explained;
Users: Contains user profiles for authentication and profile management.
Hotels: Lists the four hotels with detailed information, including room categories and gallery images.
Rooms: Each hotel has four room categories with descriptions, pricing, and availability status.
Bookings: Manages the booking information, including the user who booked, the hotel, room, check-in/out dates, total price, and any additional services.
Reviews: Allows users to submit and view reviews and ratings for hotels.
Deals: Lists special offers and discounts associated with hotels.

I've created a temporary db.json server (Can be edited later with any changes)