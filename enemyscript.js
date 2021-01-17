playerTouchingEnemy = false;
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
            }
        } else {
            enemy.setAttribute("x", Math.floor(parseFloat(enemy.getAttribute("x")) + 1));
            focused_x = Math.ceil(parseFloat(enemy.getAttribute("x") - (40 - 30)) / 40);
            focused_y = Math.floor(parseFloat(enemy.getAttribute("y")) / 40) + 1;
            focused_brick_wall = document.getElementById(focused_x.toString() + "::" + focused_y.toString());
            focused_brick_gap = document.getElementById(focused_x.toString() + "::" + (focused_y + 1).toString());
            if (document.body.contains(focused_brick_wall) || !(document.body.contains(focused_brick_gap))) {
                enemy.dataset.direction = "left";
            }
        }
        if (touching(enemy, playerRect)) {
            playerTouchingEnemy = true;
        }
    }
}