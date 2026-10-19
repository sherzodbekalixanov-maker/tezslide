import {useState} from 'react';import {useNavigate,useSearchParams} from 'react-router-dom';import {Loader2} from 'lucide-react';
import {generateSlides} from '../lib/ai';import {supabase} from '../lib/supabase';import {useAuth} from '../lib/auth';import {THEMES} from '../lib/themes';
const L=({t,c})=><label className="block"><span className="text-sm text-white/70">{t}</span>{c}</label>;
export default function Create(){const [sp]=useSearchParams(),nav=useNavigate(),{user}=useAuth();
const [f,setF]=useState({topic:sp.get('topic')||'',count:8,lang:'uz',style:sp.get('style')||'neon',audience:'',goal:'',extra:''}),[busy,setB]=useState(false),[err,setErr]=useState('');
const s=k=>e=>setF({...f,[k]:e.target.value});
async function go(e){e.preventDefault();setB(true);setErr('');try{const slides=await generateSlides({...f,count:+f.count});
const {data,error}=await supabase.from('presentations').insert({user_id:user.id,title:f.topic,theme:f.style,slides}).select().single();if(error)throw error;nav(`/editor/${data.id}`)}catch(x){setErr(x.message);setB(false)}}
return <div className="pt-32 max-w-2xl mx-auto px-4"><form onSubmit={go} className="glass p-8 space-y-4"><h1 className="text-3xl font-extrabold grad">AI bilan yaratish</h1>
<L t="Mavzu" c={<input required className="inp" value={f.topic} onChange={s('topic')}/>}/>
<div className="grid grid-cols-2 gap-4"><L t="Slaydlar soni" c={<input type="number" min={3} max={20} className="inp" value={f.count} onChange={s('count')}/>}/>
<L t="Til" c={<select className="inp" value={f.lang} onChange={s('lang')}><option value="uz">O‘zbekcha</option><option value="en">English</option><option value="ru">Русский</option></select>}/></div>
<L t="Dizayn uslubi" c={<select className="inp" value={f.style} onChange={s('style')}>{Object.entries(THEMES).map(([k,v])=><option key={k} value={k}>{v.name}</option>)}</select>}/>
<L t="Auditoriya" c={<input className="inp" value={f.audience} onChange={s('audience')}/>}/><L t="Maqsad" c={<input className="inp" value={f.goal} onChange={s('goal')}/>}/>
<L t="Qo‘shimcha ko‘rsatmalar" c={<textarea className="inp" rows={3} value={f.extra} onChange={s('extra')}/>}/>
{err&&<p className="text-red-400 text-sm">{err}</p>}
<button className="btn w-full flex justify-center gap-2" disabled={busy}>{busy&&<Loader2 className="animate-spin"/>}{busy?'AI yaratmoqda…':'Prezentatsiya yaratish'}</button></form></div>}
