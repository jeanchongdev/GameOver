var sketchProc = function(processingInstance) {
    with (processingInstance) {
       size(600, 600);
      
       frameRate(60);
       
       smooth();
      
       var game;

     //Keys/Mouse
     {
         //Key|Button stuff
         var clicked = false;
         var hover = false;
         var keys = [];
         keyPressed = function () {
             keys[keyCode] = true;
         };
         keyReleased = function () {
             keys[keyCode] = false;
         };
         mouseClicked = function () {
             clicked = true;
         };
     }

     /** @created_by MKaelin368 (KWC) (c) 2018 */
     var setKALoopTimeout = function (ms) {
       var method_name = "KAInfiniteLoopSetTimeout";
       if (method_name in this) {
         this[method_name](ms >>> 0);
       }
     };

     var Button = function (config) {
         this.x = config.x || 0;
         this.y = config.y || 0;
         this.size = config.size || 100;
         this.content = config.content || "Home";
         this.page = config.page || "home";
         this.textSize = config.textSize || this.size / 5;
         this.borderColor = color(12, 31, 3, 20);
         this.backColor = color(70, 71, 71, 150);
         this.textColor = config.textColor || color(170, 170, 170);
         this.backColorHover = color(102, 105, 105, 150);
         this.textColorHover = color(130, 130, 130);
         this.growth = 0;
         this.func = config.func || function() {};

         this.draw = function () {
             pushStyle();
             textAlign(CENTER, CENTER);
             textSize(this.textSize + (this.growth * 0.1));
             noStroke();

             //shadow
             fill(20, 20, 20, 30);
             ellipse(this.x, this.y + this.size * 0.52, (this.size + this.growth) * 0.8, (this.size + this.growth) * 0.3);

             //circles
             if (dist(mouseX, mouseY, this.x, this.y) <= this.size / 2) { //hover
                 hover = true;
                 this.growth = constrain(this.growth + 0.5, 0, 10);
                 if (clicked) {
                     this.func();
                 }

                 fill(this.backColorHover);
                 stroke(this.borderColor);
                 noStroke();
                 ellipse(this.x, this.y, this.size + this.growth, this.size + this.growth);
                 fill(this.textColorHover);
                 switch(this.content) {
                     case "Play":
                         triangle(this.x + this.size*0.25, this.y, this.x - this.size*0.15, this.y - this.size*0.25, this.x - this.size*0.15, this.y + this.size*0.25);
                         break;
                     case "How":
                         pushStyle();
                             textSize(this.size*0.6);
                             text("?", this.x, this.y);
                         popStyle();
                         break;
                     case "Sound":
                         pushStyle();
                             noStroke();
                             fill(this.textColorHover);
                             triangle(this.x, this.y - this.size * 0.3, this.x, this.y + this.size * 0.3, this.x - this.size * 0.3, this.y);
                             rect(this.x - this.size * 0.3, this.y - this.size * 0.1, this.size * 0.3, this.size * 0.2);
                             if(game.sound) {
                                 noFill();
                                 stroke(this.textColorHover);
                                 strokeWeight(this.size/20);
                                 arc(this.x + this.size * 0.1, this.y, this.size * 0.2, this.size * 0.2, -91, 90);
                                 arc(this.x + this.size * 0.1, this.y, this.size * 0.4, this.size * 0.4, -81, 80);
                             }
                             else {
                                 noFill();
                                 stroke(this.textColorHover);
                                 strokeWeight(this.size/20);
                                 line(this.x + this.size * 0.1, this.y - this.size * 0.1, this.x + this.size * 0.25, this.y + this.size * 0.1);
                                 line(this.x + this.size * 0.1, this.y + this.size * 0.1, this.x + this.size * 0.25, this.y - this.size * 0.1);
                             }
                         popStyle();
                         break;
                     case "Story":
                         pushStyle();
                             noFill();
                             stroke(this.textColorHover);
                             strokeWeight(4);
                             line(this.x-this.size*0.23, this.y-this.size*0.2, this.x+this.size*0.23, this.y-this.size*0.2);
                             line(this.x-this.size*0.23, this.y, this.x+this.size*0.23, this.y);
                             line(this.x-this.size*0.23, this.y+this.size*0.2, this.x+this.size*0.23, this.y+this.size*0.2);
                         popStyle();
                         break;
                     case "Scoreboard":
                         pushStyle();
                             noFill();
                             stroke(this.textColorHover);
                             strokeWeight(this.size * 0.14);
                             strokeCap(SQUARE);

                             line(this.x, this.y + this.size * 0.25, this.x, this.y - this.size * 0.3);
                             line(this.x - this.size * 0.2, this.y + this.size * 0.25, this.x - this.size * 0.2, this.y - this.size * 0.1);
                             line(this.x + this.size * 0.2, this.y + this.size * 0.25, this.x + this.size * 0.2, this.y - this.size * 0.2);
                         popStyle();
                         break;
                     case "Back":
                         pushStyle();
                         beginShape();
                             vertex(this.x+this.size*0.25, this.y); //1
                             vertex(this.x+this.size*0.25, this.y+this.size*0.25); //2
                             vertex(this.x+this.size*0.07, this.y+this.size*0.25); //3
                             vertex(this.x+this.size*0.07, this.y+this.size*0.12); //4
                             vertex(this.x-this.size*0.07, this.y+this.size*0.12); //5
                             vertex(this.x-this.size*0.07, this.y+this.size*0.25); //6
                             vertex(this.x-this.size*0.25, this.y+this.size*0.25); //7
                             vertex(this.x-this.size*0.25, this.y); //8
                             vertex(this.x, this.y-this.size*0.2); //9
                             vertex(this.x+this.size*0.25, this.y); //10
                         endShape();
                         noFill();
                         stroke(this.textColorHover);
                         strokeWeight(this.size*0.05);
                         line(this.x-this.size*0.27, this.y-this.size*0.05, this.x, this.y-this.size*0.27);
                         line(this.x+this.size*0.27, this.y-this.size*0.05, this.x, this.y-this.size*0.27);
                         line(this.x+this.size*0.15, this.y-this.size*0.19, this.x+this.size*0.15, this.y-this.size*0.25);
                         popStyle();
                         break;
                     case "Replay":
                         pushStyle();
                             noFill();
                             stroke(this.textColorHover);
                             strokeWeight(5);
                             pushMatrix();
                                 translate(this.x, this.y);
                                 rotate(radians(game.rate * 5));
                                 arc(0, 0, this.size * 0.6, this.size * 0.6, 1, 275);
                                 noStroke();
                                 fill(this.textColorHover);
                                 translate(this.size * 0.30, -this.size * 0.18);
                                 rotate(radians(-70));
                                 triangle(0, -this.size * 0.1, -this.size * 0.14, -this.size * 0.3, this.size * 0.14, -this.size * 0.3);
                             popMatrix();
                         popStyle();
                         break;
                     default:
                         text(this.content, this.x, this.y);
                 }
             }
             else { //not hover
                 this.growth = constrain(this.growth - 0.5, 0, 10);
                 fill(this.backColor);
                 strokeWeight(2);
                 stroke(this.borderColor, 100);
                 noStroke();
                 ellipse(this.x, this.y, this.size + this.growth, this.size + this.growth);
                 fill(this.textColor);
                 switch(this.content) {
                     case "Play":
                         triangle(this.x + this.size*0.25, this.y, this.x - this.size*0.15, this.y - this.size*0.25, this.x - this.size*0.15, this.y + this.size*0.25);
                         break;
                     case "How":
                         pushStyle();
                             textSize(this.size*0.6);
                             text("?", this.x, this.y);
                         popStyle();
                         break;
                     case "Sound":
                         pushStyle();
                             noStroke();
                             fill(this.textColor);
                             triangle(this.x, this.y - this.size * 0.3, this.x, this.y + this.size * 0.3, this.x - this.size * 0.3, this.y);
                             rect(this.x - this.size * 0.3, this.y - this.size * 0.1, this.size * 0.3, this.size * 0.2);
                             if(game.sound) {
                                 noFill();
                                 stroke(this.textColor);
                                 strokeWeight(this.size/20);
                                 arc(this.x + this.size * 0.1, this.y, this.size * 0.2, this.size * 0.2, -91, 90);
                                 arc(this.x + this.size * 0.1, this.y, this.size * 0.4, this.size * 0.4, -81, 80);
                             }
                             else {
                                 noFill();
                                 stroke(this.textColor);
                                 strokeWeight(this.size/20);
                                 line(this.x + this.size * 0.1, this.y - this.size * 0.1, this.x + this.size * 0.25, this.y + this.size * 0.1);
                                 line(this.x + this.size * 0.1, this.y + this.size * 0.1, this.x + this.size * 0.25, this.y - this.size * 0.1);
                             }
                         popStyle();
                         break;
                     case "Story":
                         pushStyle();
                             noFill();
                             stroke(this.textColor);
                             strokeWeight(4);
                             line(this.x-this.size*0.23, this.y-this.size*0.2, this.x+this.size*0.23, this.y-this.size*0.2);
                             line(this.x-this.size*0.23, this.y, this.x+this.size*0.23, this.y);
                             line(this.x-this.size*0.23, this.y+this.size*0.2, this.x+this.size*0.23, this.y+this.size*0.2);
                         popStyle();
                         break;
                     case "Scoreboard":
                         pushStyle();
                             noFill();
                             stroke(this.textColor);
                             strokeWeight(this.size * 0.14);
                             strokeCap(SQUARE);

                             line(this.x, this.y + this.size * 0.25, this.x, this.y - this.size * 0.3);
                             line(this.x - this.size * 0.2, this.y + this.size * 0.25, this.x - this.size * 0.2, this.y - this.size * 0.1);
                             line(this.x + this.size * 0.2, this.y + this.size * 0.25, this.x + this.size * 0.2, this.y - this.size * 0.2);
                         popStyle();
                         break;
                     case "Back":
                         pushStyle();
                         beginShape();
                             vertex(this.x+this.size*0.25, this.y); //1
                             vertex(this.x+this.size*0.25, this.y+this.size*0.25); //2
                             vertex(this.x+this.size*0.07, this.y+this.size*0.25); //3
                             vertex(this.x+this.size*0.07, this.y+this.size*0.12); //4
                             vertex(this.x-this.size*0.07, this.y+this.size*0.12); //5
                             vertex(this.x-this.size*0.07, this.y+this.size*0.25); //6
                             vertex(this.x-this.size*0.25, this.y+this.size*0.25); //7
                             vertex(this.x-this.size*0.25, this.y); //8
                             vertex(this.x, this.y-this.size*0.2); //9
                             vertex(this.x+this.size*0.25, this.y); //10
                         endShape();
                         noFill();
                         stroke(this.textColor);
                         strokeWeight(this.size*0.05);
                         line(this.x-this.size*0.27, this.y-this.size*0.05, this.x, this.y-this.size*0.27);
                         line(this.x+this.size*0.27, this.y-this.size*0.05, this.x, this.y-this.size*0.27);
                         line(this.x+this.size*0.15, this.y-this.size*0.19, this.x+this.size*0.15, this.y-this.size*0.25);
                         popStyle();
                         break;
                     case "Replay":
                         pushStyle();
                             noFill();
                             stroke(this.textColor);
                             strokeWeight(5);
                             pushMatrix();
                                 translate(this.x, this.y);
                                 rotate(radians(sin(game.rate * 5) * 20));
                                 arc(0, 0, this.size * 0.6, this.size * 0.6, 1, 275);
                                 noStroke();
                                 fill(this.textColor);
                                 translate(this.size * 0.30, -this.size * 0.18);
                                 rotate(radians(-70));
                                 triangle(0, -this.size * 0.1, -this.size * 0.14, -this.size * 0.3, this.size * 0.14, -this.size * 0.3);
                             popMatrix();
                         popStyle();
                         break;
                     default:
                         text(this.content, this.x, this.y);
                 }
             }

             popStyle();
         };
     };

     var Avatar = function(config) {
         this.type = config.type || 0;
         this.draw = function() {
             switch(this.type) {
                 case 0: //Jade
                     pushMatrix();
                         pushStyle();
                             //face
                             noStroke();
                             fill(255, 255, 255);
                             beginShape();
                                 vertex(50, 5);
                                 bezierVertex(65, 4, 86, 15, 91, 34);
                                 bezierVertex(94, 58, 82, 72, 63, 79);
                                 bezierVertex(36, 82, 16, 72, 11, 52);
                                 bezierVertex(8, 32, 20, 12, 50, 5);
                             endShape(CLOSE);

                             //body
                             fill(131, 255, 174, 150);
                             stroke(20, 104, 26, 70);
                             strokeWeight(8);
                             beginShape();
                                 vertex(50, 3);
                                 bezierVertex(69, 3, 88, 8, 97, 32);
                                 bezierVertex(102, 58, 101, 82, 100, 101);
                                 bezierVertex(99, 110, 100, 115, 90, 118);
                                 bezierVertex(79, 116, 80, 109, 79, 103);
                                 bezierVertex(77, 110, 70, 117, 62, 119);
                                 bezierVertex(52, 119, 48, 114, 44, 106);
                                 bezierVertex(42, 112, 32, 120, 20, 116);
                                 bezierVertex(13, 113, 9, 104, 9, 95);
                                 bezierVertex(11, 79, 6, 70, 5, 47);
                                 bezierVertex(4, 24, 23, 3, 50, 3);
                             endShape(CLOSE);

                             //eyes
                             noStroke();
                             fill(0, 97, 0);
                             ellipse(39, 29, 25, 23);
                             ellipse(70, 26, 25, 23);

                             //eyeballs
                             fill(174, 255, 174);
                             ellipse(43, 30, 11, 10);
                             ellipse(66, 27, 11, 10);

                             //mouth
                             noFill();
                             stroke(0, 97, 0, 100);
                             strokeWeight(3);
                             bezier(39, 48, 44, 53, 54, 55, 59, 52);
                         popStyle();
                     popMatrix();
                     break;
                 case 1: //Sage
                     pushMatrix();
                         pushStyle();
                             //face
                             noStroke();
                             fill(255, 255, 255);
                             beginShape();
                                 vertex(50, 5);
                                 bezierVertex(65, 4, 86, 15, 91, 34);
                                 bezierVertex(98, 60, 87, 76, 74, 77);
                                 bezierVertex(32, 88, 12, 74, 11, 52);
                                 bezierVertex(8, 32, 20, 12, 50, 5);
                             endShape(CLOSE);

                             //body
                             fill(131, 255, 174, 150);
                             stroke(20, 104, 26, 70);
                             strokeWeight(8);
                             beginShape();
                                 vertex(50, 3);
                                 bezierVertex(69, 3, 88, 8, 97, 32);
                                 bezierVertex(102, 58, 101, 82, 100, 101);
                                 bezierVertex(99, 110, 100, 115, 90, 118);
                                 bezierVertex(79, 116, 80, 109, 78, 108);
                                 bezierVertex(77, 110, 70, 117, 62, 119);
                                 bezierVertex(52, 119, 48, 114, 44, 106);
                                 bezierVertex(42, 112, 32, 120, 20, 116);
                                 bezierVertex(13, 113, 9, 104, 9, 95);
                                 bezierVertex(11, 79, 6, 70, 5, 47);
                                 bezierVertex(4, 24, 23, 3, 50, 3);
                             endShape(CLOSE);

                             //glasses
                             noFill();
                             stroke(206, 114, 30);
                             strokeWeight(4);
                             beginShape();
                                 vertex(21, 15);
                                 bezierVertex(48, 12, 69, 9, 83, 6);
                                 bezierVertex(85, 18, 82, 23, 74, 26);
                                 bezierVertex(65, 27, 62, 22, 58, 15);
                                 bezierVertex(58, 22, 56, 33, 43, 34);
                                 bezierVertex(31, 34, 25, 25, 21, 16);
                             endShape(CLOSE);
                             strokeWeight(2);
                             line(24, 22, 58, 17);
                             line(28, 28, 56, 23);

                             line(61, 16, 84, 12);
                             line(63, 23, 83, 17);

                             //mouth
                             noFill();
                             stroke(0, 97, 0, 100);
                             strokeWeight(3);
                             bezier(23, 33, 32, 46, 44, 43, 49, 41);
                         popStyle();
                     popMatrix();
                     break;
                 case 2: //Kelly
                     pushMatrix();
                         pushStyle();
                             noStroke();

                             //face
                             fill(255, 255, 255);
                             beginShape();
                                 vertex(50, 5);
                                 bezierVertex(65, 4, 86, 15, 91, 34);
                                 bezierVertex(94, 58, 82, 68, 63, 73);
                                 bezierVertex(36, 77, 16, 72, 11, 52);
                                 bezierVertex(8, 32, 20, 12, 50, 5);
                             endShape(CLOSE);

                             //body
                             fill(131, 255, 174, 150);
                             stroke(20, 104, 26, 70);
                             strokeWeight(8);
                             beginShape();
                                 vertex(50, 3);
                                 bezierVertex(69, 3, 88, 8, 97, 32);
                                 bezierVertex(100, 58, 93, 82, 100, 101);
                                 bezierVertex(101, 110, 100, 115, 90, 118);
                                 bezierVertex(77, 116, 77, 109, 74, 103);
                                 bezierVertex(74, 110, 67, 117, 59, 119);
                                 bezierVertex(47, 119, 43, 114, 39, 96);
                                 bezierVertex(42, 112, 32, 120, 20, 116);
                                 bezierVertex(13, 113, 9, 104, 9, 95);
                                 bezierVertex(11, 79, 6, 70, 5, 47);
                                 bezierVertex(4, 24, 23, 3, 50, 3);
                             endShape(CLOSE);

                             //eyes
                             noStroke();
                             fill(0, 97, 0);
                             ellipse(44, 21, 21, 19);
                             ellipse(65, 20, 21, 19);

                             //eyeballs
                             fill(174, 255, 174);
                             ellipse(47, 22, 8, 7);
                             ellipse(62, 21, 8, 7);

                             //mouth
                             noStroke();
                             fill(0, 97, 0, 100);
                             beginShape();
                                 vertex(35, 33);
                                 bezierVertex(42, 33, 45, 44, 55, 43);
                                 bezierVertex(61, 43, 64, 49, 62, 54);
                                 bezierVertex(55, 60, 43, 57, 33, 52);
                                 bezierVertex(27, 43, 29, 36, 35, 33);
                             endShape(CLOSE);
                         popStyle();
                     popMatrix();
                     break;
                 case 3: //Olive
                     pushMatrix();
                         pushStyle();
                             //ears
                             fill(131, 255, 174, 150);
                             stroke(20, 104, 26, 70);
                             strokeWeight(8);
                             beginShape();
                                 vertex(67, 14);
                                 bezierVertex(72, 8, 79, 7, 85, 5);
                                 bezierVertex(89, 15, 91, 21, 90, 29);
                             endShape(CLOSE);

                             beginShape();
                                 vertex(37, 17);
                                 bezierVertex(30, 10, 22, 8, 15, 7);
                                 bezierVertex(11, 19, 17, 31, 20, 38);
                             endShape(CLOSE);

                             //face
                             noStroke();
                             fill(255, 255, 255);
                             beginShape();
                                 vertex(50, 12);
                                 bezierVertex(65, 10, 86, 15, 91, 34);
                                 bezierVertex(97, 58, 82, 68, 63, 71);
                                 bezierVertex(36, 74, 16, 68, 11, 52);
                                 bezierVertex(8, 32, 20, 17, 50, 12);
                             endShape(CLOSE);

                             //body
                             fill(131, 255, 174, 150);
                             stroke(20, 104, 26, 70);
                             strokeWeight(8);
                             beginShape();
                                 vertex(50, 7);
                                 bezierVertex(69, 7, 88, 8, 97, 32);
                                 bezierVertex(102, 58, 101, 82, 100, 101);
                                 bezierVertex(99, 110, 100, 115, 90, 118);
                                 bezierVertex(79, 116, 80, 109, 79, 103);
                                 bezierVertex(77, 110, 70, 117, 62, 119);
                                 bezierVertex(52, 119, 48, 114, 44, 106);
                                 bezierVertex(42, 112, 32, 120, 20, 116);
                                 bezierVertex(13, 113, 9, 104, 9, 95);
                                 bezierVertex(11, 79, 6, 70, 5, 47);
                                 bezierVertex(4, 24, 23, 8, 50, 7);
                             endShape(CLOSE);

                             //eyes
                             noStroke();
                             fill(0, 97, 0);
                             ellipse(32, 28, 10, 9);
                             ellipse(74, 24, 10, 9);

                             //mouth
                             noFill();
                             stroke(0, 97, 0, 100);
                             strokeWeight(3);
                             bezier(46, 32, 48, 36, 53, 36, 55, 32);
                             bezier(55, 33, 58, 35, 62, 36, 63, 30);

                             //fish
                             //head
                             noStroke();
                             fill(127, 136, 117);
                             beginShape();
                                 vertex(55, 36);
                                 bezierVertex(67, 42, 74, 48, 71, 53);
                                 bezierVertex(60, 55, 50, 55, 46, 54);
                                 bezierVertex(45, 51, 51, 43, 55, 36);
                             endShape(CLOSE);
                             fill(177, 185, 157);
                             beginShape();
                                 vertex(55, 36);
                                 bezierVertex(67, 42, 74, 48, 71, 52);
                                 bezierVertex(56, 53, 59, 55, 55, 36);
                             endShape(CLOSE);

                             //eye
                             noStroke();
                             fill(61, 60, 61);
                             ellipse(52, 49, 5, 5);

                             //tail
                             fill(177, 185, 157);
                             beginShape();
                                 vertex(58, 71);
                                 bezierVertex(62, 71, 68, 73, 72, 77);
                                 bezierVertex(67, 78, 60, 77, 58, 71);
                             endShape(CLOSE);
                             fill(127, 136, 117);
                             beginShape();
                                 vertex(58, 71);
                                 bezierVertex(56, 77, 52, 80, 49, 80);
                                 bezierVertex(45, 79, 47, 74, 58, 71);
                             endShape(CLOSE);
                             //spine
                             noFill();
                             stroke(138, 135, 138);
                             strokeWeight(2);
                             line(58, 56, 58, 71);
                             strokeWeight(2);
                             line(49, 59, 66, 58);
                             line(49, 65, 64, 65);
                         popStyle();
                     popMatrix();
                     break;
                 case 4: //Plum
                     pushMatrix();
                         pushStyle();
                             //head
                             noStroke();
                             fill(173, 73, 255);
                             beginShape();
                                 vertex(49, 8);
                                 bezierVertex(65, 9, 82, 15, 88, 31);
                                 bezierVertex(91, 55, 80, 70, 62, 79);
                                 bezierVertex(40, 83, 17, 74, 10, 48);
                                 bezierVertex(11, 24, 27, 12, 48, 8);
                             endShape(CLOSE);

                             //body
                             fill(220, 123, 254, 150);
                             stroke(219, 81, 251, 70);
                             strokeWeight(8);
                             beginShape();
                                 vertex(49, 3);
                                 bezierVertex(63, 2, 80, 9, 89, 23);
                                 bezierVertex(102, 43, 95, 83, 91, 108);
                                 vertex(80, 92);
                                 vertex(58, 119);
                                 vertex(41, 106);
                                 vertex(29, 117);
                                 vertex(21, 104);
                                 vertex(12, 115);
                                 bezierVertex(7, 84, 2, 53, 6, 33);
                                 bezierVertex(12, 16, 29, 6, 49, 3);
                             endShape(CLOSE);

                             //eyes
                             strokeWeight(2);
                             fill(255, 255, 255, 200);
                             beginShape();
                                 vertex(57, 25);
                                 vertex(80, 22);
                                 bezierVertex(82, 30, 77, 36, 72, 36);
                                 bezierVertex(63, 36, 61, 32, 57, 25);
                             endShape(CLOSE);
                             beginShape();
                                 vertex(21, 29);
                                 vertex(53, 26);
                                 bezierVertex(54, 35, 49, 42, 40, 43);
                                 bezierVertex(28, 42, 24, 36, 21, 29);
                             endShape(CLOSE);

                             //mouth
                             beginShape();
                                 vertex(58, 46);
                                 bezierVertex(62, 45, 68, 40, 73, 43);
                                 bezierVertex(76, 50, 74, 56, 68, 61);
                                 bezierVertex(61, 64, 52, 64, 46, 60);
                                 bezierVertex(42, 55, 41, 50, 42, 47);
                                 bezierVertex(46, 45, 49, 46, 57, 46);
                             endShape(CLOSE);

                             //teeth
                             line(56, 46, 53, 62);
                             line(63, 45, 70, 60);

                             //eyeballs
                             noStroke();
                             fill(173, 73, 254, 250);
                             arc(41, 27, 14, 15, -10, 181);
                             arc(68, 24, 12, 11, -14, 181);

                             //freckles
                             strokeWeight(2);
                             stroke(255, 255, 255, 150);
                             point(34, 48);
                             point(37, 55);
                             point(29, 52);
                             point(78, 42);
                             point(81, 49);
                             point(83, 40);
                         popStyle();
                     popMatrix();
                     break;
                 case 5: //Periwinkle
                     pushMatrix();
                         translate(-3, -5);
                         scale(1.05);

                         pushStyle();
                             //head
                             noStroke();
                             fill(173, 73, 255, 150);
                             beginShape();
                                 vertex(48, 5);
                                 bezierVertex(64, 6, 78, 13, 88, 24);
                                 bezierVertex(94, 36, 96, 48, 96, 58);
                                 vertex(90, 55);
                                 vertex(89, 63);
                                 vertex(75, 41);
                                 vertex(68, 53);
                                 vertex(53, 37);
                                 vertex(46, 52);
                                 vertex(36, 43);
                                 vertex(28, 56);
                                 vertex(20, 44);
                                 vertex(6, 62);
                                 bezierVertex(5, 48, 5, 33, 11, 22);
                                 bezierVertex(19, 12, 32, 6, 48, 5);
                             endShape(CLOSE);

                             //body
                             fill(220, 123, 254, 150);
                             stroke(219, 81, 251, 70);
                             strokeWeight(8);
                             beginShape();
                                 vertex(45, 15);
                                 bezierVertex(59, 13, 75, 24, 83, 42);
                                 bezierVertex(87, 65, 89, 89, 91, 105);
                                 vertex(83, 101);
                                 vertex(75, 109);
                                 vertex(67, 103);
                                 vertex(58, 109);
                                 vertex(51, 104);
                                 vertex(44, 112);
                                 vertex(37, 100);
                                 vertex(25, 109);
                                 vertex(18, 98);
                                 vertex(10, 103);
                                 bezierVertex(11, 83, 10, 60, 10, 44);
                                 bezierVertex(16, 27, 29, 18, 45, 15);
                             endShape(CLOSE);

                             //mouth
                             strokeWeight(2);
                             fill(255, 255, 255, 200);
                             beginShape();
                                 vertex(48, 54);
                                 bezierVertex(55, 54, 61, 57, 61, 64);
                                 bezierVertex(59, 69, 49, 72, 39, 72);
                                 bezierVertex(33, 68, 31, 59, 31, 53);
                                 bezierVertex(37, 50, 40, 50, 48, 54);
                             endShape(CLOSE);

                             //tounge
                             noStroke();
                             fill(173, 73, 255, 100);
                             beginShape();
                                 vertex(32, 60);
                                 bezierVertex(35, 54, 39, 57, 44, 59);
                                 bezierVertex(46, 60, 50, 66, 52, 70);
                                 bezierVertex(48, 71, 42, 72, 38, 71);
                                 bezierVertex(33, 66, 33, 65, 33, 62);
                             endShape(CLOSE);

                             //freckles
                             strokeWeight(2);
                             stroke(255, 255, 255, 150);
                             point(21, 53);
                             point(17, 57);
                             point(25, 59);
                             point(70, 56);
                             point(75, 49);
                             point(78, 54);
                         popStyle();
                     popMatrix();
                     break;
                 case 6: //Iris
                     pushMatrix();
                         translate(-2, -3);
                         scale(1.05);

                         pushStyle();
                             //head
                             noStroke();
                             fill(173, 73, 255, 150);
                             beginShape();
                                 vertex(50, 9);
                                 bezierVertex(63, 9, 81, 17, 88, 32);
                                 bezierVertex(92, 55, 81, 74, 65, 81);
                                 bezierVertex(44, 85, 26, 80, 17, 68);
                                 bezierVertex(10, 52, 9, 36, 15, 24);
                                 bezierVertex(25, 14, 36, 12, 50, 9);
                             endShape(CLOSE);

                             //body
                             fill(220, 123, 254, 150);
                             stroke(219, 81, 251, 70);
                             strokeWeight(8);
                             beginShape();
                                 vertex(48, 4);
                                 bezierVertex(66, 4, 85, 12, 92, 26);
                                 bezierVertex(98, 44, 98, 68, 91, 88);
                                 vertex(77, 116);
                                 vertex(69, 104);
                                 vertex(59, 118);
                                 vertex(43, 104);
                                 vertex(28, 115);
                                 bezierVertex(15, 89, 9, 71, 6, 51);
                                 bezierVertex(6, 36, 8, 24, 17, 16);
                                 bezierVertex(28, 8, 36, 5, 48, 4);
                             endShape(CLOSE);

                             //eye
                             strokeWeight(2);
                             fill(255, 255, 255, 200);
                             ellipse(57, 39, 40, 40);

                             fill(173, 73, 255, 200);
                             stroke(219, 81, 251, 70);
                             ellipse(58, 39, 20, 20);

                             noStroke();
                             fill(255, 255, 255, 200);
                             ellipse(54, 36, 6, 6);

                             //mouth
                             noFill();
                             stroke(255, 255, 255, 200);
                             arc(59, 62, 18, 16, -4, 174);

                             //headband
                             noStroke();
                             fill(173, 73, 255, 200);
                             beginShape();
                                 vertex(7, 24);
                                 bezierVertex(34, 17, 68, 12, 87, 15);
                                 vertex(94, 26);
                                 bezierVertex(56, 26, 21, 31, 4, 36);
                             endShape(CLOSE);
                         popStyle();
                     popMatrix();
                     break;
                 case 7: //Mulberry
                     pushMatrix();
                         pushStyle();
                             //head
                             noStroke();
                             fill(173, 73, 255, 150);
                             beginShape();
                                 vertex(38, 12);
                                 bezierVertex(52, 11, 66, 13, 74, 17);
                                 bezierVertex(78, 20, 80, 25, 78, 30);
                                 bezierVertex(77, 40, 71, 56, 64, 64);
                                 bezierVertex(55, 71, 40, 73, 21, 67);
                                 bezierVertex(8, 59, 6, 44, 9, 31);
                                 bezierVertex(14, 19, 27, 15, 36, 12);
                             endShape(CLOSE);

                             //body
                             fill(220, 123, 254, 150);
                             stroke(219, 81, 251, 70);
                             strokeWeight(8);
                             beginShape();
                                 vertex(96, 14);
                                 vertex(79, 39);
                                 bezierVertex(91, 57, 100, 90, 98, 112);
                                 vertex(74, 89);
                                 vertex(61, 116);
                                 vertex(36, 96);
                                 vertex(13, 115);
                                 bezierVertex(4, 92, 2, 73, 1, 48);
                                 bezierVertex(3, 31, 6, 13, 26, 7);
                                 bezierVertex(45, 1, 71, 4, 96, 14);
                             endShape(CLOSE);

                             //eyes
                             strokeWeight(2);
                             fill(255, 255, 255, 200);
                             ellipse(31, 28, 26, 26);
                             ellipse(56, 21, 21, 21);

                             //eyeballs
                             noStroke();
                             fill(173, 73, 254, 250);
                             ellipse(33, 27, 14, 14);
                             ellipse(54, 21, 11, 11);

                             //nose
                             ellipse(92, 14, 14, 14);

                             //tounge
                             beginShape();
                                 vertex(32, 48);
                                 bezierVertex(36, 52, 41, 53, 48, 55);
                                 bezierVertex(46, 64, 44, 69, 36, 70);
                                 bezierVertex(28, 68, 26, 60, 30, 48);
                             endShape(CLOSE);

                             //mouth
                             noFill();
                             strokeWeight(2);
                             stroke(173, 73, 254, 250);
                             bezier(28, 46, 32, 49, 49, 57, 54, 54);
                         popStyle();
                     popMatrix();
                     break;
             }
         };
     };
     var Spirit = function(config) {
         this.headColor = config.headColor;
         this.bodyColor = config.bodyColor;
         this.bodyStroke = config.bodyStroke;

         this.draw = function() {
             pushStyle();
                 noStroke();
                 fill(173, 73, 255, 150);
                 fill(this.headColor);
                 ellipse(40, 79, 70, 55);

                 fill(220, 123, 254, 150);
                 fill(this.bodyColor);
                 stroke(219, 81, 251, 70);
                 stroke(this.bodyStroke);
                 strokeWeight(8);
                 beginShape();
                     vertex(42, 35);
                     bezierVertex(56, 48, 61, 48, 75, 65);
                     bezierVertex(78, 74, 78, 88, 71, 97);
                     bezierVertex(68, 103, 56, 104, 52, 107);
                     bezierVertex(34, 107, 16, 105, 12, 100);
                     bezierVertex(3, 89, 1, 76, 12, 58);
                     bezierVertex(17, 51, 36, 41, 42, 35);
                 endShape(CLOSE);

                 noStroke();
                 fill(40, 100);
                 ellipse(28, 71, 10, 10);
                 ellipse(50, 71, 10, 10);
                 strokeWeight(1);
             popStyle();
         };
     };
     var Web = function(config) {
         this.x = config.x || 0;
         this.y = config.y || 0;
         this.scale = config.scale || {
             x: 1,
             y: 1
         };
         this.color = color(184, 182, 184);
         this.draw = function() {
             noFill();
             strokeWeight(1);
             stroke(this.color);

             pushMatrix();
                 translate(this.x, this.y);
                 scale(this.scale.x, this.scale.y);

                 beginShape();
                     vertex(320, 80);
                     bezierVertex(280, 53, 270, 53, 220, 0);
                 endShape();
                 beginShape();
                     vertex(320, 80);
                     bezierVertex(320, 63, 300, 53, 290, 0);
                 endShape();
                 beginShape();
                     vertex(320, 80);
                     bezierVertex(330, 63, 320, 55, 350, 0);
                 endShape();
                 beginShape();
                     vertex(320, 80);
                     bezierVertex(340, 78, 345, 72, 400, 42);
                 endShape();
                 beginShape();
                     vertex(320, 80);
                     bezierVertex(345, 98, 355, 98, 400, 110);
                 endShape();
                 beginShape();
                     vertex(320, 80);
                     bezierVertex(335, 118, 345, 128, 400, 190);
                 endShape();

                 //first row
                 beginShape();
                     vertex(287, 58);
                     bezierVertex(298, 56, 300, 56, 305, 46);
                 endShape();
                 beginShape();
                     vertex(305, 46);
                     bezierVertex(312, 56, 320, 56, 329, 50);
                 endShape();
                 beginShape();
                     vertex(329, 50);
                     bezierVertex(335, 66, 335, 66, 344, 73);
                 endShape();
                 beginShape();
                     vertex(344, 73);
                     bezierVertex(340, 76, 340, 80, 346, 95);
                 endShape();
                 beginShape();
                     vertex(346, 95);
                     bezierVertex(338, 104, 338, 97, 339, 116);
                 endShape();

                 //second row
                 beginShape();
                     vertex(260, 38);
                     bezierVertex(280, 37, 285, 35, 296, 23);
                 endShape();
                 beginShape();
                     vertex(296, 23);
                     bezierVertex(310, 35, 320, 33, 338, 26);
                 endShape();
                 beginShape();
                     vertex(338, 26);
                     bezierVertex(340, 45, 350, 52, 368, 61);
                 endShape();
                 beginShape();
                     vertex(368, 61);
                     bezierVertex(355, 80, 360, 82, 371, 102);
                 endShape();
                 beginShape();
                     vertex(371, 102);
                     bezierVertex(355, 120, 360, 122, 357, 139);
                 endShape();

                 //third row
                 beginShape();
                     vertex(235, 16);
                     bezierVertex(270, 17, 280, 15, 290, 0);
                 endShape();
                 beginShape();
                     vertex(290, 0);
                     bezierVertex(315, 17, 330, 15, 347, 5);
                 endShape();
                 beginShape();
                     vertex(347, 5);
                     bezierVertex(360, 37, 350, 35, 392, 47);
                 endShape();
                 beginShape();
                     vertex(392, 47);
                     bezierVertex(380, 67, 370, 90, 395, 108);
                 endShape();
                 beginShape();
                     vertex(395, 108);
                     bezierVertex(380, 117, 370, 140, 378, 165);
                 endShape();

                 //forth row
                 beginShape();
                     vertex(372, 0);
                     bezierVertex(380, 27, 385, 25, 400, 26);
                 endShape();
                 beginShape();
                     vertex(400, 137);
                     bezierVertex(384, 163, 392, 175, 393, 182);
                 endShape();
             popMatrix();
         };
     };
     var Spider = function(config) {
         pushMatrix();
             translate(config.x, config.y);

             noStroke();
             fill(20, config.opacity || 255);

             //body
             ellipse(350, 220, 20, 25);
             //head
             ellipse(350, 237, 10, 10);

             //stripe
             noFill();
             stroke(config.color, 100);
             strokeWeight(3);
             ellipse(350, 216, 3, 8);
             ellipse(350, 223, 2, 2);

             noFill();
             stroke(20, config.opacity || 255);
             strokeWeight(2);

             //eyes
             line(348, 240, 348, 242);
             line(352, 240, 352, 242);

             strokeWeight(1);

             //back legs
             beginShape();
                 vertex(340, 220);
                 bezierVertex(325, 210, 326, 206, 326, 199);
             endShape();
             beginShape();
                 vertex(360, 220);
                 bezierVertex(375, 210, 374, 206, 374, 199);
             endShape();

             beginShape();
                 vertex(341, 212);
                 bezierVertex(327, 202, 334, 196, 333, 190);
             endShape();
             beginShape();
                 vertex(359, 212);
                 bezierVertex(373, 202, 366, 196, 367, 190);
             endShape();

             //front legs
             beginShape();
                 vertex(340, 223);
                 bezierVertex(336, 225, 336, 228, 328, 230);
             endShape();
             beginShape();
                 vertex(328, 230);
                 bezierVertex(332, 250, 332, 248, 334, 250);
             endShape();

             beginShape();
                 vertex(360, 223);
                 bezierVertex(364, 225, 364, 228, 372, 230);
             endShape();
             beginShape();
                 vertex(372, 230);
                 bezierVertex(368, 250, 368, 248, 366, 250);
             endShape();

             beginShape();
                 vertex(342, 227);
                 bezierVertex(340, 229, 340, 232, 334, 234);
             endShape();
             beginShape();
                 vertex(334, 234);
                 bezierVertex(338, 254, 343, 252, 342, 255);
             endShape();

             beginShape();
                 vertex(358, 227);
                 bezierVertex(360, 229, 360, 232, 366, 234);
             endShape();
             beginShape();
                 vertex(366, 234);
                 bezierVertex(362, 254, 357, 252, 358, 255);
             endShape();
         popMatrix();
     };

     var AI = function(config) {
         this.x = config.x || 300;
         this.y = config.y || 300;
         this.vx = 0;
         this.vy = 0;
         this.px = this.x;
         this.py = this.y;
         this.w = config.w || 40;
         this.h = config.h || 40;
         this.angle = config.angle || 0;
         this.segments = [];
         this.SPEED_MIN = config.SPEED_MIN || 4;
         this.SPEED_MAX = config.SPEED_MAX || 6;
         this.speed = this.SPEED_MIN;
         this.dir = 0;
         this.faceDir = 1;
         this.color = config.color || game.COLORS.purple;
         this.REACH_MIN = config.REACH_MIN || this.w * 0.5;
         this.REACH_MAX = config.REACH_MAX || this.w * 2;
         this.reach = this.REACH_MIN;
         this.GEM_TIMER = config.GEM_TIMER || 300;
         this.gemTimer = config.gemTimer || 0;
         this.SPEED_TIMER = config.SPEED_TIMER || 300;
         this.speedTimer = config.speedTimer || 0;
         this.points = 0;
         this.team = config.team || 0; // 0 = GREEN, 1 = Purple
         this.index = config.index || 0; //0-3 = index of the ghost
         this.target = {
             x: 0,
             y: 0
         };
         this.hasTargetGem = false;
         this.counter = 1;
         this.img = config.img || undefined;
         this.spiritImg = config.spiritImg || undefined;
         this.init();
     };
     AI.new = function(config) {
         var obj = Object.create(AI.prototype);
         AI.apply(obj, arguments);
         return obj;
     };
     AI.prototype.init = function() {
         this.segments.length = 0;
     };
     AI.prototype.update = function() {
         this.hasTargetGem = false;

         this.target.x = ~~random(game.world.w);
         this.target.y = ~~random(game.world.h);

         this.angle = atan2(this.target.y - this.y, this.target.x - this.x);

         this.vx = this.speed * cos(this.angle);
         this.vy = this.speed * sin(this.angle);

         if(this.gemTimer > 0) {
             this.gemTimer = constrain(this.gemTimer - 1, 0, this.GEM_TIMER);
             if(this.gemTimer === 0) {
                 this.reach = this.REACH_MIN;
             }
         }
         if(this.speedTimer > 0) {
             this.speedTimer = constrain(this.speedTimer - 1, 0, this.SPEED_TIMER);
             if(this.speedTimer === 0) {
                 this.speed = this.SPEED_MIN;
             }
         }
     };
     AI.prototype.home = function() {
         //check to see if shoud head back to base
         var coordsArr = this.team === "GREEN" ? game.levels[game.level].coords.green : game.levels[game.level].coords.purple;

         var goingHome = false;

         for(var i = 0; i < coordsArr.length; i++) {
             var item = coordsArr[i];

             if(this.segments.length >= item.gems) {

                 if(game.collision(this, {
                     x: item.from.x * game.BLOCK_SIZE,
                     y: item.from.y * game.BLOCK_SIZE,
                     w: item.from.w * game.BLOCK_SIZE,
                     h: item.from.h * game.BLOCK_SIZE
                 })) {
                     this.target.x = item.to.x * game.BLOCK_SIZE;
                     this.target.y = item.to.y * game.BLOCK_SIZE;
                     goingHome = true;
                     break;
                 }
             }
         }

         if(goingHome) {
             this.angle = atan2(this.target.y - this.y, this.target.x - this.x);

             this.vx = (this.speed * random(0.5, 1)) * cos(this.angle);
             this.vy = (this.speed * random(0.5, 1)) * sin(this.angle);

             if(this.gemTimer > 0) {
                 this.gemTimer = constrain(this.gemTimer - 1, 0, this.GEM_TIMER);
                 if(this.gemTimer === 0) {
                     this.reach = this.REACH_MIN;
                 }
             }
             if(this.speedTimer > 0) {
                 this.speedTimer = constrain(this.speedTimer - 1, 0, this.SPEED_TIMER);
                 if(this.speedTimer === 0) {
                     this.speed = this.SPEED_MIN;
                 }
             }
         }
     };
     AI.prototype.move = function() {
         this.px = this.x;
         this.py = this.y;

         if(this.counter++ % 300 === 0) {
             this.update();
         }

         if(!this.hasTargetGem && this.counter % 10 === 0) {
             this.home();
         }

         this.x += this.vx;
         this.y += this.vy;

         this.dir = this.vx === 0 ? 0 : this.vx < 0 ? -1 : 1;

         if(this.vx < 0) {
             this.faceDir = -1;
         }
         else if(this.vx > 0){
             this.faceDir = 1;
         }
     };
     AI.prototype.draw = function() {
         noStroke();

         fill(this.color, 150);
         for(var i = 0; i < this.segments.length; i++) {
             var segment = this.segments[i];

             if(i === 0) {
                 segment.x = this.x + this.w / 2;
                 segment.y = this.y + this.h / 2;
             }
             else {
                 segment.x = lerp(segment.x, this.segments[i-1].x, 0.15);
                 segment.y = lerp(segment.y, this.segments[i-1].y, 0.15);
             }

             image(this.spiritImg, segment.x - segment.w * 0.25, segment.y - segment.h * 0.25, segment.w, segment.h);
         }

         pushMatrix();
             translate(this.x + this.w / 2, this.y + this.h / 2);
             //rotate(this.angle);
             if(this.faceDir === -1) {
                 translate(this.w * 0.25, 0);
                 scale(-1, 1);
             }
             translate(-this.x-this.w / 2, -this.y-this.h / 2);

             image(this.img, this.x, this.y, this.w, this.h);
         popMatrix();
     };
     AI.prototype.run = function() {
         this.draw();
         this.move();
     };

     var Player = function(config) {
         this.x = config.x || 300;
         this.y = config.y || 300;
         this.px = this.x;
         this.py = this.y;
         this.w = config.w || 40;
         this.h = config.h || 40;
         this.angle = config.angle || 0;
         this.segments = [];
         this.SPEED_MIN = config.SPEED_MIN || 4;
         this.SPEED_MAX = config.SPEED_MAX || 6;
         this.speed = this.SPEED_MIN;
         this.dir = 0;
         this.moved = false;
         this.faceDir = 1;
         this.color = config.color;
         this.REACH_MIN = config.REACH_MIN || this.w * 0.5;
         this.REACH_MAX = config.REACH_MAX || this.w * 2;
         this.reach = this.REACH_MIN;
         this.GEM_TIMER = config.GEM_TIMER || 300;
         this.gemTimer = config.gemTimer || 0;
         this.SPEED_TIMER = config.SPEED_TIMER || 300;
         this.speedTimer = config.speedTimer || 0;
         this.LIGHT_TIMER = config.LIGHT_TIMER || 300;
         this.lightTimer = config.lightTimer || 0;
         this.LIGHT_MIN = 15;
         this.LIGHT_MAX = 40;
         this.lightRadius = this.LIGHT_MIN;
         this.points = 0;
         this.team = config.team || "";
         this.index = config.index || 0; //0-7 = index of the ghost
         this.img = config.img || undefined;
         this.spiritImg = config.spiritImg || undefined;

         this.init = function() {
             this.segments.length = 0;
             this.reach = this.REACH_MIN;
             this.gemTimer = 0;
             this.speedTimer = 0;
             this.lightTimer = 0;
             this.reach = this.REACH_MIN;
             this.lightRadius = this.LIGHT_MIN;
         };
         this.init();
         this.update = function() {
             if(this.gemTimer > 0) {
                 this.gemTimer = constrain(this.gemTimer - 1, 0, this.GEM_TIMER);
                 if(this.gemTimer === 0) {
                     this.reach = this.REACH_MIN;
                 }
             }
             if(this.speedTimer > 0) {
                 this.speedTimer = constrain(this.speedTimer - 1, 0, this.SPEED_TIMER);
                 if(this.speedTimer === 0) {
                     this.speed = this.SPEED_MIN;
                 }
             }
             if(this.lightTimer > 0) {
                 this.lightTimer = constrain(this.lightTimer - 1, 0, this.LIGHT_TIMER);
                 if(this.lightTimer === 0) {
                     this.lightRadius = this.LIGHT_MIN;
                 }
             }
         };
         this.move = function() {
             this.px = this.x;
             this.py = this.y;
             this.dir = 0;

             // if(game.mobile && mouseIsPressed) {
           if(game.mobile) {
                 if(mouseX < game.cam.x + this.x) {
                     this.x-= this.speed;
                      this.dir = -1;
                      this.faceDir = -1;
                      this.moved = true;
                 }
                 else if(mouseX > game.cam.x + this.x) {
                     this.x+= this.speed;
                     this.dir = 1;
                     this.faceDir = 1;
                     this.moved = true;
                 }

                 if(mouseY < game.cam.y + this.y) {
                     this.y-= this.speed;
                     this.moved = true;
                 }
                 else if(mouseY > game.cam.y + this.y) {
                     this.y+= this.speed;
                     this.moved = true;
                 }
             }

             if(keys[LEFT] || keys[65]) { //Left arrow or A
                  this.x-= this.speed;
                  this.dir = -1;
                  this.faceDir = -1;
                  this.moved = true;
             }
             if(keys[RIGHT] || keys[68]) { //Right arrow or D
                  this.x+= this.speed;
                  this.dir = 1;
                  this.faceDir = 1;
                  this.moved = true;
             }
             if((keys[UP] || keys[87])) { //Up arrow or W
                  this.y-= this.speed;
                  this.moved = true;
             }
             if(keys[DOWN] || keys[83]) { //Down arrow or S
                  this.y+= this.speed;
                  this.moved = true;
             }

             this.angle = lerp(this.angle, 10 * this.dir, 0.2);
         };
         this.draw = function() {
             noStroke();
             fill(this.color, 150);
             for(var i = 0; i < this.segments.length; i++) {
                 var segment = this.segments[i];

                 if(i === 0) {
                     segment.x = this.x + this.w / 2;
                     segment.y = this.y + this.h / 2;
                 }
                 else {
                     segment.x = lerp(segment.x, this.segments[i-1].x, 0.15);
                     segment.y = lerp(segment.y, this.segments[i-1].y, 0.15);
                 }

                 image(this.spiritImg, segment.x - segment.w * 0.25, segment.y - segment.h * 0.25, segment.w, segment.h);
             }

             pushMatrix();
                 translate(this.x + this.w / 2, this.y + this.h / 2);
                 rotate(radians(this.angle));
                 if(this.faceDir === -1) {
                     translate(this.w * 0.25, 0);
                     scale(-1, 1);
                 }
                 translate(-this.x-this.w / 2, -this.y-this.h / 2);

                 image(this.img, this.x, this.y, this.w, this.h);
             popMatrix();
         };
         this.run = function() {
             this.draw();
             this.move();
             this.update();
         };
     };

     var Transition = function(config) {
         this.h = config.h || 0;
         this.vy = 15;
         this.active = config.active || false;
         this.page = config.page || "home";

         //reset the x position back to the left of the screen
         this.reset = function() {
             this.h = 0;
             this.vy = 15;
         };
         //draw the transition - if it's currently active
         this.draw = function() {
             if(this.active) {
                 pushStyle();
                     stroke(255, 50);
                     strokeWeight(2);
                     fill(43, 43, 43);

                     rect(0, 0, width, this.h);
                     rect(0, height-this.h, width, this.h);
                 popStyle();
             }
         };
         //update the transition - if it's currently active
         this.update = function() {
             if(this.active) {
                 this.h+= this.vy;

                 //if halfway across the screen then change the scene
                 if(this.h >= 300) {
                     game.page = this.page;
                     //if(game.page === "play") {
                     //    game.init();
                     //}
                     this.vy*= -1;
                 }
                 //else if it's completely off the screen reset it and set to inactive
                 else if(this.h < 0) {
                     this.reset();
                     this.active = false;
                 }
             }
         };
         this.run = function() {
             this.draw();
             this.update();
         };
     };

     var Particle = function(config) {
         this.x = config.x;
         this.y = config.y;
         this.vx = config.vx || 0;
         this.vy = config.vy || 0;
         this.w = config.w || 5;
         this.h = config.h || this.w;
         this.color = config.color;
         this.opacity = config.opacity || 150;
         this.opacitySpeed = config.opacitySpeed || 3;
     };
     Particle.new = function(confog) {
         var obj = Object.create(Particle.prototype);
         Particle.apply(obj, arguments);
         return obj;
     };
     Particle.prototype.update = function() {
         this.x+= this.vx;
         this.y+= this.vy;
         this.opacity-= this.opacitySpeed;
     };
     Particle.prototype.draw = function() {
         noStroke();
         pushMatrix();
             translate(this.x, this.y);

             fill(this.color, this.opacity);
             ellipse(0, 0, this.w, this.h);

         popMatrix();
     };
     Particle.prototype.run = function() {
         this.draw();
         this.update();
     };

     var Block = function(config) {
         this.x = config.x || 0;
         this.y = config.y || 0;
         this.w = config.w || 40;
         this.h = config.h || 40;
     };
     Block.new = function(config) {
         var obj = Object.create(Block.prototype);
         Block.apply(obj, arguments);
         return obj;
     };
     Block.prototype.draw = function() {
         if(game.level === 1) {
             image(game.images.block, this.x, this.y, this.w, this.h);
         }
         else if(game.level === 2) {
             image(game.images.block2, this.x, this.y, this.w, this.h);
         }
         else {
             image(game.images.block3, this.x, this.y, this.w, this.h);
         }
     };
     Block.prototype.run = function() {
         this.draw();  
     };

     var Base = function(config) {
         this.x = config.x || 0;
         this.y = config.y || 0;
         this.w = config.w || 40;
         this.h = config.h || 40;
         this.team = config.team || "friend";
         this.color = config.color || color(120, 214, 136);
     };
     Base.new = function(config) {
         var obj = Object.create(Base.prototype);
         Base.apply(obj, arguments);
         return obj;
     };
     Base.prototype.draw = function() {
         if(this.team === "GREEN") {
             image(game.images.friendBase, this.x, this.y, this.w, this.h);
         }
         else {
             image(game.images.foeBase, this.x, this.y, this.w, this.h);
         }
     };
     Base.prototype.run = function() {
         this.draw();  
     };

     var Gem = function(config) {
         this.x = config.x || 0;
         this.y = config.y || 0;
         this.w = config.w || 40;
         this.h = config.h || 40;
         this.used = config.used || false;
         /*
         types are:
         - 0 = normal
         - 1 = extra speed
         - 2 = wider reach
         - 3 = visibility
         */
         this.type = config.type || ~~random(4);
     };
     Gem.new = function(config) {
         var obj = Object.create(Gem.prototype);
         Gem.apply(obj, arguments);
         return obj;
     };
     Gem.prototype.draw = function() {
         if(this.used) {
             switch(this.type) {
                 case 0: //normal gem
                     image(game.images.normalSpirit, this.x, this.y, this.w, this.h);
                     break;
                 case 1: //extra speed
                     image(game.images.speedSpirit, this.x, this.y, this.w, this.h);
                     break;
                 case 2: //wider reach
                     image(game.images.reachSpirit, this.x, this.y, this.w, this.h);
                     break;
                 case 3: //wider visibility
                     image(game.images.lightSpirit, this.x, this.y, this.w, this.h);
                     break;
             }
         }
     };
     Gem.prototype.run = function() {
         this.draw();  
     };

     //Game engine
     var Game = function(config) {
         this.page = "load";
         this.level = 1;
         this.BLOCK_SIZE = 25;
         this.COLORS = {
             green: color(105, 179, 111),
             purple: color(179, 89, 172)
         };
         this.GEM_COLORS = [
             color(55, 214, 209, 150), //normal
             color(199, 195, 72, 150), //speed
             color(235, 142, 70, 150), //reach
             color(222, 93, 136, 150)  //light
         ];
         this.player = new Player({
             w: this.BLOCK_SIZE,
             h: this.BLOCK_SIZE,
             color: this.COLORS.green
         });
         this.foes = [];
         this.friends = [];
         this.foeBases = [];
         this.friendBases = [];
         this.levels = [
             {
                 grid: [
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                     "------------------------------------------------------------",
                 ]
             }, // menu
             {
                 base: {
                     green: {
                         x: 7 * this.BLOCK_SIZE,
                         y: 14 * this.BLOCK_SIZE
                     },
                     purple: {
                         x: 30 * this.BLOCK_SIZE,
                         y: 14 * this.BLOCK_SIZE
                     }
                 },
                 coords: {
                     green: [ //green
                         {
                             gems: 2,
                             from: {
                                     x: 2,
                                     y: 4,
                                     w: 3,
                                     h: 4
                                 },
                             to: {
                                     x: 6,
                                     y: 10
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 8,
                                     y: 2,
                                     w: 2,
                                     h: 3
                                 },
                             to: {
                                     x: 8,
                                     y: 10
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 11,
                                     y: 2,
                                     w: 5,
                                     h: 3
                                 },
                             to: {
                                     x: 8,
                                     y: 4
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 11,
                                     y: 9,
                                     w: 4,
                                     h: 2
                                 },
                             to: {
                                     x: 8,
                                     y: 10
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 5,
                                     y: 9,
                                     w: 5,
                                     h: 2
                                 },
                             to: {
                                     x: 7,
                                     y: 14
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 22,
                                     y: 3,
                                     w: 5,
                                     h: 2
                                 },
                             to: {
                                     x: 14,
                                     y: 4
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 30,
                                     y: 1,
                                     w: 4,
                                     h: 2
                                 },
                             to: {
                                     x: 22,
                                     y: 4
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 33,
                                     y: 4,
                                     w: 3,
                                     h: 4
                                 },
                             to: {
                                     x: 32,
                                     y: 9
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 28,
                                     y: 9,
                                     w: 5,
                                     h: 2
                                 },
                             to: {
                                     x: 24,
                                     y: 10
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 23,
                                     y: 9,
                                     w: 4,
                                     h: 2
                                 },
                             to: {
                                     x: 23,
                                     y: 14
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 12,
                                     y: 13,
                                     w: 14,
                                     h: 3
                                 },
                             to: {
                                     x: 12,
                                     y: 18
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 12,
                                     y: 17,
                                     w: 9,
                                     h: 2
                                 },
                             to: {
                                     x: 9,
                                     y: 18
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 23,
                                     y: 18,
                                     w: 12,
                                     h: 1
                                 },
                             to: {
                                     x: 12,
                                     y: 18
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 5,
                                     y: 18,
                                     w: 5,
                                     h: 1
                                 },
                             to: {
                                     x: 7,
                                     y: 14
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 2,
                                     y: 21,
                                     w: 5,
                                     h: 2
                                 },
                             to: {
                                     x: 6,
                                     y: 18
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 10,
                                     y: 21,
                                     w: 3,
                                     h: 2
                                 },
                             to: {
                                     x: 5,
                                     y: 21
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 17,
                                     y: 22,
                                     w: 4,
                                     h: 5
                                 },
                             to: {
                                     x: 16,
                                     y: 18
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 2,
                                     y: 32,
                                     w: 5,
                                     h: 3
                                 },
                             to: {
                                     x: 11,
                                     y: 32
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 10,
                                     y: 32,
                                     w: 3,
                                     h: 3
                                 },
                             to: {
                                     x: 11,
                                     y: 22
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 17,
                                     y: 32,
                                     w: 17,
                                     h: 3
                                 },
                             to: {
                                     x: 11,
                                     y: 32
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 25,
                                     y: 22,
                                     w: 3,
                                     h: 8
                                 },
                             to: {
                                     x: 25,
                                     y: 33
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 31,
                                     y: 21,
                                     w: 4,
                                     h: 2
                                 },
                             to: {
                                     x: 31,
                                     y: 18
                                 }
                         }
                     ],
                     purple: [ //purple
                         {
                             gems: 2,
                             from: {
                                     x: 33,
                                     y: 4,
                                     w: 3,
                                     h: 4
                                 },
                             to: {
                                     x: 31,
                                     y: 10
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 28,
                                     y: 2,
                                     w: 2,
                                     h: 3
                                 },
                             to: {
                                     x: 28,
                                     y: 10
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 22,
                                     y: 2,
                                     w: 5,
                                     h: 3
                                 },
                             to: {
                                     x: 29,
                                     y: 4
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 23,
                                     y: 9,
                                     w: 4,
                                     h: 2
                                 },
                             to: {
                                     x: 30,
                                     y: 10
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 28,
                                     y: 9,
                                     w: 5,
                                     h: 2
                                 },
                             to: {
                                     x: 30,
                                     y: 14
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 11,
                                     y: 3,
                                     w: 5,
                                     h: 2
                                 },
                             to: {
                                     x: 23,
                                     y: 4
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 4,
                                     y: 1,
                                     w: 4,
                                     h: 2
                                 },
                             to: {
                                     x: 15,
                                     y: 4
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 2,
                                     y: 4,
                                     w: 3,
                                     h: 4
                                 },
                             to: {
                                     x: 5,
                                     y: 9
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 5,
                                     y: 9,
                                     w: 5,
                                     h: 2
                                 },
                             to: {
                                     x: 13,
                                     y: 10
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 11,
                                     y: 9,
                                     w: 4,
                                     h: 2
                                 },
                             to: {
                                     x: 14,
                                     y: 14
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 12,
                                     y: 13,
                                     w: 14,
                                     h: 3
                                 },
                             to: {
                                     x: 25,
                                     y: 18
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 17,
                                     y: 17,
                                     w: 9,
                                     h: 2
                                 },
                             to: {
                                     x: 28,
                                     y: 18
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 3,
                                     y: 18,
                                     w: 12,
                                     h: 1
                                 },
                             to: {
                                     x: 25,
                                     y: 18
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 28,
                                     y: 18,
                                     w: 5,
                                     h: 1
                                 },
                             to: {
                                     x: 30,
                                     y: 14
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 31,
                                     y: 21,
                                     w: 5,
                                     h: 2
                                 },
                             to: {
                                     x: 31,
                                     y: 18
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 25,
                                     y: 21,
                                     w: 3,
                                     h: 2
                                 },
                             to: {
                                     x: 32,
                                     y: 21
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 17,
                                     y: 22,
                                     w: 4,
                                     h: 5
                                 },
                             to: {
                                     x: 21,
                                     y: 18
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 31,
                                     y: 32,
                                     w: 5,
                                     h: 3
                                 },
                             to: {
                                     x: 26,
                                     y: 32
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 25,
                                     y: 32,
                                     w: 3,
                                     h: 3
                                 },
                             to: {
                                     x: 26,
                                     y: 22
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 4,
                                     y: 32,
                                     w: 17,
                                     h: 3
                                 },
                             to: {
                                     x: 26,
                                     y: 32
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 10,
                                     y: 22,
                                     w: 3,
                                     h: 8
                                 },
                             to: {
                                     x: 12,
                                     y: 33
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 3,
                                     y: 21,
                                     w: 4,
                                     h: 2
                                 },
                             to: {
                                     x: 6,
                                     y: 18
                                 }
                         }
                     ]
                 },
                 grid: [
                     "BBBBBBBBBBBBBBBBBB  BBBBBBBBBBBBBBBBBB",
                     "B----------------B  B----------------B",
                     "B----G-G-G-G-G---BBBB---G-G-G-G-G----B",
                     "B-G--------------------------------G-B",
                     "B-----B--G-G---G-G--G-G---G-G--B-----B",
                     "B-G---B------------------------B---G-B",
                     "B-----B----BBB---G-G----BBB----B-----B",
                     "B-G--------------------------------G-B",
                     "B----------------B--B----------------B",
                     "B-G--------------B--B--------------G-B",
                     "B----------------B--B----------------B",
                     "B----------------B--B----------------B",
                     "B---BFFFFFB----------------BEEEEEB---B",
                     "B---BFF2FFB----------------BEE6EEB---B",
                     "B---BF1F3FB--G-G-G--G-G-G--BE5E7EB---B",
                     "B---BFF4FFB----------------BEE8EEB---B",
                     "B---BFFFFFB----------------BEEEEEB---B",
                     "B------------------------------------B",
                     "B------------G-G-G--G-G-G------------B",
                     "B------------------------------------B",
                     "B-------BBBBBBB--G--G--BBBBBBB-------B",
                     "B-G-G-G-------B--------B-------G-G-G-B",
                     "B-------------B--G--G--B-------------B",
                     "B----------G--B--------B--G----------B",
                     "BBBBBBBBB-----B--G--G--B-----BBBBBBBBB",
                     "        B--G--B--------B--G--B        ",
                     "        B-----B--G--G--B-----B        ",
                     "        B--G--B--------B--G--B        ",
                     "        B-----B--G--G--B-----B        ",
                     "BBBBBBBBB--G--B--------B--G--BBBBBBBBB",
                     "B-------------BBB----BBB-------------B",
                     "B----------G--------------G----------B",
                     "B--G-G-G----------------------G-G-G--B",
                     "B------------------------------------B",
                     "B------------------------------------B",
                     "B--G-G-G-----G-G-G--G-G-G-----G-G-G--B",
                     "B------------------------------------B",
                     "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
                 ]
             }, // level 1
             {
                 base: {
                     green: {
                         x: 13 * this.BLOCK_SIZE,
                         y: 19 * this.BLOCK_SIZE
                     },
                     purple: {
                         x: 26 * this.BLOCK_SIZE,
                         y: 19 * this.BLOCK_SIZE
                     }
                 },
                 coords: {
                     green: [ //green
                         {
                             gems: 2,
                             from: {
                                     x: 18,
                                     y: 17,
                                     w: 4,
                                     h: 5
                                 },
                             to: {
                                     x: 13,
                                     y: 19
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 4,
                                     y: 2,
                                     w: 3,
                                     h: 1
                                 },
                             to: {
                                     x: 11,
                                     y: 4
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 10,
                                     y: 4,
                                     w: 3,
                                     h: 5
                                 },
                             to: {
                                     x: 11,
                                     y: 12
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 6,
                                     y: 12,
                                     w: 7,
                                     h: 2
                                 },
                             to: {
                                     x: 19,
                                     y: 13
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 2,
                                     y: 10,
                                     w: 1,
                                     h: 2
                                 },
                             to: {
                                     x: 9,
                                     y: 12
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 15,
                                     y: 4,
                                     w: 4,
                                     h: 1
                                 },
                             to: {
                                     x: 11,
                                     y: 4
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 2,
                                     y: 4,
                                     w: 4,
                                     h: 1
                                 },
                             to: {
                                     x: 28,
                                     y: 4
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 27,
                                     y: 4,
                                     w: 3,
                                     h: 5
                                 },
                             to: {
                                     x: 28,
                                     y: 12
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 33,
                                     y: 2,
                                     w: 3,
                                     h: 1
                                 },
                             to: {
                                     x: 24,
                                     y: 4
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 37,
                                     y: 10,
                                     w: 1,
                                     h: 2
                                 },
                             to: {
                                     x: 29,
                                     y: 12
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 27,
                                     y: 12,
                                     w: 7,
                                     h: 2
                                 },
                             to: {
                                     x: 20,
                                     y: 12
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 17,
                                     y: 12,
                                     w: 6,
                                     h: 2
                                 },
                             to: {
                                     x: 20,
                                     y: 19
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 7,
                                     y: 16,
                                     w: 1,
                                     h: 3
                                 },
                             to: {
                                     x: 8,
                                     y: 12
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 7,
                                     y: 20,
                                     w: 1,
                                     h: 3
                                 },
                             to: {
                                     x: 8,
                                     y: 25
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 32,
                                     y: 16,
                                     w: 1,
                                     h: 3
                                 },
                             to: {
                                     x: 31,
                                     y: 12
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 32,
                                     y: 20,
                                     w: 1,
                                     h: 3
                                 },
                             to: {
                                     x: 31,
                                     y: 25
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 7,
                                     y: 25,
                                     w: 7,
                                     h: 2
                                 },
                             to: {
                                     x: 19,
                                     y: 25
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 26,
                                     y: 25,
                                     w: 7,
                                     h: 2
                                 },
                             to: {
                                     x: 20,
                                     y: 25
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 17,
                                     y: 25,
                                     w: 6,
                                     h: 2
                                 },
                             to: {
                                     x: 20,
                                     y: 20
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 2,
                                     y: 27,
                                     w: 1,
                                     h: 2
                                 },
                             to: {
                                     x: 9,
                                     y: 25
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 37,
                                     y: 27,
                                     w: 1,
                                     h: 2
                                 },
                             to: {
                                     x: 30,
                                     y: 25
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 2,
                                     y: 35,
                                     w: 1,
                                     h: 2
                                 },
                             to: {
                                     x: 27,
                                     y: 2
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 37,
                                     y: 35,
                                     w: 1,
                                     h: 2
                                 },
                             to: {
                                     x: 30,
                                     y: 27
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 5,
                                     y: 35,
                                     w: 4,
                                     h: 2
                                 },
                             to: {
                                     x: 11,
                                     y: 35
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 31,
                                     y: 35,
                                     w: 4,
                                     h: 2
                                 },
                             to: {
                                     x: 28,
                                     y: 35
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 10,
                                     y: 30,
                                     w: 3,
                                     h: 6
                                 },
                             to: {
                                     x: 11,
                                     y: 26
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 27,
                                     y: 30,
                                     w: 3,
                                     h: 6
                                 },
                             to: {
                                     x: 28,
                                     y: 26
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 15,
                                     y: 35,
                                     w: 4,
                                     h: 1
                                 },
                             to: {
                                     x: 11,
                                     y: 35
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 21,
                                     y: 35,
                                     w: 4,
                                     h: 1
                                 },
                             to: {
                                     x: 28,
                                     y: 35
                                 }
                         }
                     ],
                     purple: [ //purple
                         {
                             gems: 2,
                             from: {
                                     x: 18,
                                     y: 17,
                                     w: 4,
                                     h: 5
                                 },
                             to: {
                                 x: 26,
                                 y: 19
                             }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 4,
                                     y: 2,
                                     w: 3,
                                     h: 1
                                 },
                             to: {
                                     x: 11,
                                     y: 4
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 10,
                                     y: 4,
                                     w: 3,
                                     h: 5
                                 },
                             to: {
                                     x: 11,
                                     y: 12
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 6,
                                     y: 12,
                                     w: 7,
                                     h: 2
                                 },
                             to: {
                                     x: 19,
                                     y: 13
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 2,
                                     y: 10,
                                     w: 1,
                                     h: 2
                                 },
                             to: {
                                     x: 9,
                                     y: 12
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 15,
                                     y: 4,
                                     w: 4,
                                     h: 1
                                 },
                             to: {
                                     x: 11,
                                     y: 4
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 2,
                                     y: 4,
                                     w: 4,
                                     h: 1
                                 },
                             to: {
                                     x: 28,
                                     y: 4
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 27,
                                     y: 4,
                                     w: 3,
                                     h: 5
                                 },
                             to: {
                                     x: 28,
                                     y: 12
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 33,
                                     y: 2,
                                     w: 3,
                                     h: 1
                                 },
                             to: {
                                     x: 24,
                                     y: 4
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 37,
                                     y: 10,
                                     w: 1,
                                     h: 2
                                 },
                             to: {
                                     x: 29,
                                     y: 12
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 27,
                                     y: 12,
                                     w: 7,
                                     h: 2
                                 },
                             to: {
                                     x: 20,
                                     y: 12
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 17,
                                     y: 12,
                                     w: 6,
                                     h: 2
                                 },
                             to: {
                                     x: 20,
                                     y: 19
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 7,
                                     y: 16,
                                     w: 1,
                                     h: 3
                                 },
                             to: {
                                     x: 8,
                                     y: 12
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 7,
                                     y: 20,
                                     w: 1,
                                     h: 3
                                 },
                             to: {
                                     x: 8,
                                     y: 25
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 32,
                                     y: 16,
                                     w: 1,
                                     h: 3
                                 },
                             to: {
                                     x: 31,
                                     y: 12
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 32,
                                     y: 20,
                                     w: 1,
                                     h: 3
                                 },
                             to: {
                                     x: 31,
                                     y: 25
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 7,
                                     y: 25,
                                     w: 7,
                                     h: 2
                                 },
                             to: {
                                     x: 19,
                                     y: 25
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 26,
                                     y: 25,
                                     w: 7,
                                     h: 2
                                 },
                             to: {
                                     x: 20,
                                     y: 25
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 17,
                                     y: 25,
                                     w: 6,
                                     h: 2
                                 },
                             to: {
                                     x: 20,
                                     y: 20
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 2,
                                     y: 27,
                                     w: 1,
                                     h: 2
                                 },
                             to: {
                                     x: 9,
                                     y: 25
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 37,
                                     y: 27,
                                     w: 1,
                                     h: 2
                                 },
                             to: {
                                     x: 30,
                                     y: 25
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 2,
                                     y: 35,
                                     w: 1,
                                     h: 2
                                 },
                             to: {
                                     x: 27,
                                     y: 2
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 37,
                                     y: 35,
                                     w: 1,
                                     h: 2
                                 },
                             to: {
                                     x: 30,
                                     y: 27
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 5,
                                     y: 35,
                                     w: 4,
                                     h: 2
                                 },
                             to: {
                                     x: 11,
                                     y: 35
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 31,
                                     y: 35,
                                     w: 4,
                                     h: 2
                                 },
                             to: {
                                     x: 28,
                                     y: 35
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 10,
                                     y: 30,
                                     w: 3,
                                     h: 6
                                 },
                             to: {
                                     x: 11,
                                     y: 26
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 27,
                                     y: 30,
                                     w: 3,
                                     h: 6
                                 },
                             to: {
                                     x: 28,
                                     y: 26
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 15,
                                     y: 35,
                                     w: 4,
                                     h: 1
                                 },
                             to: {
                                     x: 11,
                                     y: 35
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 21,
                                     y: 35,
                                     w: 4,
                                     h: 1
                                 },
                             to: {
                                     x: 28,
                                     y: 35
                                 }
                         }
                     ]
                 },
                 grid: [
                     "BBBBBBBBBBBB                BBBBBBBBBBBB",
                     "B----------B                B----------B",
                     "B---G-G-G--BBBBBBBBBBBBBBBBBB--G-G-G---B",
                     "B--------------------------------------B",
                     "B-G--------G-G-G-G-G-G-G-G-G---------G-B",
                     "B----BBBB----------------------BBBB----B",
                     "B-G--B  B--G----------------G--B  B--G-B",
                     "B----B  B-----BBBBBBBBBBBB-----B  B----B",
                     "B-G--BBBB--G--B          B--G--BBBB--G-B",
                     "B-------------B          B-------------B",
                     "B-G-G-G-G-----BBBBBBBBBBBB-----G-G-G-G-B",
                     "B--------------------------------------B",
                     "B-------G--G--G-G-G--G-G-G--G--G-------B",
                     "BBBBB------------------------------BBBBB",
                     "    B------------------------------B    ",
                     "    B--G------------------------G--B    ",
                     "    B-----BBBBBB--------BBBBBB-----B    ",
                     "    B--G--BFFFFF--------EEEEEB--G--B    ",
                     "    B-----BF1F2F--------E5E6EB-----B    ",
                     "    B--G--BFFFFF--------EEEEEB--G--B    ",
                     "    B-----BF4F3F--------E7E8EB-----B    ",
                     "    B--G--BFFFFF--------EEEEEB--G--B    ",
                     "    B-----BBBBBB--------BBBBBB-----B    ",
                     "    B--G------------------------G--B    ",
                     "    B------------------------------B    ",
                     "BBBBB------G---G-G-G-G-G----G------BBBBB",
                     "B--------------------------------------B",
                     "B-G-G-G----G---G-G-G-G-G----G----G-G-G-B",
                     "B--------------------------------------B",
                     "B-G--BBBB--G--BBBBBBBBBBBB--G--BBBB--G-B",
                     "B----B  B-----B          B-----B  B----B",
                     "B-G--B  B--G--B          B--G--B  B--G-B",
                     "B----B  B-----BBBBBBBBBBBB-----B  B----B",
                     "B-G--BBBB--G----------------G--BBBB--G-B",
                     "B--------------------------------------B",
                     "B-G-----G--G--G-G-G-G-G-G---G--G-----G-B",
                     "B--------------------------------------B",
                     "B---G-G-G--BBBBBBBBBBBBBBBBBB--G-G-G---B",
                     "B----------B                B----------B",
                     "BBBBBBBBBBBB                BBBBBBBBBBBB"
                     ]
             }, // level 2
             {
                 base: {
                     green: {
                         x: 16 * this.BLOCK_SIZE,
                         y: 15 * this.BLOCK_SIZE
                     },
                     purple: {
                         x: 22 * this.BLOCK_SIZE,
                         y: 15 * this.BLOCK_SIZE
                     }
                 },
                 coords: {
                     green: [ //green
                         {
                             gems: 4,
                             from: {
                                     x: 7,
                                     y: 4,
                                     w: 3,
                                     h: 2
                                 },
                             to: {
                                     x: 12,
                                     y: 7
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 29,
                                     y: 4,
                                     w: 3,
                                     h: 2
                                 },
                             to: {
                                     x: 26,
                                     y: 7
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 2,
                                     y: 6,
                                     w: 3,
                                     h: 2
                                 },
                             to: {
                                     x: 4,
                                     y: 11
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 34,
                                     y: 6,
                                     w: 3,
                                     h: 2
                                 },
                             to: {
                                     x: 34,
                                     y: 11
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 12,
                                     y: 6,
                                     w: 4,
                                     h: 2
                                 },
                             to: {
                                     x: 15,
                                     y: 11
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 23,
                                     y: 6,
                                     w: 4,
                                     h: 2
                                 },
                             to: {
                                     x: 23,
                                     y: 11
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 8,
                                     y: 13,
                                     w: 3,
                                     h: 5
                                 },
                             to: {
                                     x: 10,
                                     y: 11
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 28,
                                     y: 13,
                                     w: 3,
                                     h: 5
                                 },
                             to: {
                                     x: 28,
                                     y: 11
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 11,
                                     y: 25,
                                     w: 4,
                                     h: 6
                                 },
                             to: {
                                     x: 15,
                                     y: 20
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 24,
                                     y: 25,
                                     w: 4,
                                     h: 6
                                 },
                             to: {
                                     x: 23,
                                     y: 20
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 2,
                                     y: 29,
                                     w: 3,
                                     h: 1
                                 },
                             to: {
                                     x: 12,
                                     y: 29
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 34,
                                     y: 29,
                                     w: 3,
                                     h: 1
                                 },
                             to: {
                                     x: 26,
                                     y: 29
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 7,
                                     y: 32,
                                     w: 3,
                                     h: 3
                                 },
                             to: {
                                     x: 12,
                                     y: 30
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 29,
                                     y: 32,
                                     w: 3,
                                     h: 3
                                 },
                             to: {
                                     x: 26,
                                     y: 30
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 16,
                                     y: 33,
                                     w: 3,
                                     h: 2
                                 },
                             to: {
                                     x: 13,
                                     y: 29
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 20,
                                     y: 33,
                                     w: 3,
                                     h: 2
                                 },
                             to: {
                                     x: 25,
                                     y: 29
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 2,
                                     y: 21,
                                     w: 3,
                                     h: 1
                                 },
                             to: {
                                     x: 9,
                                     y: 21
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 34,
                                     y: 21,
                                     w: 3,
                                     h: 1
                                 },
                             to: {
                                     x: 29,
                                     y: 21
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 2,
                                     y: 10,
                                     w: 9,
                                     h: 2
                                 },
                             to: {
                                     x: 15,
                                     y: 11
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 28,
                                     y: 10,
                                     w: 9,
                                     h: 2
                                 },
                             to: {
                                     x: 23,
                                     y: 11
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 8,
                                     y: 19,
                                     w: 3,
                                     h: 3
                                 },
                             to: {
                                     x: 16,
                                     y: 19
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 28,
                                     y: 19,
                                     w: 3,
                                     h: 3
                                 },
                             to: {
                                     x: 23,
                                     y: 19
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 14,
                                     y: 10,
                                     w: 5,
                                     h: 2
                                 },
                             to: {
                                     x: 16,
                                     y: 15
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 20,
                                     y: 10,
                                     w: 5,
                                     h: 2
                                 },
                             to: {
                                     x: 16,
                                     y: 10
                                 }
                         },


                         {
                             gems: 2,
                             from: {
                                     x: 14,
                                     y: 19,
                                     w: 5,
                                     h: 3
                                 },
                             to: {
                                     x: 16,
                                     y: 15
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 20,
                                     y: 19,
                                     w: 5,
                                     h: 3
                                 },
                             to: {
                                     x: 16,
                                     y: 20
                                 }
                         }
                     ],
                     purple: [ //purple
                         {
                             gems: 4,
                             from: {
                                     x: 7,
                                     y: 4,
                                     w: 3,
                                     h: 2
                                 },
                             to: {
                                     x: 12,
                                     y: 7
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 29,
                                     y: 4,
                                     w: 3,
                                     h: 2
                                 },
                             to: {
                                     x: 26,
                                     y: 7
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 2,
                                     y: 6,
                                     w: 3,
                                     h: 2
                                 },
                             to: {
                                     x: 4,
                                     y: 11
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 34,
                                     y: 6,
                                     w: 3,
                                     h: 2
                                 },
                             to: {
                                     x: 34,
                                     y: 11
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 12,
                                     y: 6,
                                     w: 4,
                                     h: 2
                                 },
                             to: {
                                     x: 15,
                                     y: 11
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 23,
                                     y: 6,
                                     w: 4,
                                     h: 2
                                 },
                             to: {
                                     x: 23,
                                     y: 11
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 8,
                                     y: 13,
                                     w: 3,
                                     h: 5
                                 },
                             to: {
                                     x: 10,
                                     y: 11
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 28,
                                     y: 13,
                                     w: 3,
                                     h: 5
                                 },
                             to: {
                                     x: 28,
                                     y: 11
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 11,
                                     y: 25,
                                     w: 4,
                                     h: 6
                                 },
                             to: {
                                     x: 15,
                                     y: 20
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 24,
                                     y: 25,
                                     w: 4,
                                     h: 6
                                 },
                             to: {
                                     x: 23,
                                     y: 20
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 2,
                                     y: 29,
                                     w: 3,
                                     h: 1
                                 },
                             to: {
                                     x: 12,
                                     y: 29
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 34,
                                     y: 29,
                                     w: 3,
                                     h: 1
                                 },
                             to: {
                                     x: 26,
                                     y: 29
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 7,
                                     y: 32,
                                     w: 3,
                                     h: 3
                                 },
                             to: {
                                     x: 12,
                                     y: 30
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 29,
                                     y: 32,
                                     w: 3,
                                     h: 3
                                 },
                             to: {
                                     x: 26,
                                     y: 30
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 16,
                                     y: 33,
                                     w: 3,
                                     h: 2
                                 },
                             to: {
                                     x: 13,
                                     y: 29
                                 }
                         },
                         {
                             gems: 4,
                             from: {
                                     x: 20,
                                     y: 33,
                                     w: 3,
                                     h: 2
                                 },
                             to: {
                                     x: 25,
                                     y: 29
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 2,
                                     y: 21,
                                     w: 3,
                                     h: 1
                                 },
                             to: {
                                     x: 9,
                                     y: 21
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 34,
                                     y: 21,
                                     w: 3,
                                     h: 1
                                 },
                             to: {
                                     x: 29,
                                     y: 21
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 2,
                                     y: 10,
                                     w: 9,
                                     h: 2
                                 },
                             to: {
                                     x: 15,
                                     y: 11
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 28,
                                     y: 10,
                                     w: 9,
                                     h: 2
                                 },
                             to: {
                                     x: 23,
                                     y: 11
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 8,
                                     y: 19,
                                     w: 3,
                                     h: 3
                                 },
                             to: {
                                     x: 16,
                                     y: 19
                                 }
                         },
                         {
                             gems: 3,
                             from: {
                                     x: 28,
                                     y: 19,
                                     w: 3,
                                     h: 3
                                 },
                             to: {
                                     x: 23,
                                     y: 19
                                 }
                         },



                         {
                             gems: 2,
                             from: {
                                     x: 14,
                                     y: 10,
                                     w: 5,
                                     h: 2
                                 },
                             to: {
                                     x: 22,
                                     y: 11
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 20,
                                     y: 10,
                                     w: 5,
                                     h: 2
                                 },
                             to: {
                                     x: 22,
                                     y: 15
                                 }
                         },


                         {
                             gems: 2,
                             from: {
                                     x: 14,
                                     y: 19,
                                     w: 5,
                                     h: 3
                                 },
                             to: {
                                     x: 22,
                                     y: 20
                                 }
                         },
                         {
                             gems: 2,
                             from: {
                                     x: 20,
                                     y: 19,
                                     w: 5,
                                     h: 3
                                 },
                             to: {
                                     x: 22,
                                     y: 15
                                 }
                         }
                     ]
                 },
                 grid: [
                     "    BBBBBBBBB   BBBBBBB   BBBBBBBBB    ",
                     "    B-------B   B-----B   B-------B    ",
                     "    B-G-G-G-B   B--G--B   B-G-G-G-B    ",
                     "    B-------B   B-----B   B-------B    ",
                     "BBBBB-G---G-BBBBB--G--BBBBB-G---G-BBBBB",
                     "B-------------------------------------B",
                     "B----------G-G-G-------G-G-G----------B",
                     "B-G-G-----------------------------G-G-B",
                     "B-----BBBBB------BBBBB------BBBBB-----B",
                     "B-G-------------------------------G-G-B",
                     "B------------G-G-G-G-G-G-G------------B",
                     "B-G-G-----------------------------G-G-B",
                     "B-------------------------------------B",
                     "B-------G----BFFFFFBEEEEEB----G-------B",
                     "BBBBBB-------BF1F2FBE5E6EB-------BBBBBB",
                     "     B--G----BFFFFFBEEEEEB----G--B     ",
                     "     B-------BF4F3FBE7E8EB-------B     ",
                     "     B--G----BFFFFFBEEEEEB----G--B     ",
                     "     B---------------------------B     ",
                     "BBBBBB---------------------------BBBBBB",
                     "B------------G-G-G-G-G-G-G------------B",
                     "B-G---------------------------------G-B",
                     "B-------------------------------------B",
                     "B-G--BBBB----G---BBBBB---G----BBBB--G-B",
                     "B----B  B--------B   B--------B  B----B",
                     "B-G--B  B----G---B   B---G----B  B--G-B",
                     "B----B  B--------B   B--------B  B----B",
                     "B-G--BBBB----G---B   B---G----BBBB--G-B",
                     "B----------------B   B----------------B",
                     "B-G----------G---B   B---G----------G-B",
                     "B----------------B   B----------------B",
                     "BBBBBB-------G---BBBBB---G-------BBBBBB",
                     "     B-G-G-------------------G-G-B     ",
                     "     B-----------G-G-G-----------B     ",
                     "     B-G-G-------------------G-G-B     ",
                     "     B-----BBBB---------BBBB-----B     ",
                     "     B-G-G-B  B--G-G-G--B  B-G-G-B     ",
                     "     B-----B  B---------B  B-----B     ",
                     "     BBBBBBB  BBBBBBBBBBB  BBBBBBB     "
                     ]
             }  // level 3
         ];
         this.grid = this.levels[this.level].grid;
         this.world = {
             w: 0,
             h: 0
         };
         this.transition = new Transition({});
         this.blocks = [];
         this.grounds = [];
         this.gems = [];
         this.players = [
                 {
                     name: "Jade",
                     image: undefined,
                     team: "GREEN"
                 },
                 {
                     name: "Sage",
                     image: undefined,
                     team: "GREEN"
                 },
                 {
                     name: "Kelly",
                     image: undefined,
                     team: "GREEN"
                 },
                 {
                     name: "Olive",
                     image: undefined,
                     team: "GREEN"
                 },
                 {
                     name: "Plum",
                     image: undefined,
                     team: "PURPLE"
                 },
                 {
                     name: "Periwinkle",
                     image: undefined,
                     team: "PURPLE"
                 },
                 {
                     name: "Iris",
                     image: undefined,
                     team: "PURPLE"
                 },
                 {
                     name: "Mulberry",
                     image: undefined,
                     team: "PURPLE"
                 }
         ];
         this.cam = {
             x: 0,
             y: 0
         };
         this.timer = 0;
         this.TOTAL_TIME = 125;// 125; //125 seconds (5 seconds for delay)
         this.timerStart = 0;
         this.timerDelay = 5; //5 seconds
         this.counter = 0;
         this.rate = 0;
         this.shake = 0;
         this.shakedown = 0.1;
         this.points = {
             friend: 0,
             foe: 0
         };
         this.individualPoints = {
             friends: [],
             foes: []
         };
         this.highscores = [
             {
                 name: "MoonLight Studios",
                 score: 446
             },
             {
                 name: "« SP »",
                 score: 432
             },
             {
                 name: "ʟǟʐɛʀʟɛɢɛռɖ",
                 score: 385
             },
             {
                 name: "Purple Pi",
                 score: 381
             },
             {
                 name: "HootCode();",
                 score: 350
             },
             {
                 name: "MØØN™",
                 score: 304
             },
             {
                 name: "Angel Ramirez-Rios",
                 score: 264
             },
             {
                 name: "Hunter",
                 score: 254
             },
             {
                 name: "GDB",
                 score: 234
             },
             {
                 name: "ElectricStudios",
                 score: 198
             }
         ];
         this.highscores.sort(function(a, b) {
            return b.score - a.score; 
         });
         this.sound = false;
         // this.sounds = {
         //     eat: getSound("retro/hit1"),
         //     collect: getSound("retro/coin"),
         //     block: getSound("retro/hit2")
         // };
         // this.sounds.eat.audio.playbackRate = 15;
         // this.sounds.block.audio.playbackRate = 10;
         this.mobile = false;
         this.MIN_GEMS = 12;
         this.numberOfGems = 0;
         this.addGemFrequency = 60;
         this.AI_GEM_FREQUENCY = 10;
         this.AI_GEM_RADIUS = this.BLOCK_SIZE * 5;
         this.notifs = [];
         this.notifsPoints = [];
         this.curLoad = 0;
         this.loaded = false;
         this.images = undefined;
         this.gameoverImage = undefined;
         this.playColor = 1;
         this.fonts = {
             body: createFont("Verdana"),
             title: createFont("Trebuchet MS")
         };
         this.curve = {
             x1: 80,
             y1: 180,
             cx1: 200,
             cy1: 120,
             cx2: 400,
             cy2: 120,
             x2: 520,
             y2: 180
         };
         this.curveAbout = {
             x1: 200,
             y1: 100,
             cx1: 275,
             cy1: 80,
             cx2: 325,
             cy2: 80,
             x2: 400,
             y2: 100
         };
         this.curveScores = {
             x1: 180,
             y1: 100,
             cx1: 275,
             cy1: 80,
             cx2: 325,
             cy2: 80,
             x2: 420,
             y2: 100
         };
         this.pointsHome = [];
         this.pointsAbout = [];
         this.pointsScores = [];
         this.buttons = {
             play: new Button({
                 x: 300,
                 y: 140,
                 size: 100,
                 textColor: color(105, 179, 111, 50),
                 content: "Play",
                 page: "play",
                 func: function() {
                     game.page = "play";
                     game.init();
                 }
             }),
             replay: new Button({
                 x: 300,
                 y: 350,
                 content: "Replay",
                 page: "play",
                 func: function() {
                     game.page = "play";
                     game.init();
                 }
             }),
             how: new Button({
                 x: 410,
                 y: 450,
                 content: "How",
                 page: "how",
                 size: 90,
                 func: function() {
                     game.transition.page = "how";
                     game.transition.active = true;
                 }
             }),
             scoreboard: new Button({
                 x: 300,
                 y: 440,
                 content: "Scoreboard",
                 page: "scoreboard",
                 size: 90,
                 func: function() {
                     game.transition.page = "scoreboard";
                     game.transition.active = true;
                 }
             }),
             home: new Button({
                 x: 300,
                 y: 510,
                 size: 90,
                 content: "Back",
                 page: "home",
                 func: function() {
                     game.transition.page = "home";
                     game.transition.active = true;
                 }
             }),
             back: new Button({
                 x: 300,
                 y: 500,
                 content: "Back",
                 page: "home",
                 func: function() {
                     game.transition.page = "home";
                     game.transition.active = true;
                 }
             }),
             sound: new Button({
                 x: 190,
                 y: 450,
                 content: "Sound",
                 page: "sound",
                 size: 90,
                 func: function() {
                     // game.sound = !game.sound;
                 }
             })
         };
         this.avatarImages = [];
         this.particles = [];
         this.spirits = [];

         this.setPlayer = function(i, row, col) {
             var index = parseInt(i, 10) - 1;

             var img = this.avatarImages[index];

             if(this.player.index === index) {
                 this.player.x = col * this.BLOCK_SIZE;
                 this.player.y = row * this.BLOCK_SIZE;
                 this.player.w = this.BLOCK_SIZE;
                 this.player.h = this.BLOCK_SIZE * 1.2;
                 this.player.img = img;
                 this.player.init();

                 if(this.player.index <= 3) {
                     this.player.color = this.COLORS.green;
                     this.player.team = "GREEN";
                     this.player.spiritImg = this.images.greenSpirit;

                     this.friendBases.push(Base.new({
                         x: col * this.BLOCK_SIZE,
                         y: row * this.BLOCK_SIZE,
                         w: this.BLOCK_SIZE,
                         h: this.BLOCK_SIZE,
                         color: this.COLORS.green,
                         team: "GREEN"
                     }));
                 }
                 else {
                     this.player.color = this.COLORS.purple;
                     this.player.team = "PURPLE";
                     this.player.spiritImg = this.images.purpleSpirit;

                     this.friendBases.push(Base.new({
                         x: col * this.BLOCK_SIZE,
                         y: row * this.BLOCK_SIZE,
                         w: this.BLOCK_SIZE,
                         h: this.BLOCK_SIZE,
                         color: this.COLORS.purple,
                         team: "PURPLE"
                     }));
                 }
             }
             else if(this.player.index <= 3 && index <= 3) {
                 this.friends.push(AI.new({
                     x: col * this.BLOCK_SIZE,
                     y: row * this.BLOCK_SIZE,
                     w: this.BLOCK_SIZE,
                     h: this.BLOCK_SIZE * 1.2,
                     color: this.COLORS.green,
                     team: "GREEN",
                     index: index,
                     img: img,
                     spiritImg: this.images.greenSpirit
                 }));

                 this.friendBases.push(Base.new({
                     x: col * this.BLOCK_SIZE,
                     y: row * this.BLOCK_SIZE,
                     w: this.BLOCK_SIZE,
                     h: this.BLOCK_SIZE,
                     color: this.COLORS.green,
                     team: "GREEN"
                 }));
             }
             else if(this.player.index >= 4 && index >= 4) {
                 this.friends.push(AI.new({
                     x: col * this.BLOCK_SIZE,
                     y: row * this.BLOCK_SIZE,
                     w: this.BLOCK_SIZE,
                     h: this.BLOCK_SIZE * 1.2,
                     color: this.COLORS.purple,
                     team: "PURPLE",
                     index: index,
                     img: img,
                     spiritImg: this.images.purpleSpirit
                 }));
                 this.friendBases.push(Base.new({
                     x: col * this.BLOCK_SIZE,
                     y: row * this.BLOCK_SIZE,
                     w: this.BLOCK_SIZE,
                     h: this.BLOCK_SIZE,
                     color: this.COLORS.purple,
                     team: "PURPLE"
                 }));
             }
             else if(this.player.index >= 4 && index <= 3) {
                 this.foes.push(AI.new({
                     x: col * this.BLOCK_SIZE,
                     y: row * this.BLOCK_SIZE,
                     w: this.BLOCK_SIZE,
                     h: this.BLOCK_SIZE * 1.2,
                     color: this.COLORS.green,
                     team: "GREEN",
                     index: index,
                     img: img,
                     spiritImg: this.images.greenSpirit
                 }));
                 this.foeBases.push(Base.new({
                     x: col * this.BLOCK_SIZE,
                     y: row * this.BLOCK_SIZE,
                     w: this.BLOCK_SIZE,
                     h: this.BLOCK_SIZE,
                     color: this.COLORS.green,
                     team: "GREEN"
                 }));
             }
             else {
                 this.foes.push(AI.new({
                     x: col * this.BLOCK_SIZE,
                     y: row * this.BLOCK_SIZE,
                     w: this.BLOCK_SIZE,
                     h: this.BLOCK_SIZE * 1.2,
                     color: this.COLORS.purple,
                     team: "PURPLE",
                     index: index,
                     img: img,
                     spiritImg: this.images.purpleSpirit
                 }));
                 this.foeBases.push(Base.new({
                     x: col * this.BLOCK_SIZE,
                     y: row * this.BLOCK_SIZE,
                     w: this.BLOCK_SIZE,
                     h: this.BLOCK_SIZE,
                     color: this.COLORS.purple,
                     team: "PURPLE"
                 }));
             }
         };
         this.setLevelGrid = function() {
             //get the current game level grid
             this.grid = this.levels[this.level].grid;

             this.world = {
                 w: this.grid[0].length * this.BLOCK_SIZE,
                 h: this.grid.length * this.BLOCK_SIZE
             };

             this.cam.x = 0;
             this.cam.y = 0;

             //get the sprites and create/store appropriately
             for(var row = 0; row < this.grid.length; row++) {

                 //add the different assets from the map
                 for(var col = 0; col < this.grid[row].length; col++) {
                     switch(this.grid[row][col]) {
                         case "B": //block
                             this.blocks.push(Block.new({
                                 x: col * this.BLOCK_SIZE,
                                 y: row * this.BLOCK_SIZE,
                                 w: this.BLOCK_SIZE,
                                 h: this.BLOCK_SIZE
                             }));
                             break;
                          case "-": //ground
                             this.grounds.push({
                                 x: col * this.BLOCK_SIZE,
                                 y: row * this.BLOCK_SIZE,
                                 w: this.BLOCK_SIZE,
                                 h: this.BLOCK_SIZE
                             });
                             break;
                          case "G": //gem
                             this.gems.push(Gem.new({
                                 x: col * this.BLOCK_SIZE + this.BLOCK_SIZE * 0.15,
                                 y: row * this.BLOCK_SIZE + this.BLOCK_SIZE * 0.15,
                                 w: this.BLOCK_SIZE * 0.7,
                                 h: this.BLOCK_SIZE  * 0.7,
                                 used: random() < 0.2 ? true : false
                             }));
                             this.grounds.push({
                                 x: col * this.BLOCK_SIZE,
                                 y: row * this.BLOCK_SIZE,
                                 w: this.BLOCK_SIZE,
                                 h: this.BLOCK_SIZE
                             });
                             break;
                         case "1":
                         case "2":
                         case "3":
                         case "4":
                         case "5":
                         case "6":
                         case "7":
                         case "8":
                             this.setPlayer(this.grid[row][col], row, col);
                             break;
                         case "F": //GREEN base
                             if(this.player.index <= 3) {
                                 this.friendBases.push(Base.new({
                                     x: col * this.BLOCK_SIZE,
                                     y: row * this.BLOCK_SIZE,
                                     w: this.BLOCK_SIZE,
                                     h: this.BLOCK_SIZE,
                                     color: this.COLORS.green,
                                     team: "GREEN"
                                 }));
                             }
                             else {
                                 this.foeBases.push(Base.new({
                                     x: col * this.BLOCK_SIZE,
                                     y: row * this.BLOCK_SIZE,
                                     w: this.BLOCK_SIZE,
                                     h: this.BLOCK_SIZE,
                                     color: this.COLORS.green,
                                     team: "GREEN"
                                 }));
                             }
                             break;
                         case "E": //PURPLE base
                             if(this.player.index >= 4) {
                                 this.friendBases.push(Base.new({
                                     x: col * this.BLOCK_SIZE,
                                     y: row * this.BLOCK_SIZE,
                                     w: this.BLOCK_SIZE,
                                     h: this.BLOCK_SIZE,
                                     color: this.COLORS.purple,
                                     team: "PURPLE"
                                 }));
                             }
                             else {
                                 this.foeBases.push(Base.new({
                                     x: col * this.BLOCK_SIZE,
                                     y: row * this.BLOCK_SIZE,
                                     w: this.BLOCK_SIZE,
                                     h: this.BLOCK_SIZE,
                                     color: this.COLORS.purple,
                                     team: "PURPLE"
                                 }));
                             }
                             break;
                     }
                 }
             }

             //get number of used gems
             for(var i = 0; i < this.gems.length; i++) {
                 if(this.gems[i].used) {
                     this.numberOfGems++;
                 }
             }
         };
         this.init = function() {
             //clear arrays
             this.blocks.length = 0;
             this.gems.length = 0;
             this.foes.length = 0;
             this.friends.length = 0;
             this.foeBases.length = 0;
             this.friendBases.length = 0;
             this.notifs.length = 0;
             this.notifsPoints.length = 0;
             this.grounds.length = 0;
             this.individualPoints.friends.length = 0;
             this.individualPoints.foes.length = 0;
             this.particles.length = 0;
             this.spirits.length = 0;
             this.shake = 0;
             this.numberOfGems = 0;
             this.player.segments.length = 0;
             this.player.points = 0;
             this.player.index = ~~random(8); //0, 1, 2, 3, 4, 5, 6, 7

             this.points = {
                 friend: 0,
                 foe: 0
             };

             //start timer
             this.timer = 0;
             this.timerStart = millis();
             this.counter = 0;

             //randomly select a level
             randomSeed(millis());
             this.level = ~~random(1, this.levels.length);

             //load the current level grid
             this.setLevelGrid();
         };
         this.reset = function() {
             //clear player segments and points
             this.player.segments.length = 0;
             this.player.points = 0;
             for(var i = 0; i < this.friends.length; i++) {
                 this.friends[i].segments.length = 0;
                 this.friends[i].points = 0;
             }
             for(var i = 0; i < this.foes.length; i++) {
                 this.foes[i].segments.length = 0;
                 this.foes[i].points = 0;
             }

             this.points = {
                 friend: 0,
                 foe: 0
             };
         };
         this.setup = function() {
             //setup bezier points for home title
             for(var i = 0; i <= 18; i++) {
                 var t = i / 18;
                 var x = bezierPoint(this.curve.x1, this.curve.cx1, this.curve.cx2, this.curve.x2, t);
                 var y = bezierPoint(this.curve.y1, this.curve.cy1, this.curve.cy2, this.curve.y2, t);
                 var tx = bezierTangent(this.curve.x1, this.curve.cx1, this.curve.cx2, this.curve.x2, t);
                 var ty = bezierTangent(this.curve.y1, this.curve.cy1, this.curve.cy2, this.curve.y2, t);
                 var angle = atan2(ty, tx);

                 this.pointsHome.push({
                     x: x,
                     y: y,
                     angle: angle
                 });
             }

             //setup bezier points for about title
             for(var i = 0; i <= 4; i++) {
                 var t = i / 4;
                 var x = bezierPoint(this.curveAbout.x1, this.curveAbout.cx1, this.curveAbout.cx2, this.curveAbout.x2, t);
                 var y = bezierPoint(this.curveAbout.y1, this.curveAbout.cy1, this.curveAbout.cy2, this.curveAbout.y2, t);
                 var tx = bezierTangent(this.curveAbout.x1, this.curveAbout.cx1, this.curveAbout.cx2, this.curveAbout.x2, t);
                 var ty = bezierTangent(this.curveAbout.y1, this.curveAbout.cy1, this.curveAbout.cy2, this.curveAbout.y2, t);
                 var angle = atan2(ty, tx);

                 this.pointsAbout.push({
                     x: x,
                     y: y,
                     angle: angle
                 });
             }

             //setup bezier points for scores title
             for(var i = 0; i <= 5; i++) {
                 var t = i / 5;
                 var x = bezierPoint(this.curveScores.x1, this.curveScores.cx1, this.curveScores.cx2, this.curveScores.x2, t);
                 var y = bezierPoint(this.curveScores.y1, this.curveScores.cy1, this.curveScores.cy2, this.curveScores.y2, t);
                 var tx = bezierTangent(this.curveScores.x1, this.curveScores.cx1, this.curveScores.cx2, this.curveScores.x2, t);
                 var ty = bezierTangent(this.curveScores.y1, this.curveScores.cy1, this.curveScores.cy2, this.curveScores.y2, t);
                 var angle = atan2(ty, tx);

                 this.pointsScores.push({
                     x: x,
                     y: y,
                     angle: angle
                 });
             }

             this.images = {
                 ground: function() {
                     background(0, 0, 0, 0);

                     pushStyle();
                         noStroke();
                         fill(207, 203, 207);
                         for(var i = 0; i < 20; i++) {
                             stroke(250, i/10);
                             ellipse(~~random(game.BLOCK_SIZE), ~~random(game.BLOCK_SIZE), game.BLOCK_SIZE * 0.05, game.BLOCK_SIZE * 0.05);
                         }
                     popStyle();

                     return get (0, 0, game.BLOCK_SIZE, game.BLOCK_SIZE);
                 },
                 ground2: function() {
                     background(0, 0, 0, 0);

                     pushStyle();
                         noStroke();
                         for(var i = 0; i < 50; i++) {
                             fill(122, 80, 16, random(100, 200));
                             ellipse(~~random(game.BLOCK_SIZE), ~~random(game.BLOCK_SIZE), game.BLOCK_SIZE * 0.05, game.BLOCK_SIZE * 0.05);
                         }
                     popStyle();

                     return get (0, 0, game.BLOCK_SIZE, game.BLOCK_SIZE);
                 },
                 ground3: function() {
                     background(0, 0, 0, 0);

                     pushStyle();
                         noStroke();
                         for(var i = 0; i < 50; i++) {
                             fill(128, 175, 189, random(50, 100));
                             ellipse(~~random(game.BLOCK_SIZE), ~~random(game.BLOCK_SIZE), game.BLOCK_SIZE * 0.05, game.BLOCK_SIZE * 0.05);
                         }
                     popStyle();

                     return get (0, 0, game.BLOCK_SIZE, game.BLOCK_SIZE);
                 },
                 block: function() {
                     background(0, 0, 0, 0);

                     pushStyle();
                         noStroke();
                         fill(99, 96, 99);
                         for(var i = 0; i < 20; i++) {
                             stroke(0, i/15);
                             ellipse(~~random(game.BLOCK_SIZE), ~~random(game.BLOCK_SIZE), game.BLOCK_SIZE * 0.05, game.BLOCK_SIZE * 0.05);
                         }
                     popStyle();

                     return get (0, 0, game.BLOCK_SIZE, game.BLOCK_SIZE);
                 },
                 block2: function() {
                     background(0, 0, 0, 0);

                     pushStyle();
                         noStroke();
                         for(var i = 0; i < 150; i++) {
                             fill(122, 80, 16, random(100, 200));
                             ellipse(~~random(game.BLOCK_SIZE), ~~random(game.BLOCK_SIZE), game.BLOCK_SIZE * 0.05, game.BLOCK_SIZE * 0.05);
                         }
                     popStyle();

                     return get (0, 0, game.BLOCK_SIZE, game.BLOCK_SIZE);
                 },
                 block3: function() {
                     background(0, 0, 0, 0);

                     pushStyle();
                         noStroke();
                         for(var i = 0; i < 150; i++) {
                             fill(222, 220, 226, random(100, 200));
                             ellipse(~~random(game.BLOCK_SIZE), ~~random(game.BLOCK_SIZE), game.BLOCK_SIZE * 0.05, game.BLOCK_SIZE * 0.05);
                         }
                     popStyle();

                     return get (0, 0, game.BLOCK_SIZE, game.BLOCK_SIZE);
                 },
                 foeBase: function() {
                     background(0, 0, 0, 0);

                     pushStyle();
                         noStroke();
                         for(var i = 0; i < 60; i++) {
                             fill(game.COLORS.purple, ~~random(180, 200));
                             rect(~~random(game.BLOCK_SIZE), ~~random(game.BLOCK_SIZE), game.BLOCK_SIZE * 0.05, game.BLOCK_SIZE * 0.05);
                         }
                     popStyle();

                     return get (0, 0, game.BLOCK_SIZE, game.BLOCK_SIZE);
                 },
                 friendBase: function() {
                     background(0, 0, 0, 0);

                     pushStyle();
                         noStroke();
                         for(var i = 0; i < 60; i++) {
                             fill(game.COLORS.green, ~~random(180, 200));
                             rect(~~random(game.BLOCK_SIZE), ~~random(game.BLOCK_SIZE), game.BLOCK_SIZE * 0.05, game.BLOCK_SIZE * 0.05);
                         }
                     popStyle();

                     return get (0, 0, game.BLOCK_SIZE, game.BLOCK_SIZE);
                 },
                 web: function() {
                     background(0, 0, 0, 0);

                     var web = new Web(0, 0, 1);
                     web.draw();

                     return get (220, 0, 180, 190);
                 },
                 spider: function() {
                     background(0, 0, 0, 0);

                     Spider({x: -324, y: -188, color: color(40, 50), opacity: 100});

                     return get (0, 0, 52, 68);
                 },
                 spiderGreen: function() {
                     background(0, 0, 0, 0);

                     Spider({x: -324, y: -188, color: game.COLORS.green});

                     return get (0, 0, 52, 68);
                 },
                 spiderPurple: function() {
                     background(0, 0, 0, 0);

                     Spider({x: -324, y: -188, color: game.COLORS.purple});

                     return get (0, 0, 52, 68);
                 },
                 jade: function() {
                     background(0, 0, 0, 0);

                     var jade = new Avatar({
                         x: 0, 
                         y: 0,
                         type: 0
                     });
                     jade.draw();

                     return get (0, 0, 100, 120);
                 },
                 sage: function() {
                     background(0, 0, 0, 0);

                     var sage = new Avatar({
                         x: 0, 
                         y: 0,
                         type: 1
                     });
                     sage.draw();

                     return get (0, 0, 100, 120);
                 },
                 kelly: function() {
                     background(0, 0, 0, 0);

                     var kelly = new Avatar({
                         x: 0, 
                         y: 0,
                         type: 2
                     });
                     kelly.draw();

                     return get (0, 0, 100, 120);
                 },
                 olive: function() {
                     background(0, 0, 0, 0);

                     var olive = new Avatar({
                         x: 0, 
                         y: 0,
                         type: 3
                     });
                     olive.draw();

                     return get (0, 0, 100, 120);
                 },
                 plum: function() {
                     background(0, 0, 0, 0);

                     var plum = new Avatar({
                         x: 0, 
                         y: 0,
                         type: 4
                     });
                     plum.draw();

                     return get (0, 0, 100, 120);
                 },
                 periwinkle: function() {
                     background(0, 0, 0, 0);

                     var periwinkle = new Avatar({
                         x: 0, 
                         y: 0,
                         type: 5
                     });
                     periwinkle.draw();

                     return get (0, 0, 100, 120);
                 },
                 iris: function() {
                     background(0, 0, 0, 0);

                     var iris = new Avatar({
                         x: 0, 
                         y: 0,
                         type: 6
                     });
                     iris.draw();

                     return get (0, 0, 100, 120);
                 },
                 mulberry: function() {
                     background(0, 0, 0, 0);

                     var mulberry = new Avatar({
                         x: 0, 
                         y: 0,
                         type: 7
                     });
                     mulberry.draw();

                     return get (0, 0, 100, 120);
                 },
                 purpleSpirit: function() {
                     background(0, 0, 0, 0);

                     var purpleSpirit = new Spirit({
                         headColor: color(173, 73, 255, 150),
                         bodyColor: color(220, 123, 254, 150),
                         bodyStroke: color(219, 81, 251, 70)
                     });
                     purpleSpirit.draw();

                     return get (0, 30, 80, 80);
                 },
                 greenSpirit: function() {
                     background(0, 0, 0, 0);

                     var greenSpirit = new Spirit({
                         headColor: color(34, 99, 38, 70),
                         bodyColor: color(131, 255, 174, 150),
                         bodyStroke: color(20, 104, 26, 70)
                     });
                     greenSpirit.draw();

                     return get (0, 30, 80, 80);
                 },
                 normalSpirit: function() {
                     background(0, 0, 0, 0);

                     var normalSpirit = new Spirit({
                         headColor: color(38, 166, 162, 70),
                         bodyColor: color(55, 214, 209, 150),
                         bodyStroke: color(34, 148, 144, 70)
                     });
                     normalSpirit.draw();

                     return get (0, 30, 80, 80);
                 },
                 speedSpirit: function() {
                     background(0, 0, 0, 0);

                     var speedSpirit = new Spirit({
                         headColor: color(158, 154, 51, 70),
                         bodyColor: color(199, 195, 72, 150),
                         bodyStroke: color(140, 136, 21, 70)
                     });
                     speedSpirit.draw();

                     return get (0, 30, 80, 80);
                 },
                 reachSpirit: function() {
                     background(0, 0, 0, 0);

                     var reachSpirit = new Spirit({
                         headColor: color(214, 126, 58, 70),
                         bodyColor: color(235, 142, 70, 150),
                         bodyStroke: color(186, 103, 39, 70)
                     });
                     reachSpirit.draw();

                     return get (0, 30, 80, 80);
                 },
                 lightSpirit: function() {
                     background(0, 0, 0, 0);

                     var lightSpirit = new Spirit({
                         headColor: color(199, 76, 117, 70),
                         bodyColor: color(222, 93, 136, 150),
                         bodyStroke: color(181, 62, 102, 70)
                     });
                     lightSpirit.draw();

                     return get (0, 30, 80, 80);
                 },
                 home: function() {
                     background(0, 0, 0, 0);

                     noFill();
                     stroke(255, 255, 255, 10);
                     strokeWeight(1);

                     var offset = 200;
                     for(var i = 0; i < 150; i++) {
                         beginShape();
                         vertex(random(-offset, width + offset), random(-offset, height + offset));
                         bezierVertex(
                             random(-offset, width + offset), random(-offset, height + offset), 
                             random(-offset, width + offset), random(-offset, height + offset), 
                             random(-offset, width + offset), random(-offset, height + offset));
                         endShape(CLOSE);
                     }

                     return get();
                 },
                 homeTitle: function() {
                     background(0, 0, 0, 0);

                     noFill();
                     stroke(255, 10);
                     bezier(
                         game.curve.x1, game.curve.y1, 
                         game.curve.cx1, game.curve.cy1, 
                         game.curve.cx2, game.curve.cy2, 
                         game.curve.x2, game.curve.y2);

                     pushStyle();
                         textFont(game.fonts.title);
                         textAlign(CENTER, CENTER);
                         textSize(60);
                         fill(107, 106, 106, 170);

                         pushMatrix();
                             translate(game.pointsHome[0].x, game.pointsHome[0].y);
                             ellipse(0, 0, 5, 5);
                             rotate(radians(game.pointsHome[0].angle));
                             text("H", 0, 0);
                         popMatrix();
                         pushMatrix();
                             translate(game.pointsHome[2].x, game.pointsHome[2].y);
                             ellipse(0, 0, 5, 5);
                             rotate(radians(game.pointsHome[2].angle));
                             text("A", 0, 0);
                         popMatrix();
                         pushMatrix();
                             translate(game.pointsHome[4].x, game.pointsHome[4].y);
                             ellipse(0, 0, 5, 5);
                             rotate(radians(game.pointsHome[4].angle));
                             text("L", 0, 0);
                         popMatrix();
                         pushMatrix();
                             translate(game.pointsHome[6].x, game.pointsHome[6].y);
                             ellipse(0, 0, 5, 5);
                             rotate(radians(game.pointsHome[6].angle));
                             text("L", 0, 0);
                         popMatrix();
                         pushMatrix();
                             translate(game.pointsHome[12].x, game.pointsHome[12].y);
                             ellipse(0, 0, 5, 5);
                             rotate(radians(game.pointsHome[12].angle));
                             text("W", 0, 0);
                         popMatrix();
                         pushMatrix();
                             translate(game.pointsHome[14].x, game.pointsHome[14].y);
                             ellipse(0, 0, 5, 5);
                             rotate(radians(game.pointsHome[14].angle));
                             text("E", 0, 0);
                         popMatrix();
                         pushMatrix();
                             translate(game.pointsHome[16].x, game.pointsHome[16].y);
                             ellipse(0, 0, 5, 5);
                             rotate(radians(game.pointsHome[16].angle));
                             text("E", 0, 0);
                         popMatrix();
                         pushMatrix();
                             translate(game.pointsHome[18].x, game.pointsHome[18].y);
                             ellipse(0, 0, 5, 5);
                             rotate(radians(game.pointsHome[18].angle));
                             text("N", 0, 0);
                         popMatrix();

                         fill(255, 50);
                         textFont(game.fonts.title);
                         textSize(20);
                         text("A game by Gray Wolf", 300, 550);
                     popStyle();

                     return get();
                 },
                 aboutTitle: function() {
                     background(0, 0, 0, 0);

                     noFill();
                     stroke(255, 20);
                     strokeWeight(1);
                     bezier(
                         game.curveAbout.x1, game.curveAbout.y1, 
                         game.curveAbout.cx1, game.curveAbout.cy1, 
                         game.curveAbout.cx2, game.curveAbout.cy2, 
                         game.curveAbout.x2, game.curveAbout.y2);

                     pushStyle();
                         textFont(game.fonts.title);
                         textAlign(CENTER, CENTER);
                         textSize(60);
                         fill(107, 106, 106, 170);

                         pushMatrix();
                             translate(game.pointsAbout[0].x, game.pointsAbout[0].y);
                             ellipse(0, 0, 5, 5);
                             rotate(radians(game.pointsAbout[0].angle));
                             text("A", 0, 0);
                         popMatrix();
                         pushMatrix();
                             translate(game.pointsAbout[1].x, game.pointsAbout[1].y);
                             ellipse(0, 0, 5, 5);
                             rotate(radians(game.pointsAbout[1].angle));
                             text("B", 0, 0);
                         popMatrix();
                         pushMatrix();
                             translate(game.pointsAbout[2].x, game.pointsAbout[2].y);
                             ellipse(0, 0, 5, 5);
                             rotate(radians(game.pointsAbout[2].angle));
                             text("O", 0, 0);
                         popMatrix();
                         pushMatrix();
                             translate(game.pointsAbout[3].x, game.pointsAbout[3].y);
                             ellipse(0, 0, 5, 5);
                             rotate(radians(game.pointsAbout[3].angle));
                             text("U", 0, 0);
                         popMatrix();
                         pushMatrix();
                             translate(game.pointsAbout[4].x, game.pointsAbout[4].y);
                             ellipse(0, 0, 5, 5);
                             rotate(radians(game.pointsAbout[4].angle));
                             text("T", 0, 0);
                         popMatrix();
                     popStyle();

                     return get();
                 },
                 scoresTitle: function() {
                     background(0, 0, 0, 0);

                     noFill();
                     stroke(255, 20);
                     strokeWeight(1);
                     bezier(
                         game.curveScores.x1, game.curveScores.y1, 
                         game.curveScores.cx1, game.curveScores.cy1, 
                         game.curveScores.cx2, game.curveScores.cy2, 
                         game.curveScores.x2, game.curveScores.y2);

                     pushStyle();
                         textFont(game.fonts.title);
                         textAlign(CENTER, CENTER);
                         textSize(60);
                         fill(107, 106, 106, 170);

                         pushMatrix();
                             translate(game.pointsScores[0].x, game.pointsScores[0].y);
                             ellipse(0, 0, 5, 5);
                             rotate(radians(game.pointsScores[0].angle));
                             text("S", 0, 0);
                         popMatrix();
                         pushMatrix();
                             translate(game.pointsScores[1].x, game.pointsScores[1].y);
                             ellipse(0, 0, 5, 5);
                             rotate(radians(game.pointsScores[1].angle));
                             text("C", 0, 0);
                         popMatrix();
                         pushMatrix();
                             translate(game.pointsScores[2].x, game.pointsScores[2].y);
                             ellipse(0, 0, 5, 5);
                             rotate(radians(game.pointsScores[2].angle));
                             text("O", 0, 0);
                         popMatrix();
                         pushMatrix();
                             translate(game.pointsScores[3].x, game.pointsScores[3].y);
                             ellipse(0, 0, 5, 5);
                             rotate(radians(game.pointsScores[3].angle));
                             text("R", 0, 0);
                         popMatrix();
                         pushMatrix();
                             translate(game.pointsScores[4].x, game.pointsScores[4].y);
                             ellipse(0, 0, 5, 5);
                             rotate(radians(game.pointsScores[4].angle));
                             text("E", 0, 0);
                         popMatrix();
                         pushMatrix();
                             translate(game.pointsScores[5].x, game.pointsScores[5].y);
                             ellipse(0, 0, 5, 5);
                             rotate(radians(game.pointsScores[5].angle));
                             text("S", 0, 0);
                         popMatrix();
                     popStyle();

                     return get();
                 }
             };
         };
         this.setup();
         this.load = function (s) {
             var obj = Object.keys(this.images);
             this.images[obj[this.curLoad]] = this.images[obj[this.curLoad]]();
             this.curLoad++;

             background(35, 36, 36);
             pushStyle();
                 fill(255, 150);
                 textAlign(CENTER, CENTER);
                 textSize(40);
                 text('Loading...', 300, 250);
                 noStroke();
                 rect(width * 0.1, 300, (this.curLoad / obj.length) * width * 0.8, 15);
             popStyle();

             if(this.curLoad < obj.length){
                 this.loaded = false;
             }
             else {
                 //load player avatar images into array
                 this.avatarImages.push(this.images.jade);
                 this.avatarImages.push(this.images.sage);
                 this.avatarImages.push(this.images.kelly);
                 this.avatarImages.push(this.images.olive);
                 this.avatarImages.push(this.images.plum);
                 this.avatarImages.push(this.images.periwinkle);
                 this.avatarImages.push(this.images.iris);
                 this.avatarImages.push(this.images.mulberry);
                 this.loaded = true;
                 this.page = s;
             }
         };
         this.collision = function(obj1, obj2) {
             if(obj1.x + obj1.w > obj2.x && obj1.y + obj1.h > obj2.y && obj1.x < obj2.x + obj2.w && obj1.y < obj2.y + obj2.h) {
                 return true;
             }
             return false;
         };
         this.collisionX = function(obj1, obj2) {
             if(obj1.x + obj1.w > obj2.x && obj1.py + obj1.h > obj2.y && obj1.x < obj2.x + obj2.w && obj1.py < obj2.y + obj2.h) {
                 return true;
             }
             return false;
         };
         this.collisionY = function(obj1, obj2) {
             if(obj1.px + obj1.w > obj2.x && obj1.y + obj1.h > obj2.y && obj1.px < obj2.x + obj2.w && obj1.y < obj2.y + obj2.h) {
                 return true;
             }
             return false;
         };
         this.collisionGem = function(player, gem) {
             if(player.x + player.w + player.reach > gem.x && player.y + player.h + player.reach > gem.y && player.x - player.reach < gem.x + gem.w && player.y - player.reach < gem.y + gem.h) {
                 return true;
             }
             return false;
         };
         this.isInView = function(obj) {
             if( obj.x + this.cam.x < 600 && obj.x + this.cam.x + obj.w > 0 &&
                 obj.y + this.cam.y < 600 && obj.y + this.cam.y + obj.h > 0) {
                 return true;
             }
             return false;
         };
         this.shakeScreen = function() {
             if(this.shake > 0) {
                 this.shake = lerp(this.shake, 0, this.shakedown);
                 translate(round(random(-this.shake, this.shake)), round(random(-this.shake, this.shake)));
             }
         };
         this.addGem = function() {
             var gem = this.gems[~~random(this.gems.length)];

             while(gem.used) {
                 gem = this.gems[~~random(this.gems.length)];
             }

             gem.used = true;

             var t = random();

             if(t < 0.7) {
                 gem.type = 0; //normal
             }
             else if(t < 0.8) {
                 gem.type = 1; //speed
             }
             else if(t < 0.9) {
                 gem.type = 2; //more reach
             }
             else {
                 gem.type = 3; //visibility
             }
         };
         this.checkAIGems = function() {
             if(this.rate % this.AI_GEM_FREQUENCY === 0) {

                 var closest, distance, targetGem;

                 //check friends
                 for(var i = 0; i < this.friends.length; i++) {
                     var friend = this.friends[i];

                     if(friend.segments.length < 6) {
                         closest = 10000;

                         for(var j = 0; j < this.gems.length; j++) {
                             var gem = this.gems[j];

                             if(gem.used) {
                                 distance = dist(friend.x + friend.w / 2, friend.y + friend.h / 2, gem.x + gem.w / 2, gem.y + gem.h / 2);

                                 if(distance < this.AI_GEM_RADIUS && distance < closest) {
                                     closest = distance;
                                     targetGem = gem;
                                 }
                             }
                         }

                         if(closest < 10000) {
                             //move toward targetGem
                             friend.angle = atan2(targetGem.y - friend.y, targetGem.x - friend.x);

                             friend.vx = friend.speed * cos(friend.angle);
                             friend.vy = friend.speed * sin(friend.angle);
                             friend.hasTargetGem = true;
                         }
                         else {
                             friend.hasTargetGem = false;
                         }
                     }
                 }

                 //check foes
                 for(var i = 0; i < this.foes.length; i++) {
                     var foe = this.foes[i];

                     if(foe.segments.length < 6) {
                         closest = 10000;

                         for(var j = 0; j < this.gems.length; j++) {
                             var gem = this.gems[j];

                             if(gem.used) {
                                 distance = dist(foe.x + foe.w / 2, foe.y + foe.h / 2, gem.x + gem.w / 2, gem.y + gem.h / 2);

                                 if(distance < this.AI_GEM_RADIUS && distance < closest) {
                                     closest = distance;
                                     targetGem = gem;
                                 }
                             }
                         }

                         if(closest < 10000) {
                             //move toward targetGem
                             foe.angle = atan2(targetGem.y - foe.y, targetGem.x - foe.x);

                             foe.vx = foe.speed * cos(foe.angle);
                             foe.vy = foe.speed * sin(foe.angle);
                             foe.hasTargetGem = true;
                         }
                         else {
                             foe.hasTargetGem = false;
                         }
                     }
                 }
             }
         };
         this.collectGems = function() {
             for(var i = this.gems.length - 1; i >= 0; i--) {
                 var gem = this.gems[i];

                 if(gem.used) {
                     //check if player collects a gem
                     if(this.collisionGem(this.player, gem)) {
                         this.player.segments.push({
                             x: gem.x, 
                             y: gem.y, 
                             vx: this.player.speed, 
                             vy: this.player.speed,
                             w: this.player.w * 0.4,
                             h: this.player.h * 0.4
                         });

                         this.shake = 10;

                         // if(this.sound){
                         //     this.sounds.eat.audio.play();
                         // }

                         for(var j = 0; j < 4; j++) {
                             this.particles.push(Particle.new({
                                 x: gem.x,
                                 y: gem.y,
                                 vx: random(-2, 2),
                                 vy: random(-2, 2),
                                 w: gem.w / 2,
                                 color: this.GEM_COLORS[gem.type]
                             }));
                         }

                         gem.used = false;
                         this.numberOfGems--;

                         if(gem.type === 1) {
                             this.player.gemTimer = this.player.GEM_TIMER;
                             this.player.reach = this.player.REACH_MAX;
                             this.notifs.push({
                                content: "Extra Reach",
                                opacity: 200,
                                x: width / 2,
                                y: height / 2
                             });
                         }
                         else if(gem.type === 2) {
                             this.player.speedTimer = this.player.SPEED_TIMER;
                             this.player.speed = this.player.SPEED_MAX;
                             this.notifs.push({
                                content: "Speed Boost",
                                opacity: 200,
                                x: width / 2,
                                y: height / 2
                             });
                         }
                         else if(gem.type === 3) {
                             this.player.lightTimer = this.player.LIGHT_TIMER;
                             this.player.lightRadius = this.player.LIGHT_MAX;
                             this.notifs.push({
                                content: "Visibility",
                                opacity: 200,
                                x: width / 2,
                                y: height / 2
                             });
                         }

                         if(random() < 0.2) {
                             this.addGem();
                             this.numberOfGems++;
                         }

                         break;
                     }

                     //check if friends collect a gem
                     for(var j = 0; j < this.friends.length; j++) {
                         var friend = this.friends[j];

                         if(this.collisionGem(friend, gem)) {
                             friend.segments.push({
                                 x: gem.x, 
                                 y: gem.y, 
                                 vx: friend.speed, 
                                 vy: friend.speed,
                                 w: friend.w * 0.4,
                                 h: friend.h * 0.4
                             });

                             for(var j = 0; j < 4; j++) {
                                 this.particles.push(Particle.new({
                                     x: gem.x,
                                     y: gem.y,
                                     vx: random(-2, 2),
                                     vy: random(-2, 2),
                                     w: gem.w / 2,
                                     color: this.GEM_COLORS[gem.type]
                                 }));
                             }

                             // if(this.sound){
                             //     //this.sounds.eat.audio.play();
                             // }

                             gem.used = false;
                             this.numberOfGems--;

                             if(gem.type === 1) {
                                 friend.gemTimer = friend.GEM_TIMER;
                                 friend.reach = friend.REACH_MAX;
                             }
                             else if(gem.type === 2) {
                                 friend.speedTimer = friend.SPEED_TIMER;
                                 friend.speed = friend.SPEED_MAX;
                             }

                             if(random() < 0.2) {
                                 this.addGem();
                                 this.numberOfGems++;
                             }

                             break;
                         }
                     }

                     //check if foes collect a gem
                     for(var j = 0; j < this.foes.length; j++) {
                         var foe = this.foes[j];

                         if(this.collisionGem(foe, gem)) {
                             foe.segments.push({
                                 x: gem.x, 
                                 y: gem.y, 
                                 vx: foe.speed, 
                                 vy: foe.speed,
                                 w: foe.w * 0.4,
                                 h: foe.h * 0.4
                             });

                             for(var j = 0; j < 4; j++) {
                                 this.particles.push(Particle.new({
                                     x: gem.x,
                                     y: gem.y,
                                     vx: random(-2, 2),
                                     vy: random(-2, 2),
                                     w: gem.w / 2,
                                     color: this.GEM_COLORS[gem.type]
                                 }));
                             }

                             // if(this.sound){
                             //     //this.sounds.eat.audio.play();
                             // }

                             gem.used = false;
                             this.numberOfGems--;

                             if(gem.type === 1) {
                                 foe.gemTimer = foe.GEM_TIMER;
                                 foe.reach = foe.REACH_MAX;
                             }
                             else if(gem.type === 2) {
                                 foe.speedTimer = foe.SPEED_TIMER;
                                 foe.speed = foe.SPEED_MAX;
                             }

                             if(random() < 0.2) {
                                 this.addGem();
                                 this.numberOfGems++;
                             }

                             break;
                         }
                     }
                 }
             }
         };
         this.displayGround = function() {
             switch(this.level) {
                 case 1:
                     for(var i = 0; i < this.grounds.length; i++) {
                         image(this.images.ground, this.grounds[i].x, this.grounds[i].y, this.BLOCK_SIZE, this.BLOCK_SIZE);
                     }
                     break;
                 case 2:
                     for(var i = 0; i < this.grounds.length; i++) {
                         image(this.images.ground2, this.grounds[i].x, this.grounds[i].y, this.BLOCK_SIZE, this.BLOCK_SIZE);
                     }
                     break;
                 case 3:
                     for(var i = 0; i < this.grounds.length; i++) {
                         image(this.images.ground3, this.grounds[i].x, this.grounds[i].y, this.BLOCK_SIZE, this.BLOCK_SIZE);
                     }
                     break;
             }
         };
         this.checkBase = function() {
             //player
             if(this.player.segments.length > 0) {
                 for(var i = 0; i < this.friendBases.length; i++) {
                     if(this.collision(this.player, this.friendBases[i])) {
                         this.player.points += this.player.segments.length;

                         // if(this.sound){
                         //     this.sounds.collect.audio.play();
                         // }

                         this.notifsPoints.push({
                            content: "+" + this.player.segments.length,
                            opacity: 200,
                            x: this.player.x,
                            y: this.player.y,
                            color: this.player.color
                         });

                         for(var j = 0; j < this.player.segments.length; j++) {
                             var segment = this.player.segments[j];

                             var angle = atan2(this.player.y + this.player.h / 2 - segment.y, this.player.x + this.player.w / 2 - segment.x);

                             this.spirits.push({
                                 x: segment.x,
                                 y: segment.y,
                                 w: segment.w,
                                 h: segment.h,
                                 vx: this.player.speed * 1.5 * cos(angle),
                                 vy: this.player.speed * 1.5 * sin(angle),
                                 base: {
                                     x: this.player.x + this.player.w / 2,
                                     y: this.player.y + this.player.h / 2
                                 },
                                 img: this.player.spiritImg,
                                 color: this.player.color
                             });
                         }

                         this.player.segments.length = 0;
                         break;
                     }
                 }
             }

             //friends
             for(var i = 0; i < this.friends.length; i++) {
                 var friend = this.friends[i];
                 if(friend.segments.length > 0) {
                     for(var j = 0; j < this.friendBases.length; j++) {
                         if(this.collision(friend, this.friendBases[j])) {
                             friend.points += friend.segments.length;

                             // if(this.sound){
                             //     this.sounds.collect.audio.play();
                             // }

                             this.notifsPoints.push({
                                content: "+" + friend.segments.length,
                                opacity: 200,
                                x: friend.x,
                                y: friend.y,
                                color: friend.color
                             });

                             for(var j = 0; j < friend.segments.length; j++) {
                                 var segment = friend.segments[j];

                                 var angle = atan2(friend.y + friend.h / 2 - segment.y, friend.x + friend.w / 2 - segment.x);

                                 this.spirits.push({
                                     x: segment.x,
                                     y: segment.y,
                                     w: segment.w,
                                     h: segment.h,
                                     vx: friend.speed * 1.5 * cos(angle),
                                     vy: friend.speed * 1.5 * sin(angle),
                                     base: {
                                         x: friend.x + friend.w / 2,
                                         y: friend.y + friend.h / 2
                                     },
                                     img: friend.spiritImg,
                                     color: friend.color
                                 });
                             }

                             friend.segments.length = 0;
                             break;
                         }
                     }
                 }
             }

             //foes
             for(var i = 0; i < this.foes.length; i++) {
                 var foe = this.foes[i];
                 if(foe.segments.length > 0) {
                     for(var j = 0; j < this.foeBases.length; j++) {
                         if(this.collision(foe, this.foeBases[j])) {
                             foe.points += foe.segments.length;

                             // if(this.sound){
                             //     this.sounds.collect.audio.play();
                             // }

                             this.notifsPoints.push({
                                content: "+" + foe.segments.length,
                                opacity: 200,
                                x: foe.x,
                                y: foe.y,
                                color: foe.color
                             });

                             for(var j = 0; j < foe.segments.length; j++) {
                                 var segment = foe.segments[j];

                                 var angle = atan2(foe.y + foe.h / 2 - segment.y, foe.x + foe.h / 2 - segment.x);

                                 this.spirits.push({
                                     x: segment.x,
                                     y: segment.y,
                                     w: segment.w,
                                     h: segment.h,
                                     vx: foe.speed * 1.5 * cos(angle),
                                     vy: foe.speed * 1.5 * sin(angle),
                                     base: {
                                         x: foe.x + foe.w / 2,
                                         y: foe.y + foe.h / 2
                                     },
                                     img: foe.spiritImg,
                                     color: foe.color
                                 });
                             }

                             foe.segments.length = 0;
                             break;
                         }
                     }
                 }
             }
         };
         this.runSpirits = function() {
             for(var i = this.spirits.length - 1; i >= 0; i--) {
                 var spirit = this.spirits[i];

                 spirit.x+= spirit.vx;
                 spirit.y+= spirit.vy;

                 image(spirit.img, spirit.x - spirit.w * 0.25, spirit.y - spirit.h * 0.25, spirit.w, spirit.h);

                 if(this.collision(
                     {
                         x: spirit.x,
                         y: spirit.y,
                         w: spirit.w,
                         h: spirit.h
                     },
                     {
                         x: spirit.base.x,
                         y: spirit.base.y,
                         w: this.BLOCK_SIZE / 2,
                         h: this.BLOCK_SIZE / 2
                     }
                     )) {

                     //this.shake = 10;

                     for(var j = 0; j < 2; j++) {
                         this.particles.push(Particle.new({
                             x: spirit.x,
                             y: spirit.y,
                             vx: random(-2, 2),
                             vy: random(-2, 2),
                             w: spirit.w / 2,
                             color: spirit.color
                         }));
                     }

                     this.spirits.splice(i, 1);
                 }
             }  
         };
         this.stealGems = function() {
             for(var i = 0; i < this.foes.length; i++) {
                 var foe = this.foes[i];

                 for(var j = 0; j < foe.segments.length; j++) {
                     var segment = foe.segments[j];

                     //check if player collected foe gems
                     if(this.collision(this.player, segment)) {
                         var gemArr = foe.segments.splice(j, foe.segments.length - j);

                         for(var k = 0; k < gemArr.length; k++) {
                             gemArr[k].color = this.COLORS.green;
                             this.player.segments.push(gemArr[k]);
                         }

                         this.particles.push(Particle.new({
                             x: this.player.x,
                             y: this.player.y,
                             vx: random(-2, 2),
                             vy: random(-2, 2),
                             w: this.player.w / 4,
                             color: this.player.color
                         }));

                         this.shake = 5;

                         break;
                     }

                     //check if friend collected foe gems
                     for(var f = 0; f < this.friends.length; f++) {
                         var friend = this.friends[f];

                         if(this.collision(friend, segment)) {
                             var gemArr = foe.segments.splice(j, foe.segments.length - j);

                             for(var k = 0; k < gemArr.length; k++) {
                                 gemArr[k].color = this.COLORS.green;
                                 friend.segments.push(gemArr[k]);
                             }

                             this.particles.push(Particle.new({
                                 x: friend.x,
                                 y: friend.y,
                                 vx: random(-2, 2),
                                 vy: random(-2, 2),
                                 w: friend.w / 4,
                                 color: friend.color
                             }));

                             break;
                         }
                     }
                 }

                 //check if foe collected player gems
                 for(var j = 0; j < this.player.segments.length; j++) {
                     var segment = this.player.segments[j];

                     if(this.collision(foe, segment)) {
                         var gemArr = this.player.segments.splice(j, this.player.segments.length - j);

                         for(var k = 0; k < gemArr.length; k++) {
                             gemArr[k].color = this.COLORS.purple;
                             foe.segments.push(gemArr[k]);
                         }

                         this.particles.push(Particle.new({
                             x: foe.x,
                             y: foe.y,
                             vx: random(-2, 2),
                             vy: random(-2, 2),
                             w: foe.w / 4,
                             color: foe.color
                         }));

                         break;
                     }
                 }
                 //check if foe collected friend gems
                 for(var f = 0; f < this.friends.length; f++) {
                     var friend = this.friends[f];

                     for(var j = 0; j < friend.segments.length; j++) {
                         var segment = friend.segments[j];

                         if(this.collision(foe, segment)) {
                             var gemArr = friend.segments.splice(j, friend.segments.length - j);

                             for(var k = 0; k < gemArr.length; k++) {
                                 gemArr[k].color = this.COLORS.purple;
                                 foe.segments.push(gemArr[k]);
                             }

                             this.particles.push(Particle.new({
                                 x: foe.x,
                                 y: foe.y,
                                 vx: random(-2, 2),
                                 vy: random(-2, 2),
                                 w: foe.w / 4,
                                 color: foe.color
                             }));

                             break;
                         }
                     }
                 }
             }
         };
         this.displayPointsCollected = function() {
             pushStyle();
                 textSize(30);
                 textAlign(CENTER, CENTER);

                 for(var i = this.notifsPoints.length - 1; i >= 0; i--) {
                     fill(this.notifsPoints[i].color, 150);
                     text(this.notifsPoints[i].content, this.notifsPoints[i].x, this.notifsPoints[i].y);
                     this.notifsPoints[i].y --;
                     this.notifsPoints[i].opacity-= 5;
                     if(this.notifsPoints[i].opacity <= 0) {
                         this.notifsPoints.splice(i, 1);
                     }
                 }
             popStyle();
         };
         this.pointsBar = function() {
             noStroke();

             if(this.points.friend + this.points.foe === 0) {
                 fill(this.COLORS.green, 150);
                 rect(100, 10, 200, 30);
                 fill(this.COLORS.purple, 150);
                 rect(300, 10, 200, 30);
             }
             else if(this.player.team === "GREEN") {
                 fill(this.COLORS.green, 150);
                 rect(100, 10, map(this.points.friend / (this.points.friend + this.points.foe), 0, 1, 0, 400), 30);
                 fill(this.COLORS.purple, 150);
                 rect(100 + map(this.points.friend / (this.points.friend + this.points.foe), 0, 1, 0, 400), 10, map(this.points.foe / (this.points.friend + this.points.foe), 0, 1, 0, 400), 30);
             }
             else {
                 fill(this.COLORS.purple, 150);
                 rect(100 + map(this.points.foe / (this.points.friend + this.points.foe), 0, 1, 0, 400), 10, map(this.points.friend / (this.points.friend + this.points.foe), 0, 1, 0, 400), 30);
                 fill(this.COLORS.green, 150);
                 rect(100, 10, map(this.points.foe / (this.points.friend + this.points.foe), 0, 1, 0, 400), 30);
             }

             noFill();
             stroke(255, 50);
             strokeWeight(2);
             line(300, 10, 300, 40);
         };
         this.runParticles = function() {
             for(var i = this.particles.length - 1; i >= 0; i--) {
                 var particle = this.particles[i];

                 particle.run();
             }

             //credit to Bob Lyon for a memory free way to "splice" objects
             while (this.particles.length > 0 && this.particles[0].opacity <= 0) {
                 this.particles.shift();
             }
         };
         this.move = function(arr) {
             if(this.player.moved) {
                 //Player collisions with blocks
                 for(var i = 0; i < arr.length; i++) {
                     var block = arr[i];

                     //check if anywhere close to the player and exit if not
                     if(block.x + block.w < this.player.x) { continue; }
                     if(block.x > this.player.x + this.player.w) { continue; }
                     if(block.y + block.h < this.player.y) { continue; }
                     if(block.y > this.player.y + this.player.h) { continue; }

                     //check x only if moved horizontally
                     if(this.player.x !== this.player.px && this.collisionX(this.player, block)) {
                         if(this.player.px + this.player.w <= block.x){
                             this.player.x = block.x - this.player.w;
                         }
                         if(this.player.px >= block.x + block.w){
                             this.player.x = block.x + block.w;
                         }
                     }

                     //check y only if moved vertically
                     if(this.player.y !== this.player.py && this.collisionY(this.player, block)) {
                         if(this.player.py + this.player.h <= block.y){
                             this.player.y = block.y - this.player.h;
                         }    
                         else if(this.player.py >= block.y + block.h){
                             this.player.y = block.y + block.h;
                         }
                     }
                 }

                 this.player.moved = false;
             }

             //Check AI collisions
             for(var i = 0; i < arr.length; i++) {
                 var block = arr[i];

                 //AI Friends collisions with blocks
                 for(var j = 0; j < this.friends.length; j++) {
                     var friend = this.friends[j];

                     var collided = false;

                     if(this.collision(friend, block)) {
                         collided = true;

                         if(friend.px + friend.w <= block.x){
                             friend.x = block.x - friend.w;
                         }

                         if(friend.py + friend.h <= block.y){
                             friend.y = block.y - friend.h;
                         }    

                         if(friend.px >= block.x + block.w){
                             friend.x = block.x + block.w;
                         }   

                         if(friend.py >= block.y + block.h){
                             friend.y = block.y + block.h;
                         }    
                     }

                     if(collided) {
                         friend.update();
                     }
                 }

                 //AI Foes collisions with blocks
                 for(var j = 0; j < this.foes.length; j++) {
                     var foe = this.foes[j];

                     var collided = false;

                     if(this.collision(foe, block)) {
                         collided = true;

                         if(foe.px + foe.w <= block.x){
                             foe.x = block.x - foe.w;
                         }

                         if(foe.py + foe.h <= block.y){
                             foe.y = block.y - foe.h;
                         }    

                         if(foe.px >= block.x + block.w){
                             foe.x = block.x + block.w;
                         }   

                         if(foe.py >= block.y + block.h){
                             foe.y = block.y + block.h;
                         }    
                     }

                     if(collided) {
                         foe.update();
                     }
                 }
             }
         };
         this.reset = function() {
             //not yet implemented
         };
         this.light = function() {
             //if(this.player.lightRadius === this.player.LIGHT_MIN) {
             pushStyle();
                 noFill();
                 strokeWeight(400);
                 for(var i = 0; i < 10; i++) {
                     stroke(0 - i * 5, 0 - i * 10, 0 - i * 5, 15 + i * 5);
                     ellipse(this.player.x + this.player.w / 2, this.player.y + this.player.h / 2, width + i * this.player.lightRadius, height + i * this.player.lightRadius);
                 }
             popStyle();
             //}
         };
         this.setGameOver = function() {
             this.gameoverImage = get(0, 0, width, height);

             this.individualPoints.friends.push({
                 index: this.player.index,
                 points: this.player.points
             });

             for(var i = 0; i < this.friends.length; i++) {
                 this.individualPoints.friends.push({
                     index: this.friends[i].index,
                     points: this.friends[i].points
                 });
             }

             for(var i = 0; i < this.foes.length; i++) {
                 this.individualPoints.foes.push({
                     index: this.foes[i].index,
                     points: this.foes[i].points
                 });
             }

             this.individualPoints.friends.sort(function(a, b) {
                return b.points - a.points; 
             });

             this.individualPoints.foes.sort(function(a, b) {
                return b.points - a.points; 
             });

             this.page = "gameover";
         };
         this.gameTime = function() {
             this.timer = ~~((millis() - this.timerStart) / 1000);

             if(this.timer >= this.TOTAL_TIME) {
                 this.setGameOver();
             }
             else {
                 this.stats();
             }
         };
         this.stats = function() {
             //scores
             this.points.friend = this.player.points + this.friends[0].points + this.friends[1].points + this.friends[2].points;
             this.points.foe = this.foes[0].points + this.foes[1].points + this.foes[2].points + this.foes[3].points;

             //notifs
             pushStyle();
                 //points
                 textFont(this.fonts.title);
                 textSize(35);
                 textAlign(LEFT, TOP);
                 fill(this.COLORS.green, 150);
                 if(this.player.team === "GREEN") {
                     text(this.points.friend, 15, 5);
                 }
                 else {
                     text(this.points.foe, 15, 5);
                 }

                 textAlign(RIGHT, TOP);
                 fill(this.COLORS.purple, 150);
                 if(this.player.team === "PURPLE") {
                     text(this.points.friend, width - 15, 5);
                 }
                 else {
                     text(this.points.foe, width - 15, 5);
                 }

                 textFont(this.fonts.body);
                 textSize(30);
                 textAlign(CENTER, CENTER);

                 for(var i = this.notifs.length - 1; i >= 0; i--) {
                     fill(255, this.notifs[i].opacity);
                     text(this.notifs[i].content, this.notifs[i].x, this.notifs[i].y);
                     this.notifs[i].y += 1;
                     this.notifs[i].opacity -= 5;
                     if(this.notifs[i].opacity <= 0) {
                         this.notifs.splice(i, 1);
                     }
                 }

                 if(this.counter >= 300) {
                     textAlign(CENTER, TOP);
                     fill(255, 80);
                     text((this.TOTAL_TIME - this.timer), 300, 40);
                 }

                 if(this.timer < 3) {
                     fill(this.player.color, 50);
                     rectMode(CENTER);
                     rect(300, 300, 300, 400, 20);
                     textAlign(CENTER, CENTER);
                     textSize(30);
                     fill(255, 150);
                     text("You are\n" + this.players[this.player.index].name + "\n" + this.player.team, 300, 170);
                     image(this.player.img, 300 - this.player.img.width / 2, 240);
                 }

                 //display almost time up
                 if(this.timer > this.TOTAL_TIME - 10 && this.timer < this.TOTAL_TIME - 5) {
                     pushStyle();
                         textFont(this.fonts.title);
                         textAlign(CENTER, CENTER);
                         textSize(40);
                         fill(255, 80);
                         text("Hurry Up!!", 300, 100);
                     popStyle();
                 }

                 if(this.counter < 300) {
                     textFont(this.fonts.title);
                     textAlign(CENTER, CENTER);
                     textSize(60);
                     fill(255, 150);
                     text(5 - this.timer, 300, 420);
                 }
             popStyle();
         };
         this.drawLevelAssets = function() {
             switch(this.level) {
                 case 1:
                     image(this.images.web, 8 * this.BLOCK_SIZE, 19 * this.BLOCK_SIZE + 50, 140, 140);
                     image(this.images.web, 31 * this.BLOCK_SIZE, 28 * this.BLOCK_SIZE + 50, 140, 140);
                     break;
                 case 2:
                     image(this.images.spider, 17 * this.BLOCK_SIZE, 17 * this.BLOCK_SIZE, 150, 150);
                     break;
                 case 3:

                     break;
             }
         };
         this.run = function() {
             this.cam.x = ~~lerp(this.cam.x, width / 2 - this.player.x, 0.1);
             this.cam.y = ~~lerp(this.cam.y, height / 2 - this.player.y, 0.1);

             pushMatrix();
                 translate(this.cam.x, this.cam.y);

                 this.shakeScreen();

                 this.displayGround();

                 for(var i = 0; i < this.foeBases.length; i++) {
                     if(this.isInView(this.foeBases[i])) {
                         this.foeBases[i].run();
                     }
                 }

                 for(var i = 0; i < this.friendBases.length; i++) {
                     if(this.isInView(this.friendBases[i])) {
                         this.friendBases[i].run();
                     }
                 }

                 this.drawLevelAssets();

                 this.runSpirits();

                 if(this.counter < 300) {
                     this.player.draw();
                 }
                 else {
                     this.player.run();
                 }
                 for(var i = 0; i < this.foes.length; i++) {
                     this.foes[i].run();
                 }
                 for(var i = 0; i < this.friends.length; i++) {
                     this.friends[i].run();
                 }

                 this.move(this.blocks);
                 for(var i = 0; i < this.blocks.length; i++) {
                     if(this.isInView(this.blocks[i])) {
                         this.blocks[i].run();
                     }
                 }
                 for(var i = 0; i < this.gems.length; i++) {
                     if(this.isInView(this.gems[i])) {
                         this.gems[i].run();
                     }
                 }

                 if(this.timer >= 5) {
                     this.checkAIGems();
                 }

                 this.runParticles();

                 this.collectGems();
                 this.stealGems();

                 if(this.counter % ~~random(this.addGemFrequency - 30, this.addGemFrequency + 30) === 0 && this.numberOfGems < this.gems.length) {
                     this.addGem();
                     this.numberOfGems++;
                 }

                 if(this.numberOfGems < this.MIN_GEMS) {
                     this.addGem();
                     this.numberOfGems++;
                 }

                 this.checkBase();

                 this.displayPointsCollected();

                 this.light();
             popMatrix();

             this.counter++;

             this.gameTime();

             this.pointsBar();
         };
         this.home = function() {
             image(this.images.home, 0, 0);

             if(this.rate % 120 === 0) {
                 this.playColor*= -1;

                 if(this.playColor === 1) {
                     this.buttons.play.textColor = color(this.COLORS.green, 100);
                 }
                 else {
                     this.buttons.play.textColor = color(this.COLORS.purple, 100);
                 }
             }

             image(this.images.homeTitle, 0, 0);

             pushStyle();
                 noFill();
                 stroke(200, 30);
                 strokeWeight(4);
                 rect(20, 20, width - 40, height - 40);
             popStyle();

             image(this.images.jade, 130, 230 + sin(this.rate * 3) * 10);

             pushMatrix();
                 translate(367 + this.images.plum.width, 0);
                 scale(-1, 1);
                 translate(-367, 0);
                 image(this.images.plum, 370, 230 + cos(this.rate * 3) * 10);
             popMatrix();

             pushMatrix();
                 translate(300, 300);
                 rotate(radians(cos(this.rate * 3) * 5));
                 pushStyle();
                     textAlign(CENTER, CENTER);
                     textFont(this.fonts.title);
                     textSize(50);
                     fill(200, 50);
                     text("VS.", 0, 0);
                 popStyle();
             popMatrix();

             this.buttons.play.draw();
             this.buttons.how.draw();
             this.buttons.scoreboard.draw();
             this.buttons.sound.draw();

             this.transition.run();
         };
         this.how = function() {
             image(this.images.home, 0, 0);

             image(this.images.aboutTitle, 0, 0);

             pushStyle();
                 noFill();
                 stroke(200, 30);
                 strokeWeight(4);
                 rect(20, 20, width - 40, height - 40);
             popStyle();

             pushMatrix();
                 translate(400, 400);
                 rotate(radians(90));
                 scale(0.75);
                 image(this.images.web, 60, -237);
             popMatrix();
             pushMatrix();
                 translate(400, 400);
                 rotate(radians(180));
                 scale(0.75);
                 image(this.images.web, 325, -237);
             popMatrix();

             image(this.images.spiderGreen, 100, 50 + sin(this.rate * 2) * 20);
             image(this.images.spiderPurple, 500 - this.images.spiderPurple.width, 50 + cos(this.rate * 2) * 20);

             pushStyle();
                 textAlign(CENTER, TOP);
                 textFont(this.fonts.body);
                 textSize(13);
                 fill(255, 220);
                 text("This game is based off the Google Doodle \"Halloween 2018\".\n\nGhosts team up and compete to see who can collect the most wandering spirit flames before the moon is gone....but not without some unexpected twists along the way..\n\nUse the Arrow or WASD keys to move and collect the sprit flames.\n\nYou can steal spirit flames from the enemy, but beware that they can also steal yours.\n\nYou collect points for the spirit flames by getting them back to your base.\n\nNote that different spirit flames give you varying abilities.", 40, 160, 520, 600);
             popStyle();

             this.buttons.home.draw();

             this.transition.run();
         };
         this.scoreboard = function() {
             image(this.images.home, 0, 0);

             image(this.images.scoresTitle, 0, 0);

             pushStyle();
                 noFill();
                 stroke(200, 30);
                 strokeWeight(4);
                 rect(20, 20, width - 40, height - 40);
             popStyle();

             pushMatrix();
                 translate(400, 400);
                 rotate(radians(90));
                 scale(0.75);
                 image(this.images.web, 60, -237);
             popMatrix();
             pushMatrix();
                 translate(400, 400);
                 rotate(radians(180));
                 scale(0.75);
                 image(this.images.web, 325, -237);
             popMatrix();

             image(this.images.spiderGreen, 80, 50 + sin(this.rate * 2) * 20);
             image(this.images.spiderPurple, 520 - this.images.spiderPurple.width, 50 + cos(this.rate * 2) * 20);

             pushStyle();
                 var names = "", scores = "";
                 for(var i = 0; i < this.highscores.length; i++) {
                     names+= this.highscores[i].name + ":\n";
                     scores+= "" + this.highscores[i].score + "\n";
                 }

                 fill(255, 150);
                 textAlign(CENTER);
                 textSize(18);
                 text("Highest Team Score", 300, 160);
                 textAlign(RIGHT);
                 fill(255, 220);
                 textSize(13);
                 textLeading(27);
                 text(names, 325, 195);
                 text(scores, 365, 195);
             popStyle();

             this.buttons.home.draw();

             this.transition.run();
         };
         this.gameover = function() {
             image(this.images.home, 0, 0);

             pushStyle();
                 textFont(this.fonts.title);
                 textAlign(CENTER, CENTER);
                 textSize(40);

                 pushMatrix();
                     translate(300, 90);
                     rotate(radians(sin(this.rate * 3) * 5));
                     if(this.points.friend === this.points.foe) {
                         fill(255, 150);
                         text("IT'S A DRAW", 0, 0);
                     }
                     else if(this.points.friend > this.points.foe) {
                         fill(this.player.color, 150);
                         text(this.player.team + " WINS!!", 0, 0);
                     }
                     else {
                         fill(this.foes[0].color, 150);
                         text(this.foes[0].team + " WINS!!", 0, 0);
                     }
                 popMatrix();

                 if(this.points.friend > this.points.foe) {
                     if(this.player.team === "GREEN") {
                         image(this.images.spiderGreen, 300 - this.images.spiderGreen.width / 2, 160 + sin(this.rate) * 30);
                     }
                     else {
                         image(this.images.spiderPurple, 300 - this.images.spiderPurple.width / 2, 160 + sin(this.rate) * 30);
                     }
                 }
                 else {
                     if(this.player.team === "GREEN") {
                         image(this.images.spiderPurple, 300 - this.images.spiderPurple.width / 2, 160 + sin(this.rate) * 30);
                     }
                     else {
                         image(this.images.spiderGreen, 300 - this.images.spiderGreen.width / 2, 160 + sin(this.rate) * 30);
                     }
                 }

                 textAlign(CENTER, BASELINE);
                 textFont(this.fonts.body);

                 //green
                 noStroke();
                 fill(this.COLORS.green, 60);

                 beginShape();
                     vertex(126, 177);
                     bezierVertex(144, 176, 163, 173, 175, 178);
                     bezierVertex(184, 182, 196, 187, 206, 188);
                     bezierVertex(219, 190, 225, 200, 229, 213);
                     bezierVertex(232, 229, 233, 241, 229, 252);
                     bezierVertex(224, 264, 220, 282, 220, 298);
                     bezierVertex(224, 313, 229, 333, 226, 355);
                     bezierVertex(219, 377, 230, 406, 227, 426);
                     bezierVertex(222, 444, 218, 461, 220, 486);
                     bezierVertex(228, 508, 233, 527, 227, 536);
                     bezierVertex(218, 551, 200, 556, 180, 555);
                     bezierVertex(158, 551, 135, 547, 113, 549);
                     bezierVertex(92, 553, 77, 556, 61, 553);
                     bezierVertex(44, 548, 29, 540, 25, 528);
                     bezierVertex(22, 511, 26, 499, 29, 486);
                     bezierVertex(31, 467, 22, 449, 18, 428);
                     bezierVertex(15, 405, 13, 382, 18, 364);
                     bezierVertex(21, 348, 26, 326, 27, 306);
                     bezierVertex(26, 276, 23, 263, 20, 253);
                     bezierVertex(17, 236, 20, 215, 25, 202);
                     bezierVertex(29, 186, 38, 172, 59, 170);
                     bezierVertex(89, 170, 105, 180, 126, 177);
                 endShape(CLOSE);

                 pushMatrix();
                     translate(-350, 0);
                     beginShape();
                         vertex(472, 179);
                         bezierVertex(498, 175, 524, 172, 552, 184);
                         bezierVertex(569, 196, 579, 219, 580, 246);
                         bezierVertex(578, 270, 571, 293, 572, 322);
                         bezierVertex(575, 339, 577, 365, 575, 382);
                         bezierVertex(570, 399, 570, 431, 576, 454);
                         bezierVertex(583, 475, 581, 513, 578, 527);
                         bezierVertex(569, 549, 555, 557, 526, 558);
                         bezierVertex(505, 558, 482, 552, 465, 552);
                         bezierVertex(443, 553, 427, 558, 410, 557);
                         bezierVertex(396, 556, 377, 549, 370, 530);
                         bezierVertex(365, 499, 372, 474, 378, 458);
                         bezierVertex(380, 431, 375, 408, 372, 387);
                         bezierVertex(372, 361, 380, 342, 381, 324);
                         bezierVertex(380, 294, 368, 275, 365, 252);
                         bezierVertex(364, 219, 372, 194, 387, 181);
                         bezierVertex(409, 170, 440, 184, 472, 179);
                     endShape(CLOSE);
                 popMatrix();

                 fill(this.COLORS.green, 220);
                 rect(50, 160, 150, 50, 20);
                 textSize(30);
                 fill(255, 150);
                 text(this.player.index < 4 ? this.points.friend : this.points.foe, 125, 195);

                 //purple
                 noStroke();
                 fill(this.COLORS.purple, 60);

                 pushMatrix();
                     translate(350, 0);
                     beginShape();
                         vertex(126, 177);
                         bezierVertex(144, 176, 163, 173, 175, 178);
                         bezierVertex(184, 182, 196, 187, 206, 188);
                         bezierVertex(219, 190, 225, 200, 229, 213);
                         bezierVertex(232, 229, 233, 241, 229, 252);
                         bezierVertex(224, 264, 220, 282, 220, 298);
                         bezierVertex(224, 313, 229, 333, 226, 355);
                         bezierVertex(219, 377, 230, 406, 227, 426);
                         bezierVertex(222, 444, 218, 461, 220, 486);
                         bezierVertex(228, 508, 233, 527, 227, 536);
                         bezierVertex(218, 551, 200, 556, 180, 555);
                         bezierVertex(158, 551, 135, 547, 113, 549);
                         bezierVertex(92, 553, 77, 556, 61, 553);
                         bezierVertex(44, 548, 29, 540, 25, 528);
                         bezierVertex(22, 511, 26, 499, 29, 486);
                         bezierVertex(31, 467, 22, 449, 18, 428);
                         bezierVertex(15, 405, 13, 382, 18, 364);
                         bezierVertex(21, 348, 26, 326, 27, 306);
                         bezierVertex(26, 276, 23, 263, 20, 253);
                         bezierVertex(17, 236, 20, 215, 25, 202);
                         bezierVertex(29, 186, 38, 172, 59, 170);
                         bezierVertex(89, 170, 105, 180, 126, 177);
                     endShape(CLOSE);
                 popMatrix();

                 beginShape();
                     vertex(472, 179);
                     bezierVertex(498, 175, 524, 172, 552, 184);
                     bezierVertex(569, 196, 579, 219, 580, 246);
                     bezierVertex(578, 270, 571, 293, 572, 322);
                     bezierVertex(575, 339, 577, 365, 575, 382);
                     bezierVertex(570, 399, 570, 431, 576, 454);
                     bezierVertex(583, 475, 581, 513, 578, 527);
                     bezierVertex(569, 549, 555, 557, 526, 558);
                     bezierVertex(505, 558, 482, 552, 465, 552);
                     bezierVertex(443, 553, 427, 558, 410, 557);
                     bezierVertex(396, 556, 377, 549, 370, 530);
                     bezierVertex(365, 499, 372, 474, 378, 458);
                     bezierVertex(380, 431, 375, 408, 372, 387);
                     bezierVertex(372, 361, 380, 342, 381, 324);
                     bezierVertex(380, 294, 368, 275, 365, 252);
                     bezierVertex(364, 219, 372, 194, 387, 181);
                     bezierVertex(409, 170, 440, 184, 472, 179);
                 endShape(CLOSE);

                 fill(this.COLORS.purple, 220);
                 rect(400, 160, 150, 50, 20);
                 textSize(30);
                 fill(255, 150);
                 text(this.player.index > 3 ? this.points.friend : this.points.foe, 475, 195);

                 textSize(30);
                 for(var i = 0; i < this.individualPoints.friends.length; i++) {
                     var friend = this.individualPoints.friends[i];
                     var img = this.avatarImages[friend.index];

                     if(this.player.index === friend.index) {
                         fill(this.player.color, 100);
                         rect(30 + (friend.index < 4 ? 0 : 350), 220 + i * 80, 190, 80, 50);
                     }

                     fill(255, 150);
                     text(friend.points, 150 + (friend.index < 4 ? 0 : 350), 272 + i * 80);
                     image(img, 45 + (friend.index < 4 ? 0 : 350), 230 + i * 80, img.width * 0.5, img.height * 0.5);
                 }

                 for(var i = 0; i < this.individualPoints.foes.length; i++) {
                     var foe = this.individualPoints.foes[i];
                     var img = this.avatarImages[foe.index];

                     text(foe.points, 150 + (foe.index < 4 ? 0 : 350), 272 + i * 80);
                     image(img, 45 + (foe.index < 4 ? 0 : 350), 230 + i * 80, img.width * 0.5, img.height * 0.5);
                 }
             popStyle();

             this.buttons.replay.draw();
             this.buttons.back.draw();

             this.transition.run();
         };
         this.displayFrameRate = function(rate) {
             textSize(14);
             fill(255, 100);
             textAlign(RIGHT, BOTTOM);
             text(rate, width-8, height-5);
         };
     };

     game = new Game({});

     draw = function() {
         setKALoopTimeout(10000);

         background(35, 36, 36);

         switch(game.page) {
             case "load":
                 game.load("home");
                 break;
             case "home":
                 game.home();
                 break;
             case "how":
                 game.how();
                 break;
             case "scoreboard":
                 game.scoreboard();
                 break;
             case "play":
                 game.run();
                 game.displayFrameRate(~~this.__frameRate);
                 break;
             case "gameover":
                 game.gameover();
                 break;
         }

         clicked = false;

         game.rate+=0.02;
     };
      
    }
}

var canvas = document.getElementById("canvas"); 
var processingInstance = new Processing(canvas, sketchProc);