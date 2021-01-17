svgns = "http://www.w3.org/2000/svg";

cursorpos = [0, 0];
updateCursorPos = function(e) {
    posOffsetData = document.getElementById("gameframe").getBoundingClientRect();
    cursorpos[0] = e.clientX - posOffsetData.x - parseInt(scrollelems.getAttribute("transform").split("translate(")[1]);
    cursorpos[1] = e.clientY - posOffsetData.y;
}
window.addEventListener("mousemove", updateCursorPos);
clicked = false;
document.getElementById("gameframe").addEventListener("click", function(e) {
    updateCursorPos(e);
    clicked = true;
});

frame = 0;

function load() {

    collisions = detect_platform_collisions();

    enemyscript();
    bulletscript();
    movePlayer();

    setscrolling(parseFloat(playerRect.getAttribute("x")), my_level.split("\n")[0].split("").length * 40);

    if (parseFloat(playerRect.getAttribute("y")) > 480 || playerTouchingEnemy) {
        alert("loser");
    }
    else if (frame % 21 == 0) {
        if (touching(playerRect, goal)) {
            alert("winner");
        }
        else {
            requestAnimationFrame(load);
        }
    }
    else {
        requestAnimationFrame(load);
    }

    frame++;

}

levelInit(my_level);
load();