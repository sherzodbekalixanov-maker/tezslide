import {useState} from 'react';import {useNavigate} from 'react-router-dom';import {supabase} from '../lib/supabase';
export default function Auth(){const [reg,setReg]=useState(false),[email,setE]=useState(''),[pw,setP]=useState(''),[msg,setM]=useState(null),[b,setB]=useState(false),nav=useNavigate();
async function go(e){e.preventDefault();setB(true);setM(null);
const {data,error}=reg?await supabase.auth.signUp({email,password:pw}):await supabase.auth.signInWithPassword({email,password:pw});setB(false);
if(error)return setM({e:1,t:error.message});
if(reg&&!data.session)return setM({t:'Emailingizni tasdiqlang, so‘ng kiring.'});nav('/my')}
return <div className="pt-36 max-w-md mx-auto px-4"><form onSubmit={go} className="glass p-8 space-y-4"><h1 className="text-2xl font-bold">{reg?'Ro‘yxatdan o‘tish':'Kirish'}</h1>
<input className="inp" type="email" required placeholder="Email" value={email} onChange={e=>setE(e.target.value)}/>
<input className="inp" type="password" required minLength={6} placeholder="Parol (kamida 6 belgi)" value={pw} onChange={e=>setP(e.target.value)}/>
{msg&&<p className={msg.e?'text-red-400':'text-green-400'}>{msg.t}</p>}
<button className="btn w-full" disabled={b}>{b?'Kuting…':reg?'Ro‘yxatdan o‘tish':'Kirish'}</button>
<button type="button" className="text-sm text-cyan-300" onClick={()=>setReg(!reg)}>{reg?'Akkauntim bor':'Akkaunt yaratish'}</button></form></div>}
