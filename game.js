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
 shield:{name:"Khiên",desc:"Khiên đi bên cạnh quả cầu, chặn một đòn rồi cần thời gian hồi lại.",damage:5,color:"#d6e0ef"},
  web:{name:"Tơ nhện",desc:"Nhện không cầm kiếm; giăng tơ bẫy đối thủ trên sàn đấu.",damage:5,color:"#d9f5b4"}
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
  if (id === 1) trait = "Tám chân nhện và giăng tơ";
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
     id===1 ? "Tám chân nhện nhỏ; cứ mỗi 5 giây giăng tơ trên sàn để bẫy đối thủ." :
    id===25 ? "Có một chiếc khiên bên cạnh quả cầu. Khiên chặn đòn định kỳ." :
    id===46 ? "Bắn tia sáng vàng từ tâm quả cầu; không cần vũ khí cầm tay." :
    id===66 ? "Có vây cá mập ở trên đầu và hai vây nhỏ hai bên." :
    powers[id%powers.length]
 };
});

// 5 quả cầu Hạng S với chỉ số và đạn năng lượng riêng.
const sTier = [
 {id:100,name:"Nam",color:"#36b8ff",weapon:"gun",weaponName:"Súng năng lượng",weaponColor:"#8fe7ff",damage:24,maxHP:125,projectile:"pulse",desc:"Cầm súng năng lượng mini, bắn đạn xung xanh sáng."},
 {id:101,name:"Ánh Dương",color:"#ffd447",weapon:"sunbeam",weaponName:"Tia ánh dương",weaponColor:"#fff19a",damage:22,maxHP:118,projectile:"sunbeam",desc:"Phóng luồng ánh sáng vàng rực từ chính quả cầu."},
 {id:102,name:"Cầu Chó Shiba",color:"#e8a34f",weapon:"yellowwater",weaponName:"Thủy cầu vàng",weaponColor:"#ffe36e",damage:20,maxHP:135,projectile:"yellowwater",desc:"Bắn những giọt nước năng lượng màu vàng."},
 {id:103,name:"Cá Nóc",color:"#36c9b4",weapon:"bluewater",weaponName:"Thủy cầu xanh",weaponColor:"#62efff",damage:18,maxHP:150,projectile:"bluewater",desc:"Bắn bong bóng nước xanh có ánh sáng."},
 {id:104,name:"Hope",color:"#39e64b",weapon:"hopebolt",weaponName:"Tia đạn hacker",weaponColor:"#8cff72",damage:20,maxHP:150,projectile:"hopebounce",desc:"Hacker xanh lá, HP 150, sát thương 20. Bắn tia xanh nảy khỏi sàn đúng một lần."}
];
sTier.forEach(s=>skins.push({id:s.id,name:s.name,color:s.color,category:"Hạng S",weapon:s.weapon,weaponInfo:{name:s.weaponName,desc:s.desc,damage:s.damage,color:s.weaponColor},trait:"⭐ HẠNG S",maxHP:s.maxHP,baseDamage:s.damage,power:"Hạng S",description:s.desc,projectile:s.projectile,rank:"S"}));


const previewOrbs = [
 {id:105,name:"Độc",color:"#55d83b",weapon:"poisonray",weaponName:"Tia độc xanh",weaponColor:"#8dff55",damage:19,maxHP:118,projectile:"poisonray",category:"Tấn công",trait:"Gai độc và bong bóng độc",desc:"Không cầm vũ khí. Bắn tia độc màu xanh trực tiếp từ tâm quả cầu."},
 {id:106,name:"Ma Cà Rồng",color:"#a92749",weapon:"fangs",weaponName:"Răng nanh",weaponColor:"#fff3f4",damage:10,maxHP:122,category:"Hút máu",trait:"Hai răng nanh có thể cắn dính đối thủ",desc:"Không cầm vũ khí. Khi áp sát, hai răng nanh cắn dính vào quả cầu địch, hút 10 HP và hồi 10 HP cho mình, sau đó nhả ra."},
 {id:107,name:"Băng Tinh",color:"#83ddf5",weapon:"sword",weaponName:"Kiếm băng",weaponColor:"#c8f7ff",damage:15,maxHP:130,category:"Phòng thủ",trait:"Tinh thể băng nhô quanh thân",desc:"Quả cầu bọc tinh thể băng xanh, có các mũi pha lê phát sáng."},
 {id:108,name:"Dung Nham",color:"#ef612c",weapon:"dagger",weaponName:"Dao dung nham",weaponColor:"#ffb04a",damage:18,maxHP:112,category:"Tấn công",trait:"Vết nứt dung nham phát sáng",desc:"Lớp vỏ đá núi lửa với các đường nứt cam đỏ và gai nóng."},
 {id:109,name:"Thiên Thạch",color:"#776d68",weapon:"staff",weaponName:"Trượng thiên thạch",weaponColor:"#ffd18b",damage:16,maxHP:125,category:"Đặc biệt",trait:"Hố thiên thạch và vòng bụi đá",desc:"Bề mặt đá xám có các hố va chạm và vòng bụi thiên thạch."},
 {id:110,name:"Bóng Đêm",color:"#58358f",weapon:"dagger",weaponName:"Lưỡi bóng tối",weaponColor:"#c5a2ff",damage:17,maxHP:108,category:"Đặc biệt",trait:"Đôi cánh bóng đêm",desc:"Quả cầu tím đen với hai cánh bóng tối cong ở hai bên."},
 {id:111,name:"San Hô",color:"#f18ab8",weapon:"water",weaponName:"Lưỡi san hô",weaponColor:"#ffd0e5",damage:13,maxHP:120,category:"Đặc biệt",trait:"Nhánh san hô hồng",desc:"Các nhánh san hô mềm mại và hạt ngọc nhỏ bao quanh quả cầu."},
 {id:112,name:"Lôi Điện",color:"#f4d94e",weapon:"staff",weaponName:"Trượng sấm",weaponColor:"#fff27c",damage:20,maxHP:105,category:"Điện",trait:"Tia sét vàng chạy quanh thân",desc:"Quả cầu vàng với đường sét zigzag và các tia điện nhỏ."},
 {id:113,name:"Cơ Giới",color:"#9caebd",weapon:"shield",weaponName:"Khiên cơ khí",weaponColor:"#d9edf7",damage:12,maxHP:142,category:"Phòng thủ",trait:"Vòng kim loại và đinh tán",desc:"Lớp vỏ kim loại, vòng bánh răng và các đinh tán máy móc."},
 {id:114,name:"Linh Hồn",color:"#c2f2ed",weapon:"staff",weaponName:"Trượng linh hồn",weaponColor:"#e3fff9",damage:14,maxHP:116,category:"Khống chế",trait:"Dải linh khí lơ lửng",desc:"Quả cầu xanh ngọc nhạt với quầng sáng và các dải linh khí bay quanh."},
 {id:115,name:"Nhện Giăng Tơ",color:"#83b85c",weapon:"web",weaponName:"Tơ nhện",weaponColor:"#d9f5b4",damage:5,maxHP:128,category:"Khống chế",trait:"Bốn cặp chân nhện và bẫy tơ",desc:"Cứ mỗi 5 giây bắn một tấm tơ xuống sàn đấu. Quả cầu đi qua sẽ mất 5 HP và bị giữ lại trong chốc lát. Mỗi tấm tơ bẫy được 2 lần rồi biến mất."}
];
previewOrbs.forEach(s=>skins.push({
 id:s.id,name:s.name,color:s.color,category:s.category,weapon:s.weapon,
 weaponInfo:{name:s.weaponName,desc:s.desc,damage:s.damage,color:s.weaponColor},
 trait:s.trait,maxHP:s.maxHP,baseDamage:s.damage,power:s.category,
 description:s.desc,projectile:s.projectile||null,previewOnly:true
}));

const newOrbs = [{"id":116,"name":"Hỏa Hồ","color":"#ff713d","weapon":"firebolt","glyph":"🔥","special":"burn","maxHP":112,"baseDamage":16,"category":"Phòng thủ","weaponInfo":{"name":"firebolt","desc":"Phóng hỏa cầu để lại hiệu ứng thiêu đốt.","damage":16,"color":"#ff713d"},"trait":"Phóng hỏa cầu để lại hiệu ứng thiêu đốt.","power":"burn","description":"Phóng hỏa cầu để lại hiệu ứng thiêu đốt.","projectile":"firebolt","rank":"A"},{"id":117,"name":"Băng Kính","color":"#8be8ff","weapon":"icebolt","glyph":"❄","special":"freeze","maxHP":128,"baseDamage":14,"category":"Tấn công","weaponInfo":{"name":"icebolt","desc":"Bắn mảnh băng làm chậm đối thủ.","damage":14,"color":"#8be8ff"},"trait":"Bắn mảnh băng làm chậm đối thủ.","power":"freeze","description":"Bắn mảnh băng làm chậm đối thủ.","projectile":"icebolt","rank":"A"},{"id":118,"name":"Lôi Ưng","color":"#ffe45e","weapon":"lightning","glyph":"ϟ","special":"shock","maxHP":108,"baseDamage":19,"category":"Điện","weaponInfo":{"name":"lightning","desc":"Phóng tia điện nhanh, gây thêm sát thương.","damage":19,"color":"#ffe45e"},"trait":"Phóng tia điện nhanh, gây thêm sát thương.","power":"shock","description":"Phóng tia điện nhanh, gây thêm sát thương.","projectile":"lightning","rank":"A"},{"id":119,"name":"Phong Linh","color":"#63e8c8","weapon":"windshot","glyph":"〰","special":"wind","maxHP":116,"baseDamage":14,"category":"Khống chế","weaponInfo":{"name":"windshot","desc":"Bắn luồng gió đẩy đối thủ lùi lại.","damage":14,"color":"#63e8c8"},"trait":"Bắn luồng gió đẩy đối thủ lùi lại.","power":"wind","description":"Bắn luồng gió đẩy đối thủ lùi lại.","projectile":"windshot","rank":"A"},{"id":120,"name":"Thạch Giáp","color":"#9299a8","weapon":"shield","glyph":"⬟","special":"armor","maxHP":150,"baseDamage":9,"category":"Phòng thủ","weaponInfo":{"name":"Khiên","desc":"Lớp giáp đá giảm sát thương nhận vào.","damage":9,"color":"#9299a8"},"trait":"Lớp giáp đá giảm sát thương nhận vào.","power":"armor","description":"Lớp giáp đá giảm sát thương nhận vào.","projectile":null,"rank":"A"},{"id":121,"name":"Hắc Nguyệt","color":"#49366f","weapon":"shadowbolt","glyph":"☾","special":"shadow","maxHP":110,"baseDamage":18,"category":"Đặc biệt","weaponInfo":{"name":"shadowbolt","desc":"Bắn bóng tối và hồi một ít HP khi trúng.","damage":18,"color":"#49366f"},"trait":"Bắn bóng tối và hồi một ít HP khi trúng.","power":"shadow","description":"Bắn bóng tối và hồi một ít HP khi trúng.","projectile":"shadowbolt","rank":"A"},{"id":122,"name":"Thủy Ngọc","color":"#42c9ed","weapon":"waterbolt","glyph":"≈","special":"water","maxHP":120,"baseDamage":14,"category":"Khống chế","weaponInfo":{"name":"waterbolt","desc":"Bắn giọt nước làm chậm nhịp di chuyển.","damage":14,"color":"#42c9ed"},"trait":"Bắn giọt nước làm chậm nhịp di chuyển.","power":"water","description":"Bắn giọt nước làm chậm nhịp di chuyển.","projectile":"waterbolt","rank":"A"},{"id":123,"name":"Dung Nham","color":"#e95b2c","weapon":"sword","glyph":"🌋","special":"lava","maxHP":115,"baseDamage":19,"category":"Tấn công","weaponInfo":{"name":"Kiếm","desc":"Kiếm dung nham gây bỏng khi đánh trúng.","damage":19,"color":"#e95b2c"},"trait":"Kiếm dung nham gây bỏng khi đánh trúng.","power":"lava","description":"Kiếm dung nham gây bỏng khi đánh trúng.","projectile":null,"rank":"A"},{"id":124,"name":"Pha Lê","color":"#b8f4ff","weapon":"dagger","glyph":"◇","special":"crystal","maxHP":132,"baseDamage":13,"category":"Phòng thủ","weaponInfo":{"name":"Dao găm","desc":"Dao pha lê quay quanh thân, tăng phòng thủ.","damage":13,"color":"#b8f4ff"},"trait":"Dao pha lê quay quanh thân, tăng phòng thủ.","power":"crystal","description":"Dao pha lê quay quanh thân, tăng phòng thủ.","projectile":null,"rank":"A"},{"id":125,"name":"Robot Xanh","color":"#6cbbad","weapon":"gun","glyph":"⚙","special":"pulse","maxHP":125,"baseDamage":15,"category":"Tấn công","weaponInfo":{"name":"Bộ phát đạn","desc":"Bắn đạn năng lượng từ bộ phát gắn trong thân.","damage":15,"color":"#6cbbad"},"trait":"Bắn đạn năng lượng từ bộ phát gắn trong thân.","power":"pulse","description":"Bắn đạn năng lượng từ bộ phát gắn trong thân.","projectile":"gun","rank":"A"},{"id":126,"name":"Cung Thủ","color":"#c69b60","weapon":"bow","glyph":"➶","special":"arrow","maxHP":112,"baseDamage":17,"category":"Tấn công","weaponInfo":{"name":"Cung","desc":"Bắn tên năng lượng; cung không va chạm và không chặn đạn.","damage":17,"color":"#c69b60"},"trait":"Bắn tên năng lượng; cung không va chạm và không chặn đạn.","power":"arrow","description":"Bắn tên năng lượng; cung không va chạm và không chặn đạn.","projectile":"bow","rank":"A"},{"id":127,"name":"Pháp Sư","color":"#b18aff","weapon":"arcanebolt","glyph":"✧","special":"arcane","maxHP":106,"baseDamage":20,"category":"Đặc biệt","weaponInfo":{"name":"arcanebolt","desc":"Phóng cầu phép từ tâm quả cầu.","damage":20,"color":"#b18aff"},"trait":"Phóng cầu phép từ tâm quả cầu.","power":"arcane","description":"Phóng cầu phép từ tâm quả cầu.","projectile":"arcanebolt","rank":"A"},{"id":128,"name":"Rùa Sắt","color":"#728d9b","weapon":"shield","glyph":"▣","special":"turtle","maxHP":158,"baseDamage":8,"category":"Phòng thủ","weaponInfo":{"name":"Khiên","desc":"Mai thép hấp thụ một phần sát thương.","damage":8,"color":"#728d9b"},"trait":"Mai thép hấp thụ một phần sát thương.","power":"turtle","description":"Mai thép hấp thụ một phần sát thương.","projectile":null,"rank":"A"},{"id":129,"name":"Mặt Trời","color":"#ffd34c","weapon":"sunbeam","glyph":"☼","special":"solar","maxHP":118,"baseDamage":18,"category":"Tấn công","weaponInfo":{"name":"Tia sáng","desc":"Phóng tia sáng từ tâm quả cầu.","damage":18,"color":"#ffd34c"},"trait":"Phóng tia sáng từ tâm quả cầu.","power":"solar","description":"Phóng tia sáng từ tâm quả cầu.","projectile":"sunbeam","rank":"A"},{"id":130,"name":"Hoa Anh Đào","color":"#f49bc8","weapon":"petalshot","glyph":"🌸","special":"petal","maxHP":114,"baseDamage":15,"category":"Đặc biệt","weaponInfo":{"name":"petalshot","desc":"Phóng cánh hoa theo loạt.","damage":15,"color":"#f49bc8"},"trait":"Phóng cánh hoa theo loạt.","power":"petal","description":"Phóng cánh hoa theo loạt.","projectile":"petalshot","rank":"A"},{"id":131,"name":"Bóng Ma","color":"#a9a0d8","weapon":"ghostshot","glyph":"◌","special":"ghost","maxHP":105,"baseDamage":18,"category":"Đặc biệt","weaponInfo":{"name":"ghostshot","desc":"Bắn linh thể xuyên qua đấu trường.","damage":18,"color":"#a9a0d8"},"trait":"Bắn linh thể xuyên qua đấu trường.","power":"ghost","description":"Bắn linh thể xuyên qua đấu trường.","projectile":"ghostshot","rank":"A"},{"id":132,"name":"Bọ Cạp","color":"#c88b48","weapon":"dagger","glyph":"♏","special":"sting","maxHP":122,"baseDamage":20,"category":"Tấn công","weaponInfo":{"name":"Dao găm","desc":"Đuôi chích và dao nhỏ gây độc nhẹ.","damage":20,"color":"#c88b48"},"trait":"Đuôi chích và dao nhỏ gây độc nhẹ.","power":"sting","description":"Đuôi chích và dao nhỏ gây độc nhẹ.","projectile":null,"rank":"A"},{"id":133,"name":"Kỵ Sĩ","color":"#bdc7d7","weapon":"sword","glyph":"⚔","special":"knight","maxHP":142,"baseDamage":16,"category":"Tấn công","weaponInfo":{"name":"Kiếm","desc":"Kiếm thép xoay quanh quả cầu.","damage":16,"color":"#bdc7d7"},"trait":"Kiếm thép xoay quanh quả cầu.","power":"knight","description":"Kiếm thép xoay quanh quả cầu.","projectile":null,"rank":"A"},{"id":134,"name":"Golem","color":"#8b7864","weapon":"sword","glyph":"🪨","special":"golem","maxHP":165,"baseDamage":12,"category":"Phòng thủ","weaponInfo":{"name":"Kiếm","desc":"Thân đá nặng, đòn kiếm có lực lớn.","damage":12,"color":"#8b7864"},"trait":"Thân đá nặng, đòn kiếm có lực lớn.","power":"golem","description":"Thân đá nặng, đòn kiếm có lực lớn.","projectile":null,"rank":"A"},{"id":135,"name":"Cá Heo","color":"#50c8e8","weapon":"waterbolt","glyph":"🐬","special":"dolphin","maxHP":126,"baseDamage":15,"category":"Tấn công","weaponInfo":{"name":"waterbolt","desc":"Bắn luồng nước xanh.","damage":15,"color":"#50c8e8"},"trait":"Bắn luồng nước xanh.","power":"dolphin","description":"Bắn luồng nước xanh.","projectile":"waterbolt","rank":"A"},{"id":136,"name":"Hỏa Điểu","color":"#ff9845","weapon":"firebolt","glyph":"🪶","special":"phoenix","maxHP":112,"baseDamage":19,"category":"Tấn công","weaponInfo":{"name":"firebolt","desc":"Lửa bùng thành vòng quanh quả cầu.","damage":19,"color":"#ff9845"},"trait":"Lửa bùng thành vòng quanh quả cầu.","power":"phoenix","description":"Lửa bùng thành vòng quanh quả cầu.","projectile":"firebolt","rank":"A"},{"id":137,"name":"Bão Cát","color":"#c8ad79","weapon":"sandshot","glyph":"⌁","special":"sand","maxHP":120,"baseDamage":15,"category":"Khống chế","weaponInfo":{"name":"sandshot","desc":"Bắn cát làm giảm tốc độ đối thủ.","damage":15,"color":"#c8ad79"},"trait":"Bắn cát làm giảm tốc độ đối thủ.","power":"sand","description":"Bắn cát làm giảm tốc độ đối thủ.","projectile":"sandshot","rank":"A"},{"id":138,"name":"Thiên Sứ","color":"#fff0a8","weapon":"lightshot","glyph":"✦","special":"blessing","maxHP":130,"baseDamage":13,"category":"Hồi phục","weaponInfo":{"name":"lightshot","desc":"Bắn tia sáng và hồi phục nhẹ theo thời gian.","damage":13,"color":"#fff0a8"},"trait":"Bắn tia sáng và hồi phục nhẹ theo thời gian.","power":"blessing","description":"Bắn tia sáng và hồi phục nhẹ theo thời gian.","projectile":"lightshot","rank":"A"},{"id":139,"name":"Nấm Độc","color":"#8cbd55","weapon":"poisonmist","glyph":"☣","special":"toxic","maxHP":118,"baseDamage":14,"category":"Tấn công","weaponInfo":{"name":"poisonmist","desc":"Tạo làn sương độc quanh thân.","damage":14,"color":"#8cbd55"},"trait":"Tạo làn sương độc quanh thân.","power":"toxic","description":"Tạo làn sương độc quanh thân.","projectile":"poisonmist","rank":"A"},{"id":140,"name":"Hắc Long","color":"#633b45","weapon":"firebolt","glyph":"🐉","special":"dragon","maxHP":138,"baseDamage":20,"category":"Tấn công","weaponInfo":{"name":"firebolt","desc":"Hỏa cầu đen đỏ gây thiêu đốt.","damage":20,"color":"#633b45"},"trait":"Hỏa cầu đen đỏ gây thiêu đốt.","power":"dragon","description":"Hỏa cầu đen đỏ gây thiêu đốt.","projectile":"firebolt","rank":"A"},{"id":141,"name":"Băng Long","color":"#83d9f4","weapon":"icebolt","glyph":"❅","special":"frost","maxHP":145,"baseDamage":17,"category":"Khống chế","weaponInfo":{"name":"icebolt","desc":"Mảnh băng lớn gây chậm.","damage":17,"color":"#83d9f4"},"trait":"Mảnh băng lớn gây chậm.","power":"frost","description":"Mảnh băng lớn gây chậm.","projectile":"icebolt","rank":"A"},{"id":142,"name":"Thần Mộc","color":"#7caf54","weapon":"sword","glyph":"♧","special":"root","maxHP":150,"baseDamage":14,"category":"Đặc biệt","weaponInfo":{"name":"Kiếm","desc":"Lưỡi gỗ quấn rễ làm chậm mục tiêu.","damage":14,"color":"#7caf54"},"trait":"Lưỡi gỗ quấn rễ làm chậm mục tiêu.","power":"root","description":"Lưỡi gỗ quấn rễ làm chậm mục tiêu.","projectile":null,"rank":"A"},{"id":143,"name":"Lăng Kính","color":"#c4afff","weapon":"prismshot","glyph":"◇","special":"prism","maxHP":116,"baseDamage":18,"category":"Tấn công","weaponInfo":{"name":"prismshot","desc":"Phóng tia lăng kính đổi sắc.","damage":18,"color":"#c4afff"},"trait":"Phóng tia lăng kính đổi sắc.","power":"prism","description":"Phóng tia lăng kính đổi sắc.","projectile":"prismshot","rank":"A"},{"id":144,"name":"Ninja","color":"#30323f","weapon":"dagger","glyph":"忍","special":"ninja","maxHP":108,"baseDamage":21,"category":"Tấn công","weaponInfo":{"name":"Dao găm","desc":"Dao ngắn tốc độ cao.","damage":21,"color":"#30323f"},"trait":"Dao ngắn tốc độ cao.","power":"ninja","description":"Dao ngắn tốc độ cao.","projectile":null,"rank":"A"},{"id":145,"name":"Sao Băng","color":"#f4a86e","weapon":"meteor","glyph":"☄","special":"meteor","maxHP":124,"baseDamage":19,"category":"Tấn công","weaponInfo":{"name":"meteor","desc":"Phóng thiên thạch có vụ nổ nhỏ.","damage":19,"color":"#f4a86e"},"trait":"Phóng thiên thạch có vụ nổ nhỏ.","power":"meteor","description":"Phóng thiên thạch có vụ nổ nhỏ.","projectile":"meteor","rank":"A"}];
newOrbs.forEach(o=>skins.push(o));

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
].map((a,i)=>({ ...a, maxHP:[90,105,95,110,100,125,90,105,95,145,115,85,100,95,100,120][i], damage:[15,10,17,12,18,9,19,13,11,8,10,22,14,12,16,13][i], cooldown:[1.1,1.3,1.0,1.4,1.2,1.5,1.0,1.25,1.4,1.6,1.5,1.0,1.3,0.9,1.2,1.25][i] }) ).concat([
{name:"Độc Xanh",desc:"Đòn trúng độc gây sát thương theo thời gian.",color:"#69e34c",icon:"☣",maxHP:118,damage:19,cooldown:1.15},
{name:"Ma Cà Rồng",desc:"Đòn đánh hút máu và hồi HP.",color:"#b92e55",icon:"🧛",maxHP:122,damage:10,cooldown:1.3},
{name:"Băng Tinh",desc:"Đòn đánh làm chậm đối thủ.",color:"#83ddf5",icon:"❄",maxHP:130,damage:15,cooldown:1.4},
{name:"Dung Nham",desc:"Thiêu đốt đối thủ theo thời gian.",color:"#ef612c",icon:"🌋",maxHP:112,damage:18,cooldown:1.2},
{name:"Thiên Thạch",desc:"Đòn đánh tạo vụ nổ lan.",color:"#776d68",icon:"☄",maxHP:125,damage:16,cooldown:1.5},
{name:"Bóng Đêm",desc:"Tăng sát thương đòn đánh.",color:"#58358f",icon:"☾",maxHP:108,damage:17,cooldown:1.0},
{name:"San Hô",desc:"Hồi phục HP định kỳ.",color:"#f18ab8",icon:"🪸",maxHP:120,damage:13,cooldown:1.5},
{name:"Lôi Điện",desc:"Đòn đánh phóng tia sét phụ.",color:"#f4d94e",icon:"ϟ",maxHP:105,damage:20,cooldown:1.0},
{name:"Cơ Giới",desc:"Giảm sát thương nhận vào.",color:"#9caebd",icon:"⚙",maxHP:142,damage:12,cooldown:1.6},
{name:"Linh Hồn",desc:"Có cơ hội né một đòn đánh.",color:"#c2f2ed",icon:"✧",maxHP:116,damage:14,cooldown:1.4},
{name:"Nhện Giăng Tơ",desc:"Mỗi 5 giây đặt tơ; chạm tơ mất 5 HP và bị giữ chân. Mỗi tơ bẫy 2 lần.",color:"#83b85c",icon:"🕷",maxHP:128,damage:5,cooldown:5}
]);
const categories = ["✦ Tất cả (146)","🔥 Tấn công","✚ Hồi phục","🛡️ Phòng thủ","⚡ Điện","🕸️ Khống chế","💧 Hút máu","🌀 Đặc biệt","⭐ Hạng S (5)"];
let selected=116, equipped=116, selectedAbility=0, equippedAbility=0, collectionTab="skin", filter="Tất cả", page=0, round=1;
let playing=true, ended=false, playerHP=100, enemyHP=100, enemySkin=1;
let player=null, enemy=null, projectiles=[], particles=[], spiderWebs=[], lastFrame=0;
let logTimer=0;

const canvas=document.getElementById("arena");
const ctx=canvas.getContext("2d");
const W=700,H=480;
const $=id=>document.getElementById(id);

function makeOrb(x,y,skin,side,abilityId){
 return {
  x,y,vx:Math.cos(Math.random()*Math.PI*2)*(1.0+Math.random()*.45),vy:Math.sin(Math.random()*Math.PI*2)*(1.0+Math.random()*.45),r:38,skin,ability:abilityId,turnTimer:.5+Math.random()*1.2,webShotTimer:5,webbedTimer:0,
  weaponAngle:Math.random()*Math.PI*2,weaponSpin:Math.random()<.5?-1:1,weaponClashCooldown:0,weaponCooldown:.5+Math.random()*.5,
  hitCooldown:0,shieldCooldown:0,flash:0,side,poisonTimer:0,burnTimer:0,slowTimer:0,regenTimer:1,spiritCooldown:0
 };
}
function resetFight(){
 player=makeOrb(140,H/2,equipped,0,equippedAbility);
 enemySkin=Math.floor(Math.random()*skins.length);
 if(enemySkin===equipped) enemySkin=(enemySkin+1)%skins.length;
 const enemyAbility=Math.floor(Math.random()*abilities.length);
 enemy=makeOrb(W-140,H/2,enemySkin,1,enemyAbility);
 playerHP=skins[player.skin].maxHP;enemyHP=skins[enemy.skin].maxHP;playing=true;ended=false;
 projectiles=[]; particles=[]; spiderWebs=[];
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
  const f=["Tất cả","Tấn công","Hồi phục","Phòng thủ","Điện","Khống chế","Hút máu","Đặc biệt","Hạng S"][i];
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
 return skins[id]?.glyph||({100:"🔫",101:"☼",102:"🐕",103:"🐡",104:"⌘",105:"☣",106:"🧛",107:"❄",108:"🌋",109:"☄",110:"☾",111:"🪸",112:"ϟ",113:"⚙",114:"✧",115:"🕷️"})[id]||marks[id]||"●";
}
function renderSkins(){
 $("skinTab").classList.toggle("active",collectionTab==="skin");
 $("abilityTab").classList.toggle("active",collectionTab==="ability");
 $("categories").style.display=collectionTab==="skin"?"flex":"none";
 document.querySelector(".skin-layout").classList.toggle("abilities-only",collectionTab==="ability");
 const collectionOrder=[...skins.slice(116),...skins.slice(100,116),...skins.slice(0,100)];
 const list=collectionTab==="skin" ? collectionOrder.filter(s=>filter==="Tất cả"||s.category===filter) : abilities;
 const pageSize=collectionTab==="ability"?30:20;const pages=Math.max(1,Math.ceil(list.length/pageSize));page=Math.min(page,pages-1);
 $("pageText").textContent=(page+1)+" / "+pages;
 $("skinHeading").textContent=collectionTab==="skin"?"Ngoại hình · "+skins.length+" quả cầu":"Kỹ năng · "+abilities.length+" chiêu thức";
 $("collectionCount").textContent=collectionTab==="skin"?"("+skins.length+"/"+skins.length+")":"("+abilities.length+"/"+abilities.length+")";
 const grid=$("skinGrid");grid.innerHTML="";
 list.slice(page*pageSize,page*pageSize+pageSize).forEach((s,i)=>{
  const id=collectionTab==="skin"?s.id:page*pageSize+i;
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
 const list=collectionTab==="skin"?[...skins.slice(116),...skins.slice(100,116),...skins.slice(0,100)].filter(s=>filter==="Tất cả"||s.category===filter):abilities;
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
 if(o.skin===100){ctx.save();ctx.translate(27,7);ctx.rotate(-.25);ctx.fillStyle="#263b55";ctx.strokeStyle="#bdefff";ctx.lineWidth=2;ctx.fillRect(-2,-5,20,10);ctx.fillRect(9,3,6,10);ctx.fillStyle="#8fe7ff";ctx.fillRect(15,-3,8,5);ctx.restore();}
 if(o.skin===101){ctx.strokeStyle="#fff09a";ctx.lineWidth=3;for(let k=0;k<12;k++){const a=k*Math.PI/6;ctx.beginPath();ctx.moveTo(Math.cos(a)*34,Math.sin(a)*34);ctx.lineTo(Math.cos(a)*46,Math.sin(a)*46);ctx.stroke();}}
 if(o.skin===102){polygon([[-23,-19],[-27,-42],[-8,-29]],"#9b572e","#ffe0a6");polygon([[8,-29],[27,-42],[23,-19]],"#9b572e","#ffe0a6");ctx.fillStyle="#fff0cf";ctx.beginPath();ctx.ellipse(0,12,13,10,0,0,Math.PI*2);ctx.fill();}
 if(o.skin===103){ctx.strokeStyle="#d7fff8";ctx.lineWidth=4;for(let k=0;k<12;k++){const a=k*Math.PI/6;ctx.beginPath();ctx.moveTo(Math.cos(a)*31,Math.sin(a)*31);ctx.lineTo(Math.cos(a)*40,Math.sin(a)*40);ctx.stroke();}}
 if(o.skin===104){ctx.strokeStyle="#8cff72";ctx.lineWidth=3;ctx.shadowBlur=16;ctx.shadowColor="#39ff4e";ctx.beginPath();ctx.arc(0,0,39,0,Math.PI*2);ctx.stroke();ctx.shadowBlur=0;}
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
 // Vampire cape stays behind its round body.
 if(o.skin===106){ctx.save();polygon([[-18,-r+3],[-36,-r-13],[-31,22],[0,14],[31,22],[36,-r-13],[18,-r+3]],"#4c1026","#d95772");ctx.restore();}
 // Body
 ctx.shadowBlur=18;ctx.shadowColor=s.color;ctx.fillStyle=s.color;
 ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();
 ctx.shadowBlur=0;ctx.strokeStyle="#ffffffaa";ctx.lineWidth=2.5;ctx.stroke();
 // The 30 new orbs each receive a distinct emblem and surface pattern.
 if(o.skin>=116){const k=o.skin-116;ctx.save();ctx.lineWidth=3;ctx.strokeStyle="#ffffffcc";ctx.fillStyle="#ffffffbb";ctx.shadowBlur=7;ctx.shadowColor=s.color;
  if([0,7,20,23,24].includes(k)){ctx.beginPath();ctx.arc(0,0,r-10,-2.35,2.35);ctx.stroke();ctx.beginPath();ctx.arc(0,0,r-17,.7,2.5);ctx.stroke();}
  else if([1,8,25].includes(k)){for(let n=0;n<8;n++){const a=n*Math.PI/4;ctx.beginPath();ctx.moveTo(Math.cos(a)*8,Math.sin(a)*8);ctx.lineTo(Math.cos(a)*(r-4),Math.sin(a)*(r-4));ctx.stroke();}}
  else if([2,3,13,21,22,26].includes(k)){ctx.beginPath();ctx.moveTo(-r+4,0);for(let n=0;n<7;n++)ctx.lineTo(-r+7+n*9,(n%2?-1:1)*(8+n%3*3));ctx.stroke();}
  else if([4,12,17,18].includes(k)){ctx.beginPath();ctx.arc(0,0,r+5,0,Math.PI*2);ctx.stroke();for(let n=0;n<8;n++){const a=n*Math.PI/4;ctx.beginPath();ctx.arc(Math.cos(a)*(r+5),Math.sin(a)*(r+5),3,0,Math.PI*2);ctx.fill();}}
  else if([5,11,15,27].includes(k)){ctx.beginPath();ctx.arc(0,0,15,0,Math.PI*2);ctx.stroke();for(let n=0;n<4;n++){ctx.beginPath();ctx.moveTo(-r+8,-15+n*10);ctx.lineTo(r-8,15-n*10);ctx.stroke();}}
  else {for(let n=0;n<6;n++){const a=n*Math.PI/3;ctx.beginPath();ctx.arc(Math.cos(a)*19,Math.sin(a)*19,5,0,Math.PI*2);ctx.stroke();}}
  ctx.font="bold 10px Arial";ctx.textAlign="center";ctx.fillText(s.glyph||"✦",0,-r-7);ctx.restore();}
 if(o.skin===104){ctx.save();ctx.fillStyle="#d6ffd0";ctx.shadowBlur=10;ctx.shadowColor="#39ff4e";ctx.font="bold 10px monospace";ctx.textAlign="center";["01","10","11","0A","FF"].forEach((v,i)=>ctx.fillText(v,-18+(i%3)*18,-17+Math.floor(i/3)*15));ctx.restore();}
 // Simple face kept intentionally minimal
 ctx.fillStyle="#17121a";ctx.beginPath();
 ctx.arc(-9,-5,3,0,Math.PI*2);ctx.arc(9,-5,3,0,Math.PI*2);ctx.fill();
 ctx.strokeStyle="#17121a";ctx.lineWidth=2.3;ctx.beginPath();ctx.arc(0,3,7,.2,Math.PI-.2);ctx.stroke();
 // 10 hinh dang moi cua ban preview.
 if(o.skin===105){
  ctx.save();ctx.strokeStyle="#a7ff58";ctx.lineWidth=3;ctx.shadowBlur=9;ctx.shadowColor="#72ff38";
  for(let k=0;k<5;k++){const a=-Math.PI/2+k*Math.PI/4;ctx.beginPath();ctx.moveTo(Math.cos(a)*(r-3),Math.sin(a)*(r-3));ctx.lineTo(Math.cos(a)*(r+9),Math.sin(a)*(r+9));ctx.stroke();}
  ctx.shadowBlur=0;ctx.fillStyle="#d8ff8a";for(const p of [[-17,-17],[18,-13],[18,17]]){ctx.beginPath();ctx.arc(p[0],p[1],3,0,Math.PI*2);ctx.fill();}ctx.restore();
 }
 if(o.skin===106){
  const mark=o.biteTarget||(o.side?player:enemy);const face=Math.atan2(mark.y-o.y,mark.x-o.x);
  ctx.save();ctx.rotate(face);
  polygon([[r-5,-13],[r+13,-8],[r+4,-1]],"#fff7f5","#7d1630");
  polygon([[r-5,13],[r+4,1],[r+13,8]],"#fff7f5","#7d1630");ctx.restore();
 }
 if(o.skin===107){
  ctx.save();for(let k=0;k<8;k++){const a=k*Math.PI/4;ctx.save();ctx.rotate(a);polygon([[-5,-r+4],[0,-r-12],[5,-r+4]],"#c7f7ff","#ffffff");ctx.restore();}ctx.restore();
 }
 if(o.skin===108){
  ctx.save();ctx.strokeStyle="#ffb047";ctx.lineWidth=3;ctx.shadowBlur=8;ctx.shadowColor="#ff5a20";
  ctx.beginPath();ctx.moveTo(-24,-13);ctx.lineTo(-10,-3);ctx.lineTo(-15,8);ctx.lineTo(2,2);ctx.lineTo(10,17);ctx.lineTo(22,5);ctx.stroke();ctx.restore();
 }
 if(o.skin===109){
  ctx.save();ctx.strokeStyle="#d1b59f";ctx.lineWidth=3;
  for(const p of [[-14,-12,5],[15,-8,4],[-4,16,6]]){ctx.beginPath();ctx.arc(p[0],p[1],p[2],0,Math.PI*2);ctx.stroke();}
  ctx.strokeStyle="#ffc27b";ctx.beginPath();ctx.arc(0,0,r+6,-.7,.8);ctx.stroke();ctx.restore();
 }
 if(o.skin===110){
  ctx.save();polygon([[-r+7,-9],[-r-18,-25],[-r-13,4],[-r-4,17]],"#342052","#a98ae0");
  polygon([[r-7,-9],[r+18,-25],[r+13,4],[r+4,17]],"#342052","#a98ae0");ctx.restore();
 }
 if(o.skin===111){
  ctx.save();ctx.strokeStyle="#ffcae1";ctx.lineWidth=4;ctx.lineCap="round";
  for(let k=0;k<5;k++){const x=-18+k*9;ctx.beginPath();ctx.moveTo(x,r-4);ctx.lineTo(x-5,r+7);ctx.moveTo(x,r-4);ctx.lineTo(x+5,r-10);ctx.stroke();}
  ctx.fillStyle="#fff0f7";for(const p of [[-17,-10],[15,13],[3,-20]]){ctx.beginPath();ctx.arc(p[0],p[1],3,0,Math.PI*2);ctx.fill();}ctx.restore();
 }
 if(o.skin===112){
  ctx.save();ctx.strokeStyle="#fff49b";ctx.lineWidth=4;ctx.shadowBlur=10;ctx.shadowColor="#ffe64d";
  ctx.beginPath();ctx.moveTo(-r-5,-9);ctx.lineTo(-7,-19);ctx.lineTo(-12,1);ctx.lineTo(5,-6);ctx.lineTo(0,17);ctx.lineTo(r+5,3);ctx.stroke();ctx.restore();
 }
 if(o.skin===113){
  ctx.save();ctx.strokeStyle="#e2f3ff";ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,r+6,0,Math.PI*2);ctx.stroke();
  for(let k=0;k<8;k++){const a=k*Math.PI/4;ctx.fillStyle="#526675";ctx.beginPath();ctx.arc(Math.cos(a)*(r+6),Math.sin(a)*(r+6),3,0,Math.PI*2);ctx.fill();}ctx.restore();
 }
 if(o.skin===114){
  ctx.save();ctx.strokeStyle="#e7fffb";ctx.lineWidth=3;ctx.shadowBlur=12;ctx.shadowColor="#c2fff5";
  ctx.beginPath();ctx.arc(0,0,r+7,-2.4,2.4);ctx.stroke();ctx.beginPath();ctx.arc(0,0,r+12,.7,2.3);ctx.stroke();
  ctx.fillStyle="#f2fffc";for(const p of [[-24,-22],[23,-17],[22,21]]){ctx.beginPath();ctx.arc(p[0],p[1],3,0,Math.PI*2);ctx.fill();}ctx.restore();
 }

 // Spider orb: eight short jointed legs around a round body.
 if(o.skin===1||o.skin===115){
  ctx.save();ctx.strokeStyle="#34452b";ctx.lineWidth=4;ctx.lineCap="round";ctx.lineJoin="round";
  for(const side of [-1,1])for(let k=0;k<4;k++){
   const y=-19+k*12,rootX=side*24,midX=side*34,endX=side*43;
   ctx.beginPath();ctx.moveTo(rootX,y);ctx.lineTo(midX,y+(k<2?-7:7));ctx.lineTo(endX,y+(k<2?-13:13));ctx.stroke();
   ctx.strokeStyle="#c7e8a4";ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(rootX,y);ctx.lineTo(midX,y+(k<2?-7:7));ctx.stroke();
   ctx.strokeStyle="#34452b";ctx.lineWidth=4;
  }
  ctx.fillStyle="#f6ffd8";ctx.beginPath();ctx.arc(-8,-5,3,0,Math.PI*2);ctx.arc(8,-5,3,0,Math.PI*2);ctx.fill();
  ctx.restore();
 }

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
 if(!["sun","shield","sunbeam","yellowwater","bluewater","it","poisonray","fangs","web"].includes(s.weapon)){
  const a=o.weaponAngle,rad=r+21,wx=x+Math.cos(a)*rad,wy=y+Math.sin(a)*rad;
  drawWeapon(s.weapon,wx,wy,a,s.weaponInfo.color);
 }
 ctx.textAlign="center";ctx.font="bold 12px Arial";ctx.fillStyle="#fff";
 ctx.fillText(o.side===0?"Bạn":"Địch",x,y+r+19);
}
function drawOrbHP(o){
 const current=o===player?playerHP:enemyHP;
 const max=skins[o.skin].maxHP;
 const ratio=Math.max(0,Math.min(1,current/max));
 const barW=7,barH=54;
 const bx=o.side?o.x-o.r-17:o.x+o.r+10;
 const by=o.y-barH/2;
 ctx.save();
 ctx.fillStyle="rgba(8,10,18,.88)";
 ctx.strokeStyle="rgba(255,255,255,.72)";
 ctx.lineWidth=1.5;
 ctx.beginPath();ctx.roundRect(bx-2,by-2,barW+4,barH+4,5);ctx.fill();ctx.stroke();
 const fillH=barH*ratio;
 const grad=ctx.createLinearGradient(0,by+barH,0,by);
 grad.addColorStop(0,ratio>.35?"#28d978":"#ff424f");
 grad.addColorStop(1,ratio>.35?"#9aff9c":"#ff9a9a");
 ctx.fillStyle=grad;
 ctx.beginPath();ctx.roundRect(bx,by+barH-fillH,barW,fillH,3);ctx.fill();
 ctx.font="bold 10px Arial";ctx.textAlign="center";ctx.fillStyle="#fff";
 ctx.shadowColor="#000";ctx.shadowBlur=3;
 ctx.fillText(Math.ceil(current),bx+barW/2,by-6);
 ctx.restore();
}
function drawShield(o,faceAngle){
 ctx.save();ctx.translate(o.x,o.y);ctx.rotate(faceAngle);ctx.scale(2.5,2.5);
 // Small flat shield to the incoming side
 ctx.translate(o.r+8,0);
 ctx.fillStyle="#b9c8de";ctx.strokeStyle="#f3f6ff";ctx.lineWidth=2;
 ctx.beginPath();ctx.moveTo(-5,-12);ctx.lineTo(9,-10);ctx.lineTo(11,4);ctx.lineTo(2,16);ctx.lineTo(-7,5);ctx.closePath();ctx.fill();ctx.stroke();
 ctx.restore();
}
function drawWeapon(type,x,y,angle,color){
 ctx.save();ctx.translate(x,y);ctx.rotate(angle+Math.PI/2);ctx.scale(2,2);
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
 }else if(type==="gun"){ctx.fillStyle="#263b55";ctx.strokeStyle="#bdefff";ctx.lineWidth=2;ctx.fillRect(-3,-5,19,10);ctx.fillRect(8,3,6,10);ctx.fillStyle="#8fe7ff";ctx.fillRect(13,-3,11,5);
 }else if(type==="bow"){
  ctx.strokeStyle="#d8bd8c";ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,13,-1.2,1.2);ctx.stroke();
  ctx.strokeStyle="#fff";ctx.lineWidth=1.3;ctx.beginPath();ctx.moveTo(4,-12);ctx.lineTo(4,12);ctx.stroke();
 }
 ctx.restore();
}
function drawProjectile(p){
 ctx.save();ctx.translate(p.x,p.y);ctx.rotate(Math.atan2(p.vy,p.vx));ctx.scale(2,2);
 if(p.type==="hopebounce"){ctx.shadowBlur=22;ctx.shadowColor="#45ff4c";ctx.fillStyle="#5dff4e";ctx.fillRect(-18,-4,36,8);ctx.fillStyle="#e5ffe0";ctx.fillRect(-15,-1,30,2);}
 else if(p.type==="poisonray"){
  ctx.shadowBlur=24;ctx.shadowColor="#65ff42";ctx.fillStyle="#7dff48";
  ctx.fillRect(-18,-4,36,8);ctx.fillStyle="#e5ffd1";ctx.fillRect(-15,-1,30,2);
 }else if(p.type==="it"){ctx.shadowBlur=22;ctx.shadowColor="#ff315e";ctx.fillStyle="#ff466d";ctx.beginPath();ctx.arc(0,0,7,0,Math.PI*2);ctx.fill();ctx.strokeStyle="#ffb5c5";ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,12,0,Math.PI*2);ctx.stroke();}
 else if(p.type==="yellowwater"||p.type==="bluewater"){ctx.shadowBlur=17;ctx.shadowColor=p.color;ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(0,0,6,0,Math.PI*2);ctx.fill();ctx.fillStyle="#ffffffaa";ctx.beginPath();ctx.arc(-2,-2,2,0,Math.PI*2);ctx.fill();}
 else if(p.type==="arrow"){
  ctx.strokeStyle="#fff0bb";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-9,0);ctx.lineTo(8,0);ctx.stroke();
  polygon([[8,0],[1,-4],[1,4]],"#fff0bb");
 }else{
  ctx.shadowBlur=16;ctx.shadowColor=p.color;ctx.fillStyle=p.color;
  ctx.beginPath();ctx.ellipse(0,0,p.type==="sunbeam"?12:7,3,0,0,Math.PI*2);ctx.fill();
 }
 ctx.restore();
}
function clampOrbToArena(o){
  const w=canvas.width,h=canvas.height,pad=o.r+3;
  const minX=pad,maxX=w-pad,minY=pad,maxY=h-pad;
  if(!Number.isFinite(o.x)||!Number.isFinite(o.y)){
   o.x=o.side?w-pad:pad;o.y=h/2;
   const a=Math.random()*Math.PI*2;
   o.vx=Math.cos(a)*1.2;o.vy=Math.sin(a)*1.2;
  }
  // Bat tuong phan xa ro rang: khong de qua cau dung/luot doc canh san.
  if(o.x<=minX){
   o.x=minX;
   if(o.vx<=0){o.vx=Math.max(.85,Math.abs(o.vx));o.vy+=(Math.random()-.5)*.18;}
  }else if(o.x>=maxX){
   o.x=maxX;
   if(o.vx>=0){o.vx=-Math.max(.85,Math.abs(o.vx));o.vy+=(Math.random()-.5)*.18;}
  }
  if(o.y<=minY){
   o.y=minY;
   if(o.vy<=0){o.vy=Math.max(.85,Math.abs(o.vy));o.vx+=(Math.random()-.5)*.18;}
  }else if(o.y>=maxY){
   o.y=maxY;
   if(o.vy>=0){o.vy=-Math.max(.85,Math.abs(o.vy));o.vx+=(Math.random()-.5)*.18;}
  }
  o.x=Math.max(minX,Math.min(maxX,o.x));
  o.y=Math.max(minY,Math.min(maxY,o.y));
}
function moveOrb(o,dt){
  o.weaponAngle+=dt*(skins[o.skin].weapon==="dagger"?4.2:skins[o.skin].weapon==="sword"?3.2:2.7)*(o.weaponSpin||1);
  o.weaponCooldown-=dt;o.hitCooldown-=dt;o.shieldCooldown-=dt;o.weaponClashCooldown=Math.max(0,(o.weaponClashCooldown||0)-dt);o.flash=Math.max(0,o.flash-dt*3);
  if((o.webbedTimer||0)>0){
   o.webbedTimer=Math.max(0,o.webbedTimer-dt);
   return;
  }
  // Huong di chuyen doi ngau nhien theo tung khoang thoi gian; khong hut ve doi thu.
  o.turnTimer-=dt;
  if(o.turnTimer<=0){
   const angle=Math.atan2(o.vy,o.vx)+(Math.random()-.5)*1.25;
   const speed=1.0+Math.random()*.55;
   o.vx=Math.cos(angle)*speed;o.vy=Math.sin(angle)*speed;
   o.turnTimer=.65+Math.random()*1.25;
  }
  const speedBonus=o.ability===13?1.18:1;
  if(o.ability===22){o.regenTimer-=dt;if(o.regenTimer<=0){if(o===player)playerHP=Math.min(skins[player.skin].maxHP,playerHP+1);else enemyHP=Math.min(skins[enemy.skin].maxHP,enemyHP+1);o.regenTimer=1.2;}}
  o.x+=o.vx*dt*90*speedBonus*(o.slowTimer>0?.55:1);o.y+=o.vy*dt*90*speedBonus*(o.slowTimer>0?.55:1);
  clampOrbToArena(o);
  const speed=Math.hypot(o.vx,o.vy);
  if(speed>1.8){o.vx=o.vx/speed*1.8;o.vy=o.vy/speed*1.8;}
  if(speed<.55){
   const angle=Math.random()*Math.PI*2;
   o.vx=Math.cos(angle)*.9;o.vy=Math.sin(angle)*.9;
  }
 }
function separateOrbs(){
 if((player&&player.biteTarget===enemy)||(enemy&&enemy.biteTarget===player)){
  clampOrbToArena(player);clampOrbToArena(enemy);return;
 }
  const dx=enemy.x-player.x,dy=enemy.y-player.y,d=Math.hypot(dx,dy)||1,min=player.r+enemy.r;
  if(d<min){
   const nx=dx/d,ny=dy/d,overlap=(min-d)/2+1;
   player.x-=nx*overlap;player.y-=ny*overlap;
   enemy.x+=nx*overlap;enemy.y+=ny*overlap;
   // Bat lai theo huong va cham, chi tao xung luc khi hai qua cau dang tien lai gan.
   const relativeNormal=(enemy.vx-player.vx)*nx+(enemy.vy-player.vy)*ny;
   if(relativeNormal<0){
    const impulse=-(1+0.72)*relativeNormal/2;
    player.vx-=impulse*nx;player.vy-=impulse*ny;
    enemy.vx+=impulse*nx;enemy.vy+=impulse*ny;
    const tangentJitter=(Math.random()-.5)*.45;
    player.vx+=-ny*tangentJitter;player.vy+=nx*tangentJitter;
    enemy.vx+=ny*tangentJitter;enemy.vy-=nx*tangentJitter;
   }
  }
  clampOrbToArena(player);clampOrbToArena(enemy);
 }
function fireIfNeeded(o,target){
 const s=skins[o.skin],type=s.weapon;
 // Chi CUNG va TRUONG duoc phep phong dan; cac vu khi khac chi danh/xoay/quay phong thu.
 if(!["bow","staff","gun","sunbeam","yellowwater","bluewater","it","poisonray"].includes(type))return;
 let cooldown=type==="poisonray"?1.15:type==="gun"?0.85:type==="sunbeam"?0.95:type==="yellowwater"?1.05:type==="bluewater"?1.15:type==="it"?1.25:abilities[o.ability].cooldown*(type==="bow"?1.15:1.3);
 if(o.weaponCooldown>0)return;
 o.weaponCooldown=cooldown;
 const dx=target.x-o.x,dy=target.y-o.y,d=Math.hypot(dx,dy)||1;
 projectiles.push({
  x:o.x+dx/d*(type==="poisonray"?0:o.r+8),y:o.y+dy/d*(type==="poisonray"?0:o.r+8),
  vx:dx/d*(type==="poisonray"?7.4:type==="bow"?7.5:type==="gun"?8.2:6.1),
  vy:dy/d*(type==="poisonray"?7.4:type==="bow"?7.5:type==="gun"?8.2:6.1),
  r:type==="it"?16:type==="poisonray"?9:12,life:2.1,owner:o,
  type:type==="bow"?"arrow":(s.projectile||"magic"),
  damage:s.rank==="S"?s.baseDamage:Math.max(3,Math.round(s.baseDamage+abilities[o.ability].damage*.2)),color:s.weaponInfo.color
 });
 addLog(o===player?"player":"enemy",s.name+" phóng "+(s.rank==="S"?s.weaponInfo.name:(type==="bow"?"mũi tên":"đạn phép"))+" · "+s.baseDamage+" DMG!");
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
 if(target.ability===9||target.ability===24)damage=Math.max(1,Math.round(damage*.78));
 if(target.ability===24)damage=Math.max(1,Math.round(damage*.82));
 if(target.ability===25&&target.spiritCooldown<=0&&Math.random()<.18){target.spiritCooldown=3;target.flash=.5;burst(target.x,target.y,"#d9fff7",12);addLog(isPlayerTarget?"player":"enemy","✧ Linh hồn né đòn!");return;}
 if(isPlayerTarget)playerHP=Math.max(0,playerHP-damage);
 else enemyHP=Math.max(0,enemyHP-damage);
 if(attacker.ability===0||attacker.ability===17){
  if(attacker===player)playerHP=Math.min(skins[player.skin].maxHP,playerHP+damage*.25);
  else enemyHP=Math.min(skins[enemy.skin].maxHP,enemyHP+damage*.25);
  addLog(attacker===player?"player":"enemy","♥ Hút máu hồi HP!");
 }
 if(attacker.ability===16)target.poisonTimer=2.4;
 if(attacker.ability===18)target.slowTimer=1.8;
 if(attacker.ability===19)target.burnTimer=2.4;
 if(attacker.ability===20){if(isPlayerTarget)enemyHP=Math.max(0,enemyHP-6);else playerHP=Math.max(0,playerHP-6);burst(target.x,target.y,"#ffbd72",14);}
 if(attacker.ability===21)damage=Math.round(damage*1.18);
 if(attacker.ability===23)burst(target.x,target.y,"#fff27a",12);
 if(attacker.ability===26||attacker.skin===1||attacker.skin===115)spiderWebs.push({x:target.x,y:target.y,r:27,hits:0,maxHits:2,lockout:.9,life:15,owner:attacker});
 burst(target.x,target.y,type==="sunbeam"?"#ffe57a":type==="arrow"?"#e9f2ff":"#ffffff",10);
 addLog(attacker===player?"player":"enemy",skins[attacker.skin].name+" đánh trúng thân quả cầu, gây "+damage+" sát thương!");
 updateUI();
 if(playerHP<=0||enemyHP<=0){
  ended=true;playing=false;
  addLog("system",enemyHP<=0?"🏆 BẠN CHIẾN THẮNG ROUND "+round+"!":"💥 BẠN ĐÃ THUA ROUND "+round+"!");
  updateUI();
 }
}
function updateAbilityEffects(dt){for(const t of [player,enemy]){if(!t)continue;t.spiritCooldown=Math.max(0,(t.spiritCooldown||0)-dt);for(const k of ["poisonTimer","burnTimer"]){if(t[k]>0){t[k]-=dt;t[k+"_tick"]=(t[k+"_tick"]||0)-dt;if(t[k+"_tick"]<=0){if(t===player)playerHP=Math.max(0,playerHP-2);else enemyHP=Math.max(0,enemyHP-2);t[k+"_tick"]=.6;burst(t.x,t.y,k==="poisonTimer"?"#75e64c":"#ff8b30",3);}}}t.slowTimer=Math.max(0,(t.slowTimer||0)-dt);if(t.ability===22){t.regenTimer-=dt;if(t.regenTimer<=0){if(t===player)playerHP=Math.min(skins[player.skin].maxHP,playerHP+1);else enemyHP=Math.min(skins[enemy.skin].maxHP,enemyHP+1);t.regenTimer=1.2;}}}}
function updateVampireBites(dt){
 for(const attacker of [player,enemy]){
  const target=attacker===player?enemy:player;
  attacker.biteCooldown=Math.max(0,(attacker.biteCooldown||0)-dt);
  if(attacker.skin!==106)continue;
  if(attacker.biteTarget){
   if(attacker.biteTarget!==target||attacker.biteTimer<=0){attacker.biteTarget=null;continue;}
   attacker.biteTimer-=dt;
   attacker.x=target.x+attacker.biteDirX*(target.r+attacker.r-7);
   attacker.y=target.y+attacker.biteDirY*(target.r+attacker.r-7);
   attacker.vx=target.vx;attacker.vy=target.vy;
   if(attacker.biteTimer<=0){
    attacker.biteTarget=null;attacker.biteCooldown=2.1;
    addLog(attacker===player?"player":"enemy","🧛 Ma Cà Rồng nhả đối thủ!");
   }
   continue;
  }
  if(attacker.biteCooldown>0)continue;
  const dx=attacker.x-target.x,dy=attacker.y-target.y,d=Math.hypot(dx,dy)||1;
  if(d<=attacker.r+target.r+16){
   attacker.biteTarget=target;attacker.biteTimer=.8;
   attacker.biteDirX=dx/d;attacker.biteDirY=dy/d;
   if(target===player)playerHP=Math.max(0,playerHP-10);else enemyHP=Math.max(0,enemyHP-10);
   if(attacker===player)playerHP=Math.min(skins[player.skin].maxHP,playerHP+10);
   else enemyHP=Math.min(skins[enemy.skin].maxHP,enemyHP+10);
   burst(target.x,target.y,"#ff5278",12);
   addLog(attacker===player?"player":"enemy","🧛 Cắn dính mục tiêu, hút 10 HP rồi chuẩn bị nhả!");
   updateUI();
   if(playerHP<=0||enemyHP<=0){
    ended=true;playing=false;
    addLog("system",enemyHP<=0?"🏆 BẠN CHIẾN THẮNG ROUND "+round+"!":"💥 BẠN ĐÃ THUA ROUND "+round+"!");
    updateUI();
   }
  }
 }
}
function pointSegmentDistance(px,py,x1,y1,x2,y2){
 const dx=x2-x1,dy=y2-y1,len2=dx*dx+dy*dy;
 const t=len2?Math.max(0,Math.min(1,((px-x1)*dx+(py-y1)*dy)/len2)):0;
 const cx=x1+t*dx,cy=y1+t*dy;
 return Math.hypot(px-cx,py-cy);
}
function getWeaponSegment(o){
 const type=skins[o.skin].weapon;
 if(o.basicNPC||["bow","gun","staff","sun","sunbeam","shield","yellowwater","bluewater","it","fangs","poisonray","web","hopebolt","firebolt","icebolt","lightning","windshot","shadowbolt","waterbolt","arcanebolt","petalshot","ghostshot","sandshot","lightshot","poisonmist","prismshot","meteor",""].includes(type))return null;
 const a=o.weaponAngle;
 return {
  x1:o.x+Math.cos(a)*(o.r+4),
  y1:o.y+Math.sin(a)*(o.r+4),
  x2:o.x+Math.cos(a)*(o.r+67),
  y2:o.y+Math.sin(a)*(o.r+67)
 };
}
function segmentSegmentDistance(a,b){
 const cross=(x1,y1,x2,y2)=>(x1*y2-y1*x2);
 const ax=a.x2-a.x1,ay=a.y2-a.y1,bx=b.x2-b.x1,by=b.y2-b.y1;
 const den=cross(ax,ay,bx,by);
 if(Math.abs(den)>1e-8){
  const dx=b.x1-a.x1,dy=b.y1-a.y1;
  const t=cross(dx,dy,bx,by)/den,u=cross(dx,dy,ax,ay)/den;
  if(t>=0&&t<=1&&u>=0&&u<=1)return 0;
 }
 return Math.min(
  pointSegmentDistance(a.x1,a.y1,b.x1,b.y1,b.x2,b.y2),
  pointSegmentDistance(a.x2,a.y2,b.x1,b.y1,b.x2,b.y2),
  pointSegmentDistance(b.x1,b.y1,a.x1,a.y1,a.x2,a.y2),
  pointSegmentDistance(b.x2,b.y2,a.x1,a.y1,a.x2,a.y2)
 );
}
function checkWeaponClashes(){
 if(!player||!enemy||enemy.basicNPC)return;
 if((player.weaponClashCooldown||0)>0||(enemy.weaponClashCooldown||0)>0)return;
 const a=getWeaponSegment(player),b=getWeaponSegment(enemy);
 if(!a||!b)return;
 if(segmentSegmentDistance(a,b)<13){
  // Weapon clash is visual only; spin reverses only after a damaging hit.
  player.weaponClashCooldown=.42;
  enemy.weaponClashCooldown=.42;
  player.weaponAngle+=.12*(player.weaponSpin||1);
  enemy.weaponAngle+=.12*(enemy.weaponSpin||1);
  const mx=(a.x2+b.x2)/2,my=(a.y2+b.y2)/2;
  burst(mx,my,"#dcecff",8);
  addLog("system","⚔ Hai vũ khí va chạm và bật ngược chiều quay!");
 }
}
function weaponBlocksProjectile(defender,p){
 const type=skins[defender.skin].weapon;
 // Shield type: check the physical shield face placed toward the attacker.
 if(type==="shield"||defender.skin===25){
  const attacker=p.owner;
  const angle=Math.atan2(attacker.y-defender.y,attacker.x-defender.x);
  const sx=defender.x+Math.cos(angle)*(defender.r+8);
  const sy=defender.y+Math.sin(angle)*(defender.r+8);
  return Math.hypot(p.x-sx,p.y-sy)<p.r+25;
 }
 // These skins use a beam/orb effect rather than a visible hand-held weapon.
 if(["bow","gun","staff","sun","sunbeam","yellowwater","bluewater","it","poisonray","hopebolt","firebolt","icebolt","lightning","windshot","shadowbolt","waterbolt","arcanebolt","petalshot","ghostshot","sandshot","lightshot","poisonmist","prismshot","meteor"].includes(type))return false;
 // Use the same active segment that collides with the opponent's weapon.
 const segment=getWeaponSegment(defender);
 if(!segment)return false;
 return pointSegmentDistance(p.x,p.y,segment.x1,segment.y1,segment.x2,segment.y2)<p.r+12;
}
function updateProjectiles(dt){
 for(let i=projectiles.length-1;i>=0;i--){
  const p=projectiles[i];p.x+=p.vx*dt*60;p.y+=p.vy*dt*60;p.life-=dt;
  if(p.type==="hopebounce"&&p.bounces===0&&p.y>=H-p.r-1){p.y=H-p.r-1;p.vy=-Math.abs(p.vy);p.bounces=1;burst(p.x,p.y,"#65ff58",8);}
  const target=p.owner===player?enemy:player;
  // The defender's rotating weapon or shield can intercept an incoming projectile.
  if(weaponBlocksProjectile(target,p)){
   burst(p.x,p.y,"#dff6ff",7);
   addLog(target===player?"player":"enemy",(target===player?"Bạn":"Địch")+" dùng vũ khí chặn đạn!");
   projectiles.splice(i,1);continue;
  }
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
  if(["sun","sunbeam","yellowwater","bluewater","it","gun","bow","staff","shield","fangs","poisonray","web"].includes(type))continue;
  const target=attacker===player?enemy:player;
  const radius=attacker.r+24;
  const wx=attacker.x+Math.cos(attacker.weaponAngle)*radius;
  const wy=attacker.y+Math.sin(attacker.weaponAngle)*radius;
  if(Math.hypot(wx-target.x,wy-target.y)<target.r+9){
   hitOrb(target,attacker,Math.round(skins[attacker.skin].baseDamage+abilities[attacker.ability].damage*.2),"orbit");
  }
 }
}
function updateSpiderTraps(dt){
 // Each active spider lays one web every five seconds near the opponent's path.
 for(const spider of [player,enemy]){
  if(!spider||(spider.ability!==26&&spider.skin!==1&&spider.skin!==115))continue;
  spider.webShotTimer=(spider.webShotTimer??5)-dt;
  if(spider.webShotTimer<=0){
   const target=spider===player?enemy:player;
   const angle=Math.random()*Math.PI*2,dist=75+Math.random()*95;
   const x=Math.max(42,Math.min(W-42,target.x+Math.cos(angle)*dist));
   const y=Math.max(42,Math.min(H-42,target.y+Math.sin(angle)*dist));
   spiderWebs.push({x,y,r:27,hits:0,maxHits:2,lockout:0,life:15,owner:spider});
   if(spiderWebs.length>8)spiderWebs.shift();
   spider.webShotTimer=5;
   burst(x,y,"#d9f5b4",6);
   addLog(spider===player?"player":"enemy","🕸 Nhện giăng một tấm tơ trên sàn đấu!");
  }
 }
 for(let i=spiderWebs.length-1;i>=0;i--){
  const web=spiderWebs[i];
  web.life-=dt;web.lockout=Math.max(0,web.lockout-dt);
  if(web.life<=0||web.hits>=web.maxHits){spiderWebs.splice(i,1);continue;}
  if(web.lockout>0)continue;
  for(const orb of [player,enemy]){
   if(!orb||orb===web.owner||(orb.webbedTimer||0)>0)continue;
   if(Math.hypot(orb.x-web.x,orb.y-web.y)<=orb.r+web.r*.55){
    web.hits++;web.lockout=.9;orb.webbedTimer=.7;
    if(orb===player)playerHP=Math.max(0,playerHP-5);else enemyHP=Math.max(0,enemyHP-5);
    burst(web.x,web.y,"#d9f5b4",10);
    addLog(orb===player?"player":"enemy","🕸 Dính tơ nhện! Mất 5 HP và bị giữ chân.");
    if(web.hits>=web.maxHits){
     addLog("system","Tấm tơ nhện đã đứt sau 2 lần bẫy!");
     spiderWebs.splice(i,1);
    }
    updateUI();
    if(playerHP<=0||enemyHP<=0){
     ended=true;playing=false;
     addLog("system",enemyHP<=0?"🏆 BẠN CHIẾN THẮNG ROUND "+round+"!":"💥 BẠN ĐÃ THUA ROUND "+round+"!");
     updateUI();
    }
    break;
   }
  }
 }
}
function drawSpiderWebs(){
 for(const web of spiderWebs){
  ctx.save();
  ctx.globalAlpha=Math.min(1,web.life/2)*.9;
  ctx.strokeStyle="#d9f5b4";ctx.lineWidth=2;
  ctx.shadowBlur=9;ctx.shadowColor="#b9ec85";
  for(let k=0;k<8;k++){
   const a=k*Math.PI/4;
   ctx.beginPath();ctx.moveTo(web.x,web.y);
   ctx.lineTo(web.x+Math.cos(a)*web.r,web.y+Math.sin(a)*web.r);ctx.stroke();
  }
  for(const radius of [9,18,27]){
   ctx.beginPath();ctx.arc(web.x,web.y,radius,0,Math.PI*2);ctx.stroke();
  }
  ctx.shadowBlur=0;ctx.fillStyle="#f2ffd9";ctx.font="bold 10px Arial";ctx.textAlign="center";
  ctx.fillText((web.maxHits-web.hits)+" lần",web.x,web.y+web.r+13);
  ctx.restore();
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
  moveOrb(player,dt);moveOrb(enemy,dt);separateOrbs();updateVampireBites(dt);updateSpiderTraps(dt);updateAbilityEffects(dt);checkWeaponClashes();
  // Lop bao ve cuoi cung truoc khi ve frame: khong qua cau nao duoc nam ngoai san.
  clampOrbToArena(player);clampOrbToArena(enemy);
  fireIfNeeded(player,enemy);fireIfNeeded(enemy,player);
  updateProjectiles(dt);checkOrbitWeaponHits();
 }
 updateParticles(dt);
 drawSpiderWebs();projectiles.forEach(drawProjectile);drawParticles();
 drawOrb(player);drawOrb(enemy);
 drawOrbHP(player);drawOrbHP(enemy);
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