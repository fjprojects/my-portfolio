import React,{useState,useEffect,useRef} from 'react';
import {Activity,Footprints,Play,Square,Video,Camera,FlaskConical,Save,Download,Trash2,Check,ShieldCheck,ArrowRight,Upload} from 'lucide-react';
import {api,serverMode,number,downloadCSV} from '../lib/data';
import {angle,RepCounter,GaitCounter,demoPose,connections} from '../lib/motion';
import {useAccount} from '../lib/account';
import {Notice,Empty,PageHeading,Metric,Sparkline} from '../components/UI';

function paint(canvas,points,simulation,width,height){
  if(!canvas)return;
  canvas.width=width;canvas.height=height;
  const c=canvas.getContext('2d');c.clearRect(0,0,width,height);
  if(simulation){c.fillStyle='#102c28';c.fillRect(0,0,width,height);c.strokeStyle='#24403b';c.lineWidth=1;for(let x=0;x<width;x+=40){c.beginPath();c.moveTo(x,0);c.lineTo(x,height);c.stroke();}for(let y=0;y<height;y+=40){c.beginPath();c.moveTo(0,y);c.lineTo(width,y);c.stroke();}}
  if(!points)return;
  const scale=simulation?Math.min(width,height):null;
  const xy=p=>simulation?[(width-scale)/2+p.x*scale,p.y*scale]:[p.x*width,p.y*height];
  c.lineWidth=simulation?5:3;c.strokeStyle='#b8ddb2';
  for(const [a,b] of connections){if(!points[a]||!points[b]||points[a].visibility<.6||points[b].visibility<.6)continue;const A=xy(points[a]),B=xy(points[b]);c.beginPath();c.moveTo(...A);c.lineTo(...B);c.stroke();}
  for(const i of [11,12,13,14,15,16,23,24,25,26,27,28]){if(!points[i]||points[i].visibility<.6)continue;const [x,y]=xy(points[i]);c.fillStyle='#e0efcc';c.beginPath();c.arc(x,y,simulation?7:4,0,Math.PI*2);c.fill();}
  if(simulation){const [x,y]=xy(points[0]);c.strokeStyle='#b8ddb2';c.beginPath();c.arc(x,y,28,0,Math.PI*2);c.stroke();}
}

export default function MotionStudio({kind}){
  const recovery=kind==='recovery',{requireAccount,user}=useAccount();
  const [source,setSource]=useState('simulation'),[exercise,setExercise]=useState('elbow'),[side,setSide]=useState('left'),[low,setLow]=useState(55),[high,setHigh]=useState(145),[distance,setDistance]=useState(''),[running,setRunning]=useState(false),[loading,setLoading]=useState(false),[snapshot,setSnapshot]=useState({reps:0,angle:null,cue:'Choose a source to begin',metrics:{}}),[elapsed,setElapsed]=useState(0),[history,setHistory]=useState([]),[error,setError]=useState(''),[message,setMessage]=useState(''),[notes,setNotes]=useState(''),[fileName,setFileName]=useState(''),[saved,setSaved]=useState(false),[saving,setSaving]=useState(false);
  const video=useRef(null),canvas=useRef(null),runtime=useRef({active:false,raf:null,detector:null,stream:null,url:null}),record=useRef(null),mounted=useRef(true);
  async function reload(){if(serverMode&&!user){setHistory([]);return;}try{setHistory(await api.sessions(kind));}catch(e){setError(e.message);}}
  useEffect(()=>{mounted.current=true;reload();paint(canvas.current,demoPose(0,kind),true,800,580);return()=>{mounted.current=false;const r=runtime.current;r.active=false;cancelAnimationFrame(r.raf);r.stream?.getTracks().forEach(t=>t.stop());r.detector?.close();if(r.url)URL.revokeObjectURL(r.url);};},[]);
  function stop(){
    const r=runtime.current;r.active=false;cancelAnimationFrame(r.raf);r.stream?.getTracks().forEach(t=>t.stop());r.stream=null;if(video.current)video.current.pause();
    if(r.latest&&r.elapsed>=1&&r.latest.metrics.quality>0){
      const metrics={...r.latest.metrics};
      if(!recovery){metrics.distance=r.config.distance||null;metrics.speed=r.config.distance?r.config.distance/r.elapsed:null;}
      record.current={kind,source:r.config.source,exercise:r.config.exercise,duration:Math.min(r.elapsed,3600),reps:r.latest.reps,metrics,notes:''};
    }
    if(mounted.current){setRunning(false);setElapsed(r.elapsed||0);}
  }
  async function detector(){
    if(runtime.current.detector)return runtime.current.detector;
    const {FilesetResolver,PoseLandmarker}=await import('@mediapipe/tasks-vision');
    const files=await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.32/wasm');
    const options={baseOptions:{modelAssetPath:'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task',delegate:'GPU'},runningMode:'VIDEO',numPoses:1,minPoseDetectionConfidence:.6,minTrackingConfidence:.6};
    let model;
    try{model=await PoseLandmarker.createFromOptions(files,options);}catch{options.baseOptions.delegate='CPU';model=await PoseLandmarker.createFromOptions(files,options);}
    if(!mounted.current){model.close();throw Error('Workspace closed.');}
    runtime.current.detector=model;return model;
  }
  async function start(){
    if(!requireAccount())return;
    setError('');setMessage('');setSaved(false);record.current=null;
    const r=runtime.current;r.latest=null;r.elapsed=0;r.lastFrame=-Infinity;r.lastVideo=-1;
    const d=distance===''?null:Number(distance);
    if(!recovery&&d!==null&&(!Number.isFinite(d)||d<=0||d>1000)){setError('Enter a measured distance between 0 and 1,000 metres, or leave it blank.');return;}
    if(source==='video'&&!r.url){setError('Choose a local video file first.');return;}
    try{r.counter=recovery?new RepCounter(Number(low),Number(high)):new GaitCounter();}catch(e){setError(e.message);return;}
    r.config={source,exercise:recovery?exercise+'-'+side:'side-view-walk',distance:d};
    setSnapshot(r.counter.snapshot());setElapsed(0);setLoading(true);
    try{
      if(source!=='simulation'){
        await detector();
        if(!mounted.current)return;
        if(source==='camera'){
          if(!navigator.mediaDevices?.getUserMedia)throw Error('Camera requires HTTPS or localhost and a supported browser.');
          r.stream=await navigator.mediaDevices.getUserMedia({video:{width:{ideal:960},height:{ideal:720}},audio:false});
          if(!mounted.current){r.stream.getTracks().forEach(t=>t.stop());return;}
          video.current.src='';video.current.srcObject=r.stream;
        }else{video.current.srcObject=null;video.current.src=r.url;video.current.currentTime=0;}
        await video.current.play();
      }
      if(!mounted.current)return;
      r.active=true;r.startAt=performance.now();setRunning(true);setLoading(false);
      const tick=now=>{
        if(!r.active||!mounted.current)return;
        r.raf=requestAnimationFrame(tick);
        if(now-r.lastFrame<100)return;
        r.lastFrame=now;
        const t=source==='video'?video.current.currentTime:(now-r.startAt)/1000;
        if(source!=='simulation'&&(video.current.readyState<2||video.current.currentTime===r.lastVideo))return;
        let points,world;
        try{
          if(source==='simulation')points=demoPose(t,kind,exercise,side);
          else{r.lastVideo=video.current.currentTime;const result=r.detector.detectForVideo(video.current,now);points=result.landmarks[0];world=result.worldLandmarks[0];}
          r.elapsed=t;
          if(recovery){
            const offset=side==='right'?1:0,ids=exercise==='elbow'?[11+offset,13+offset,15+offset]:[23+offset,25+offset,27+offset];
            const confidence=points?Math.min(...ids.map(i=>points[i]?.visibility||0)):0;
            const measured=world||points?.map(p=>({...p,x:p.x*(source==='simulation'?1:video.current.videoWidth/video.current.videoHeight),z:0}));
            const value=measured?angle(...ids.map(i=>measured[i])):null;
            r.latest=r.counter.update(value,confidence,t);
          }else r.latest=r.counter.update(points,t);
          setSnapshot(r.latest);setElapsed(t);
          paint(canvas.current,points,source==='simulation',source==='simulation'?800:video.current.videoWidth,source==='simulation'?580:video.current.videoHeight);
          if((source==='simulation'&&t>=12)||t>=3600)stop();
        }catch(e){stop();setError('Tracking stopped: '+e.message);}
      };
      r.raf=requestAnimationFrame(tick);
    }catch(e){r.stream?.getTracks().forEach(t=>t.stop());r.stream=null;if(mounted.current){setError('Unable to start: '+e.message+' You can still try the simulation.');setLoading(false);setRunning(false);}}
  }
  function chooseFile(e){const file=e.target.files[0];if(!file)return;if(!file.type.startsWith('video/')){setError('Choose a video file supported by your browser.');return;}const r=runtime.current;if(r.url)URL.revokeObjectURL(r.url);r.url=URL.createObjectURL(file);setFileName(file.name);setError('');}
  async function save(){if(!record.current||!requireAccount())return;setSaving(true);setError('');try{await api.saveSession({...record.current,notes});setSaved(true);setMessage(serverMode?'Session saved to your account.':'Session saved in this browser.');await reload();}catch(e){setError(e.message);}finally{setSaving(false);}}
  async function remove(id){if(!window.confirm('Delete this session summary? This cannot be undone.'))return;try{await api.deleteSession(id);await reload();}catch(e){setError(e.message);}}
  function exportHistory(){downloadCSV(kind+'-sessions.csv',history.map(s=>({date:s.created_at,source:s.source,exercise:s.exercise,duration_seconds:s.duration,repetitions_or_steps:s.reps,...s.metrics,notes:s.notes})));}
  const m=snapshot.metrics||{},disabled=running||loading;
  const comparable=history.filter(s=>s.source===source&&s.exercise===(recovery?exercise+'-'+side:'side-view-walk')&&s.metrics.quality>=70);
  const latest=comparable[0],previous=comparable[1],trendKey=recovery?'max_angle':'cadence';
  const change=latest&&previous&&previous.metrics[trendKey]>0&&latest.metrics[trendKey]!==null?(latest.metrics[trendKey]-previous.metrics[trendKey])/previous.metrics[trendKey]*100:null;
  return <main className={'wrap motion-page '+(recovery?'recovery':'gait')}><PageHeading eyebrow={recovery?'03 / AI RECOVERY ASSISTANT':'04 / GAITGUARDIAN'} title={recovery?<>Every movement.<br/><em>A little more insight.</em></>:<>Understand the rhythm<br/><em>of a walk.</em></>} description={recovery?'Observe joint angles, count full movement cycles, and keep a personal session history.':'Explore step timing, estimated cadence, and changes across comparable walking sessions.'}><div className="heading-stamp">{recovery?<Activity size={40} strokeWidth={1.3}/>:<Footprints size={40} strokeWidth={1.3}/>}<span>MOVEMENT STUDIO<br/>OBSERVE. RECORD. COMPARE.</span></div></PageHeading><Notice>{recovery?'Experimental movement tracker, not a medical assessment. Sample angle targets are not an exercise prescription; use clinician-approved movements and targets.':'Experimental side-view gait measurements. This prototype does not predict falls, diagnose conditions, or send caregiver alerts. Comparisons are descriptive only.'}</Notice><div className="motion-grid"><section className="tracking-panel"><div className="tracking-header"><h2>{recovery?'Movement workspace':'Walking workspace'}</h2><span className={'status-pill '+(running?'is-live':'')}>{running?'Measuring':loading?'Preparing model':'Ready'}</span></div><div className="source-tabs">{[['simulation','Simulation',FlaskConical],['camera','Camera',Camera],['video','Local video',Video]].map(([id,label,Icon])=><button key={id} disabled={disabled} className={source===id?'active':''} onClick={()=>{setSource(id);record.current=null;setSaved(false);setSnapshot({reps:0,metrics:{},cue:'Choose a source to begin'});setElapsed(0);paint(canvas.current,demoPose(0,kind,exercise,side),true,800,580);}}><Icon size={16}/>{label}</button>)}</div><div className="tracking-stage"><video ref={video} muted playsInline onEnded={stop} style={{display:source==='simulation'?'none':'block'}}/><canvas ref={canvas} aria-label="Pose tracking overlay"/><div className="stage-corner"><span className={running?'live-dot':''}/>{source==='simulation'?'SYNTHETIC POSE DEMO':source==='camera'?'LOCAL CAMERA PROCESSING':'LOCAL VIDEO PROCESSING'}</div><div className="stage-timer">{String(Math.floor(elapsed/60)).padStart(2,'0')}:{String(Math.floor(elapsed%60)).padStart(2,'0')}</div><div className="stage-value"><strong>{recovery?number(snapshot.angle):snapshot.reps}</strong><span>{recovery?'joint angle / degrees':'estimated steps'}</span></div></div><div className="tracking-cue" aria-live="polite"><span className="live-dot"/>{snapshot.cue}</div><div className="tracking-controls">{running?<button className="primary stop" onClick={stop}><Square size={16}/>Stop measurement</button>:<button className="primary" disabled={loading||saving} onClick={start}><Play size={16}/>{loading?'Loading pose model…':source==='simulation'?'Run 12-second simulation':'Start measurement'}</button>}<button className="secondary" disabled={disabled||!record.current||saved||saving} onClick={save}>{saved?<Check size={16}/>:<Save size={16}/>} {saved?'Saved':saving?'Saving…':'Save session'}</button></div><div className="privacy-line"><ShieldCheck size={15}/><span>Video stays on your device. Only summary numbers are saved.</span></div><Notice error>{error}</Notice><Notice>{message}</Notice></section><aside className="motion-sidebar"><div className="settings-panel"><div className="eyebrow">SET UP YOUR SESSION</div>{recovery?<><label>Movement<select disabled={disabled} value={exercise} onChange={e=>setExercise(e.target.value)}><option value="elbow">Elbow flexion / extension</option><option value="knee">Knee flexion / extension</option></select></label><label>Tracking side<select disabled={disabled} value={side} onChange={e=>setSide(e.target.value)}><option value="left">Left</option><option value="right">Right</option></select></label><div className="form-row"><label>Lower target (°)<input disabled={disabled} type="number" min="10" max="145" value={low} onChange={e=>setLow(e.target.value)}/></label><label>Upper target (°)<input disabled={disabled} type="number" min="40" max="175" value={high} onChange={e=>setHigh(e.target.value)}/></label></div><p className="subtle">A cycle counts after upper → lower → upper, with a short hold at each target. Demo targets: 55° and 145°.</p></>:<><label>Measured walk distance (m)<input disabled={disabled} type="number" min="0.1" max="1000" step="0.1" placeholder="Optional, e.g. 6.0" value={distance} onChange={e=>setDistance(e.target.value)}/></label><p className="subtle">Start timing when the walk begins; stop at the measured distance. Average speed = distance ÷ full session duration. Leave blank if the distance is unknown.</p><div className="setup-steps"><b>For a clearer recording</b><p>1. Place the camera at a side view.</p><p>2. Keep hips, knees, and ankles in frame.</p><p>3. Use a clear, well-lit walking area.</p></div></>}{source==='video'&&<label className="file-label"><Upload size={18}/>{fileName||'Choose a local video'}<input disabled={disabled} type="file" accept="video/*" onChange={chooseFile}/></label>}{source==='camera'&&<p className="subtle">Camera permission is requested only when you press Start. Internet is needed once to load the pose model.</p>}<label>Session note<textarea maxLength={500} rows={2} disabled={saved} placeholder="Optional observation…" value={notes} onChange={e=>setNotes(e.target.value)}/></label></div><div className="measurements"><div className="eyebrow">CURRENT SESSION</div><div className="metric-grid"><Metric label={recovery?'Full cycles':'Estimated steps'} value={snapshot.reps}/><Metric label="Tracking coverage" value={number(m.quality)} unit="%"/>{recovery?<><Metric label="Minimum angle" value={number(m.min_angle)} unit="°"/><Metric label="Maximum angle" value={number(m.max_angle)} unit="°"/></>:<><Metric label="Active cadence" value={number(m.cadence)} unit="/min"/><Metric label="Interval symmetry" value={number(m.interval_symmetry)} unit="%"/></>}</div><p className="subtle">{recovery?'Coverage is the share of frames with visible selected joints. Low-confidence frames do not count.':'Timing metrics appear after enough alternating steps. Symmetry compares left/right step intervals, not balance or clinical risk.'}</p></div></aside></div><section className="history-section"><div className="section-title"><div><div className="eyebrow">A RECORD OF YOUR PROGRESS</div><h2>Session history</h2></div><button className="secondary" disabled={!history.length} onClick={exportHistory}><Download size={16}/>Export CSV</button></div>{history.length?<div className="history-grid"><div className="history-table-wrap"><table><thead><tr><th>When</th><th>Source / movement</th><th>{recovery?'Cycles':'Steps'}</th><th>Duration</th><th>Coverage</th><th>Actions</th></tr></thead><tbody>{history.map(s=><tr key={s.id}><td>{new Date(s.created_at).toLocaleDateString(undefined,{day:'numeric',month:'short'})}<small>{new Date(s.created_at).toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'})}</small></td><td><span className={'tag '+(s.source==='simulation'?'sim':'')}>{s.source}</span><small>{s.exercise}</small>{s.notes&&<small>{s.notes}</small>}</td><td><b>{s.reps}</b></td><td>{number(s.duration,1)}s</td><td>{number(s.metrics.quality)}%</td><td><button className="icon-button" aria-label={'Delete session from '+s.created_at} onClick={()=>remove(s.id)}><Trash2 size={15}/></button></td></tr>)}</tbody></table></div><aside className="trend-panel"><div className="eyebrow">LIKE-FOR-LIKE COMPARISON</div><h3>{recovery?'Maximum joint angle':'Active cadence'}</h3><p className="subtle">Same source and movement, at least 70% coverage. Most recent 10 sessions.</p><Sparkline values={comparable.slice(0,10).reverse().map(s=>s.metrics[trendKey])} label={recovery?'Maximum angle across saved sessions':'Active cadence across saved sessions'}/>{change!==null?<><strong className="trend-number">{change>0?'+':''}{number(change,1)}%</strong><p>{Math.abs(change)>=20?'A larger difference is visible. Check recording conditions before interpreting it.':'Change compared with the previous comparable session.'}</p></>:<p className="subtle">Record another comparable session for a change summary.</p>}<p className="subtle">Higher values do not necessarily mean improvement.</p></aside></div>:<Empty title="Your first session belongs here">Run a simulation or record a movement, stop the measurement, then save its summary.</Empty>}</section></main>;
}
