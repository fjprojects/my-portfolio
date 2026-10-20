import {defineConfig} from 'vitest/config';
export default defineConfig({define:{'import.meta.env.VITE_DATA_MODE':JSON.stringify('demo')},test:{environment:'jsdom',include:['tests/*.ui.test.jsx'],setupFiles:['tests/setup.js'],testTimeout:15000}});
