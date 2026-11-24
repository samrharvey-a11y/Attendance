"""Makes made-up sample data in the same shape as the SIMS/Synergy export.

Each row: [student number, year, tutor group, days possible, days present].
Nothing here is real pupil data.
"""
import json, random, pathlib

random.seed(2027)
YEARS = {'Year 7': 6, 'Year 8': 16, 'Year 9': 17, 'Year 10': 15, 'Year 11': 34, 'Year 12': 13, 'Year 13': 16}
FORMS = {'Year 7': ['7A', '7B', '7C'], 'Year 8': ['8A', '8B', '8C', '8D'], 'Year 9': ['9A', '9B', '9C', '9D'],
         'Year 10': ['10A', '10B', '10C', '10D'], 'Year 11': ['11A', '11B', '11C', '11D', '11E', '11F'],
         'Year 12': ['12T1', '12T2'], 'Year 13': ['13T1', '13T2']}
rows, n = [], 1
for year, count in YEARS.items():
    for _ in range(count):
        tutor = random.choice(FORMS[year]) if random.random() > 0.06 else 'REFLECT'
        possible = 54 if random.random() > 0.12 else random.choice([24, 28.5, 30, 36, 42.5, 46.5])
        pct = min(0.78, max(0.0, random.betavariate(5, 2.2) * 0.85))
        present = round(possible * pct * 2) / 2
        rows.append([n, year, tutor, possible, present]); n += 1
rows += [[n, 'Year 9', '9A', 0, 0], [n + 1, 'Year 11', '11B', 0, 0]]  # new arrivals with no data yet
out = pathlib.Path(__file__).resolve().parent.parent / 'data' / 'sample-data.json'
out.write_text(json.dumps(rows, separators=(',', ':')))
print(f'Wrote {len(rows)} made-up students to {out}')
