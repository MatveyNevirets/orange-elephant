import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/vite';
import {leadMiddleware} from './server/lead';
export default defineConfig(({mode})=>{
 const env=loadEnv(mode,process.cwd(),'');
 return {plugins:[react(),tailwind(),{name:'lead-api',configureServer(server){server.middlewares.use('/api/lead',leadMiddleware(env));},configurePreviewServer(server){server.middlewares.use('/api/lead',leadMiddleware(env));}}]};
});
