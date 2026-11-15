#!/usr/bin/env python3
"""Browser checks of the *reference mockups*, never the actual production website."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import base64,mimetypes,json,re
ROOT=Path(__file__).resolve().parents[1]
REF=ROOT/'design/reference-layouts'
CSS=(REF/'mockup.css').read_text(encoding='utf8')
PAGES=['home','productos','frutas','verduras','restaurantes','cotizar','privacidad','404']
WIDTHS=[320,390,768,1024,1440,1920]
recs=[]
def render_html(name):
 s=(REF/f'{name}.html').read_text(encoding='utf8').replace('<link rel="stylesheet" href="mockup.css">','<style>'+CSS+'</style>')
 def subst(m):
  file=(REF/m.group(1)).resolve(strict=True)
  assert file.is_relative_to(ROOT)
  payload=base64.b64encode(file.read_bytes()).decode('ascii')
  mt=mimetypes.guess_type(file.name)[0] or 'application/octet-stream'
  return 'src="data:'+mt+';base64,'+payload+'"'
 return re.sub(r'src="(\.\./\.\./[^"]+)"',subst,s)
with sync_playwright() as pw:
 browser=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
 for name in PAGES:
  content=render_html(name)
  for w in WIDTHS:
   pg=browser.new_page(viewport={'width':w,'height':900},device_scale_factor=1)
   pg.set_content(content,wait_until='load',timeout=30000)
   actual=pg.evaluate('document.documentElement.scrollWidth')
   imgs=pg.locator('img').evaluate_all('(els)=>els.every(e=>e.complete && e.naturalWidth>0)')
   logocount=pg.locator('header .logo img').count()
   hasproducts=pg.locator('header nav a[href="/productos/"]').count()==1
   # in 404 variant too, after patch
   result={'page':name,'width':w,'horizontal_overflow':actual>w,'scroll_width':actual,'images_loaded':imgs,'logo_header':logocount==1,'products_nav':hasproducts}
   recs.append(result);pg.close()
 browser.close()
path=ROOT/'design/mockups/RESPONSIVE_CHECKS.json'
path.write_text(json.dumps(recs,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
fail=[x for x in recs if x['horizontal_overflow'] or not x['images_loaded'] or not x['logo_header'] or not x['products_nav']]
print('CHECKS',len(recs),'PASS',len(recs)-len(fail),'FAIL',len(fail))
for x in fail[:20]:print(x)
raise SystemExit(0 if not fail else 1)
