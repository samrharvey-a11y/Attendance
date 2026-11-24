"""Builds the single-file app from src/app.html.

Usage:
  python scripts/build.py                      # uses data/sample-data.json
  python scripts/build.py data/my-export.json  # uses another data file (keep real data out of git)
"""
import base64, pathlib, sys

root = pathlib.Path(__file__).resolve().parent.parent
data_file = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else root / 'data' / 'sample-data.json'
logo = 'data:image/png;base64,' + base64.b64encode((root / 'assets' / 'logo.png').read_bytes()).decode()
html = (root / 'src' / 'app.html').read_text(encoding='utf-8')
html = html.replace('/*DATA*/', data_file.read_text(encoding='utf-8')).replace('/*LOGO*/', logo)
out = root / 'dist' / 'attendance-milestones.html'
out.write_text(html, encoding='utf-8')
print(f'Built {out} from {data_file.name}')
