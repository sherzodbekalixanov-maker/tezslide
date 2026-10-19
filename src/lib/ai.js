import {supabase} from './supabase';
export async function generateSlides(p){const {data,error}=await supabase.functions.invoke('generate',{body:p});
if(error)throw new Error(error.message);if(data?.error)throw new Error(data.error);return data.slides}
