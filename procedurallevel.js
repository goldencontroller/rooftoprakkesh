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

function generate_level() {
    level_split = new Array(12);
    for (i = 0; i < level_split.length; i++) {
        level_split[i] = new Array(69);
        for (j = 0; j < level_split[i].length; j++) {
            level_split[i][j] = ".";
        }
    }
    drawx = 1;
    for (i = 0; i < 5; i++) {
        building_length = 10;
        building_height = 2;
        if (i == 0) {
            level_split[level_split.length - 1 - building_height][drawx + 1] = "@";
        }
        if (i == 4) {
            level_split[level_split.length - 2 - building_height][drawx + building_length - 2] = "P";
        }
        for (j = level_split.length - building_height; j < level_split.length; j++) {
            for (k = 0; k < building_length; k++) {
                level_split[j][k + drawx] = "#";
            }
        }
        drawx += building_length + 3;
    }
    for (r = 0; r < level_split.length; r++) {
        level_split[r] = level_split[r].join("");
    }
    my_level = level_split.join("\n");
}

generate_level();