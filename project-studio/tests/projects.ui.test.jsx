import React from 'react';
import {describe,it,expect,vi} from 'vitest';
import {render,screen,act,waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Account} from '../frontend/src/lib/account';
import Timberly from '../frontend/src/projects/Timberly';
import BusApp from '../frontend/src/projects/BusApp';
import MotionStudio from '../frontend/src/projects/MotionStudio';

vi.mock('leaflet',()=>{const chain=()=>{const x={};for(const method of ['setView','on','addTo','clearLayers','bindTooltip','fitBounds','invalidateSize','remove'])x[method]=()=>x;return x;};return {default:{map:chain,tileLayer:chain,layerGroup:chain,polyline:chain,circleMarker:chain}};});
const account={user:null,requireAccount:()=>true};
const wrap=component=>render(<Account.Provider value={account}>{component}</Account.Provider>);
describe('Complete demo interactions',()=>{
  it('browses furniture, saves an order, and reloads it in the order history',async()=>{
    const user=userEvent.setup();wrap(<Timberly/>);
    await user.click(await screen.findByRole('button',{name:'Add Sunday Sofa to cart'}));
    await user.click(screen.getByRole('button',{name:'Bag 1'}));
    await user.click(screen.getByRole('button',{name:/Place demo order/}));
    await screen.findByText('A little more like home.');
    const stored=JSON.parse(localStorage.getItem('francis-studio-v1'));expect(stored.orders).toHaveLength(1);expect(stored.orders[0].total).toBe(3890000);
    await user.click(screen.getByRole('button',{name:'Close dialog'}));
    await user.click(screen.getByRole('button',{name:'My orders'}));
    await screen.findByText('1 × Sunday Sofa');
  });
  it('plans a journey then handles an invalid same-stop search',async()=>{
    const user=userEvent.setup();wrap(<BusApp/>);
    await user.click(await screen.findByRole('button',{name:'Find journeys'}));
    await screen.findByText('Your journey, step by step');
    expect(screen.getByText(/journey options/)).toBeTruthy();
    await user.selectOptions(screen.getByLabelText('To'),'railway');
    await user.click(screen.getByRole('button',{name:'Find journeys'}));
    await screen.findByText('Choose different start and destination stops.');
  });
  for(const kind of ['recovery','gait'])it('runs and saves a labelled '+kind+' simulation without camera access',async()=>{
    vi.useFakeTimers({toFake:['setTimeout','clearTimeout','requestAnimationFrame','cancelAnimationFrame','performance']});
    wrap(<MotionStudio kind={kind}/>);
    await act(async()=>{});
    await act(async()=>{screen.getByRole('button',{name:'Run 12-second simulation'}).click();});
    await act(async()=>{vi.advanceTimersByTime(12500);});
    expect(screen.getByRole('button',{name:'Save session'}).disabled).toBe(false);
    await act(async()=>{screen.getByRole('button',{name:'Save session'}).click();});
    const stored=JSON.parse(localStorage.getItem('francis-studio-v1'));
    expect(stored.sessions).toHaveLength(1);expect(stored.sessions[0].source).toBe('simulation');expect(stored.sessions[0].kind).toBe(kind);expect(stored.sessions[0].reps).toBeGreaterThan(0);
  });
});
