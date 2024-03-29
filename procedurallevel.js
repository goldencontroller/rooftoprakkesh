var my_level = `........................................
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
    var level_split = new Array(12);
    for (var i = 0; i < level_split.length; i++) {
        level_split[i] = new Array(69);
        for (var j = 0; j < level_split[i].length; j++) {
            level_split[i][j] = ".";
        }
    }
    var drawx = 1;
    for (var i = 0; i < 5; i++) {
        var building_length = 8 + Math.floor(Math.random() * 3);
        var building_height = 2 + Math.floor(Math.random() * 3);
        if (i == 0) {
            level_split[level_split.length - 2 - building_height][drawx + 1] = "@";
        }
        if (i == 4) {
            level_split[level_split.length - 2 - building_height][drawx + building_length - 2] = "P";
        }
        for (var j = level_split.length - building_height; j < level_split.length; j++) {
            for (var k = 0; k < building_length; k++) {
                level_split[j][k + drawx] = "#";
                if (i > 0 && j == level_split.length - building_height && Math.floor(Math.random() * building_length) < 2) {
                    if (Math.floor(Math.random() * 3)) {
                        level_split[j - 1][k + drawx] = ">";
                    }
                    else {
                        level_split[j - 1][k + drawx] = "2";
                    }
                }
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