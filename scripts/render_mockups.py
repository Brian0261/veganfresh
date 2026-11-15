#!/usr/bin/env python3
"""Render reference HTML with approved A logo and inlined assets, offline."""
from pathlib import Path
from playwright.sync_api import sync_playwright
from PIL import Image, ImageDraw
import base64,mimetypes,re,json
ROOT=Path(__file__).resolve().parents[1]; REF=ROOT/'design/reference-layouts'; OUT=ROOT/'design/mockups'
PAGES=['home','productos','frutas','verduras','restaurantes','cotizar','privacidad','404']
CSS=(REF/'mockup.css').read_text(encoding='utf-8')
for mode in ['desktop','mobile']:(OUT/mode).mkdir(parents=True,exist_ok=True)
def render_html(name):
 s=(REF/f'{name}.html').read_text(encoding='utf-8').replace('<link rel="stylesheet" href="mockup.css">',f'<style>{CSS}</style>')
 def replace(m):
  file=(REF/m.group(1)).resolve()
  assert file.is_relative_to(ROOT) and file.is_file(),file
  content=base64.b64encode(file.read_bytes()).decode()
  return f'src="data:{mimetypes.guess_type(file.name)[0] or "application/octet-stream"};base64,{content}"'
 return re.sub(r'src="(\.\./\.\./[^\"]+)"',replace,s)
reports=[]
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
 for name in PAGES:
  html=render_html(name)
  for mode,(width,height) in [('desktop',(1440,900)),('mobile',(390,844)),('small',(320,744))]:
   page=browser.new_page(viewport={'width':width,'height':height},device_scale_factor=1)
   page.set_content(html,wait_until='load',timeout=30000)
   scroll=page.evaluate('document.documentElement.scrollWidth')
   loaded=page.locator('img').evaluate_all('(a)=>a.every(i=>i.complete&&i.naturalWidth>0)')
   result={'page':name,'mode':mode,'width':width,'scroll_width':scroll,'overflow':scroll>width,'images_loaded':loaded}
   if mode!='small':
    path=OUT/mode/f'{name}-{mode}.png';page.screenshot(path=str(path),full_page=True,animations='disabled',timeout=30000)
    result['path']=str(path.relative_to(ROOT))
   reports.append(result); print(name,mode,'loaded',loaded,'overflow',scroll-width,flush=True)
   page.close()
 browser.close()
(OUT/'RENDER_REPORT.json').write_text(json.dumps(reports,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
# overview: 3 columns x 2 rows with each page desktop+mobile crop
canvas=Image.new('RGB',(1536,2130),'#F6F3EB'); draw=ImageDraw.Draw(canvas)
for idx,name in enumerate(PAGES):
 x=(idx%3)*510+5;y=(idx//3)*695+20
 desktop=Image.open(OUT/'desktop'/f'{name}-desktop.png').convert('RGB')
 mobile=Image.open(OUT/'mobile'/f'{name}-mobile.png').convert('RGB')
 d=desktop.resize((300,max(1,int(desktop.height*300/desktop.width))),Image.Resampling.LANCZOS)
 m=mobile.resize((180,max(1,int(mobile.height*180/mobile.width))),Image.Resampling.LANCZOS)
 canvas.paste(d.crop((0,0,300,min(650,d.height))),(x,y+24))
 canvas.paste(m.crop((0,0,180,min(650,m.height))),(x+312,y+24))
 draw.text((x,y),f'{name.upper()} / DESKTOP + MOBILE',fill='#15372D')
canvas.save(ROOT/'design/OVERVIEW_A.png',optimize=True)
