(function () {

    var myCanvas = document.getElementById("myCanvas");
    var canvasReference = myCanvas.getContext("2d");

    var x, y;
    var dx = 2;
    var dy = -2;
    var ballRadius = 10;
    var ballColor = "#ffb900";

    var paddleHeight = 10;
    var paddleWidth = 75;
    var paddleX = (myCanvas.width - paddleWidth) / 2;
    var paddleColor = "#3d7e9a";

    var rightPressed = false;
    var leftPressed = false;

    var brickRowCount = 3;
    var brickColumnCount = 5;
    var brickWidth = 75;
    var brickHeight = 20;
    var brickPadding = 10;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 30;
    var bricks = [];
    var brickColor = "#3d7e9a";
    for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
    var score = 0;
    var scoreColor = "#3d7e9a";

    var lives = 3;
    var livesColor = "#3d7e9a"

    x = myCanvas.width / 2;
    y = myCanvas.height - 30;

    draw = () => {

        canvasReference.clearRect(0, 0, myCanvas.width, myCanvas.height);
        drawBrick();
        drawBall();
        drawPaddle();
        collisionDetection();
        drawScore();
        drawLives();

        if (x + dx > myCanvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if (y + dy < ballRadius) {
            dy = -dy;
        }
        else if (y + dy > myCanvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
            else {
                lives--;
                if (!lives) {
                    alert("GAME OVER");
                    document.location.reload();
                }
                else {
                    x = myCanvas.width / 2;
                    y = myCanvas.height - 30;
                    dx = 2;
                    dy = -2;
                    paddleX = (myCanvas.width - paddleWidth) / 2;
                }
            }

        }

        if (rightPressed && paddleX < myCanvas.width - paddleWidth) {
            paddleX += 7;
        }
        else if (leftPressed && paddleX > 0) {
            paddleX -= 7;
        }
        x += dx;
        y += dy;
        requestAnimationFrame(draw);
    }
    drawBall = () => {
        canvasReference.beginPath();
        canvasReference.arc(x, y, ballRadius, 0, Math.PI * 2);
        canvasReference.fillStyle = ballColor;
        canvasReference.fill();
        canvasReference.closePath();


    }
    drawPaddle = () => {
        canvasReference.beginPath();
        canvasReference.rect(paddleX, myCanvas.height - paddleHeight, paddleWidth, paddleHeight);
        canvasReference.fillStyle = paddleColor;
        canvasReference.fill();
        canvasReference.closePath();
    }
    drawBrick = () => {
        for (var c = 0; c < brickColumnCount; c++) {
            for (var r = 0; r < brickRowCount; r++) {
                if (bricks[c][r].status == 1) {

                    var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                    var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    canvasReference.beginPath();
                    canvasReference.rect(brickX, brickY, brickWidth, brickHeight);
                    canvasReference.fillStyle = brickColor;
                    canvasReference.fill();
                    canvasReference.closePath();
                }
            }
        }
    }
    keyUpHandler = (e) => {
        if (e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = false;
        }
        else if (e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = false;
        }

    }
    keyDownHandler = (event) => {
        if (event.key == "Right" || event.key == "ArrowRight") {
            rightPressed = true;
        }
        else if (event.key == "Left" || event.key == "ArrowLeft") {
            leftPressed = true;
        }

    }
    mouseMoveHandler = (e) => {
        var relativeX = e.clientX - myCanvas.offsetLeft;
        if (relativeX > 0 && relativeX < myCanvas.width) {
            paddleX = relativeX - paddleWidth / 2;
        }
    }
    collisionDetection = () => {
        for (var c = 0; c < brickColumnCount; c++) {
            for (var r = 0; r < brickRowCount; r++) {
                var b = bricks[c][r];
                if (b.status === 1) {
                    if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                        dy = -dy;
                        b.status = 0;
                        score++;
                        if (score === brickColumnCount * brickRowCount) {
                            alert("YOU HAVE WON!");
                            document.location.reload();
                            clearInterval(interval);
                        }
                    }
                }
            }
        }
    }
    drawScore = () => {
        if (score != brickRowCount * brickColumnCount) {
            canvasReference.font = "16px Arial";
            canvasReference.fillStyle = scoreColor;
            canvasReference.fillText("Score: " + score, 8, 20);
        }
    }
    drawLives = () => {
        canvasReference.font = "16px Arial";
        canvasReference.fillStyle = livesColor;
        canvasReference.fillText("Lives: " + lives, myCanvas.width - 65, 20);
    }
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);
    requestAnimationFrame(draw);

})();