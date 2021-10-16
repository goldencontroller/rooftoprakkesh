function setscrolling(playerxpos, levelwidth) {
    if ((-(playerxpos - 426)) <= 0 && (-(playerxpos - 426)) >= -levelwidth + 852) {
        scrollelems.setAttribute("transform", "translate(" + Math.floor(-(playerxpos - 426)).toString() + ", 0)");
    }
    else {
        scrollelems.setAttribute("transform", "translate(" + Math.floor(((-(playerxpos - 426)) > 0)?0:-levelwidth + 852).toString() + ", 0)");
    }
}

function buildPlatform(x, y, width, height) {
    platform = document.createElementNS(svgns, "image");
    platform.setAttribute("href", "graphics/brick.svg");
    platform.setAttribute("width", width); platform.setAttribute("height", height);
    platform.setAttribute("x", x); platform.setAttribute("y", y);
    scrollelems.appendChild(platform);
    platform.setAttribute("class", "platform");
    platform.setAttribute("id", (x / 40).toString() + "::" + (y / 40).toString());
    return platform;
}

function levelInit(levelstring) {
    if (level_on < 4) document.getElementById("gameframe").style.background = "linear-gradient(deepskyblue, skyblue)";
    else if (level_on < 7) document.getElementById("gameframe").style.background = "linear-gradient(orange, lightpink)";
    document.getElementById("gameframe").innerHTML = "";

    scrollelems = document.createElementNS(svgns, "g");
    document.getElementById("gameframe").appendChild(scrollelems);

    if (level_on == 1) {
        controls = document.createElementNS(svgns, "image");
        controls.setAttribute("width", 240);
        controls.setAttribute("height", 135);
        controls.setAttribute("href", "graphics/controls.svg");
        controls.setAttribute("x", 160);
        controls.setAttribute("y", 90);
        scrollelems.appendChild(controls);
    }

    theMatrix = [];
    for (r = 0; r < 12; r++) { theMatrix.push(levelstring.split("\n")[r].split("")); };

    for (r = 0; r < theMatrix.length; r++) {
        for (c = 0; c < theMatrix[r].length; c++) {
            if (theMatrix[r][c] == "@") {
                playerRect = document.createElementNS(svgns, "image");
                playerRect.setAttribute("href", "graphics/goodbean.svg");
                playerRect.setAttribute("width", 30); playerRect.setAttribute("height", 50);
                playerRect.setAttribute("x", c * 40); playerRect.setAttribute("y", r * 40);
                scrollelems.appendChild(playerRect);
            }
            else if (theMatrix[r][c] == "#") {
                buildPlatform(c * 40, r * 40, 40, 40);
            }
            else if (theMatrix[r][c] == ">") {
                enemy = document.createElementNS(svgns, "image");
                enemy.setAttribute("href", "graphics/badbean.svg");
                enemy.setAttribute("width", 30); enemy.setAttribute("height", 50);
                enemy.setAttribute("x", c * 40); enemy.setAttribute("y", r * 40 - (50 - 40));
                enemy.setAttribute("class", "enemytype1");
                enemy.dataset.direction = "left";
                scrollelems.appendChild(enemy);
            }
            else if (theMatrix[r][c] == "2") {
                enemy = document.createElementNS(svgns, "image");
                enemy.setAttribute("href", "graphics/badbean.svg");
                enemy.setAttribute("width", 30); enemy.setAttribute("height", 50);
                enemy.setAttribute("x", c * 40); enemy.setAttribute("y", r * 40 - (50 - 40));
                enemy.setAttribute("class", "enemytype2");
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

                if (level_on = 3) {
                    var srinath = document.createElementNS(svgns, "image");
                    srinath.setAttribute("href", "graphics/badbean.svg");
                    srinath.setAttribute("width", 30); srinath.setAttribute("height", 50);
                    srinath.setAttribute("x", c * 40); srinath.setAttribute("y", r * 40 - (50 - 40));
                    srinath.setAttribute("class", "w1srinath");
                    scrollelems.appendChild(srinath);

                    goal.dataset.originalY = goal.getAttribute("y");
                    goal.setAttribute("y", 1000);
                    goal.setAttribute("fill-opacity", 0);
                }
            }
        }
    }
}
