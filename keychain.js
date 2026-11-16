import * as T from './three.module.js';
const canvas=document.querySelector('#keychain'),stage=document.querySelector('#stage');
try{
const renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor(0x000000,0);renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.35;renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
const scene=new T.Scene(),camera=new T.PerspectiveCamera(32,1,.1,100);camera.position.set(0,0,16);const rig=new T.Group();scene.add(rig);
// Large studio softboxes are reflected in the polished steel and acrylic.
const envScene=new T.Scene();envScene.background=new T.Color('#c8c5d3');function softbox(x,y,z,w,h,power){const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({color:new T.Color(power,power,power)}));m.position.set(x,y,z);m.lookAt(0,0,0);envScene.add(m)}softbox(-4,3,5,3,8,5);softbox(4,2,3,2,7,4);softbox(0,6,-2,8,3,5);softbox(-3,-4,-2,5,3,2);const pmrem=new T.PMREMGenerator(renderer);scene.environment=pmrem.fromScene(envScene,.05).texture;
scene.add(new T.HemisphereLight(0xfff4ff,0xa9a7c6,2));const light=new T.DirectionalLight(0xfff9ee,4);light.position.set(-4,7,6);light.castShadow=true;light.shadow.mapSize.set(2048,2048);light.shadow.camera.left=-6;light.shadow.camera.right=6;light.shadow.camera.top=7;light.shadow.camera.bottom=-7;light.shadow.bias=-.001;scene.add(light);const fill=new T.DirectionalLight(0xd6dfff,2);fill.position.set(5,2,4);scene.add(fill);
const metal=new T.MeshStandardMaterial({color:0xe1e6ee,metalness:1,roughness:.15,envMapIntensity:1.6});const darkMetal=new T.MeshStandardMaterial({color:0x8a91a1,metalness:1,roughness:.22});
function tube(points,r,material,parent=rig){const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)));const m=new T.Mesh(new T.TubeGeometry(curve,80,r,12,false),material);parent.add(m);m.castShadow=true;return m}
function rounded(w,h,r){const s=new T.Shape();s.moveTo(-w/2+r,-h/2);s.lineTo(w/2-r,-h/2);s.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);s.lineTo(w/2,h/2-r);s.quadraticCurveTo(w/2,h/2,w/2-r,h/2);s.lineTo(-w/2+r,h/2);s.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);s.lineTo(-w/2,-h/2+r);s.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);return s}
function extrusion(shape,depth,material){const g=new T.ExtrudeGeometry(shape,{depth,bevelEnabled:true,bevelThickness:.035,bevelSize:.035,bevelSegments:4,steps:1,curveSegments:24});g.translate(0,0,-depth/2);const m=new T.Mesh(g,material);m.castShadow=true;m.receiveShadow=true;return m}
// Machined snap hook, hinge, and split ring.
tube([[-.32,2.5,0],[-.32,3.2,0],[-.28,3.55,0],[0,3.72,0],[.28,3.55,0],[.32,3.2,0],[.32,2.5,0]],.065,metal);
const clasp=extrusion(rounded(.82,.38,.06),.18,metal);clasp.position.y=2.54;rig.add(clasp);const hinge=new T.Mesh(new T.CylinderGeometry(.065,.065,.04,32),darkMetal);hinge.rotation.x=Math.PI/2;hinge.position.set(-.26,2.54,.14);rig.add(hinge);const connector=extrusion(rounded(.32,.3,.04),.12,metal);connector.position.y=2.26;rig.add(connector);
for(let i=0;i<2;i++){const ring=new T.Mesh(new T.TorusGeometry(.35,.045,16,100),metal);ring.position.set(0,1.97,i*.065);ring.rotation.x=.13;rig.add(ring)}
const all=[],tags=[];function printTexture(kind){const c=document.createElement('canvas');c.width=512;c.height=1024;const x=c.getContext('2d');x.clearRect(0,0,512,1024);x.fillStyle='#454157';x.font='22px monospace';x.fillText('RYANNA JELKS / '+kind.num,45,150);x.fillRect(45,180,422,2);x.save();x.translate(0,0);x.font='92px Georgia';let y=315;kind.words.forEach(word=>{x.font='92px Georgia';const width=x.measureText(word).width;if(width>430)x.font=`${Math.floor(92*430/width)}px Georgia`;x.fillText(word,40,y);y+=95});x.restore();x.font='24px monospace';x.fillText(kind.footer,42,910);x.fillText('↗',425,910);x.strokeStyle='#ffffffa0';x.lineWidth=2;x.strokeRect(22,85,468,875);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t}
function tag(id,color,x,angle,z,words,num,footer){const group=new T.Group();group.position.set(x,1.7,z);rig.add(group);const w=1.1,h=2.9,shape=rounded(w,h,.14);const hole=new T.Path();hole.absarc(0,h/2-.18,.072,0,Math.PI*2,true);shape.holes.push(hole);const material=new T.MeshPhysicalMaterial({color,metalness:.03,roughness:.1,transmission:.5,thickness:.23,ior:1.46,transparent:true,opacity:1,clearcoat:1,clearcoatRoughness:.07,envMapIntensity:1.3,side:T.DoubleSide});const body=extrusion(shape,.15,material);body.position.y=-1.88;body.userData.id=id;group.add(body);all.push(body);
const tex=printTexture({words,num,footer});const ink=new T.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false,side:T.DoubleSide,polygonOffset:true,polygonOffsetFactor:-1});const face=new T.Mesh(new T.PlaneGeometry(1.02,2.75),ink);face.position.set(0,-1.88,.12);face.userData.id=id;group.add(face);all.push(face);const reverse=new T.Mesh(face.geometry,ink);reverse.position.set(0,-1.88,-.12);reverse.rotation.y=Math.PI;reverse.userData.id=id;group.add(reverse);all.push(reverse);
const jump=new T.Mesh(new T.TorusGeometry(.13,.025,12,40),metal);jump.scale.y=2.1;jump.position.set(0,-.28,0);group.add(jump);group.rotation.z=angle;tags.push({id,material,group,angle,phase:tags.length*1.3});return group}
tag('unity','#d6c8f2',.06,.38,-.22,['unity','hub.'],'03','HUMAN-CENTERED');tag('meta','#ffc9d9',-.04,.05,-.02,['where','plans go','to die?'],'02','META CHALLENGE');tag('twitch','#b5dafa',-.12,-.39,.23,['community','climb.'],'01','TWITCH WINNER');
// Solid enamel flower charm, attached by a separate steel jump ring.
const flowerGroup=new T.Group();flowerGroup.position.set(.25,1.65,-.12);flowerGroup.rotation.z=.65;rig.add(flowerGroup);const fshape=new T.Shape(),radii=[];for(let i=0;i<=240;i++){const a=i/240*Math.PI*2,r=.65+.17*Math.cos(a*5);const x=Math.cos(a)*r,y=Math.sin(a)*r;if(i===0)fshape.moveTo(x,y);else fshape.lineTo(x,y)}fshape.closePath();const enamel=new T.MeshPhysicalMaterial({color:'#f8df93',roughness:.23,metalness:.05,clearcoat:1,clearcoatRoughness:.12});const flower=extrusion(fshape,.13,enamel);flower.position.set(0,-1.22,0);flower.userData.id='unity';flowerGroup.add(flower);all.push(flower);tube([[0,0,0],[.04,-.3,0],[0,-.48,0]],.025,metal,flowerGroup);const center=new T.Mesh(new T.SphereGeometry(.21,32,24),new T.MeshPhysicalMaterial({color:'#fff4cf',roughness:.3,clearcoat:1}));center.scale.z=.28;center.position.set(0,-1.22,.12);flowerGroup.add(center);
const floor=new T.Mesh(new T.PlaneGeometry(200,200),new T.ShadowMaterial({opacity:.12}));floor.rotation.x=-Math.PI/2;floor.position.y=-3.3;floor.receiveShadow=true;scene.add(floor);
let W=0,H=0;function resize(){W=stage.clientWidth;H=stage.clientHeight;renderer.setSize(W,H,false);camera.aspect=W/H;camera.updateProjectionMatrix();if(W<600){camera.position.z=18;camera.position.y=.25;rig.position.set(0,-1.2,0);rig.scale.setScalar(.95)}else if(W<900){camera.position.z=17;rig.position.set(.5,-.3,0);rig.scale.setScalar(1.02)}else{camera.position.z=16;rig.position.set(.8,0,0);rig.scale.setScalar(1.05)}}new ResizeObserver(resize).observe(stage);resize();
const ray=new T.Raycaster(),mouse=new T.Vector2();
const projectNames={twitch:'Community Climb',meta:'Where Plans Go to Die?',unity:'Unity Hub'};
const projectIds=['twitch','meta','unity'];
let selected='twitch',hovered=null,down=false,moved=false,pointerId=null,pressedProject=null;
let lastX=0,lastY=0,startX=0,startY=0,rotY=-.17,rotX=.05;
function highlight(id){
  hovered=id;
  tags.forEach(tag=>{tag.material.emissive.set(id===tag.id?'#b79bdf':'#000000');tag.material.emissiveIntensity=id===tag.id?.25:0});
  canvas.style.cursor=id?'pointer':'grab';
  if(id){selected=id;canvas.setAttribute('aria-label','Open '+projectNames[id]+' project. Use left and right arrow keys to choose, then Enter to open. Drag to rotate.')}
}
function pick(event){
  const bounds=canvas.getBoundingClientRect();if(!bounds.width||!bounds.height)return null;
  mouse.set((event.clientX-bounds.left)/bounds.width*2-1,-(event.clientY-bounds.top)/bounds.height*2+1);
  scene.updateMatrixWorld(true);camera.updateMatrixWorld(true);ray.setFromCamera(mouse,camera);
  return ray.intersectObjects(all,false)[0]?.object.userData.id||null;
}
canvas.addEventListener('pointerdown',event=>{
  if(!event.isPrimary||event.button!==0)return;
  down=true;moved=false;pointerId=event.pointerId;pressedProject=pick(event);
  lastX=startX=event.clientX;lastY=startY=event.clientY;
  canvas.setPointerCapture(event.pointerId);canvas.style.cursor='grabbing';
});
canvas.addEventListener('pointermove',event=>{
  if(down&&event.pointerId===pointerId){
    if(Math.hypot(event.clientX-startX,event.clientY-startY)>8)moved=true;
    rotY+=(event.clientX-lastX)*.008;
    rotX=Math.max(-.45,Math.min(.45,rotX+(event.clientY-lastY)*.004));
    lastX=event.clientX;lastY=event.clientY;
    if(moved)highlight(null);
    canvas.style.cursor='grabbing';
  }else if(!down&&event.pointerType!=='touch'){highlight(pick(event))}
});
canvas.addEventListener('pointerup',event=>{
  if(!down||event.pointerId!==pointerId)return;
  const id=pick(event),shouldOpen=!moved&&id&&id===pressedProject;
  down=false;pointerId=null;pressedProject=null;
  if(canvas.hasPointerCapture(event.pointerId))canvas.releasePointerCapture(event.pointerId);
  highlight(id);
  if(shouldOpen){canvas.focus({preventScroll:true});window.openPortfolioProject?.(id,canvas)}
});
function cancelDrag(){down=false;pointerId=null;pressedProject=null;highlight(null)}
canvas.addEventListener('pointercancel',cancelDrag);
canvas.addEventListener('lostpointercapture',()=>{if(down)cancelDrag()});
canvas.addEventListener('pointerleave',()=>{if(!down)highlight(null)});
canvas.addEventListener('focus',()=>highlight(selected));
canvas.addEventListener('blur',()=>{if(!down)highlight(null)});
canvas.addEventListener('keydown',event=>{
  if(event.key==='ArrowLeft'||event.key==='ArrowRight'){
    event.preventDefault();const step=event.key==='ArrowRight'?1:-1;
    highlight(projectIds[(projectIds.indexOf(selected)+step+projectIds.length)%projectIds.length]);
  }else if(event.key==='Enter'||event.key===' '){
    event.preventDefault();window.openPortfolioProject?.(selected,canvas);
  }
});
canvas.style.cursor='grab';
let last=0;function animate(t){requestAnimationFrame(animate);if(t-last<30)return;last=t;const paused=document.body.classList.contains('paused');rig.rotation.y=rotY+(!paused&&!down?Math.sin(t*.00048)*.15:0);rig.rotation.x=rotX;rig.rotation.z=!paused&&!down?Math.sin(t*.0006)*.015:0;tags.forEach(({group,angle,phase})=>{group.rotation.z=angle+(!paused&&!down?Math.sin(t*.0009+phase)*.025:0);group.rotation.y=!paused?Math.sin(t*.0007+phase)*.06:0});flowerGroup.rotation.z=.65+(!paused?Math.sin(t*.0008)*.035:0);renderer.render(scene,camera)}requestAnimationFrame(animate);document.querySelector("#fallback").hidden=true;
}catch(error){document.querySelector('#fallback').hidden=false;canvas.hidden=true;console.error('3D scene unavailable:',error)}
