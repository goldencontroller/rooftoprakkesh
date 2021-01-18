playerStunCount = 0;
function enemyscript() {
    for (enemy of document.getElementsByClassName("enemytype1")) {
        if (enemy.dataset.direction == "left") {
            enemy.setAttribute("x", Math.floor(parseFloat(enemy.getAttribute("x")) - 1));
            focused_x = Math.floor(parseFloat(enemy.getAttribute("x")) / 40);
            focused_y = Math.floor(parseFloat(enemy.getAttribute("y")) / 40) + 1;
            focused_brick_wall = document.getElementById(focused_x.toString() + "::" + focused_y.toString());
            focused_brick_gap = document.getElementById(focused_x.toString() + "::" + (focused_y + 1).toString());
            if (document.body.contains(focused_brick_wall) || !(document.body.contains(focused_brick_gap))) {
                enemy.dataset.direction = "right";
                enemy.setAttribute("href", "graphics/badbean2.svg");
            }
        } else {
            enemy.setAttribute("x", Math.floor(parseFloat(enemy.getAttribute("x")) + 1));
            focused_x = Math.ceil(parseFloat(enemy.getAttribute("x") - (40 - 30)) / 40);
            focused_y = Math.floor(parseFloat(enemy.getAttribute("y")) / 40) + 1;
            focused_brick_wall = document.getElementById(focused_x.toString() + "::" + focused_y.toString());
            focused_brick_gap = document.getElementById(focused_x.toString() + "::" + (focused_y + 1).toString());
            if (document.body.contains(focused_brick_wall) || !(document.body.contains(focused_brick_gap))) {
                enemy.dataset.direction = "left";
                enemy.setAttribute("href", "graphics/badbean.svg");
            }
        }
        if (touching(enemy, playerRect)) {
            velocity_right += (enemy.dataset.direction == "right")?10:-10;
            playerStunCount = 21;
        }
    }
    for (enemy of document.getElementsByClassName("enemytype2")) {
        if (frame % 50 == 0) {
            if (parseFloat(enemy.getAttribute("x")) > parseFloat(playerRect.getAttribute("x"))) {
                enemy.setAttribute("href", "graphics/badbean.svg");
            }
            else {
                enemy.setAttribute("href", "graphics/badbean2.svg");
            }
            if (Math.abs(playerRect.getAttribute("x") - enemy.getAttribute("x")) < 500) {
                bullet = document.createElementNS(svgns, "rect");
                bullet.setAttribute("width", 10);
                bullet.setAttribute("height", 10);
                bullet.setAttribute("rx", 5);
                bullet.setAttribute("x", parseFloat(enemy.getAttribute("x")) + 15);
                bullet.setAttribute("y", parseFloat(enemy.getAttribute("y")) + 25);
                scrollelems.appendChild(bullet);
                bullet.dataset.doNotKillEnemy = "1";
                fireangle = Math.atan2(parseFloat(bullet.getAttribute("y")) - parseFloat(playerRect.getAttribute("y")) , parseFloat(playerRect.getAttribute("x")) - parseFloat(bullet.getAttribute("x")));
                bullet.dataset.angle = fireangle;
                bullet.setAttribute("class", "bullet");
            }
        }
    }
}