let writer = document.getElementById("username");
let result = document.getElementById("result");

writer.addEventListener("input", function() {
    result.textContent = "Hello, " + writer.value + "!";
});