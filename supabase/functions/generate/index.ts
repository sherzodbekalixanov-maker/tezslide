import {createClient} from "npm:@supabase/supabase-js@2";
const cors={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"authorization, content-type, apikey, x-client-info"};
const J=(b:unknown,s=200)=>new Response(JSON.stringify(b),{status:s,headers:{...cors,"Content-Type":"application/json"}});
const LN:Record<string,string>={uz:"Uzbek (Latin)",en:"English",ru:"Russian"};
Deno.serve(async req=>{if(req.method==="OPTIONS")return new Response("ok",{headers:cors});
const sb=createClient(Deno.env.get("SUPABASE_URL")!,Deno.env.get("SUPABASE_ANON_KEY")!,{global:{headers:{Authorization:req.headers.get("Authorization")??""}}});
const {data:{user}}=await sb.auth.getUser();if(!user)return J({error:"Avval tizimga kiring"},401);
const p=await req.json();const n=Math.min(Math.max(+p.count||8,3),20);
const prompt=`Create a ${n}-slide presentation. Topic: ${p.topic}. Language: ${LN[p.lang]||"English"}. Audience: ${p.audience||"general"}. Goal: ${p.goal||"inform"}. Extra: ${p.extra||"none"}.
Return ONLY a JSON array of exactly ${n} objects: {"title":string,"bullets":string[3-5 short],"notes":string (speaker notes, 2-3 sentences)}. No markdown, no code fences.`;
const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":Deno.env.get("ANTHROPIC_API_KEY")!,"anthropic-version":"2023-06-01","content-type":"application/json"},body:JSON.stringify({model:Deno.env.get("AI_MODEL")||"claude-sonnet-5-5",max_tokens:8000,messages:[{role:"user",content:prompt}]})});
if(!r.ok)return J({error:"AI xatosi: "+(await r.text()).slice(0,200)},502);
const d=await r.json();const txt=(d.content?.[0]?.text||"").replace(/```json|```/g,"").trim();
try{return J({slides:JSON.parse(txt)})}catch{return J({error:"AI javobini o‘qib bo‘lmadi, qayta urinib ko‘ring"},502)}});
