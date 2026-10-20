export function angle(a,b,c){
  if(!a||!b||!c) return null;
  const u=[a.x-b.x,a.y-b.y,(a.z||0)-(b.z||0)],v=[c.x-b.x,c.y-b.y,(c.z||0)-(b.z||0)];
  const length=Math.hypot(...u)*Math.hypot(...v);
  if(!length) return null;
  const result=Math.acos(Math.max(-1,Math.min(1,u.reduce((s,x,i)=>s+x*v[i],0)/length)))*180/Math.PI;
  return Number.isFinite(result)?result:null;
}
const mean=a=>a.reduce((s,v)=>s+v,0)/a.length;
export class RepCounter {
  constructor(low=55,high=145){
    if(!(low>=10&&high<=175&&high-low>=30)) throw Error('Set targets at least 30° apart, between 10° and 175°.');
    this.low=low;this.high=high;this.reps=0;this.stage='waiting';this.zone=null;this.zoneAt=0;this.lastGood=-Infinity;this.valid=0;this.frames=0;this.min=180;this.max=0;
  }
  update(value,confidence,t){
    this.frames++;
    if(value===null||!Number.isFinite(value)||confidence<0.6) return this.snapshot(null,'Tracking unclear — keep the selected joints visible.');
    if(t-this.lastGood>0.75){this.stage='waiting';this.zone=null;}
    this.lastGood=t;this.valid++;this.min=Math.min(this.min,value);this.max=Math.max(this.max,value);
    const zone=value<=this.low?'low':value>=this.high?'high':null;
    if(zone!==this.zone){this.zone=zone;this.zoneAt=t;}
    if(zone&&t-this.zoneAt>=0.15){
      if(zone==='high'&&this.stage==='contracted'){this.reps++;this.stage='ready';}
      else if(zone==='high'&&this.stage==='waiting') this.stage='ready';
      else if(zone==='low'&&this.stage==='ready') this.stage='contracted';
    }
    const cue=this.stage==='waiting'?'Waiting for the upper sample target':this.stage==='ready'?'Upper target reached; waiting for lower target':'Lower target reached; return to upper target';
    return this.snapshot(value,cue);
  }
  snapshot(value=null,cue='Ready to measure'){
    return {angle:value,reps:this.reps,cue,metrics:{min_angle:this.valid?this.min:null,max_angle:this.valid?this.max:null,quality:this.frames?100*this.valid/this.frames:0,min_target:this.low,max_target:this.high}};
  }
}
export class GaitCounter {
  constructor(){this.events=[];this.sign=0;this.lastGood=-Infinity;this.segment=0;this.frames=0;this.valid=0;}
  update(points,t){
    this.frames++;
    const ids=[23,24,27,28];
    if(!points||ids.some(i=>!points[i]||(points[i].visibility??0)<0.6)) return this.snapshot('Tracking unclear — keep hips and ankles visible.');
    if(t-this.lastGood>0.75){this.sign=0;this.segment++;}
    this.lastGood=t;this.valid++;
    const delta=points[27].x-points[28].x;
    const sign=delta>0.035?1:delta< -0.035?-1:0;
    if(sign&&sign!==this.sign){
      if(this.sign && (!this.events.length||t-this.events.at(-1).t>=0.25)) this.events.push({t,sign,segment:this.segment});
      this.sign=sign;
    }
    return this.snapshot('Side-view ankle crossings · experimental step estimate');
  }
  snapshot(cue='Ready for a timed walk'){
    const intervals=this.events.slice(1).map((e,i)=>({dt:e.t-this.events[i].t,sign:e.sign,valid:e.segment===this.events[i].segment})).filter(x=>x.valid);
    const active=intervals.filter(x=>x.dt<=2.5),left=active.filter(x=>x.sign===1).map(x=>x.dt),right=active.filter(x=>x.sign===-1).map(x=>x.dt);
    return {reps:this.events.length,cue,metrics:{steps:this.events.length,cadence:active.length>=3?60/mean(active.map(x=>x.dt)):null,interval_symmetry:left.length>=2&&right.length>=2?100*Math.min(mean(left),mean(right))/Math.max(mean(left),mean(right)):null,pause_count:intervals.filter(x=>x.dt>2.5).length,quality:this.frames?100*this.valid/this.frames:0}};
  }
}
export function demoPose(t,kind='recovery',exercise='elbow',side='left'){
  const p=Array.from({length:33},()=>({x:0.5,y:0.22,z:0,visibility:0.99}));
  [[0,.5,.17],[11,.40,.30],[12,.60,.30],[13,.35,.46],[14,.65,.46],[15,.33,.62],[16,.67,.62],[23,.43,.56],[24,.57,.56],[25,.42,.73],[26,.58,.73],[27,.41,.91],[28,.59,.91]].forEach(([i,x,y])=>{p[i]={x,y,z:0,visibility:.99};});
  if(kind==='gait'){
    const phase=Math.sin(t*Math.PI*1.5);
    p[27].x=.50+.14*phase;p[28].x=.50-.14*phase;
    p[25].x=.47+.07*phase;p[26].x=.53-.07*phase;
    p[27].y=.89-.025*Math.max(0,phase);p[28].y=.89+.025*Math.min(0,phase);
  }else{
    const offset=side==='right'?1:0;
    const ids=exercise==='elbow'?[11+offset,13+offset,15+offset]:[23+offset,25+offset,27+offset];
    const [a,b,c]=ids, target=(105+65*Math.cos(t*Math.PI/2))*Math.PI/180;
    const ux=p[a].x-p[b].x,uy=p[a].y-p[b].y,len=Math.hypot(ux,uy),arm=exercise==='elbow'?.17:.18;
    p[c]={x:p[b].x+arm*(ux*Math.cos(target)-uy*Math.sin(target))/len,y:p[b].y+arm*(ux*Math.sin(target)+uy*Math.cos(target))/len,z:0,visibility:.99};
  }
  return p;
}
export const connections=[[11,12],[11,13],[13,15],[12,14],[14,16],[11,23],[12,24],[23,24],[23,25],[25,27],[24,26],[26,28]];
