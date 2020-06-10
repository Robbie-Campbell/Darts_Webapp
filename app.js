// The variables needed to add event listeners and will be referenced through
// more than one function
const number_of_players = document.getElementById("number_of_players");
const player_name = document.querySelector(".player_name");
const body = document.querySelector(".body");
const enter_number_button = document.querySelector(".enter_number");
const enter_player_button = document.querySelector(".enter_player")
const names = document.querySelector(".names")
const setup = document.querySelector(".setup")
const how_many = document.querySelector(".how_many")
const set_players = document.querySelector(".set_players")
const score_updates = document.querySelector(".score_updates");
const restart =  document.getElementById("restart")

// A variable which is assigned in enter_number_button but used when entering 
// players.
let total


// A function which sets how many players are to be added
enter_number_button.addEventListener("click", ()=>{
    total =  number_of_players.value;
    how_many.textContent = "Enter the player names";
    set_players.remove();
    names.style.visibility = "visible";
    enter_number_button.disabled = true;
}) 

/* 
This function creates DOM elements which are can be referenced for later use.
Many of these variables are created with ID's so they can be referenced 
when implementing new scores etc. All of the elements created here are put into
the playernames table.
*/
function create_new_player(player){
    

    // Create the table elements
    let newRow = document.createElement('tr');
    let playerCol = document.createElement('th');
    let score = document.createElement("th");
    let average = document.createElement("th");
    let thrown = document.createElement("th");

    // Set text of table elements
    playerCol.textContent = player;
    playerCol.id = "player_name"+i;
    score.textContent = "Score required";
    average.textContent = "3 Dart average";
    thrown.textContent = "Darts Thrown";

    // Create the number values
    let numbers = document.createElement("tr");
    let blankCol = document.createElement("td");
    let score_value = document.createElement("td");
    let average_score = document.createElement("td");
    let thrown_value = document.createElement("th");

    // Set number elements values and give them ID's
    score_value.textContent = 501;
    score_value.id = "score_value"+i;
    average_score.textContent = 0;
    average_score.id = "average_score"+i;
    thrown_value.textContent = 0;
    thrown_value.id = "thrown_value"+i;

    // Place all of the variables into the player_names table rows
    newRow.appendChild(playerCol);
    newRow.appendChild(score);
    newRow.appendChild(average);
    newRow.appendChild(thrown);
    numbers.appendChild(blankCol);
    numbers.appendChild(score_value);
    numbers.appendChild(average_score);
    numbers.appendChild(thrown_value);

    // Place the rows onto the table
    document.querySelector(".playernames").appendChild(newRow);
    document.querySelector(".playernames").appendChild(numbers);
}

// This is the area that marks scores
function scoreboard(){

    // Creates elements for each name input
    let newdiv = document.createElement("div");
    let nameOfPlayer = document.createElement("p");
    let add_score = document.createElement("button");
    let score_input = document.createElement("input");

    // Get the players name and set to each score element
    playerID = document.getElementById("player_name"+i);
    nameOfPlayer = playerID.textContent;

    // Create IDs for each player input
    score_input.id = "score"+i;
    add_score.id = i;
    add_score.classList.add("btn-primary")
    add_score.textContent = "Add your score!";

    // Add all elements to a new div
    newdiv.append(nameOfPlayer);
    newdiv.append(score_input);
    newdiv.appendChild(add_score);

    // Add to DOM
    score_updates.appendChild(newdiv);
}


// Create an index variable to end the loop
let i = 0

// A function which adds players to the DOM
enter_player_button.addEventListener("click", ()=>{
    i++
    if (i <= total){
        create_new_player(player_name.value)
        scoreboard()
        console.log(score_updates)

        // If statement to remove the input panel
        if (i == total){
            setup.classList.add("panel_remove")
            names.style.visibility = "hidden"
            score_updates.classList.add(".dart_add")
        }
    }
})

let player_names = document.querySelector(".playernames");
let button_list = document.getElementById("button_list");

// Variable for the winner id.
let winner = document.querySelector(".winner")

// Get the element, add a click listener to find the specific ID of each button
// press. This is the full game code.
button_list.addEventListener("click", function(e) {
	if(e.target && e.target.nodeName == "BUTTON") {

        // These variables are used to get the button ID
        let i = document.getElementById(e.target.id);
        let index = i.id;

        // Variables that need to be changed
        let score_id = document.getElementById("score"+index);
        let score_value = document.getElementById("score_value"+index);
        let thrown_value = document.getElementById("thrown_value"+index);
        let thrown_int = +document.getElementById("thrown_value"+index).innerHTML;
        let three_dart_average = document.getElementById("average_score"+index);

        // Update the score of the darts thrown
        score_value.textContent -= parseInt(score_id.value);
        thrown_value.textContent = thrown_int += 3;
        three_dart_average.textContent = Math.floor((501 - +score_value.textContent) / (thrown_int / 3));
        score_id.value = 0;

        // Win conditions
        if (score_value.textContent == 0)
        {
            winner.style.visibility = "visible";
            player_names.style.visibility = "hidden";
            button_list.style.visibility = "hidden";
            winner.textContent = player_name.value + ", You won!";
            restart.style.visibility = "visible";
        }
	}
});

// Restart the game on click
restart.addEventListener("click", () =>{

    // Add and remove elements from the game board
    player_names.style.visibility = "visible";
    button_list.style.visibility = "visible";
    restart.style.visibility = "hidden";
    winner.style.visibility = "hidden";
    for (let index = 0; index < i; index++)
    {
        // Reset the game score but keep the averages
        let reset_score = document.getElementById("score_value"+(index+1));
        reset_score.textContent = "501";
    }
})