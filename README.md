# NoSpam
Project Description
•	Project Setup
Step1:- Download the zipped file from https://drive.google.com/file/d/1foxp9k3oM7d9Ox77Zg-fjXLpvmCbhZYw/view?usp=sharing.
Step2:- Open your Code Editor and cd over to the project directory.
Step3:- npm install (Note system requires node.js & postgres).
Step4:- npm start (to run the code).
Step5:- npm run dev (to test the code with morgan logs).
Step6:- In config/config.json add username,password, database according to your configurations.


•	API Endpoints

BaseUrl:- https://localhost/3000
| HTTP Verbs | Endpoints | Action |

Authentication Routes

1) | POST | /api/v1/auth/signup | To sign up a new user account |: -Body: - {
“username”: “your_username”, 
“email”: “your_email”, 
“phone”: “your_phone”, 
“password”: “random_password”, 
“confirmPassword”: “random_password”
}

2)| POST | /api/v1/auth/login | To login an existing user account |: -
Body: - {
“phone”: “registered_phone”,
“password”: “validating_password”
}


Users Routes(Testing)

3)| GET | /api/v1/users/ | To get all the users for testing/ Data Population |

4)| POST | /api/v1/users/contact| To add contacts to user db|:- 
Body:-  {
“phone”: “random_number”
}

Spam Route

4)| GET | /api/v1/spam/ | To retrieve all globally marked spams |

5)| POST | /api/v1/spam/ | To mark spam to a particular number globally i.e in directory |: -
Body:- {
“name”: “users_name”, 
“phone”: “users_number”
}

6)| GET | /api/v1/spam/marked_spams | To retrieve all current user specific spammed numbers |

7)| GET | /api/v1/spam/search | To search a name from global spam list  i.e from directory
&
for phone it will search from registered users table 
if present there
	If already in contact outputs name, phone and email
	If not in contact outputs only name and phone
Else search the global directory for matching phone nos.

