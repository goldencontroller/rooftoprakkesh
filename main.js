svgns = "http://www.w3.org/2000/svg";

cursorpos = [0, 0];
updateCursorPos = function(e) {
    posOffsetData = document.getElementById("gameframe").getBoundingClientRect();
    cursorpos[0] = ((e.pageX - posOffsetData.x) * 852 / posOffsetData.width) - parseInt(scrollelems.getAttribute("transform").split("translate(")[1]);
    cursorpos[1] = (e.pageY - posOffsetData.y) * 480 / posOffsetData.height;
}
clicked = false;
document.getElementById("gameframe").addEventListener("click", function(e) {
    updateCursorPos(e);
    clicked = true;
});

frame = 0;

level_on = 1;

function load() {

    collisions = detect_platform_collisions();

    enemyscript();
    bulletscript();
    movePlayer();

    setscrolling(parseFloat(playerRect.getAttribute("x")), my_level.split("\n")[0].split("").length * 40);

    if (parseFloat(playerRect.getAttribute("y")) > 480) {
        alert("loser");
    }
    else if (frame % 21 == 0) {
        if (touching(playerRect, goal)) {
            level_on++;
            document.getElementById("gameframe").style.background = "black";
            scrollelems.style.opacity = "0";
            setTimeout(function() {
                generate_level();
                levelInit(my_level);
                document.getElementById("gameframe").style.background = "linear-gradient(deepskyblue, skyblue)";
                scrollelems.style.opacity = "1";
                load();
            }, 2000);
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