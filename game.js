(() => {
"use strict";

const names = [
"Ma Cà Rồng","Nhện","Sét","Băng","Lửa","Thiên Nhiên","Bóng Tối","Nước","Thời Gian","Đá",
"Thiên Thần","Ác Quỷ","Độc","Gió","Không Gian","Sói","Mèo","Cơ Giới","Ánh Sáng","Phóng Xạ",
"Rồng Đỏ","Rồng Băng","Phượng Hoàng","Tinh Linh","Linh Hồn","Chiến Sĩ","Ninja","Kiếm Sĩ","Pháp Sư","Cung Thủ",
"Đại Dương","San Hô","Sóng Thần","Bão Tố","Sấm Chớp","Dung Nham","Tro Tàn","Pha Lê","Kim Cương","Vàng",
"Bạc","Đồng","Sắt","Thép","Hắc Ám","Ánh Trăng","Mặt Trời","Ngân Hà","Tinh Tú","Thiên Thạch",
"Robot","AI","Điện Tử","Laser","Lượng Tử","Virus","Vi Khuẩn","Nấm Độc","Hoa Hồng","Hoa Sen",
"Cỏ Bốn Lá","Cây Cổ Thụ","Bướm","Ong","Bọ Cạp","Rắn","Cá Mập","Rùa","Cáo","Gấu",
"Thỏ","Hổ","Sư Tử","Đại Bàng","Cú Đêm","Bạch Tuộc","Sứa","Cá Heo","Kỳ Lân","Rồng Vàng",
"Thần Sấm","Thần Băng","Thần Lửa","Thần Gió","Thần Đất","Hư Vô","Hỗn Mang","Ảo Ảnh","Phản Chiếu","May Mắn",
"Thịnh Nộ","Bất Tử","Hấp Thụ","Phản Đòn","Cuồng Phong","Thiên Hà","Vũ Trụ","Siêu Tân Tinh","Hắc Nhật","Tối Thượng"
];

const colors = [
"#f36c91","#d9dce8","#ffe13c","#43c8ff","#ff8b30",
"#55e66d","#9b54e8","#4fc7ee","#f1d4a3","#999da8",
"#ffffff","#8c50c9","#ec4770","#4fe8ca","#ec78d9",
"#8186a9","#f2eaf4","#38d9d0","#ffe49a","#7bdf61"
];

const categoryById = id => {
 if ([0].includes(id)) return "Hút máu";
 if ([1,8,13,14].includes(id)) return "Khống chế";
 if ([2,34,80].includes(id)) return "Điện";
 if ([3,9,10,25,41,42,43,67].includes(id)) return "Phòng thủ";
 if ([5,23,60,61].includes(id)) return "Hồi phục";
 if ([4,11,12,20,21,22,27,35,36,90].includes(id)) return "Tấn công";
 return "Đặc biệt";
};

const weaponById = id => {
 if (id === 0) return "dagger";
 if (id === 25) return "sword";
 if (id === 27) return "sword";
 if (id === 28) return "staff";
 if (id === 29) return "bow";
 if (id === 46) return "sun";
 if (id === 66) return "water";
 if (id === 9 || id === 43) return "shield";
 const pool = ["dagger","sword","staff","bow"];
 return pool[id % pool.length];
};

const weaponInfo = {
 dagger:{name:"Dao găm",desc:"Dao nhỏ xoay quanh quả cầu, đánh trúng thân đối thủ mới gây sát thương.",damage:8,color:"#e8e8f0"},
 sword:{name:"Kiếm",desc:"Kiếm xoay theo quỹ đạo quanh quả cầu. Chiến Sĩ còn có khiên để chặn một số đòn.",damage:13,color:"#d8e7ff"},
 staff:{name:"Gậy phép",desc:"Gậy phép xoay quanh quả cầu và phóng đốm năng lượng về phía đối thủ.",damage:9,color:"#c79aff"},
 bow:{name:"Cung",desc:"Cung đi theo quỹ đạo quanh quả cầu và bắn mũi tên năng lượng về phía mục tiêu.",damage:10,color:"#9affbd"},
 sun:{name:"Tia sáng",desc:"Quả cầu Ánh Dương bắn tia sáng vàng trực tiếp về phía đối thủ.",damage:12,color:"#ffe57a"},
 water:{name:"Lưỡi nước",desc:"Cá Mập có vây cá mập đơn giản và lưỡi nước xoay quanh quả cầu.",damage:10,color:"#7ceaff"},
 shield:{name:"Khiên",desc:"Khiên đi bên cạnh quả cầu, chặn một đòn rồi cần thời gian hồi lại.",damage:5,color:"#d6e0ef"}
};

const powers = [
"Hút máu đối thủ khi gây sát thương.","Giăng tơ làm chậm đối thủ.","Phóng điện gây sát thương.",
"Đóng băng làm chậm đối thủ.","Thiêu đốt gây sát thương theo thời gian.","Hồi phục HP cho bản thân.",
"Gây thêm sát thương bóng tối.","Tạo sóng nước tấn công.","Làm chậm thời gian của đối thủ.",
"Tăng khả năng phòng thủ.","Tạo lá chắn bảo vệ.","Tăng sát thương khi HP thấp.",
"Gây độc theo thời gian.","Tăng tốc độ di chuyển.","Tạo vùng không gian đặc biệt.","Phản đòn khi bị tấn công."
];

const skins = names.map((name,id) => {
 const weapon = weaponById(id);
 let trait = "";
 if (id === 0) trait = "Hai răng nanh nhọn";
 if (id === 25) trait = "Khiên chiến binh";
 if (id === 46) trait = "Tia sáng vàng";
 if (id === 66) trait = "Vây cá mập";
 return {
  id,name,color:colors[id%colors.length],category:categoryById(id),
  weapon,weaponInfo:weaponInfo[weapon],trait,
  maxHP: [0,25,9,10,66].includes(id) ? ({0:92,25:145,9:132,10:118,66:112}[id]) : 88 + ((id*17)%49),
  baseDamage: [0,25,9,10,66].includes(id) ? ({0:12,25:9,9:8,10:11,66:14}[id]) : 8 + ((id*7)%13),
  power:categoryById(id),
  description: id===0 ? "Có đúng hai răng nanh nhỏ ở phần dưới quả cầu; hút lại một phần HP khi đánh trúng." :
    id===25 ? "Có một chiếc khiên bên cạnh quả cầu. Khiên chặn đòn định kỳ." :
    id===46 ? "Bắn tia sáng vàng từ tâm quả cầu; không cần vũ khí cầm tay." :
    id===66 ? "Có vây cá mập ở trên đầu và hai vây nhỏ hai bên." :
    powers[id%powers.length]
 };
});

const abilities = [
 {name:"Hút máu",desc:"Hồi lại một phần HP mỗi khi đánh trúng.",color:"#f36c91",icon:"♥"},
 {name:"Giăng tơ",desc:"Làm chậm tốc độ di chuyển của đối thủ.",color:"#d9dce8",icon:"✳"},
 {name:"Điện giật",desc:"Tạo tia điện gây sát thương phụ.",color:"#ffe13c",icon:"ϟ"},
 {name:"Đóng băng",desc:"Làm chậm đối thủ bằng hiệu ứng băng.",color:"#43c8ff",icon:"❄"},
 {name:"Thiêu đốt",desc:"Gây sát thương lửa theo thời gian.",color:"#ff8b30",icon:"♨"},
 {name:"Sinh trưởng",desc:"Hồi phục một lượng HP nhỏ theo thời gian.",color:"#55e66d",icon:"❀"},
 {name:"Bóng tối",desc:"Tăng sát thương của đòn đánh bóng tối.",color:"#9b54e8",icon:"☾"},
 {name:"Thủy triều",desc:"Phóng một đợt sóng nước về phía đối thủ.",color:"#4fc7ee",icon:"≈"},
 {name:"Thời gian",desc:"Làm chậm nhịp di chuyển của đối thủ.",color:"#f1d4a3",icon:"◷"},
 {name:"Thạch giáp",desc:"Giảm sát thương nhận vào.",color:"#999da8",icon:"⬟"},
 {name:"Thiên thần",desc:"Tăng khả năng hồi phục.",color:"#ffffff",icon:"✧"},
 {name:"Ác quỷ",desc:"Tăng sát thương khi đối thủ còn ít HP.",color:"#8c50c9",icon:"♆"},
 {name:"Độc tố",desc:"Gây hiệu ứng độc theo thời gian.",color:"#ec4770",icon:"☣"},
 {name:"Phong tốc",desc:"Tăng tốc độ di chuyển.",color:"#4fe8ca",icon:"〰"},
 {name:"Không gian",desc:"Tạo xung lực không gian quanh quả cầu.",color:"#ec78d9",icon:"✦"},
 {name:"Phản đòn",desc:"Có cơ hội phản lại một phần sát thương.",color:"#8186a9",icon:"↶"}
].map((a,i)=>({ ...a, maxHP:[90,105,95,110,100,125,90,105,95,145,115,85,100,95,100,120][i], damage:[15,10,17,12,18,9,19,13,11,8,10,22,14,12,16,13][i], cooldown:[1.1,1.3,1.0,1.4,1.2,1.5,1.0,1.25,1.4,1.6,1.5,1.0,1.3,0.9,1.2,1.25][i] }));
const categories = ["✦ Tất cả (100)","🔥 Tấn công","✚ Hồi phục","🛡️ Phòng thủ","⚡ Điện","🕸️ Khống chế","💧 Hút máu","🌀 Đặc biệt"];
let selected=0, equipped=0, selectedAbility=0, equippedAbility=0, collectionTab="skin", filter="Tất cả", page=0, round=1;
let playing=true, ended=false, playerHP=100, enemyHP=100, enemySkin=1;
let player=null, enemy=null, projectiles=[], particles=[], lastFrame=0;
let logTimer=0;

const canvas=document.getElementById("arena");
const ctx=canvas.getContext("2d");
const W=700,H=480;
const $=id=>document.getElementById(id);

function makeOrb(x,y,skin,side,abilityId){
 return {
  x,y,vx:side? -2.6:2.6,vy:(Math.random()-.5)*3,r:30,skin,ability:abilityId,
  weaponAngle:Math.random()*Math.PI*2,weaponCooldown:.5+Math.random()*.5,
  hitCooldown:0,shieldCooldown:0,flash:0,side
 };
}
function resetFight(){
 player=makeOrb(140,H/2,equipped,0,equippedAbility);
 enemySkin=Math.floor(Math.random()*100);
 if(enemySkin===equipped) enemySkin=(enemySkin+1)%100;
 const enemyAbility=enemySkin%abilities.length;
 enemy=makeOrb(W-140,H/2,enemySkin,1,enemyAbility);
 playerHP=skins[player.skin].maxHP;enemyHP=skins[enemy.skin].maxHP;playing=true;ended=false;
 projectiles=[]; particles=[];
 updateUI();
 $("log").innerHTML="";
 addLog("system","⚔ ROUND "+round+" BẮT ĐẦU!");
 addLog("system","Đối thủ ngẫu nhiên: "+skins[enemySkin].name);
}
function restart(){round=1;resetFight();}
function nextRound(){
 if(!ended){addLog("system","Trận đấu chưa kết thúc!");return;}
 round++;resetFight();
}
function addLog(type,message){
 const box=$("log"),line=document.createElement("div");
 line.className="logline "+type;line.textContent=message;box.prepend(line);
 while(box.children.length>24)box.lastChild.remove();
}
function updateUI(){
 const p=skins[equipped],e=skins[enemySkin];
 $("playerIcon").textContent="●";$("playerIcon").style.color=p.color;
 $("enemyIcon").textContent="●";$("enemyIcon").style.color=e.color;
 $("playerName").textContent=p.name;$("enemyName").textContent=e.name;
 const pSkin=skins[player?player.skin:equipped],eSkin=skins[enemy?enemy.skin:enemySkin];
 const pMax=pSkin.maxHP,eMax=eSkin.maxHP;
 $("playerHP").textContent="HP: "+Math.ceil(playerHP)+" / "+pMax+" · DMG "+pSkin.baseDamage;
 $("enemyHP").textContent="HP: "+Math.ceil(enemyHP)+" / "+eMax+" · DMG "+eSkin.baseDamage;
 $("playerBar").style.width=Math.max(0,playerHP/pMax*100)+"%";
 $("enemyBar").style.width=Math.max(0,enemyHP/eMax*100)+"%";
 $("roundText").textContent="ROUND "+round+" · "+(ended?"KẾT THÚC":"ĐANG CHIẾN ĐẤU");
}
function toggleSkins(){$("skinScreen").classList.toggle("show");renderSkins();}
function renderCategories(){
 const el=$("categories");el.innerHTML="";
 categories.forEach((label,i)=>{
  const b=document.createElement("button");b.textContent=label;
  const f=i===0?"Tất cả":["Tấn công","Hồi phục","Phòng thủ","Điện","Khống chế","Hút máu","Đặc biệt"][i-1];
  if(filter===f)b.classList.add("active");
  b.onclick=()=>{filter=f;page=0;renderSkins();};el.appendChild(b);
 });
}
function setCollectionTab(tab){
 collectionTab=tab;
 $("skinTab").classList.toggle("active",tab==="skin");
 $("abilityTab").classList.toggle("active",tab==="ability");
 $("categories").style.display=tab==="skin"?"flex":"none";
 filter="Tất cả";page=0;renderSkins();
}
function skinMark(id){
 const marks=["♛","✳","ϟ","❄","♨","❧","☾","≈","◷","⬟","✧","♆","☣","〰","✦","◖","●","⚙","☼","☢","♜","❄","♨","❀","◌","▰","✦","⚔","✧","➶","≈","❀","≋","〰","ϟ","♨","☄","◇","◆","◉","◉","◉","▰","⚒","☾","☽","☼","✧","✦","☄","⚙","◎","⌁","▱","◌","☣","✳","☘","❀","✿","☘","♧","♧","♧","✣","〰","◢","◒","◆","●","●","●","●","◈","◉","◉","◌","≈","✧","♜","ϟ","❄","♨","〰","⬟","◌","✥","◈","◐","☘","✹","∞","◉","↶","〰","✧","◎","✹","☼","✦"];
 return marks[id]||"●";
}
function renderSkins(){
 $("skinTab").classList.toggle("active",collectionTab==="skin");
 $("abilityTab").classList.toggle("active",collectionTab==="ability");
 $("categories").style.display=collectionTab==="skin"?"flex":"none";
 document.querySelector(".skin-layout").classList.toggle("abilities-only",collectionTab==="ability");
 const list=collectionTab==="skin" ? skins.filter(s=>filter==="Tất cả"||s.category===filter) : abilities;
 const pages=Math.max(1,Math.ceil(list.length/20));page=Math.min(page,pages-1);
 $("pageText").textContent=(page+1)+" / "+pages;
 $("skinHeading").textContent=collectionTab==="skin"?"Ngoại hình · 100 quả cầu":"Kỹ năng · 16 chiêu thức";
 $("collectionCount").textContent=collectionTab==="skin"?"(100/100)":"(16/16)";
 const grid=$("skinGrid");grid.innerHTML="";
 list.slice(page*20,page*20+20).forEach((s,i)=>{
  const id=collectionTab==="skin"?s.id:i;
  const active=collectionTab==="skin"?id===selected:id===selectedAbility;
  const b=document.createElement("button");b.className="skin"+(active?" selected":"");
  const label=collectionTab==="skin"?"#"+String(id+1).padStart(2,"0")+" "+s.name:s.name;
  const symbol=collectionTab==="skin"?skinMark(id):s.icon;
  b.innerHTML='<div class="skinball" style="background:'+(s.color||"#ddd")+';color:#17121a">'+symbol+'</div><small>'+label+'</small>';
  b.onclick=()=>{if(collectionTab==="skin")selected=id;else selectedAbility=id;renderSkins();};grid.appendChild(b);
 });
 showDetail();
}
function showDetail(){
 if(collectionTab==="ability"){
  const a=abilities[selectedAbility],ball=$("detailBall");
  ball.textContent=a.icon;ball.style.background=a.color;ball.style.boxShadow="0 0 25px "+a.color;
  $("detailName").textContent=a.name;
  $("powerTag").textContent="✦ Kỹ năng riêng";
  $("detailPower").textContent=a.desc;
  $("detailWeapon").textContent="HP tối đa: "+a.maxHP+" · Sát thương: "+a.damage+" · Hồi chiêu: "+a.cooldown+" giây. Kỹ năng tách biệt hoàn toàn với skin và vũ khí.";
  $("detailStats").textContent="Chỉ số kỹ năng: HP "+a.maxHP+" | DMG "+a.damage+" | CD "+a.cooldown+"s";
  $("equipMessage").textContent=selectedAbility===equippedAbility?"✓ Đang trang bị":"Có thể trang bị";
  return;
 }
 const s=skins[selected],ball=$("detailBall");
 ball.textContent=String(s.id+1);ball.style.background=s.color;ball.style.boxShadow="0 0 25px "+s.color;
 $("detailName").textContent=s.name;
 $("powerTag").textContent="✦ "+s.power;
 $("detailPower").textContent=s.description;
 const weaponLabel=s.id===25?"Kiếm + Khiên":s.weaponInfo.name;
 $("detailWeapon").textContent=weaponLabel+" — "+s.weaponInfo.desc+(s.trait?" Đặc điểm: "+s.trait+".":"");
 $("detailStats").textContent="HP: "+s.maxHP+" · Sát thương cơ bản: "+s.baseDamage+". Kỹ năng trang bị riêng: "+abilities[equippedAbility].name;
 $("equipMessage").textContent=selected===equipped?"✓ Đang trang bị":"Có thể trang bị";
}
function changePage(n){
 const list=collectionTab==="skin"?skins.filter(s=>filter==="Tất cả"||s.category===filter):abilities;
 page=Math.max(0,Math.min(Math.max(1,Math.ceil(list.length/20))-1,page+n));renderSkins();
}
function equipSkin(){
 if(collectionTab==="ability"){
  equippedAbility=selectedAbility;
  resetFight();
  showDetail();
  addLog("player","✦ Đã trang bị kỹ năng "+abilities[equippedAbility].name);
  return;
 }
 equipped=selected;resetFight();showDetail();
 addLog("player","✦ Đã trang bị ngoại hình "+skins[equipped].name+" · "+skins[equipped].weaponInfo.name);
}
function burst(x,y,color,count=12){
 for(let i=0;i<count;i++){
  const a=Math.random()*Math.PI*2,sp=1+Math.random()*4;
  particles.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life:24,max:24,color});
 }
}
function polygon(points,fill,stroke){
 ctx.beginPath();ctx.moveTo(points[0][0],points[0][1]);
 points.slice(1).forEach(p=>ctx.lineTo(p[0],p[1]));ctx.closePath();
 if(fill){ctx.fillStyle=fill;ctx.fill();}
 if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=2;ctx.stroke();}
}
function drawOrb(o){
 const s=skins[o.skin],x=o.x,y=o.y,r=o.r;
 ctx.save();ctx.translate(x,y);
 // Minimal identifying features only: shark fin, vampire fangs, warrior shield.
 if(o.skin===66){
  polygon([[-10,-25],[0,-49],[12,-25]],"#0a79b2","#b8f1ff");
  polygon([[-25,1],[-43,-10],[-34,13]],"#178fc5","#b8f1ff");
  polygon([[25,2],[43,-9],[34,14]],"#178fc5","#b8f1ff");
  polygon([[-29,10],[-42,22],[-23,19]],"#0b6f9d");
 }
 if(o.skin===0){
  polygon([[-12,15],[-4,15],[-9,27]],"#fff","#6f3560");
  polygon([[4,15],[12,15],[9,27]],"#fff","#6f3560");
 }
 if(o.skin===46){
  ctx.save();ctx.strokeStyle="#ffe17a";ctx.lineWidth=3;
  for(let a=0;a<8;a++){const q=a*Math.PI/4;ctx.beginPath();ctx.moveTo(Math.cos(q)*34,Math.sin(q)*34);ctx.lineTo(Math.cos(q)*43,Math.sin(q)*43);ctx.stroke();}
  ctx.restore();
 }
 // Hinh dang dac trung theo chu de nang luc, van giu than cau tron don gian.
 if([3,21,37,38,83].includes(o.skin)){
  for(let k=0;k<8;k++){const a=k*Math.PI/4;ctx.save();ctx.rotate(a);polygon([[-5,-r+5],[0,-r-10],[5,-r+5]],"#dff8ff","#ffffff");ctx.restore();}
 }
 if([4,22,35,82,97].includes(o.skin)){
  for(let k=0;k<7;k++){const a=-Math.PI/2+k*Math.PI/3.5;ctx.save();ctx.rotate(a);polygon([[-6,-r+4],[0,-r-13],[7,-r+4]],k%2?"#ffb02e":"#ff5b28","#ffd56a");ctx.restore();}
 }
 if([2,34,80].includes(o.skin)){
  ctx.strokeStyle="#fff27a";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-r-8,-4);ctx.lineTo(-8,-17);ctx.lineTo(1,-2);ctx.lineTo(12,-18);ctx.lineTo(r+8,-5);ctx.stroke();
 }
 if([8,54,94].includes(o.skin)){
  ctx.strokeStyle="#ffe9bd";ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,r+8,0,Math.PI*2);ctx.stroke();
  ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,-17);ctx.moveTo(0,0);ctx.lineTo(12,5);ctx.stroke();
 }
 if([5,23,58,59,60,61].includes(o.skin)){
  for(const side of [-1,1]){ctx.save();ctx.scale(side,1);polygon([[r-4,-4],[r+12,-17],[r+8,0],[r+15,12],[r-3,8]],"#54bd62","#c8ffba");ctx.restore();}
 }
 if([7,30,31,32,33,66,76,77].includes(o.skin)){
  ctx.fillStyle="#8deeff";ctx.beginPath();ctx.ellipse(0,-r-6,5,11,0,0,Math.PI*2);ctx.fill();
 }
 if(o.skin===25){
  ctx.save();ctx.translate(r+5,0);polygon([[-5,-14],[10,-10],[11,5],[2,17],[-8,5]],"#b9c8de","#ffffff");ctx.restore();
 }
 // Body
 ctx.shadowBlur=18;ctx.shadowColor=s.color;ctx.fillStyle=s.color;
 ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();
 ctx.shadowBlur=0;ctx.strokeStyle="#ffffffaa";ctx.lineWidth=2.5;ctx.stroke();
 // Simple face kept intentionally minimal
 ctx.fillStyle="#17121a";ctx.beginPath();
 ctx.arc(-9,-5,3,0,Math.PI*2);ctx.arc(9,-5,3,0,Math.PI*2);ctx.fill();
 ctx.strokeStyle="#17121a";ctx.lineWidth=2.3;ctx.beginPath();ctx.arc(0,3,7,.2,Math.PI-.2);ctx.stroke();
 // Dau hieu hinh hoc don gian theo chu de, khong anime hoa.
 if(o.skin===1){ctx.strokeStyle="#f4f4f4";ctx.lineWidth=2;for(let k=0;k<3;k++){ctx.beginPath();ctx.arc(0,0,12+k*7,-.9,.9);ctx.stroke();}}
 if([2,34,80].includes(o.skin)){ctx.strokeStyle="#fff27a";ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(-22,18);ctx.lineTo(-5,2);ctx.lineTo(2,14);ctx.lineTo(20,-16);ctx.stroke();}
 if([3,21,81].includes(o.skin)){ctx.fillStyle="#e8fbff";for(let k=0;k<6;k++){const a=k*Math.PI/3;ctx.beginPath();ctx.arc(Math.cos(a)*19,Math.sin(a)*19,3,0,Math.PI*2);ctx.fill();}}
 if([4,22,35,82].includes(o.skin)){ctx.strokeStyle="#ffb13b";ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,20,-2.5,2.5);ctx.stroke();}
 if([5,23,58,59,60,61].includes(o.skin)){ctx.strokeStyle="#c8ffba";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-20,14);ctx.quadraticCurveTo(0,-12,20,-17);ctx.stroke();ctx.beginPath();ctx.ellipse(-8,4,5,10,-.7,0,Math.PI*2);ctx.ellipse(9,-8,5,10,.7,0,Math.PI*2);ctx.stroke();}
 if(o.skin===25){ctx.strokeStyle="#f3f6ff";ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,20,-1.1,1.1);ctx.stroke();}
 if(o.skin===29){ctx.strokeStyle="#f5d59a";ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,22,-1.2,1.2);ctx.stroke();}
 if(o.skin===46){ctx.strokeStyle="#fff1a0";ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,21,0,Math.PI*2);ctx.stroke();}
 if(o.skin===66){ctx.fillStyle="#e9fbff";ctx.beginPath();ctx.arc(0,19,3,0,Math.PI*2);ctx.fill();}
 if(o.skin===67){ctx.strokeStyle="#bdefff";ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,19,.2,Math.PI-.2);ctx.stroke();}

 // Vampire skin: exactly two visible pointed fangs on the lower mouth.
 if(o.skin===0){
  polygon([[-10,8],[-4,8],[-8,19]],"#ffffff","#6f3560");
  polygon([[4,8],[10,8],[8,19]],"#ffffff","#6f3560");
 }
 if(o.flash>0){ctx.strokeStyle="#fff";ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,r+3,0,Math.PI*2);ctx.stroke();}
 ctx.restore();

 // Weapon attached to orb. Weapons are visual objects; only orb-body contact causes damage.
 if(s.weapon==="shield"||o.skin===25) drawShield(o,Math.atan2((o.side?player.y:enemy.y)-o.y,(o.side?player.x:enemy.x)-o.x));
 if(s.weapon!=="sun"&&s.weapon!=="shield"){
  const a=o.weaponAngle,rad=r+21,wx=x+Math.cos(a)*rad,wy=y+Math.sin(a)*rad;
  drawWeapon(s.weapon,wx,wy,a,s.weaponInfo.color);
 }
 ctx.textAlign="center";ctx.font="bold 12px Arial";ctx.fillStyle="#fff";
 ctx.fillText(s.name,x,y+r+19);
}
function drawShield(o,faceAngle){
 ctx.save();ctx.translate(o.x,o.y);ctx.rotate(faceAngle);
 // Small flat shield to the incoming side
 ctx.translate(o.r+8,0);
 ctx.fillStyle="#b9c8de";ctx.strokeStyle="#f3f6ff";ctx.lineWidth=2;
 ctx.beginPath();ctx.moveTo(-5,-12);ctx.lineTo(9,-10);ctx.lineTo(11,4);ctx.lineTo(2,16);ctx.lineTo(-7,5);ctx.closePath();ctx.fill();ctx.stroke();
 ctx.restore();
}
function drawWeapon(type,x,y,angle,color){
 ctx.save();ctx.translate(x,y);ctx.rotate(angle+Math.PI/2);
 ctx.lineCap="round";ctx.lineJoin="round";
 if(type==="sword"||type==="water"){
  ctx.fillStyle=type==="water"?"#87edff":"#e6edf8";
  polygon([[-4,1],[-2,-17],[0,-23],[3,-17],[4,1]],ctx.fillStyle,"#ffffff");
  ctx.strokeStyle="#65536e";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-8,2);ctx.lineTo(8,2);ctx.stroke();
  ctx.fillStyle="#c28c53";ctx.fillRect(-2,3,4,9);
 }else if(type==="dagger"){
  ctx.fillStyle="#e9edf4";polygon([[-3,1],[-2,-13],[0,-20],[3,-13],[3,1]],"#e9edf4","#fff");
  ctx.fillStyle="#b88b56";ctx.fillRect(-2,2,4,7);
 }else if(type==="staff"){
  ctx.strokeStyle="#d7c1ff";ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(0,10);ctx.lineTo(0,-17);ctx.stroke();
  ctx.fillStyle="#d39aff";ctx.beginPath();ctx.arc(0,-20,5,0,Math.PI*2);ctx.fill();
 }else if(type==="bow"){
  ctx.strokeStyle="#d8bd8c";ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,13,-1.2,1.2);ctx.stroke();
  ctx.strokeStyle="#fff";ctx.lineWidth=1.3;ctx.beginPath();ctx.moveTo(4,-12);ctx.lineTo(4,12);ctx.stroke();
 }
 ctx.restore();
}
function drawProjectile(p){
 ctx.save();ctx.translate(p.x,p.y);ctx.rotate(Math.atan2(p.vy,p.vx));
 if(p.type==="arrow"){
  ctx.strokeStyle="#fff0bb";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-9,0);ctx.lineTo(8,0);ctx.stroke();
  polygon([[8,0],[1,-4],[1,4]],"#fff0bb");
 }else{
  ctx.shadowBlur=16;ctx.shadowColor=p.color;ctx.fillStyle=p.color;
  ctx.beginPath();ctx.ellipse(0,0,p.type==="sunbeam"?12:7,3,0,0,Math.PI*2);ctx.fill();
 }
 ctx.restore();
}
function clampOrbToArena(o){
 // Luon lay kich thuoc canvas that, khong phu thuoc kich thuoc CSS/responsive.
 const w=canvas.width,h=canvas.height,pad=o.r+3;
 const minX=pad,maxX=w-pad,minY=pad,maxY=h-pad;
 if(!Number.isFinite(o.x)||!Number.isFinite(o.y)){
  o.x=o.side?w-pad:pad;o.y=h/2;o.vx=o.side?-2.6:2.6;o.vy=0;
 }
 if(o.x<minX){o.x=minX;o.vx=Math.abs(o.vx)||2.2;}
 if(o.x>maxX){o.x=maxX;o.vx=-Math.abs(o.vx)||-2.2;}
 if(o.y<minY){o.y=minY;o.vy=Math.abs(o.vy)||2.2;}
 if(o.y>maxY){o.y=maxY;o.vy=-Math.abs(o.vy)||-2.2;}
 // Chot chan toa do sau moi lan cap nhat, ke ca sau va cham.
 o.x=Math.max(minX,Math.min(maxX,o.x));
 o.y=Math.max(minY,Math.min(maxY,o.y));
}
function moveOrb(o,dt){
 const ability=abilities[o.ability];
 o.weaponAngle+=dt*(skins[o.skin].weapon==="dagger"?4.2:skins[o.skin].weapon==="sword"?3.2:2.7);
 o.weaponCooldown-=dt;o.hitCooldown-=dt;o.shieldCooldown-=dt;o.flash=Math.max(0,o.flash-dt*3);
 // Toc do x2, va dap vao tuong theo ban kinh that cua qua cau.
 const speedBonus=o.ability===13?1.25:1;
 o.x+=o.vx*dt*120*speedBonus;o.y+=o.vy*dt*120*speedBonus;
 clampOrbToArena(o);
 const speed=Math.hypot(o.vx,o.vy);
 if(speed>4.5){o.vx=o.vx/speed*4.5;o.vy=o.vy/speed*4.5;}
 if(speed<1.2){o.vx+=o.side?-.2:.2;o.vy+=(Math.random()-.5)*.3;}
}
function separateOrbs(){
 const dx=enemy.x-player.x,dy=enemy.y-player.y,d=Math.hypot(dx,dy)||1,min=player.r+enemy.r;
 if(d<min){
  const nx=dx/d,ny=dy/d,overlap=(min-d)/2+1;
  player.x-=nx*overlap;player.y-=ny*overlap;
  enemy.x+=nx*overlap;enemy.y+=ny*overlap;
  player.vx=-nx*2.8;player.vy=-ny*2.8;
  enemy.vx=nx*2.8;enemy.vy=ny*2.8;
  // Important: orb-to-orb collision is only a physical bounce, never HP damage.
 }
 // Va cham giua hai qua cau co the day toa do; kep lai ca hai ngay sau do.
 clampOrbToArena(player);clampOrbToArena(enemy);
}
function fireIfNeeded(o,target){
 const s=skins[o.skin],type=s.weapon;
 // Chi CUNG va TRUONG duoc phep phong dan; cac vu khi khac chi danh/xoay/quay phong thu.
 if(type!=="bow"&&type!=="staff")return;
 let cooldown=abilities[o.ability].cooldown*(type==="bow"?1.15:1.3);
 if(o.weaponCooldown>0)return;
 o.weaponCooldown=cooldown;
 const dx=target.x-o.x,dy=target.y-o.y,d=Math.hypot(dx,dy)||1;
 projectiles.push({
  x:o.x+dx/d*(o.r+8),y:o.y+dy/d*(o.r+8),
  vx:dx/d*(type==="bow"?7.5:5.2),
  vy:dy/d*(type==="bow"?7.5:5.2),
  r:5,life:2.1,owner:o,
  type:type==="bow"?"arrow":"magic",
  damage:Math.max(3,Math.round(s.baseDamage+abilities[o.ability].damage*.2)),color:s.weaponInfo.color
 });
 addLog(o===player?"player":"enemy",s.name+" phóng "+(type==="bow"?"mũi tên":"đạn phép từ trượng")+"!");
}
function shieldBlocks(target,attacker){
 if(target.skin!==25||target.shieldCooldown>0)return false;
 target.shieldCooldown=2.8;target.flash=.35;
 burst(target.x,target.y,"#dceaff",9);
 addLog(target===player?"player":"enemy","🛡 Khiên Chiến Sĩ chặn đòn!");
 return true;
}
function hitOrb(target,attacker,damage,type){
 if(ended||target.hitCooldown>0)return;
 if(shieldBlocks(target,attacker))return;
 target.hitCooldown=.34;target.flash=.22;
 const isPlayerTarget=target===player;
 const attackerAbility=abilities[attacker.ability];
 if(attacker.ability===11)damage=Math.round(damage*1.2);
 if(target.ability===9)damage=Math.max(1,Math.round(damage*.78));
 if(isPlayerTarget)playerHP=Math.max(0,playerHP-damage);
 else enemyHP=Math.max(0,enemyHP-damage);
 if(attacker.ability===0){
  if(attacker===player)playerHP=Math.min(attackerAbility.maxHP,playerHP+damage*.25);
  else enemyHP=Math.min(attackerAbility.maxHP,enemyHP+damage*.25);
  addLog(attacker===player?"player":"enemy","♥ Hút máu hồi lại HP!");
 }
 burst(target.x,target.y,type==="sunbeam"?"#ffe57a":type==="arrow"?"#e9f2ff":"#ffffff",10);
 addLog(attacker===player?"player":"enemy",skins[attacker.skin].name+" đánh trúng thân quả cầu, gây "+damage+" sát thương!");
 updateUI();
 if(playerHP<=0||enemyHP<=0){
  ended=true;playing=false;
  addLog("system",enemyHP<=0?"🏆 BẠN CHIẾN THẮNG ROUND "+round+"!":"💥 BẠN ĐÃ THUA ROUND "+round+"!");
  updateUI();
 }
}
function updateProjectiles(dt){
 for(let i=projectiles.length-1;i>=0;i--){
  const p=projectiles[i];p.x+=p.vx*dt*60;p.y+=p.vy*dt*60;p.life-=dt;
  const target=p.owner===player?enemy:player;
  if(Math.hypot(p.x-target.x,p.y-target.y)<target.r+p.r){
   hitOrb(target,p.owner,p.damage,p.type);projectiles.splice(i,1);continue;
  }
  if(p.life<=0||p.x<0||p.x>W||p.y<0||p.y>H)projectiles.splice(i,1);
 }
}
function checkOrbitWeaponHits(){
 for(const attacker of [player,enemy]){
  if(!attacker||attacker.hitCooldown>0)continue;
  const type=skins[attacker.skin].weapon;
  if(["sun","bow","staff","shield"].includes(type))continue;
  const target=attacker===player?enemy:player;
  const radius=attacker.r+24;
  const wx=attacker.x+Math.cos(attacker.weaponAngle)*radius;
  const wy=attacker.y+Math.sin(attacker.weaponAngle)*radius;
  if(Math.hypot(wx-target.x,wy-target.y)<target.r+9){
   hitOrb(target,attacker,Math.round(skins[attacker.skin].baseDamage+abilities[attacker.ability].damage*.2),"orbit");
  }
 }
}
function updateParticles(dt){
 for(let i=particles.length-1;i>=0;i--){
  const p=particles[i];p.x+=p.vx*dt*60;p.y+=p.vy*dt*60;p.life-=dt*60;
  if(p.life<=0)particles.splice(i,1);
 }
}
function drawParticles(){
 for(const p of particles){
  ctx.globalAlpha=Math.max(0,p.life/p.max);ctx.fillStyle=p.color;
  ctx.beginPath();ctx.arc(p.x,p.y,2.5,0,Math.PI*2);ctx.fill();
 }
 ctx.globalAlpha=1;
}
function frame(now){
 const dt=Math.min(.04,(now-lastFrame)/1000||0);lastFrame=now;
 ctx.clearRect(0,0,W,H);
 ctx.strokeStyle="#30303a";ctx.lineWidth=3;ctx.strokeRect(2,2,W-4,H-4);
 if(playing&&!ended){
  moveOrb(player,dt);moveOrb(enemy,dt);separateOrbs();
  // Lop bao ve cuoi cung truoc khi ve frame: khong qua cau nao duoc nam ngoai san.
  clampOrbToArena(player);clampOrbToArena(enemy);
  fireIfNeeded(player,enemy);fireIfNeeded(enemy,player);
  updateProjectiles(dt);checkOrbitWeaponHits();
 }
 updateParticles(dt);
 projectiles.forEach(drawProjectile);drawParticles();
 drawOrb(player);drawOrb(enemy);
 requestAnimationFrame(frame);
}
function init(){
 $("skinScreen").classList.remove("show");
 renderSkins();
 resetFight();
 requestAnimationFrame(frame);
}
window.restart=restart;
window.nextRound=nextRound;
window.toggleSkins=toggleSkins;
window.setCollectionTab=setCollectionTab;
window.changePage=changePage;
window.equipSkin=equipSkin;
init();
})();