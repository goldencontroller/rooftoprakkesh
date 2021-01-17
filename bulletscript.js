function bulletscript() {
    speed = 10;
    i = 0;
    while (true) {
        if (i >= document.getElementsByClassName("bullet").length) {
            break;
        }
        bullet = document.getElementsByClassName("bullet")[i];
        bulletx = parseFloat(bullet.getAttribute("x"));
        bullety = parseFloat(bullet.getAttribute("y"));
        bullet.setAttribute("x", Math.floor(bulletx + Math.cos(bullet.dataset.angle) * speed));
        bullet.setAttribute("y", Math.floor(bullety - Math.sin(bullet.dataset.angle) * speed));
        if (bulletx < 0 || bullety < 0 || bulletx > my_level.split("\n")[0].split("").length * 40 || bullety > my_level.split("\n").length * 40) {
            bullet.remove();
            i -= 1;
        }
        else if (document.getElementById(Math.floor(parseFloat(bullet.getAttribute("x")) / 40).toString() + "::" + Math.floor(parseFloat(bullet.getAttribute("y")) / 40).toString())) {
            bullet.remove();
            i -= 1;
        }
        else {
            for (enemy of document.getElementsByClassName("enemytype1")) {
                if (touching(enemy, bullet)) {
                    bullet.remove();
                    enemy.remove();
                    i -= 1;
                }
            }
        }
        i++;
    }
}