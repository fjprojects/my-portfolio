import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {journeys} from '../frontend/src/lib/transit.js';
import {angle,RepCounter,GaitCounter,demoPose} from '../frontend/src/lib/motion.js';
const network=JSON.parse(fs.readFileSync(new URL('../shared/transit.json',import.meta.url)));
test('A cross-town trip includes valid transfers and no impossible connections',()=>{
  const result=journeys(network,'railway','mannuthy',480);
  assert.ok(result.length>0);
  assert.equal(result[0].legs[0].from,'railway');
  assert.equal(result[0].legs.at(-1).to,'mannuthy');
  for(const r of result){
    for(let i=1;i<r.legs.length;i++){assert.equal(r.legs[i-1].to,r.legs[i].from);assert.ok(r.legs[i].depart-r.legs[i-1].arrive>=5);}
    assert.equal(r.fare,r.legs.reduce((s,l)=>s+l.fare,0));
  }
});
test('Reverse routes are usable, while unserved stops and after-service times have no results',()=>{
  assert.ok(journeys(network,'viyyoor','railway',480).some(r=>!r.transfers));
  assert.equal(journeys(network,'museum','railway',480).length,0);
  assert.equal(journeys(network,'railway','mannuthy',1439).length,0);
  assert.throws(()=>journeys(network,'railway','railway',480));
  assert.throws(()=>journeys(network,'missing','railway',480));
});
test('Lowest fare sort and earliest arrival sort obey their ranking',()=>{
  const cheap=journeys(network,'railway','mannuthy',480,'cheapest');
  for(let i=1;i<cheap.length;i++)assert.ok(cheap[i].fare>=cheap[i-1].fare);
  const fast=journeys(network,'railway','mannuthy',480);
  for(let i=1;i<fast.length;i++)assert.ok(fast[i].arrive>=fast[i-1].arrive);
});
test('Joint angles are computed in geometry, including degenerate handling',()=>{
  assert.equal(angle({x:1,y:0},{x:0,y:0},{x:0,y:1}),90);
  assert.equal(angle({x:0,y:0},{x:0,y:0},{x:1,y:0}),null);
});
test('Three full simulated cycles are counted with both sides and joints',()=>{
  for(const exercise of ['elbow','knee'])for(const side of ['left','right']){
    const counter=new RepCounter(),offset=side==='right'?1:0,ids=(exercise==='elbow'?[11,13,15]:[23,25,27]).map(i=>i+offset);
    for(let frame=0;frame<=120;frame++){const t=frame/10,p=demoPose(t,'recovery',exercise,side);counter.update(angle(...ids.map(i=>p[i])),1,t);}
    assert.equal(counter.reps,3,exercise+' '+side);
  }
});
test('A partial cycle or low-visibility sequence is never counted as a complete rep',()=>{
  const partial=new RepCounter(),hidden=new RepCounter();
  for(let f=0;f<40;f++){partial.update(40,1,f/10);hidden.update(f<20?160:40,.2,f/10);}
  assert.equal(partial.reps,0);assert.equal(hidden.reps,0);
  const gap=new RepCounter();[0,.1,.2,.3].forEach(t=>gap.update(160,1,t));[.8,.9,1,1.1].forEach(t=>gap.update(40,1,t));
  gap.update(50,0,2);[3,3.1,3.2,3.3].forEach(t=>gap.update(160,1,t));assert.equal(gap.reps,0);
});
test('A symmetric simulated walk produces plausible cadence and stationary poses produce no steps',()=>{
  const walking=new GaitCounter(),standing=new GaitCounter();
  for(let f=0;f<=120;f++){walking.update(demoPose(f/10,'gait'),f/10);standing.update(demoPose(0,'gait'),f/10);}
  const metrics=walking.snapshot().metrics;assert.ok(metrics.steps>=16&&metrics.steps<=19);assert.ok(metrics.cadence>85&&metrics.cadence<95);assert.ok(metrics.interval_symmetry>90);assert.equal(standing.snapshot().metrics.steps,0);assert.equal(standing.snapshot().metrics.cadence,null);
});
