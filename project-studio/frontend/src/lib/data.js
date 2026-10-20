import catalog from '../../../shared/catalog.json';
import network from '../../../shared/transit.json';
import {journeys} from './transit';
export const serverMode=(import.meta.env.VITE_DATA_MODE||(import.meta.env.DEV?'server':'demo'))==='server';
let csrf='';
const KEY='francis-studio-v1';
function read(){
  try { const data=JSON.parse(localStorage.getItem(KEY)||'null'); return data&&Array.isArray(data.orders)&&Array.isArray(data.sessions)?data:{orders:[],sessions:[]}; }
  catch { return {orders:[],sessions:[]}; }
}
function write(data){try{localStorage.setItem(KEY,JSON.stringify(data));}catch{throw Error('Browser storage is full or unavailable. Export records and free space, then retry.');}}
async function request(path,options={}){
  let response;
  try{response=await fetch('/api/'+path,{credentials:'same-origin',...options,headers:{'Content-Type':'application/json','X-CSRFToken':csrf,...options.headers}});}catch{throw Error('Cannot reach Django. Check the backend server and your connection.');}
  const data=response.status===204?null:await response.json().catch(()=>({detail:'The server returned an unexpected response.'}));
  if(!response.ok) throw Error(data?.detail||Object.entries(data||{}).map(([k,v])=>k+': '+JSON.stringify(v)).join('; ')||'Request failed.');
  return data;
}
export const api={
  async session(){if(!serverMode)return null;const r=await request('session/');csrf=r.csrf;return r.user;},
  async auth(action,fields){const r=await request('auth/'+action+'/',{method:'POST',body:JSON.stringify(fields)});csrf=r.csrf;return r.user;},
  async products(){if(serverMode)return request('products/');const orders=read().orders;return catalog.map(p=>({...p,stock:p.stock-orders.flatMap(o=>o.items).filter(i=>i.product===p.id).reduce((s,i)=>s+i.quantity,0)}));},
  async network(){return serverMode?request('network/'):network;},
  async journeys(from,to,depart,sort){return serverMode?request('journeys/?'+new URLSearchParams({from,to,depart,sort})):journeys(network,from,to,depart,sort);},
  async orders(){return serverMode?request('orders/'):read().orders;},
  async checkout(items,request_id){
    if(serverMode)return request('orders/',{method:'POST',body:JSON.stringify({items,request_id})});
    const data=read(),old=data.orders.find(o=>o.request_id===request_id);if(old)return old;
    const products=await api.products();
    const lines=items.map(item=>{const p=products.find(p=>p.id===item.id);if(!p||!Number.isInteger(item.quantity)||item.quantity<1||item.quantity>p.stock)throw Error('Cart quantity exceeds available demo stock.');return {product:p.id,name:p.name,price:p.price,quantity:item.quantity};});
    if(!lines.length)throw Error('Your cart is empty.');
    const order={id:crypto.randomUUID(),request_id,created_at:new Date().toISOString(),status:'demo-confirmed',items:lines,total:lines.reduce((s,i)=>s+i.quantity*i.price,0)};
    data.orders.unshift(order);write(data);return order;
  },
  async sessions(kind){return serverMode?request('movement/?kind='+kind):read().sessions.filter(s=>s.kind===kind);},
  async saveSession(record){if(serverMode)return request('movement/',{method:'POST',body:JSON.stringify(record)});const data=read(),saved={...record,id:crypto.randomUUID(),created_at:new Date().toISOString()};data.sessions.unshift(saved);write(data);return saved;},
  async deleteSession(id){if(serverMode)return request('movement/'+id+'/',{method:'DELETE'});const data=read();data.sessions=data.sessions.filter(s=>s.id!==id);write(data);},
};
export function downloadCSV(filename,rows){
  if(!rows.length)return;
  const keys=Object.keys(rows[0]);
  const escape=value=>{let text=String(value??'');if(/^[=+@\-\t\r]/.test(text))text="'"+text;return '"'+text.replaceAll('"','""')+'"';};
  const csv=[keys,...rows.map(row=>keys.map(key=>row[key]))].map(row=>row.map(escape).join(',')).join('\r\n');
  const url=URL.createObjectURL(new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
export const money=value=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(value/100);
export const number=(n,digits=0)=>n===null||n===undefined||!Number.isFinite(n)?'—':n.toFixed(digits);
