import math

def directions(route):
    yield route
    yield {**route,'stops':list(reversed(route['stops'])),'minutes':[route['minutes'][-1]-x for x in reversed(route['minutes'])]}

def leg(route, origin, destination, ready):
    if origin not in route['stops'] or destination not in route['stops']: return None
    a,b=route['stops'].index(origin),route['stops'].index(destination)
    if b <= a: return None
    offset=route['minutes'][a]
    trip=max(0,math.ceil((ready-route['first']-offset)/route['headway']))
    start=route['first']+trip*route['headway']
    if start > route['last']: return None
    return {'route':route['id'],'name':route['name'],'color':route['color'],'from':origin,'to':destination,'depart':start+offset,'arrive':start+route['minutes'][b],'stops':route['stops'][a:b+1],'fare':route['base_fare']+route['per_stop']*(b-a)}

def journeys(network, origin, destination, depart, sort='fastest'):
    ids={s['id'] for s in network['stops']}
    if origin not in ids or destination not in ids: raise ValueError('Select stops from the demo network.')
    if origin==destination: raise ValueError('Choose different start and destination stops.')
    if not 0<=depart<1440: raise ValueError('Departure must be a time within one day.')
    routes=[r for route in network['routes'] for r in directions(route)]
    results=[]
    def add(legs):
        results.append({'id':'|'.join(x['route']+':'+x['from']+':'+x['to'] for x in legs),'legs':legs,'depart':legs[0]['depart'],'arrive':legs[-1]['arrive'],'duration':legs[-1]['arrive']-depart,'fare':sum(x['fare'] for x in legs),'transfers':len(legs)-1})
    for first in routes:
        direct=leg(first,origin,destination,depart)
        if direct: add([direct])
        for transfer in first['stops']:
            if transfer in (origin,destination): continue
            a=leg(first,origin,transfer,depart)
            if not a: continue
            for second in routes:
                if second['id']==first['id']: continue
                b=leg(second,transfer,destination,a['arrive']+5)
                if b and not set(a['stops'][:-1]).intersection(b['stops'][1:]): add([a,b])
    unique={r['id']:r for r in results}
    keys={'fastest':lambda r:(r['arrive'],r['transfers'],r['fare']), 'cheapest':lambda r:(r['fare'],r['arrive']), 'fewest':lambda r:(r['transfers'],r['arrive'],r['fare'])}
    return sorted(unique.values(),key=keys.get(sort,keys['fastest']))[:12]
