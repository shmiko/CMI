var overflowOfTweens,
    tl = new TimelineLite();

tl.set("svg", {visibility: "visible"})
  .set(["#text","#pista",".obj","#nuvem","#aviao","#aviao_1_","#balao","#balao_1_"], {scale:0, transformOrigin: "50% 50%"})
  .staggerTo("#pista", 1, {scale:1, transformOrigin: "50% 50%", ease:Elastic.easeInOut}, "+=0")
  .staggerTo(".obj", 1, {scale:1, transformOrigin: "50% 50%", ease:Elastic.easeInOut}, 0.1, "-=0.25")
  .staggerTo(["#nuvem","#aviao","#aviao_1_","#balao","#balao_1_"], 1, {scale:1, ease:Back.easeOut}, 0.2, "-=0.25", rotation)
  .to("#text", 1, {scale:1, transformOrigin: "50% 50%", ease:Back.easeOut}, "-=1");

function rotation() {
  if(overflowOfTweens === undefined) {
    overflowOfTweens = TweenMax.to("#listra", 30, {rotation:360, transformOrigin: "50% 50%", ease:Linear.easeNone, repeat:-1});
    TweenMax.to("#city", 30, {rotation:-360, transformOrigin: "53.3% 54.7%", ease:Linear.easeNone, repeat:-1});
    TweenMax.to("#relogio", 1, {rotation:360, transformOrigin: "80% top ", ease:Linear.easeNone, repeat:-1});
    TweenMax.to("#aviao", 30, {rotation:360, transformOrigin:"200px 340px", ease:Linear.easeNone, repeat:-1});
    TweenMax.to("#aviao_1_", 20, {rotation:360, transformOrigin:"-100px -280px", ease:Linear.easeNone, repeat:-1});
    TweenMax.to("#balao", 80, {rotation:360, transformOrigin:"-50px 350px", ease:Linear.easeNone, repeat:-1, yoyo:true});
    TweenMax.to("#balao_1_", 60, {rotation:-360, transformOrigin:"260px -240px", ease:Linear.easeNone, repeat:-1, yoyo:true});
    TweenMax.to("#nuvem", 90, {rotation:360, transformOrigin: "50% 50%", ease:Linear.easeNone, repeat:-1, yoyo:true});
  }
}

var bbox = document.getElementById("listra_1_").getBBox();
TweenLite.set("#draggable", {svgOrigin:(bbox.x + bbox.width * 0.5) + " " + (bbox.y + bbox.height * 0.5)});
Draggable.create("#draggable", {type:"rotation", throwProps:true});
/*-- CONTROLS --*/
var $replay = $("#replay").mouseenter(function(){
  TweenLite.to("#icon", 0.4, {rotation:"+=360", transformOrigin: "50% 50%"});
}).click(function(){
  tl.restart();
});