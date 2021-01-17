function touching(rect1, rect2) {
    return !(
        ((parseFloat(rect1.getAttribute("y")) + parseFloat(rect1.getAttribute("height"))) < (parseFloat(rect2.getAttribute("y")))) ||
        (parseFloat(rect1.getAttribute("y")) > (parseFloat(rect2.getAttribute("y")) + parseFloat(rect2.getAttribute("height")))) ||
        ((parseFloat(rect1.getAttribute("x")) + parseFloat(rect1.getAttribute("width"))) < parseFloat(rect2.getAttribute("x"))) ||
        (parseFloat(rect1.getAttribute("x")) > (parseFloat(rect2.getAttribute("x")) + parseFloat(rect2.getAttribute("width"))))
    );
}

function touching_direction(rect1, rect2) {
    rect1_bottom = parseFloat(rect1.getAttribute("y")) + parseFloat(rect1.getAttribute("height"));
    rect2_bottom = parseFloat(rect2.getAttribute("y")) + parseFloat(rect2.getAttribute("height"));
    rect1_right = parseFloat(rect1.getAttribute("x")) + parseFloat(rect1.getAttribute("width"));
    rect2_right = parseFloat(rect2.getAttribute("x")) + parseFloat(rect2.getAttribute("width"));
    b_collision = rect1_bottom - parseFloat(rect2.getAttribute("y"));
    t_collision = rect2_bottom - parseFloat(rect1.getAttribute("y"));
    l_collision = rect1_right - parseFloat(rect2.getAttribute("x"));
    r_collision = rect2_right - parseFloat(rect1.getAttribute("x"));
    if (t_collision < b_collision && t_collision < l_collision && t_collision < r_collision) {
        return "bottom";
    }
    if (b_collision < t_collision && b_collision < l_collision && b_collision < r_collision) {
        return "top";
    }
    if (l_collision < r_collision && l_collision < t_collision && l_collision < b_collision) {
        return "left";
    }
    if (r_collision < l_collision && r_collision < t_collision && r_collision < b_collision) {
        return "right";
    }
}