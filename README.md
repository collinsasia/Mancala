![oware](https://user-images.githubusercontent.com/106357786/173099092-48e5b1ea-0dd0-4c41-b462-61cd16095d0c.png)
# Mancala
Oware

http://127.0.0.1:5500/index.html

Background:

Oware is the strategy game among the mancala game family. This game is played in various regions in Ghana and translate as "He She Marries". It is believed that this game is to be the result of a wedding between two after attending social events and gatherings among the Asanti people. It is also used in educational value for mathematical development.

Equipment & Description

- Oware Board
- 48 seeds
- 12 slots
- six houses / each side
- "Score House"
Most oware boards have two sides to
 them and a "score house at each end.


Source:

Devloping and creating my personal Oware/Mancala board was extremely difficult. As someone who is fairly new to SE utilized a skills that they already know; Research. By researching other examples and guidlines , I was able to at least able to understand the fundamentals. I tried my best to avoid the typical board or outline at least but still needed guidance. Below are my helpful sources.

How to code Mancala: https://github.com/phillippelevidad/mancala-js

Project game - awari: https://stackoverflow.com/questions/23462096/project-for-the-game-oware

CodePen: https://codepen.io/elegantlytragic/pen/PqObLz





Obective/Pseudocode:

In each house there are four seeds from the start of the game. The objective in winning is to obtain more seed than your opponent. As there are an even amount of seeds, it is possible for the game to end in a ddraw or sufficient enough to have a winner with at least 25 seeds.
    On each turn, a player chooses one of the six houses under their control. All seeds within that house should be distributed one by one, counter-clockwise from the selected house; "Sowing seeds". However seeds are not distributed into the either of the score houseswhen sowing.
Note: If a house has 12 seeds or more it must be placed in that player's score house.

Its smart to make a move that allows the opponent to continue playing. If an opponents house are all empty the current player must make a move that gives the opponent seeds. If that move is inpossible then the current player has captured majority of the seeds and they have WON.

Conditions:

The game has ended if a player has captured 25 or more seeds or both players have taken 24 seeds(DRAW).  -->

**Pseudocode**

Make sure that you have all equipment that contribute to your board
The amount of Marbles in each "House"
The Total amount of marbles 

 When going first:
  Select House counter-Clockwise
   The marbles should move around the board until it reaches the "score house"
     Go to the next house if the hole is empty to continue game
       If you dont have any marbles to play with continue , Else count who has the most marbles
         Who every have the most NKONIM!(Victory)



<!-- # Mancala






