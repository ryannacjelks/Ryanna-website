const toggle=document.querySelector('#motion');let paused=matchMedia('(prefers-reduced-motion: reduce)').matches;function motionUI(){toggle.setAttribute('aria-pressed',String(paused));toggle.textContent=paused?'Play motion ▷':'Pause motion Ⅱ';toggle.setAttribute('aria-label',paused?'Play motion':'Pause motion');document.body.classList.toggle('paused',paused)}motionUI();toggle.onclick=()=>{paused=!paused;motionUI()};
const data={"twitch":{"n":"01 / TWITCH DESIGN CHALLENGE · SEPT—OCT 2026","title":"Community Climb","intro":"Reimagining the mobile Hype Train experience.","body":"UX/UI Design Team Member · Won the Twitch Design Challenge as part of a four-person team.","list":["Identified UX gaps in the mobile Hype Train experience.","Developed a Figma prototype featuring streamer challenges, community-created rewards, and scheduled events."],"note":"Design challenge project. Portfolio artwork is a concept illustration; original prototype screens are not displayed.","resourcesHtml":"<div class=\"hero-actions\"><a class=\"hero-action secondary\" href=\"P2T5_Twitch.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">View presentation (PDF) ↗</a><a class=\"hero-action secondary\" href=\"https://www.figma.com/design/7Qe9ejnNKz1l40ceNkne9L/Community-Climb-%E2%80%93-Mobile?node-id=109-1117\" target=\"_blank\" rel=\"noopener noreferrer\">View in Figma ↗</a></div>"},"meta":{"n":"02 / META DESIGN CHALLENGE · AUG—SEPT 2026","title":"Where Plans Go to Die?","intro":"Helping group plans become shared experiences.","body":"Project Facilitator, Interview Team Member · Collaborated with a four-person team to explore group event planning and communication.","list":["Conducted user interviews and competitive analysis to identify barriers in group event planning and communication.","Designed a Figma prototype integrating event planning into messaging apps to encourage individual RSVPs."],"note":"Design challenge project. Portfolio artwork is a concept illustration; original prototype screens are not displayed.","resourcesHtml":"<div class=\"hero-actions\"><a class=\"hero-action secondary\" href=\"P1T5_Meta.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">View presentation (PDF) ↗</a><a class=\"hero-action secondary\" href=\"https://www.figma.com/design/QZKko7KMSvq2iVDj4BPtyV/P1T5_Figma?node-id=0-1\" target=\"_blank\" rel=\"noopener noreferrer\">View in Figma ↗</a></div>"},"unity":{"n":"03 / ACADEMIC PROJECT · AUG—NOV 2024","title":"Unity Hub","intro":"A campus is better when everyone belongs.","body":"Human-Computer Interaction Design and Programming · An inclusivity-focused mobile app prototype for Indiana University’s campus.","list":["Led a four-person team, using Figma for wireframing and UX mockups.","Managed the project timeline, meeting all deliverables on schedule and improving team efficiency by 25%."],"note":"Portfolio artwork is a concept illustration; original prototype screens are not displayed.","resourcesHtml":"<div class=\"hero-actions\"><a class=\"hero-action secondary\" href=\"Thesis%20defense%20(1).pdf\" target=\"_blank\" rel=\"noopener noreferrer\">View presentation (PDF) ↗</a><a class=\"hero-action secondary\" href=\"https://www.figma.com/proto/6doU12S7g3Ypni5o19aboa/Unity-Hub-Wireframes?node-id=358-871&amp;page-id=0%3A1&amp;starting-point-node-id=358%3A871\" target=\"_blank\" rel=\"noopener noreferrer\">Try Figma prototype ↗</a></div>"},"accenture":{"n":"04 / FORAGE JOB SIMULATION · DEC 2024","title":"Accenture North America","intro":"Product Design Job Simulation (Forage)","body":"Completed a real-world product design simulation focused on a client’s platform.","list":["Added a new feature and iterated on existing design screens for a client’s platform.","Articulated design rationale and improvements made to enhance the user experience, developing clear communication skills."],"note":"A Forage learning simulation, not employment at Accenture. The illustration represents the design process, not original client screens.","resourcesHtml":""}};const dialog=document.querySelector('#detail'),content=document.querySelector('#detailcontent');let projectOpener=null;
function openProject(id,opener){
  const p=data[id];if(!p)return;
  projectOpener=opener||document.activeElement;
  content.innerHTML=`<div class="meta">${p.n}</div><h2 id="project-title">${p.title}</h2><p><strong>${p.intro}</strong></p><p>${p.body}</p><ul>${p.list.map(v=>`<li>${v}</li>`).join('')}</ul>${p.resourcesHtml || ""}<p class="disclosure">${p.note}</p>`;
  if(!dialog.open)dialog.showModal();
}
document.querySelectorAll('[data-project]').forEach(el=>el.addEventListener('click',()=>openProject(el.dataset.project,el)));
dialog.addEventListener('close',()=>{if(projectOpener?.isConnected)projectOpener.focus()});
document.querySelector('#close').onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});

window.openPortfolioProject=openProject;

/* Manual skills carousel: native touch scrolling, keyboard and button controls. */
const skillsCarousel=document.querySelector('.skills-carousel');
if(skillsCarousel){
  const track=skillsCarousel.querySelector('.skills-track');
  const slides=[...track.querySelectorAll('.skill-slide')];
  const dots=[...skillsCarousel.querySelectorAll('[data-skill-index]')];
  const status=skillsCarousel.querySelector('.skills-status');
  const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
  let active=0,frame=0;
  function updateSkills(){
    active=slides.reduce((best,slide,i)=>Math.abs(slide.offsetLeft-track.scrollLeft)<Math.abs(slides[best].offsetLeft-track.scrollLeft)?i:best,0);
    dots.forEach((dot,i)=>{if(i===active)dot.setAttribute('aria-current','true');else dot.removeAttribute('aria-current')});
    const message=String(active+1).padStart(2,'0')+' / 03 — '+slides[active].querySelector('h4').textContent;
    if(status.textContent!==message)status.textContent=message;
  }
  function showSkill(index){
    const next=(index+slides.length)%slides.length;
    track.scrollTo({left:slides[next].offsetLeft,behavior:reducedMotion.matches?'auto':'smooth'});
  }
  skillsCarousel.querySelectorAll('[data-skill-step]').forEach(button=>button.addEventListener('click',()=>showSkill(active+Number(button.dataset.skillStep))));
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>showSkill(i)));
  track.addEventListener('keydown',event=>{
    const keys={ArrowLeft:active-1,ArrowRight:active+1,Home:0,End:slides.length-1};
    if(Object.hasOwn(keys,event.key)){event.preventDefault();showSkill(keys[event.key])}
  });
  track.addEventListener('scroll',()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(updateSkills)},{passive:true});
  new ResizeObserver(()=>{track.scrollTo({left:slides[active].offsetLeft,behavior:'instant'});updateSkills()}).observe(track);
  skillsCarousel.querySelector('.skills-arrows').hidden=false;
  skillsCarousel.querySelector('.skills-dots').hidden=false;
  updateSkills();
}

/* Scroll-stacking featured folders, with a persistent tab row. */
const folderStack=document.querySelector('.folder-stack');
if(folderStack){
  const buttons=[...folderStack.querySelectorAll('[data-folder]')];
  const panels=[...folderStack.querySelectorAll('article.folder')];
  const strip=folderStack.querySelector('.folder-tabs');
  function markFolder(id){
    buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.folder===id)));
    folderStack.dataset.activeFolder=id;
  }
  panels.forEach(panel=>{panel.hidden=false});
  function sizeFolders(){
    const tabHeight=strip.getBoundingClientRect().height;
    panels.forEach(panel=>panel.style.setProperty('--folder-stick',Math.min(tabHeight,window.innerHeight-panel.offsetHeight)+'px'));
    updateFolder();
  }
  buttons.forEach(button=>button.addEventListener('click',()=>{
    const panel=document.getElementById('folder-'+button.dataset.folder);
    if(panel){
      let naturalTop=folderStack.getBoundingClientRect().top+window.scrollY;
      for(const previous of panels){if(previous===panel)break;naturalTop+=previous.offsetHeight+parseFloat(getComputedStyle(previous).marginBottom||0)}
      window.scrollTo({top:naturalTop,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    }
  }));
  let frame=0;
  function updateFolder(){
    frame=0;let current=panels[0];
    const edge=strip.getBoundingClientRect().height+35;
    panels.forEach(panel=>{if(panel.getBoundingClientRect().top<=edge)current=panel});
    if(current)markFolder(current.id.replace('folder-',''));
  }
  window.addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(updateFolder)},{passive:true});
  window.addEventListener('resize',sizeFolders);
  const observer=new ResizeObserver(sizeFolders);panels.forEach(panel=>observer.observe(panel));
  sizeFolders();
}
