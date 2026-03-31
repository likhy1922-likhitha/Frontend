// print all even numbers from 0 to 100
console.log("Even numbers")
let n = 100;
for(i = 1;i<=n;i++){
    if(i%2===0){
        console.log(i);
    }
}

console.log("odd numbers")
// to print odd numbers
let m = 100;
for(i = 1;i<=m;i++){
    if(i%2!==0){
        console.log(i);
    }
}



// create a game where you start with any random game number .Ask the user to keep guessing the game number until the user enters correct value

let gameNum = 25;

let userNum= prompt("Guess the game number: ");

while(userNum!=gameNum){
    userNum= prompt(" you entered the wrong  number please Guess the game number again : ");


}
console.log("congratulations, you enterd the right number.")


num = Math.random()*10
// gives blw 0 to 10 in float type
console.log(num);


num2 = Math.floor(Math.random()*10)
// gives blw 0 to 10 --> integers
console.log(num2);