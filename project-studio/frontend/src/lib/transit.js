export function clock(minutes) {
  const day = Math.floor(minutes / 1440);
  const h = Math.floor((minutes % 1440) / 60), m = minutes % 60;
  return String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0') + (day ? ' +'+day+'d' : '');
}
function directions(route) {
  return [route, {...route,stops:[...route.stops].reverse(),minutes:[...route.minutes].reverse().map(x=>route.minutes.at(-1)-x)}];
}
function leg(route, origin, destination, ready) {
  const a=route.stops.indexOf(origin), b=route.stops.indexOf(destination);
  if(a<0 || b<=a) return null;
  const offset=route.minutes[a];
  const trip=Math.max(0,Math.ceil((ready-route.first-offset)/route.headway));
  const start=route.first+trip*route.headway;
  if(start>route.last) return null;
  return {route:route.id,name:route.name,color:route.color,from:origin,to:destination,depart:start+offset,arrive:start+route.minutes[b],stops:route.stops.slice(a,b+1),fare:route.base_fare+route.per_stop*(b-a)};
}
export function journeys(network, origin, destination, depart, sort='fastest') {
  if(!network.stops.some(s=>s.id===origin)||!network.stops.some(s=>s.id===destination)) throw Error('Choose stops from the demo network.');
  if(origin===destination) throw Error('Choose different start and destination stops.');
  if(!Number.isInteger(depart)||depart<0||depart>=1440) throw Error('Choose a valid departure time.');
  const routes=network.routes.flatMap(directions), results=new Map();
  function add(legs){
    const id=legs.map(l=>l.route+':'+l.from+':'+l.to).join('|');
    results.set(id,{id,legs,depart:legs[0].depart,arrive:legs.at(-1).arrive,duration:legs.at(-1).arrive-depart,fare:legs.reduce((a,l)=>a+l.fare,0),transfers:legs.length-1});
  }
  for(const first of routes){
    const direct=leg(first,origin,destination,depart);
    if(direct) add([direct]);
    for(const transfer of first.stops){
      if([origin,destination].includes(transfer)) continue;
      const a=leg(first,origin,transfer,depart);
      if(!a) continue;
      for(const second of routes){
        if(first.id===second.id) continue;
        const b=leg(second,transfer,destination,a.arrive+5);
        if(b&&!a.stops.slice(0,-1).some(s=>b.stops.slice(1).includes(s))) add([a,b]);
      }
    }
  }
  const comparators={fastest:(a,b)=>a.arrive-b.arrive||a.transfers-b.transfers||a.fare-b.fare,cheapest:(a,b)=>a.fare-b.fare||a.arrive-b.arrive,fewest:(a,b)=>a.transfers-b.transfers||a.arrive-b.arrive||a.fare-b.fare};
  return [...results.values()].sort(comparators[sort]||comparators.fastest).slice(0,12);
}
