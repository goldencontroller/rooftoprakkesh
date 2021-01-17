velocity_up = 0;
velocity_right = 0;

function detect_platform_collisions() {
    out = {
        touching_top: false,
        touching_bottom: false,
        touching_left: false,
        touching_right: false
    };

    for (c = Math.floor(parseFloat(playerRect.getAttribute("x")) / 40) - 2; c < Math.ceil(parseFloat(playerRect.getAttribute("x")) / 40) + 2; c++) {
        for (r = Math.floor(parseFloat(playerRect.getAttribute("y")) / 40) - 2; r < Math.ceil(parseFloat(playerRect.getAttribute("y")) / 40) + 2; r++) {
            platform = document.getElementById(c.toString() + "::" + r.toString());
            if (platform) {
                if (touching(playerRect, platform)) {
                    collision = touching_direction(playerRect, platform);
                    if (collision == "left") {
                        out.touching_left = true;
                        playerRect.setAttribute("x", parseFloat(platform.getAttribute("x")) - parseFloat(playerRect.getAttribute("width")));
                        velocity_right = 0;
                    }
                    else if (collision == "right") {
                        out.touching_right = true;
                        playerRect.setAttribute("x",  parseFloat(platform.getAttribute("x")) + parseFloat(platform.getAttribute("width")));
                        velocity_right = 0;
                    }
                    else if (collision == "bottom") {
                        out.touching_bottom = true;
                        playerRect.setAttribute("y", parseFloat(platform.getAttribute("y")) + parseFloat(platform.getAttribute("height")));
                    }
                    else if (collision == "top") {
                        out.touching_top = true;
                        playerRect.setAttribute("y", parseFloat(platform.getAttribute("y")) - parseFloat(playerRect.getAttribute("height")));
                    }
                }
            }
        }
    }

    return out;
}

function movePlayer() {
    if (collisions.touching_bottom) {
        velocity_up = -1;
    }
    
    if (!(collisions.touching_top)) {
        velocity_up = velocity_up - 0.5;
    }
    else {
        velocity_up = 0;
    }

    velocity_right *= 0.75;

    if (clicked && playerStunCount == 0) {
        clicked = false;
        bullet = document.createElementNS(svgns, "rect");
        bullet.setAttribute("width", 10);
        bullet.setAttribute("height", 10);
        bullet.setAttribute("rx", 5);
        bullet.setAttribute("x", parseFloat(playerRect.getAttribute("x")) + 15);
        bullet.setAttribute("y", parseFloat(playerRect.getAttribute("y")) + 25);
        scrollelems.appendChild(bullet);
        fireangle = Math.atan2((parseFloat(bullet.getAttribute("y")) - cursorpos[1]) , (cursorpos[0] - parseFloat(bullet.getAttribute("x"))));
        bullet.dataset.angle = fireangle;
        bullet.setAttribute("class", "bullet");
        velocity_right -= 10 * Math.cos(fireangle);
        velocity_up -= 10 * Math.sin(fireangle);
    }
    if (playerStunCount > 0) {
        playerStunCount -= 1;
    }

    playerRect.setAttribute("y", Math.floor(parseFloat(playerRect.getAttribute("y")) - velocity_up));
    if (Math.abs(velocity_right) >= 0.5) {
        playerRect.setAttribute("x", Math.floor(parseFloat(playerRect.getAttribute("x")) + velocity_right));
    }
}