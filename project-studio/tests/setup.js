import {vi,afterEach} from 'vitest';
import {cleanup} from '@testing-library/react';
afterEach(()=>{cleanup();localStorage.clear();vi.useRealTimers();});
globalThis.ResizeObserver=class{observe(){}unobserve(){}disconnect(){}};
HTMLCanvasElement.prototype.getContext=()=>new Proxy({},{get:()=>()=>{}});
HTMLMediaElement.prototype.pause=()=>{};
