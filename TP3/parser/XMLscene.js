var DELTA_TIME = 50;
var PIECE_ANIMATION_VELOCITY = 5;
function XMLscene() {
    CGFscene.call(this);
}
XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;
XMLscene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);
    this.initCameras();
    this.initLights();
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.frontFace(this.gl.CCW);
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.cullFace(this.gl.BACK);
    this.enableTextures(true);
    this.axis = new CGFaxis(this);
    this.lightStates = [];
    this.materials = [];
    this.textures = [];
    this.curCamera = 0;
    this.curMaterial = 0;
    //Animation
    this.setUpdatePeriod(DELTA_TIME);
    this.startGameDifficulty = '2 Players';
    this.startGameDifficulties = ['2 Players', 'vs. Easy CPU', 'vs. Medium CPU', 'vs. Hard CPU', 'vs. Very Hard CPU', 'CPU vs. CPU Easy', 'CPU vs. CPU Medium', 'CPU vs. CPU Hard', 'CPU vs. CPU Very Hard'];
    this.scenarioNames = ["Rusty Vision", "Other SHIT"];
    this.scenarioName = "Rusty Vision";
    this.curCameraName = 'Top View';
    this.camerasName = ['Top View', 'Player 1', 'Player 2'];
    this.timeoutTurn = 25;
    this.currTime = 0;
    this.board = new Chessboard(this,12,12,new Texture("./textures/stairsWood.jpg",1,1),0,0,[1, 1, 1, 1],[0, 0, 0, 1],[0.5, 0.5, 1, 1]);

    this.whitePiecesAppearance = new CGFappearance(this);
    this.whitePiecesAppearance.loadTexture("./textures/pecaBranca.png");
    this.blackPiecesAppearance = new CGFappearance(this);
    this.blackPiecesAppearance.loadTexture("./textures/pecaPreta.png");

    this.blackPieces = [];
    for (i = 0; i < 20; i++) {
        this.blackPieces.push(new Piece(this, this.blackPiecesAppearance));
    }
    this.whitePieces = [];
    for (i = 0; i < 20; i++) {
        this.whitePieces.push(new Piece(this, this.whitePiecesAppearance));
    }
    this.pickingCells = [];
    for (i = 0; i < 144; i++) {
        this.pickingCells.push(new Plane(this,1,1,1,1));
    }
    this.blackPickingPieces = [];
    for (i = 0; i < 20; i++) {
        this.blackPickingPieces.push(new Cylinder(this,0.5,0.5,0.2,5,1));
    }
    this.whitePickingPieces = [];
    for (i = 0; i < 20; i++) {
        this.whitePickingPieces.push(new Cylinder(this,0.5,0.5,0.2,5,1));
    }
    // Enables picking
    this.setPickEnabled(true);
    //Game
    //this.game = new Game(this);

    //STATES: 1, 2, 3
    this.movingPieceState = 1;
    this.movingPieceStartTime;
    this.movingPieceGameIndex;
    this.movingPieceAnimation = new PieceAnimation(PIECE_ANIMATION_VELOCITY);

}
XMLscene.prototype.setInterface = function(interface) {
    this.interface = interface;
}
XMLscene.prototype.initLights = function() {
    this.lights[0].setPosition(2, 3, 3, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].update();
}
;
XMLscene.prototype.graphLights = function() {
    var lights = this.graph.lights;
    var i = 0;
    for (id in lights) {
        this.lights[i].setAmbient(lights[id].getAmbient().r, lights[id].getAmbient().g, lights[id].getAmbient().b, lights[id].getAmbient().a);
        this.lights[i].setDiffuse(lights[id].getDiffuse().r, lights[id].getDiffuse().g, lights[id].getDiffuse().b, lights[id].getDiffuse().a);
        this.lights[i].setSpecular(lights[id].getSpecular().r, lights[id].getSpecular().g, lights[id].getSpecular().b, lights[id].getSpecular().a);
        if (!lights[id].isOmni()) {
            this.lights[i].setPosition(lights[id].getLocation().x, lights[id].getLocation().y, lights[id].getLocation().z, 1);
            this.lights[i].setSpotCutOff(lights[id].getAngle() * (Math.PI / 180.0));
            var locationX = lights[id].getLocation().x;
            var locationY = lights[id].getLocation().y;
            var locationZ = lights[id].getLocation().z;
            var targetX = lights[id].getTarget().x;
            var targetY = lights[id].getTarget().y;
            var targetZ = lights[id].getTarget().z;
            this.lights[i].setSpotDirection(targetX - locationX, targetY - locationY, targetZ - locationZ);
            this.lights[i].setSpotExponent(lights[id].getExponent());
        } else
            this.lights[i].setPosition(lights[id].getLocation().x, lights[id].getLocation().y, lights[id].getLocation().z, lights[id].getLocation().w);
        if (lights[id].isEnabled()) {
            this.lights[i].enable();
        } else {
            this.lights[i].disable();
        }
        this.lights[i].setVisible(true);
        i++;
    }
    this.interface.addLights(lights);
}
;
XMLscene.prototype.initCameras = function() {
    this.cameras = [];
    this.cameras['Top View'] = new CGFcamera(0.5,0.1,100,vec3.fromValues(5.5, 5.5, 30),vec3.fromValues(5.5, 5.5, 0));
    this.cameras['Player 1'] = new CGFcamera(0.5,0.1,100,vec3.fromValues(5.5, -15, 25),vec3.fromValues(5.5, 5.5, 0));
    this.cameras['Player 2'] = new CGFcamera(-0.5,0.1,100,vec3.fromValues(5.5, 26, 25),vec3.fromValues(5.5, 5.5, 0));
    this.camera = this.cameras['Top View'];
}
;
XMLscene.prototype.graphCameras = function() {
    //Initialize the cameras in function of the views element
    this.cameras = [];
    var views = this.graph.views;
    var defaultView = this.graph.defaultView;
    var i = 0;
    var defaultId;
    for (id in views) {
        var tempView = views[id];
        var angle = tempView.getAngle() * (Math.PI / 180.0);
        var near = tempView.getNear();
        var far = tempView.getFar();
        var fromVec = tempView.getFromVec();
        var toVec = tempView.getToVec();
        var cam = new CGFcamera(angle,near,far,vec3.fromValues(fromVec.x, fromVec.y, fromVec.z),vec3.fromValues(toVec.x, toVec.y, toVec.z));
        this.cameras.push(cam);
        if (defaultView == id) {
            defaultId = i;
        }
        i++;
    }
    this.curCamera = defaultId;
    this.camera = this.cameras[defaultId];
    this.interface.setActiveCamera(this.camera);
}
;
XMLscene.prototype.graphMaterials = function() {
    for (id in this.graph.materials) {
        var tempMat = this.graph.materials[id];
        var tempAppearance = new CGFappearance(this);
        tempAppearance.setAmbient(tempMat.getAmbient().r, tempMat.getAmbient().g, tempMat.getAmbient().b, tempMat.getAmbient().a);
        tempAppearance.setDiffuse(tempMat.getDiffuse().r, tempMat.getDiffuse().g, tempMat.getDiffuse().b, tempMat.getDiffuse().a);
        tempAppearance.setEmission(tempMat.getEmission().r, tempMat.getEmission().g, tempMat.getEmission().b, tempMat.getEmission().a);
        tempAppearance.setSpecular(tempMat.getSpecular().r, tempMat.getSpecular().g, tempMat.getSpecular().b, tempMat.getSpecular().a);
        tempAppearance.setShininess(tempMat.getShininess());
        this.materials[id] = tempAppearance;
    }
}
;
XMLscene.prototype.graphTextures = function() {
    for (id in this.graph.textures) {
        var tempText = this.graph.textures[id];
        this.textures[id] = new CGFtexture(this,tempText.getFile());
    }
}
;
XMLscene.prototype.setDefaultAppearance = function() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
}
;
// Handler called when the graph is finally loaded. 
// As loading is asynchronous, this may be called already after the application has started the run loop
XMLscene.prototype.onGraphLoaded = function() {
    //this.gl.clearColor(this.graph.background[0],this.graph.background[1],this.graph.background[2],this.graph.background[3]);
    //this.gl.clearColor(0.7,0,1,1);
    //this.lights[0].setVisible(true);
    //this.lights[0].enable();
    this.axis = new CGFaxis(this,this.graph.axisLength);
    var background = this.graph.illumination.getBackground();
    var ambient = this.graph.illumination.getAmbient();
    this.gl.clearColor(background.r, background.g, background.b, background.a);
    this.setGlobalAmbientLight(ambient.r, ambient.g, ambient.b, ambient.a);
    //this.graphCameras();
    this.graphLights();
    this.graphMaterials();
    this.graphTextures();
    if(gameState != "MAIN_MENU")
    this.interface.initPlayMode();
    else this.interface.initStartMenu();
}
;
XMLscene.prototype.logPicking = function() {
    if (this.pickMode == false) {
        if (this.pickResults != null && this.pickResults.length > 0) {
            for (var i = 0; i < this.pickResults.length; i++) {
                var obj = this.pickResults[i][0];
                if (obj) {
                    var customId = this.pickResults[i][1];
                    var pickedX = (customId - 1) % 12;
                    var pickedY = Math.floor((customId - 1) / 12);
                    console.log("Picked object: " + obj + ", with pick id " + customId, "  X: " + pickedX + " ,  Y: " + pickedY);
                    if (waitingMoveState == "WAITING_FIRST_PICK") {
                        if (isValidInitialPosition(pickedX + 1, 12 - pickedY)) {
                            setInitialPosition(pickedX + 1, 12 - pickedY);
                            this.board.setSelectedCell(pickedX, pickedY);
                            waitingMoveState = "WAITING_SECOND_PICK";
                        } else {
                            console.log("Pick a valid starting piece");
                        }
                    } else if (waitingMoveState == "WAITING_SECOND_PICK") {
                        if (isValidFinalPosition(pickedX + 1, 12 - pickedY)) {
                            setFinalPosition(pickedX + 1, 12 - pickedY);
                            this.board.clearSelectedCell();
                            movePiece();
                        } else {
                            var initialPos = getInitialPosition();
                            if ((initialPos[0] == pickedX + 1) && (initialPos[1] == 12 - pickedY)) {
                                this.board.clearSelectedCell();
                                waitingMoveState = "WAITING_FIRST_PICK";
                            } else {
                                console.log("Pick a valid finishing piece");
                            }
                        }
                    }
                }
            }
            this.pickResults.splice(0, this.pickResults.length);
        }
    }
}
XMLscene.prototype.display = function() {
    if (gameState == "WAITING_MOVE"){
        if(this.currTime - startTimeoutTime > timeoutTurn){
            window.alert("timeout");
            this.backMenu();
        }
    }else if (gameState != "GAME_OVER"){
        startTimeoutTime = this.currTime;
    }else if (gameState == "GAME_OVER"){
        window.alert("PLAYER " + winner + " WINS!");
        this.backMenu();
    }

    // Picking
    this.logPicking();
    this.clearPickRegistration();
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    this.updateCamera();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();
    // Draw axis
    //this.axis.display();
    this.setDefaultAppearance();
    // ---- END Background, camera and axis setup
    // it is important that things depending on the proper loading of the graph
    // only get executed after the graph has loaded correctly.
    // This is one possible way to do it
    if (this.graph.loadedOk) {
        for (i in this.lights) {
            if (this.lightStates[i]) {
                this.lights[i].enable();
            } else {
                this.lights[i].disable();
            }
            this.lights[i].update();
        }
        if (gameState != "MAIN_MENU") {
             this.processGraph(this.graph.root, new CGFappearance());
         }
    }
    if (gameState == "WAITING_MOVE" && !isMoving) {
        for (x = 0; x < 12; x++) {
            for (y = 0; y < 12; y++) {
                if (this.pickMode == true) {
                    this.pushMatrix();
                    this.translate(x, y, +0.1);
                    this.registerForPick(x + y * 12 + 1, this.pickingCells[x * 12 + y]);
                    this.pickingCells[x * 12 + y].display();
                    this.popMatrix();
                }
            }
        }
    }


    var blackPiecesUsed = 20;
    var whitePiecesUsed = 20;

    if (gameState != "MAIN_MENU") {
        this.pushMatrix();
        this.translate(5.5, 5.5, 0);
        this.scale(12, 12, 1);
        this.board.display();
        this.popMatrix();
 if (isMoving){
            switch (this.movingPieceState) {
                case 1:
                    this.movingPieceAnimation.setMove(move);
                    this.movingPieceStartTime = this.currTime;
                    this.movingPieceGameIndex = gameIndex;
                    this.movingPieceState = 2;
                case 2:
                    var deltaTime = this.currTime - this.movingPieceStartTime;
                    if (deltaTime < this.movingPieceAnimation.getSpan()) {
                        blackPiecesUsed = 0;
                        whitePiecesUsed = 0;
                        var movingMove = this.movingPieceAnimation.getMove();
                        var cell;
                        for (y = 0; y < 12; y++) {
                            for (x = 0; x < 12; x++) {
                                cell = boardHistory[this.movingPieceGameIndex][11 - y][x];
                                this.pushMatrix();
                                if (movingMove[0] == x+1 && movingMove[1] == 12-y) {
                                    this.multMatrix(this.movingPieceAnimation.getTransformation(deltaTime));
                                }
                                if (cell == 0) {
                                } else if (cell == 1) {
                                    this.pushMatrix();
                                    this.translate(x, y, 0);
                                    this.whitePieces[whitePiecesUsed].display();
                                    whitePiecesUsed++;
                                    this.popMatrix();
                                } else if (cell == -1) {
                                    this.pushMatrix();
                                    this.translate(x, y, 0);
                                    this.blackPieces[blackPiecesUsed].display();
                                    blackPiecesUsed++;
                                    this.popMatrix();
                                } else if (cell > 1) {
                                    for (var j = 0; j < cell; j++) {
                                        this.pushMatrix();
                                        this.translate(x, y, j * 0.2);
                                        this.whitePieces[whitePiecesUsed].display();
                                        whitePiecesUsed++;
                                        this.popMatrix();
                                    }
                                } else if (cell < -1) {
                                    for (var j = 0; j > cell; j--) {
                                        this.pushMatrix();
                                        this.translate(x, y, -j * 0.2);
                                        this.blackPieces[blackPiecesUsed].display();
                                        blackPiecesUsed++;
                                        this.popMatrix();
                                    }
                                }
                                this.popMatrix();
                            }
                        }
                    } else {
                        this.movingPieceState = 3;
                        isMoving = false;
                    }
                    break;
                case 3:
                    this.movingPieceState = 1;
                    break;
                default:
                    break;
            }

        }
        if (!isMoving) {
            blackPiecesUsed = 0;
            whitePiecesUsed = 0;
            var blackPickingPiecesUsed = 0;
            var whitePickingPiecesUsed = 0;
            var cell;
            for (y = 0; y < 12; y++) {
                for (x = 0; x < 12; x++) {
                    cell = board[11 - y][x];
                    if (cell == 0) {
                    } else if (cell == 1) {
                        this.pushMatrix();
                        this.translate(x, y, 0);
                        this.whitePieces[whitePiecesUsed].display();
                        whitePiecesUsed++;
                        if (gameState == "WAITING_MOVE" && this.pickMode == true) {
                            this.registerForPick(x + y * 12 + 1, this.whitePickingPieces[whitePickingPiecesUsed]);
                            this.whitePickingPieces[whitePickingPiecesUsed].display();
                            whitePickingPiecesUsed++;
                        }
                        this.popMatrix();
                    } else if (cell == -1) {
                        this.pushMatrix();
                        this.translate(x, y, 0);
                        this.blackPieces[blackPiecesUsed].display();
                        blackPiecesUsed++;
                        if (gameState == "WAITING_MOVE" && this.pickMode == true) {
                            this.registerForPick(x + y * 12 + 1, this.blackPickingPieces[blackPickingPiecesUsed]);
                            this.blackPickingPieces[blackPickingPiecesUsed].display();
                            blackPickingPiecesUsed++;
                        }
                        this.popMatrix();
                    } else if (cell > 1) {
                        for (var j = 0; j < cell; j++) {
                            this.pushMatrix();
                            this.translate(x, y, j * 0.2);
                            this.whitePieces[whitePiecesUsed].display();
                            whitePiecesUsed++;
                            if (gameState == "WAITING_MOVE" && this.pickMode == true) {
                                this.registerForPick(x + y * 12 + 1, this.whitePickingPieces[whitePickingPiecesUsed]);
                                this.whitePickingPieces[whitePickingPiecesUsed].display();
                                whitePickingPiecesUsed++;
                            }
                            this.popMatrix();
                        }
                    } else if (cell < -1) {
                        for (var j = 0; j > cell; j--) {
                            this.pushMatrix();
                            this.translate(x, y, -j * 0.2);
                            this.blackPieces[blackPiecesUsed].display();
                            blackPiecesUsed++;
                            if (gameState == "WAITING_MOVE" && this.pickMode == true) {
                                this.registerForPick(x + y * 12 + 1, this.blackPickingPieces[blackPickingPiecesUsed]);
                                this.blackPickingPieces[blackPickingPiecesUsed].display();
                                blackPickingPiecesUsed++;
                            }
                            this.popMatrix();
                        }
                    }
                }
            }
        }
    }

    var whitePiecesLeft = 20 - whitePiecesUsed;
    var blackPiecesLeft = 20 - blackPiecesUsed;
for(var i = 0; i < whitePiecesLeft; i++){
    this.pushMatrix();
    this.translate((i - 10 *Math.floor(i/10))*1.22, - 2 - (Math.floor(i/10) * 1.22), 0);
    this.whitePieces[whitePiecesUsed + i].display();
    this.popMatrix();
}
    for(var i = 0; i < blackPiecesLeft; i++){
        this.pushMatrix();
        this.translate((i - 10 *Math.floor(i/10))*1.22, 13 + (Math.floor(i/10) * 1.22), 0);
        this.blackPieces[blackPiecesUsed + i].display();
        this.popMatrix();
    }
}
XMLscene.prototype.processGraph = function(nodeName, parentAppearance, parentTexture) {
    var appearance = null;
    if (nodeName != null && this.graph.components[nodeName] != null) {
        var node = this.graph.components[nodeName];
        var selectedMaterial = this.curMaterial % node.getMaterial().length;
        if (node.getMaterial()[selectedMaterial] == "inherit") {
            appearance = parentAppearance;
        } else {
            appearance = this.materials[node.getMaterial()[selectedMaterial]];
        }
        if (node.getTexture() == "none") {
            appearance.setTexture(null);
        } else if (node.getTexture() == "inherit") {
            appearance.setTexture(parentTexture);
        } else {
            for (id in this.graph.primitives) {
                if (this.graph.primitives[id]instanceof Rectangle || this.graph.primitives[id]instanceof Triangle)
                    this.graph.primitives[id].setTextureCoords(this.graph.textures[node.getTexture()].getS(), this.graph.textures[node.getTexture()].getT());
            }
            appearance.setTexture(this.textures[node.getTexture()]);
            appearance.setTextureWrap('REPEAT', 'REPEAT');
        }
        if (appearance != null) {
            appearance.apply();
        }
        this.multMatrix(node.getTransformation().getMatrix());
        if (node.getAnimations().length > 0)
            this.multMatrix(node.getAnimationsTransformations(this.currTime));
        for (let i = 0; i < node.getChildren().length; i++) {
            this.pushMatrix();
            var nextID = node.getChildren()[i];
            if (this.graph.primitives[nextID] == null) {
                if (node.getTexture() != "inherit") {
                    this.processGraph(nextID, appearance, this.textures[node.getTexture()]);
                } else {
                    this.processGraph(nextID, appearance, parentTexture);
                }
            } else {
                this.graph.primitives[nextID].display();
            }
            this.popMatrix();
        }
    }
}
XMLscene.prototype.startGame = function() {
    this.changeScene();
    
    this.interface.removeFolder("Start Game");
	this.interface.initPlayMode();
    switch (this.startGameDifficulty){
        case '2 Players':
            initializeGameVariables(1, 1);
            break;
        case 'vs. Easy CPU':
            initializeGameVariables(2, 1);
            break;
        case 'vs. Medium CPU':
            initializeGameVariables(2, 2);
            break;
        case 'vs. Hard CPU':
            initializeGameVariables(2, 3);
            break;
        case 'vs. Very Hard CPU':
            initializeGameVariables(2, 4);
            break;
        case 'CPU vs. CPU Easy':
            initializeGameVariables(3, 1);
            break;
        case 'CPU vs. CPU Medium':
            initializeGameVariables(3, 2);
            break;
        case 'CPU vs. CPU Hard':
            initializeGameVariables(3, 3);
            break;
        case 'CPU vs. CPU Very Hard':
            initializeGameVariables(3, 4);
            break;
    }
    timeoutTurn = this.timeoutTurn;
}

XMLscene.prototype.backMenu = function(){
     gameState = "MAIN_MENU"
     this.interface.removeFolder("Play Mode");
     this.interface.initStartMenu();
}

XMLscene.prototype.undo = function(){
    
}
XMLscene.prototype.changeScene = function(){

    switch (this.scenarioName){
        case "Rusty Vision":
            var filename=getUrlVars()['file'] || "LAIG_TP2_DSX_T4_G03_v01.dsx"
            break;
        case "Other SHIT":
            var filename=getUrlVars()['file'] || "LAIG_TP2_DSX_T4_G03_v02.dsx"
            break;
    }
   this.graph = new MySceneGraph(filename, this);
}

/**
 * Interface functions
 */
XMLscene.prototype.processVDown = function() {
    this.curCamera = (this.curCamera + 1) % this.cameras.length;
    this.camera = this.cameras[this.curCamera];
    this.interface.setActiveCamera(this.camera);
}
XMLscene.prototype.processMDown = function() {
    this.curMaterial++;
}
/**
 * Animation functions
 */
XMLscene.prototype.update = function(currTime) {
    if (this.graph.loadedOk) {
        this.lastTime = this.lastTime || currTime;
        this.deltaTime = currTime - this.lastTime;
        this.currTime += this.deltaTime / 1000;
        //in seconds
        this.lastTime = currTime;
        //console.log(this.currTime);
    }
}

XMLscene.prototype.updateCamera = function() {
    console.log(this.curCameraName);
    if(this.camera.position != this.cameras[this.curCameraName].position){
        this.camera = this.cameras[this.curCameraName];
    }
}

