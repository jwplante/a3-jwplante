## CS Clicker (v 2.0)

Link: https://a3-jwplante.glitch.me/

CS Clicker is a game inspired by idle games such as Cookie Clicker and Paperclips, where the main objective is to push one button to increment a counter, and this counter can be used to purchase other items to increase this counter by a set rate. The goal of this version of the application is to add a revamped user interface, login screen, and persistent state across server sessions. The main challenges when realizing the application were rewriting most of the server code for React (resulting in dealing with a large amount of technical debt for the duration of the project in order to get it in a functioning state), and finding applicable express middleware, as most of the application was designed without it initially. I used Passport to implement authentication functionality and lowdb for the database, as they were the easiest to implement at the time given the timeframe and they were the most documented. I used NES.css (Link here: https://nostalgic-css.github.io/NES.css/) since it was the exact aesthetic that was initially desired in the application during Assignment 2. The five middleware packages I used for this project are:
- express-session - Middleware responsible for maintaining cookie sessions in Express.
- passport - Authentication middleware that handles both error handling and authenticating users.
- helmet - Security suite that provides automatic protection for certain attacks such as XSS attacks, MIME sniffing and more.
- body-parser - Automatically parses the body of a response to extract JSON objects.
- serve-favicon - Allows the Express server to serve favicons to the user.

## Technical Achievements
Unfortunately, I was unable to make any additional technical advancements due to time constraints. However, if given more time, I would have done the following. I will eventually implement these, since I plan to continue working on the game sometime after the assignment is finished.
- **Improved Game Purchase Balance** - According to user tests that were conducted (as seen in the Design Achievements Section), I would have given greater incentive to purchasing late-game items by improving the price/(loc/s) ratio, as currently it is most efficient to buy Hobbyists to increase the loc/s with the least amount of lines of code.
- **Hashing Passwords** - To improve security of the site, I would have encrypted the passwords when they are stored in the database.

### Design/Evaluation Achievements
- **Included About Section**: I included a plot summary of the game based on my plot summary from the previous assignment to give incentive for the player to keep playing the game, and included my social media links so they can follow my other work and see my resume.
- **User Testing**: I tested CS Clicker with two other users in an attempt to find any bugs and to gain insight for any future builds of the game. Here are my main findings:
  - The UI elements are too large for the page itself, since users have to scroll down to buy items. 
  - The game is fundamentally unbalanced in favor of the Hobbyists due to their high (loc/s)/price ratio, meaning that endgame purchases are useless.
  - The game could be improved to include support for other screen sizes/devices (I also tested the page with a text-only browser and while the website was readable, it was nonfunctional).
  - Clicking the button is pointless after the early-game due to it increasing the counter by one. This could be fixed by having a scale that can increase based on the number of purchased items or as an upgrade itself.
  - The clicker button could be changed from blue to green to have a more consistent colorscheme (This change has already been implemented).
