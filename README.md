# RESTful-Blog-App   https://iblogger.herokuapp.com/blogs

Blog App with CRUD capability and styled with Semantic UI - blog posts can be created, edited and deleted. User can write posts as either text or HTML that is sanitized for malicious <script> tags before being posted using the 'expressSanitizer' package. 


Front-end: 

  - styling done with Semantic UI CSS classes 
  
  - structure & behavior built with EJS (embedded JavaScript & HTML)
  
  
Back-end:

  - Node.js & Express.js server following a RESTful routing structure
  
  - MongoDB/Mongoose for data persistance & modelling - CRUD capability for Blog Posts
  
  - each post persisted to local database using Mongoose, including updates and deletion 
