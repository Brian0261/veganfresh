#!/usr/bin/env python3
"""Local, deterministic validation for the VEGANFRESH specification package."""
from pathlib import Path
from PIL import Image
import hashlib, json, re, sys, mimetypes
from xml.etree import ElementTree
ROOT=Path(__file__).resolve().parents[1]
checks=[]
def test(name,predicate,detail=''):
 ok=bool(predicate)
 checks.append({'name':name,'status':'PASS' if ok else 'FAIL','detail':detail})
 print(('PASS' if ok else 'FAIL'),name,detail)
 return ok

def sha(f):return hashlib.sha256(Path(f).read_bytes()).hexdigest()
BR=ROOT/'public/assets/brand'
ORIG=BR/'logo-original-preserved.png'
EXPECTED='8d835e10db36fff72b70dbc0aff7cef5b3592076471c5d32dadbc500cded0303'
if ORIG.exists():
 test('Fuente del logotipo A conservada por SHA256',sha(ORIG)==EXPECTED,sha(ORIG))
else:test('Fuente del logotipo A conservada por SHA256',False,'archivo ausente')
mandatory=['AGENTS.md','README.md','CODEX_START_HERE.md','CODEX_EXECUTION_PROMPT.md','.node-version',
'docs/00-project/DECISION_LOG.md','docs/01-brand/LOGO_USAGE.md','docs/02-design/PAGE_SPECIFICATIONS.md',
'docs/03-seo/SITE_ARCHITECTURE.md','docs/03-seo/KEYWORD_RESEARCH.md','docs/03-seo/COMPETITOR_ANALYSIS.md','docs/03-seo/SEO_OPPORTUNITY_MATRIX.md','docs/03-seo/CONTENT_EXPANSION_ROADMAP.md','docs/04-content/COPYWRITING.md','docs/05-technical/TECHNICAL_ARCHITECTURE.md',
'docs/05-technical/SECURITY_REQUIREMENTS.md','docs/05-technical/TOOLCHAIN_VERSIONS.md',
'docs/06-codex/ACCEPTANCE_CRITERIA.md','docs/06-codex/TESTING_STRATEGY.md',
'manifests/ASSET_MANIFEST.md','manifests/PAGE_ASSET_MAPPING.md','manifests/SPECIFICATION_INDEX.md']
test('Archivos fundamentales presentes',all((ROOT/x).is_file() for x in mandatory),f'{len(mandatory)} requeridos')
# all docs indexed (except README etc)
index=(ROOT/'manifests/SPECIFICATION_INDEX.md').read_text()
docs=list((ROOT/'docs').rglob('*.md'))
missing_index=[p.relative_to(ROOT).as_posix() for p in docs if p.relative_to(ROOT).as_posix() not in index]
test('Todos los documentos docs/ aparecen en índice',not missing_index,str(missing_index))
# Markdown links, don't mistake urls or #anchors for local files
broken=[]
for doc in ROOT.rglob('*.md'):
 text=doc.read_text(encoding='utf-8')
 for target in re.findall(r'\]\(([^)]+)\)',text):
  target=target.split(' ')[0]
  if target.startswith(('http://','https://','mailto:','#','data:')):continue
  target=target.split('#')[0]
  if target and not (doc.parent/target).exists():broken.append((doc.relative_to(ROOT).as_posix(),target))
test('Enlaces Markdown locales',not broken,str(broken[:5]))
# references in manifest (explicit entire file paths)
for manifest in ['manifests/SPECIFICATION_INDEX.md','manifests/PAGE_ASSET_MAPPING.md','manifests/ASSET_MANIFEST.md']:
 text=(ROOT/manifest).read_text(encoding='utf-8')
 paths=set(re.findall(r'`((?:docs|design|public|manifests|scripts)/[^`\n]+)`',text))
 # omit templates, markdown root index can include patterns and braces
 paths={x for x in paths if all(char not in x for char in ['*','<','>','{','}',',','?','|']) and not x.endswith('/') and '.md' in x or x.endswith(('.svg','.png','.webp','.ico','.html','.py'))}
 missing=[f for f in paths if not (ROOT/f).is_file()]
 test('Existencia rutas en '+manifest,not missing, f'{len(paths)} rutas; faltantes={missing[:5]}')
# All assets decode; SVG XML should parse
bad=[]
assets=list((ROOT/'public/assets').rglob('*'))
files=[x for x in assets if x.is_file()]
for p in files:
 try:
  if p.suffix=='.svg': ElementTree.parse(p)
  elif p.suffix.lower() in ('.png','.webp','.ico'):
   im=Image.open(p);im.verify()
 except Exception as e:bad.append((p.name,str(e)))
test('Integridad visual de assets',not bad,f'{len(files)} archivos: {bad[:4]}')
# 8 urls × 2 screenshot and 8 × 2 wireframes
pages=['home','productos','frutas','verduras','restaurantes','cotizar','privacidad','404']
badss=[]
for p in pages:
 for v,w in [('desktop',1440),('mobile',390)]:
  for rel in [f'design/mockups/{v}/{p}-{v}.png',f'design/wireframes/{p}-{v}-wireframe.png']:
   f=ROOT/rel
   if not f.is_file():badss.append(rel);continue
   try:
    im=Image.open(f)
    if im.width!=w:badss.append(f'{rel} ancho={im.width}, esperado={w}')
   except Exception:badss.append(rel+' corrupto')
test('Mockups y wireframes de 8 páginas x desktop/mobile',not badss,f'{len(pages)*4} archivos; {badss}')
# Ensure A logo, no obsolete symbol B referenced in rendered sources
legacy=[]
for file in (ROOT/'design/reference-layouts').glob('*.html'):
 text=file.read_text()
 if text.count('logo-primary.png') != 1 or text.count('logo-inverse.png') != 1: legacy.append(file.name+' logo count')
 if ('logo-primary.svg' in text or 'logo-previous.png' in text):legacy.append(file.name+' legacy logo')
 for item in re.findall(r'src="([^\"]+)"',text):
  if item.startswith('../../') and not (file.parent/item).resolve().is_file():legacy.append(file.name+' missing '+item)
test('Mockups/HTML referencian exclusivamente logo A y assets reales',not legacy,str(legacy))
# Screenshot report: images loaded and no width overflows, results are from existing render only
rp=ROOT/'design/mockups/RENDER_REPORT.json'
if rp.exists():
 info=json.loads(rp.read_text())
 badrender=[i for i in info if i.get('overflow') or not i.get('images_loaded')]
 test('Capturas ejecutadas: assets/overflow @ 1440,390,320',len(info)==len(pages)*3 and not badrender,f'{len(info)} comprobaciones; {badrender[:2]}')
else:test('Capturas ejecutadas',False,'Reporte ausente')
# SEO synchronized across instructions, page spec, content, paths and mockups.
seo=(ROOT/'docs/03-seo/SITE_ARCHITECTURE.md').read_text()
copy=(ROOT/'docs/04-content/COPYWRITING.md').read_text()
pagespec=(ROOT/'docs/02-design/PAGE_SPECIFICATIONS.md').read_text()
mapdoc=(ROOT/'manifests/PAGE_ASSET_MAPPING.md').read_text()
new_route='/productos/'
forms=[ROOT/'AGENTS.md',ROOT/'CODEX_START_HERE.md',ROOT/'CODEX_EXECUTION_PROMPT.md']
test('SEO nuevo /productos presente en fuentes P0',all(new_route in t for t in (seo,copy,pagespec,mapdoc)) and all(new_route in x.read_text() for x in forms))
test('P1/P2 documentadas pero no mockups ficticios', all(v in seo for v in ['/productos/papa-al-por-mayor/','P1 (NO construir ni publicar','P2 (NO publicar)']) and not any((ROOT/'design/reference-layouts'/f'{n}.html').is_file() for n in ['papa','cebolla','tomate','limon','palta']))
test('Regla catálogo orientativo y no stock',all('no inventario' in t.lower() or 'no stock' in t.lower() for t in [seo,copy,(ROOT/'AGENTS.md').read_text().lower()]))
# Each screenshot page represented by its exact mapping table.
test('Todas las páginas P0 con captura/manifiesto',all(f'design/mockups/desktop/{name}-desktop.png' in mapdoc and f'design/mockups/mobile/{name}-mobile.png' in mapdoc for name in pages))
# No local scratchpad, prompt includes all five commercial P0.
mdtemp=[]
for d in ROOT.rglob('*.md'):
 if '/mnt/data/' in d.read_text():mdtemp.append(str(d.relative_to(ROOT)))
test('Sin rutas temporales de sesión en Markdown',not mdtemp,str(mdtemp))
# Prevent stale or conflicting navigation instructions as active source of truth.
test('Navegación contiene Productos',all('productos' in (ROOT/x).read_text().lower() for x in ['docs/03-seo/SITE_ARCHITECTURE.md','docs/02-design/PAGE_SPECIFICATIONS.md','CODEX_START_HERE.md']))
# Package-wide invariants
agents=(ROOT/'AGENTS.md').read_text();prompt=(ROOT/'CODEX_EXECUTION_PROMPT.md').read_text()
test('Contrato logo A vigente',all('logo-original-preserved.png' in s for s in [agents,prompt]) and 'Sistema V — RECOMENDADO' not in agents)
test('Gestor exclusivo pnpm',all('pnpm' in s for s in [agents,prompt]) and (ROOT/'.node-version').read_text().strip()=='24.22.3')
test('Prompt completo con tests visuales y fase por fase',all(v in prompt for v in ['Playwright','1440','390','320','D1','Turnstile','pnpm','AGENTS.md']))
test('Ausencia del logo B como asset activo',not any('previous' in p.name or 'comparison' in p.name for p in BR.iterdir()))
# No app runtime, no package.json: tracked as pending not failed.
print('NOT_EXECUTED: pnpm dependency resolution (no registry), Astro build, Workers/D1 integration, deploy, actual site Lighthouse')
passes=sum(x['status']=='PASS' for x in checks)
report={'schema':'veganfresh-package-validation-v2','total':len(checks),'passed':passes,'failed':len(checks)-passes,'checks':checks,
 'not_executed':['pnpm install/build (sin acceso registry)','compatibilidad dependencias transitivas','API/Cloudflare D1/Turnstile/Resend real','Lighthouse de sitio final','QA WCAG final','despliegue y conectividad real']}
(ROOT/'manifests/PACKAGE_VALIDATION.json').write_text(json.dumps(report,indent=2,ensure_ascii=False)+'\n',encoding='utf8')
sys.exit(0 if passes==len(checks) else 2)
