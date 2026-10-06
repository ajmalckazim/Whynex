'use strict';
(function(){
  /* â”€â”€ Header scroll â”€â”€ */
  const header=document.getElementById('header');
  if(header){
    window.addEventListener('scroll',()=>{
      header.classList.toggle('scrolled',window.scrollY>40);
    },{passive:true});
  }

  /* â”€â”€ Hamburger / mobile nav â”€â”€ */
  const hamburger=document.getElementById('hamburger');
  const mobileNav=document.getElementById('mobile-nav');
  if(hamburger&&mobileNav){
    hamburger.setAttribute('aria-controls',mobileNav.id);
    function closeMobileNav(){
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
    hamburger.addEventListener('click',()=>{
      const isOpen=hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open',isOpen);
      hamburger.setAttribute('aria-expanded',String(isOpen));
      document.body.style.overflow=isOpen?'hidden':'';
    });
    mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMobileNav));
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape'&&mobileNav.classList.contains('open')){closeMobileNav();hamburger.focus();}
    });
    /* Mobile accordion */
    [['acc-services','acc-services-content'],['acc-industries','acc-industries-content'],['acc-company','acc-company-content']].forEach(([tid,cid])=>{
      const trigger=document.getElementById(tid);
      const content=document.getElementById(cid);
      if(!trigger||!content)return;
      trigger.addEventListener('click',()=>{
        const isOpen=trigger.getAttribute('aria-expanded')!=='true';
        trigger.classList.toggle('open-acc',isOpen);
        trigger.setAttribute('aria-expanded',String(isOpen));
        content.classList.toggle('open',isOpen);
        content.setAttribute('aria-hidden',String(!isOpen));
        content.inert=!isOpen;
      });
    });
  }

  /* â”€â”€ Mega Menu â”€â”€ */
  const menuToggles=document.querySelectorAll('.header-inner .menu-toggle');
  function closeAllMenus(except=null){
    document.querySelectorAll('.header-inner .nav-item.menu-open').forEach(item=>{
      if(item!==except){
        item.classList.remove('menu-open');
        const t=item.querySelector(':scope>.menu-toggle');
        if(t)t.setAttribute('aria-expanded','false');
      }
    });
  }
  menuToggles.forEach(toggle=>{
    toggle.addEventListener('click',e=>{
      e.preventDefault();e.stopPropagation();
      const parent=toggle.closest('.nav-item');
      if(!parent)return;
      const isOpen=parent.classList.contains('menu-open');
      closeAllMenus(parent);
      parent.classList.toggle('menu-open',!isOpen);
      toggle.setAttribute('aria-expanded',String(!isOpen));
    });
    toggle.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle.click();}
    });
  });
  document.querySelectorAll('.header-inner .mega-wrap a').forEach(link=>link.addEventListener('click',e=>e.stopPropagation()));
  document.addEventListener('click',e=>{if(!e.target.closest('.header-inner'))closeAllMenus();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAllMenus();});

  /* â”€â”€ Intersection Observer (reveal) â”€â”€ */
  const io=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('visible');io.unobserve(entry.target);}
    });
  },{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  /* â”€â”€ Counter animation â”€â”€ */
  function animateCounter(el,target,duration=1600){
    let start=null;
    function step(ts){
      if(!start)start=ts;
      const p=Math.min((ts-start)/duration,1);
      const eased=1-Math.pow(1-p,3);
      el.textContent=Math.floor(eased*target);
      if(p<1)requestAnimationFrame(step);
      else el.textContent=target;
    }
    requestAnimationFrame(step);
  }
  const counterIO=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const target=parseInt(entry.target.dataset.target);
        const counter=entry.target.querySelector('.counter')||entry.target;
        animateCounter(counter,target);
        counterIO.unobserve(entry.target);
      }
    });
  },{threshold:0.5});
  document.querySelectorAll('.stat-number[data-target]').forEach(el=>counterIO.observe(el));

  /* â”€â”€ Process steps â”€â”€ */
  const processTimeline=document.getElementById('process-timeline');
  if(processTimeline){
    const processIO=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.querySelectorAll('.process-step').forEach((step,i)=>setTimeout(()=>step.classList.add('visible'),i*150));
          processIO.unobserve(entry.target);
        }
      });
    },{threshold:0.2});
    processIO.observe(processTimeline);
  }

  /* â”€â”€ Case Studies Slider â”€â”€ */
  const slider=document.getElementById('cs-slider');
  if(slider){
    const dots=document.querySelectorAll('#cs-progress .cs-dot');
    const prevBtn=document.getElementById('cs-prev');
    const nextBtn=document.getElementById('cs-next');
    const cards=slider.querySelectorAll('.cs-card');
    const total=cards.length;
    let current=0;
    function getCardWidth(){return cards[0].offsetWidth+24;}
    function goTo(index){
      current=Math.max(0,Math.min(index,total-1));
      slider.style.transform=`translateX(-${current*getCardWidth()}px)`;
      dots.forEach((d,i)=>{d.classList.toggle('active',i===current);d.setAttribute('aria-pressed',String(i===current));});
    }
    if(prevBtn)prevBtn.addEventListener('click',()=>goTo(current-1));
    if(nextBtn)nextBtn.addEventListener('click',()=>goTo(current+1));
    dots.forEach((d,i)=>d.addEventListener('click',()=>goTo(i)));
    let isDragging=false,startX=0;
    slider.addEventListener('mousedown',e=>{isDragging=true;startX=e.pageX;slider.classList.add('grabbing');});
    window.addEventListener('mousemove',e=>{
      if(!isDragging)return;
      const diff=startX-e.pageX;
      if(Math.abs(diff)>60){isDragging=false;slider.classList.remove('grabbing');goTo(diff>0?current+1:current-1);}
    });
    window.addEventListener('mouseup',()=>{isDragging=false;slider.classList.remove('grabbing');});
    let touchStartX=0;
    slider.addEventListener('touchstart',e=>{touchStartX=e.touches[0].clientX;},{passive:true});
    slider.addEventListener('touchend',e=>{
      const diff=touchStartX-e.changedTouches[0].clientX;
      if(Math.abs(diff)>50)goTo(diff>0?current+1:current-1);
    },{passive:true});
    window.addEventListener('resize',()=>goTo(current),{passive:true});
  }

  /* â”€â”€ Portfolio Filter â”€â”€ */
  const filters=document.querySelectorAll('.pf-filter');
  const pfCards=document.querySelectorAll('.pf-card');
  if(filters.length){
    filters.forEach(btn=>{
      btn.addEventListener('click',()=>{
        filters.forEach(b=>{b.classList.remove('active');b.setAttribute('aria-selected','false');});
        btn.classList.add('active');btn.setAttribute('aria-selected','true');
        const filter=btn.dataset.filter;
        pfCards.forEach(card=>{
          const match=filter==='all'||card.dataset.cat===filter;
          card.style.opacity=match?'1':'0';
          card.style.transform=match?'scale(1)':'scale(0.95)';
          card.style.pointerEvents=match?'auto':'none';
          card.style.transition='opacity 0.35s ease,transform 0.35s ease';
          setTimeout(()=>{card.style.display=match?'':'none';},match?0:350);
          if(match)card.style.display='';
        });
      });
    });
  }

  /* â”€â”€ Contact Form â”€â”€ */
  const form=document.getElementById('contact-form');
  if(form){
    const successMsg=document.getElementById('form-success');
    form.addEventListener('submit',e=>{
      e.preventDefault();
      let valid=true;
      const name=document.getElementById('cf-name');
      const email=document.getElementById('cf-email');
      const msg=document.getElementById('cf-message');
      [name,email,msg].forEach(el=>{if(el)el.closest('.form-group')?.classList.remove('invalid');});
      if(!name?.value.trim()){name?.closest('.form-group')?.classList.add('invalid');valid=false;}
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.value.trim())){email?.closest('.form-group')?.classList.add('invalid');valid=false;}
      if(!msg?.value.trim()){msg?.closest('.form-group')?.classList.add('invalid');valid=false;}
      if(valid){
        const company=form.querySelector('#cf-company')?.value.trim();
        const phone=form.querySelector('#cf-phone')?.value.trim();
        const service=form.querySelector('#cf-service')?.selectedOptions[0]?.text;
        const budget=form.querySelector('#cf-budget')?.selectedOptions[0]?.text;
        const details=[`Name: ${name.value.trim()}`,`Email: ${email.value.trim()}`,company&&`Company: ${company}`,phone&&`Phone: ${phone}`,service&&service!=='Select a service...'&&`Service: ${service}`,budget&&budget!=='Select a budget range...'&&`Budget: ${budget}`,`Project details: ${msg.value.trim()}`].filter(Boolean).join('\n');
        const query=new URLSearchParams({subject:'WHYNEX website enquiry',body:details});
        if(successMsg){successMsg.querySelector('h3').textContent='Continue in your email app';successMsg.querySelector('p').textContent='Your enquiry is ready to send. Send the message in your email app to reach WHYNEX.';successMsg.classList.add('show');}
        window.location.href=`mailto:whynexofficial@gmail.com?${query}`;
      }
    });
    ['cf-name','cf-email','cf-message'].forEach(id=>{
      document.getElementById(id)?.addEventListener('input',function(){this.closest('.form-group')?.classList.remove('invalid');});
    });
  }

  /* â”€â”€ FAQ accordion (for service/industry pages) â”€â”€ */
  document.querySelectorAll('.faq-q').forEach(q=>{
    q.addEventListener('click',()=>{
      const item=q.closest('.faq-item');
      const wasActive=item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('active'));
      if(!wasActive)item.classList.add('active');
    });
    q.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();q.click();}});
  });

  /* â”€â”€ Newsletter â”€â”€ */
  document.querySelectorAll('.newsletter-form, [data-newsletter]').forEach(f=>{
    f.addEventListener('submit',e=>{
      e.preventDefault();
      const input=f.querySelector('input[type="email"]');
      if(!input)return;
      const query=new URLSearchParams({subject:'WHYNEX free marketing report request',body:`Please send the free marketing report to ${input.value.trim()}.`});
      window.location.href=`mailto:whynexofficial@gmail.com?${query}`;
    });
  });

  /* â”€â”€ Particles (home only) â”€â”€ */
  const canvas=document.getElementById('particles-canvas');
  if(canvas){
    const ctx=canvas.getContext('2d');
    let W,H,particles=[],animId;
    function resize(){W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight;}
    resize();
    window.addEventListener('resize',resize,{passive:true});
    function rand(a,b){return a+Math.random()*(b-a);}
    for(let i=0;i<60;i++){particles.push({x:rand(0,W),y:rand(0,H),vx:rand(-0.25,0.25),vy:rand(-0.25,0.25),r:rand(1,2.5),a:rand(0.1,0.5)});}
    function draw(){
      ctx.clearRect(0,0,W,H);
      particles.forEach(p=>{
        p.x+=p.vx;p.y+=p.vy;
        if(p.x<0)p.x=W;if(p.x>W)p.x=0;
        if(p.y<0)p.y=H;if(p.y>H)p.y=0;
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(169,221,245,${p.a})`;ctx.fill();
      });
      particles.forEach((a,i)=>{
        particles.slice(i+1).forEach(b=>{
          const dx=a.x-b.x,dy=a.y-b.y,dist=Math.sqrt(dx*dx+dy*dy);
          if(dist<100){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(169,221,245,${0.08*(1-dist/100)})`;ctx.lineWidth=0.5;ctx.stroke();}
        });
      });
      animId=requestAnimationFrame(draw);
    }
    /* Pause particles when tab not visible */
    document.addEventListener('visibilitychange',()=>{
      if(document.hidden){cancelAnimationFrame(animId);}else{draw();}
    });
    /* Disable particles on mobile for performance */
    if(window.innerWidth>768)draw();
    else{canvas.style.display='none';}
  }

  /* â”€â”€ Active nav on scroll (home only) â”€â”€ */
  const navLinks=document.querySelectorAll('.nav-link');
  if(navLinks.length){
    const sections=['hero','about','services','case-studies','industries','process','portfolio','why-us','testimonials','contact'];
    function setActive(){
      const scrollY=window.scrollY+100;
      sections.forEach(id=>{
        const el=document.getElementById(id);
        if(!el)return;
        if(scrollY>=el.offsetTop&&scrollY<el.offsetTop+el.offsetHeight){
          navLinks.forEach(l=>l.classList.remove('active'));
          const active=document.querySelector(`.nav-link[href="#${id}"], .nav-link[href="/index.html#${id}"]`);
          if(active)active.classList.add('active');
        }
      });
    }
    window.addEventListener('scroll',setActive,{passive:true});
  }

  /* â”€â”€ Back to top â”€â”€ */
  const btn=document.getElementById('back-to-top');
  if(btn){
    window.addEventListener('scroll',()=>{btn.classList.toggle('visible',window.pageYOffset>300);},{passive:true});
    btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  }

  /* â”€â”€ prefers-reduced-motion â”€â”€ */
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.documentElement.style.setProperty('--transition','0s');
  }
})();