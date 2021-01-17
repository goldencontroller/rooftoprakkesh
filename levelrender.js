my_level = `........................................
........................................
........................................
........................................
........................................
........................................
........................................
........#..###..####..#.................
.......##.............##..............P.
.@....#.#............>#.#...............
########################################
########################################`;

function setscrolling(playerxpos, levelwidth) {
    if ((-(playerxpos - 426)) < 0 && (-(playerxpos - 426)) > -levelwidth + 852) {
        scrollelems.setAttribute("transform", "translate(" + Math.floor(-(playerxpos - 426)).toString() + ", 0)");
    }
    else {
        scrollelems.setAttribute("transform", "translate(" + Math.floor(((-(playerxpos - 426)) > 0)?0:-levelwidth + 852).toString() + ", 0)");
    }
}

function buildPlatform(x, y, width, height) {
    platform = document.createElementNS(svgns, "rect");
    platform.style.fill = "rgb(0, 120, 0)";
    platform.setAttribute("width", width); platform.setAttribute("height", height);
    platform.setAttribute("x", x); platform.setAttribute("y", y);
    scrollelems.appendChild(platform);
    platform.setAttribute("class", "platform");
    platform.setAttribute("id", (x / 40).toString() + "::" + (y / 40).toString());
    return platform;
}

function levelInit(levelstring) {
    document.getElementById("gameframe").style.backgroundColor = "deepskyblue";

    scrollelems = document.createElementNS(svgns, "g");
    document.getElementById("gameframe").appendChild(scrollelems);

    theMatrix = [];
    for (r = 0; r < 12; r++) { theMatrix.push(my_level.split("\n")[r].split("")); };

    for (r = 0; r < theMatrix.length; r++) {
        for (c = 0; c < theMatrix[r].length; c++) {
            if (theMatrix[r][c] == "@") {
                playerRect = document.createElementNS(svgns, "rect");
                playerRect.style.fill = "rgb(0, 20, 100)";
                playerRect.setAttribute("width", 30); playerRect.setAttribute("height", 50);
                playerRect.setAttribute("x", c * 40); playerRect.setAttribute("y", r * 40);
                playerRect.setAttribute("rx", 30 / 2);
                scrollelems.appendChild(playerRect);
            }
            else if (theMatrix[r][c] == "#") {
                buildPlatform(c * 40, r * 40, 40, 40);
            }
            else if (theMatrix[r][c] == ">") {
                enemy = document.createElementNS(svgns, "rect");
                enemy.style.fill = "rgb(100, 20, 0)";
                enemy.setAttribute("width", 30); enemy.setAttribute("height", 50);
                enemy.setAttribute("x", c * 40); enemy.setAttribute("y", r * 40 - (50 - 40));
                enemy.setAttribute("rx", 30 / 2);
                enemy.setAttribute("class", "enemytype1");
                enemy.dataset.direction = "left";
                scrollelems.appendChild(enemy);
            }
            else if (theMatrix[r][c] == "P") {
                goal = document.createElementNS(svgns, "rect");
                goal.style.fill = "rgb(0, 255, 0)";
                goal.setAttribute("width", 50); goal.setAttribute("height", 50);
                goal.setAttribute("x", c * 40 - (50 - 40) / 2); goal.setAttribute("y", r * 40 - (50 - 40) / 2);
                scrollelems.appendChild(goal);
                goalAnime = document.createElementNS(svgns, "animateTransform");
                goalAnime.setAttribute("attributeType", "xml");
                goalAnime.setAttribute("attributeName", "transform");
                goalAnime.setAttribute("type", "rotate");
                goalAnime.setAttribute("from", "0 " + (c * 40 + 20).toString() + " " + (r * 40 + 20).toString());
                goalAnime.setAttribute("to", "360 " + (c * 40 + 20).toString() + " " + (r * 40 + 20).toString());
                goalAnime.setAttribute("dur", "5s");
                goalAnime.setAttribute("additive", "sum");
                goalAnime.setAttribute("repeatCount", "indefinite");
                goal.appendChild(goalAnime);
            }
        }
    }
}