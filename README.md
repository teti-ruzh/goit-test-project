Test Tweets Project

Created with Create React App

Task Overview

- Implemented according to the customer's layout.
- Clicking on the 'Follow' button changes text to 'Following', button`s color
  and increase number of followers by 1.
- Clicking on the 'Following' id reverse action which changes text to 'Follow',
  button`s color back and decrease number of followers by 1.
- The final result of the user's actions is fixed after page reloading (data
  saved in LocalStorage).
- Created pagination for list of users
- The backend for development created using the mockapi.io UI-service.
- Created routing using React Router.

Project Routs

- Home Page: welcome page for user
- Tweets Page: list of users with main info: name, number of tweets and
  followers.

Project structure

- src/components - contain component Layout, Loader, TweetsItem
- src/pages - contain components for pages 'Home'and 'Tweets'
- src/services - contain api-servise functions
- src/App.js - contains Routes

Technologies and Libraries

- React
- React Router
- Axios
- Notiflix
- React loader spinner
