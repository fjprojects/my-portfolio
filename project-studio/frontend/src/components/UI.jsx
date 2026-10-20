import React,{useEffect,useRef} from 'react';
import {X,AlertCircle,ArrowUpRight} from 'lucide-react';
export function Notice({children,error=false}){return children?<div className={'notice '+(error?'error':'')} role={error?'alert':'status'}><AlertCircle size={17}/><span>{children}</span></div>:null;}
export function Empty({title,children}){return <div className="empty"><span className="empty-mark">↗</span><h3>{title}</h3><p>{children}</p></div>;}
export function Metric({label,value,unit,detail}){return <div className="metric"><span>{label}</span><strong>{value}<small>{unit}</small></strong>{detail&&<p>{detail}</p>}</div>;}
export function Modal({title,onClose,children,wide=false}){
  const ref=useRef(null);
  useEffect(()=>{
    const prior=document.activeElement;
    const selector='button,a[href],input,select,textarea,[tabindex="0"]';
    ref.current?.querySelector(selector)?.focus();
    function key(e){
      if(e.key==='Escape')onClose();
      if(e.key==='Tab'){
        const controls=[...ref.current.querySelectorAll(selector)].filter(x=>!x.disabled),first=controls[0],last=controls.at(-1);
        if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}
        else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}
      }
    }
    document.addEventListener('keydown',key);const scroll=document.body.style.overflow;document.body.style.overflow='hidden';
    return()=>{document.removeEventListener('keydown',key);document.body.style.overflow=scroll;prior?.focus();};
  },[]);
  return <div className="modal-backdrop" onClick={e=>{if(e.target===e.currentTarget)onClose();}}><section ref={ref} className={'modal '+(wide?'wide':'')} role="dialog" aria-modal="true" aria-labelledby="modal-title"><header><h2 id="modal-title">{title}</h2><button className="icon-button" onClick={onClose} aria-label="Close dialog"><X/></button></header>{children}</section></div>;
}
export function PageHeading({eyebrow,title,description,children}){return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{children}</div>;}
export function Sparkline({values,label}){
  const data=values.filter(Number.isFinite);if(data.length<2)return <p className="subtle">Save at least two comparable sessions to see a trend.</p>;
  const min=Math.min(...data),max=Math.max(...data),points=data.map((v,i)=>[12+i*376/(data.length-1),80-(v-min)/(max-min||1)*60]);
  return <svg viewBox="0 0 400 100" className="sparkline" role="img" aria-label={label}><line x1="12" x2="388" y1="80" y2="80" stroke="currentColor" opacity=".12"/><polyline points={points.map(p=>p.join(',')).join(' ')} fill="none" stroke="currentColor" strokeWidth="2.5"/>{points.map(([x,y],i)=><circle key={i} cx={x} cy={y} r="3" fill="currentColor"/>)}</svg>;
}
