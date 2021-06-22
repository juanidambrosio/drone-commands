# Instructions to run the application
* Execute `npm i`
* Execute `npm start`
* Enter a valid area
* Enter valid initial position
* Enter commands for the drone
* Choose if you want to add another drone or not
* Wait for the console to print the final position of each drone

# Notes
* Instructions apart from L,R or M wont be taken into account, they will be just ignored
* Input is case insensitive, so lower caps are also valid to set direction or instructions
* Area to use the drones is restricted to the one defined at the beginning
  * If any drone trepasses the perimeter, it will be out of bounds immediately, and its final position wont be calculated
* Initial position for the drones must be within the area defined