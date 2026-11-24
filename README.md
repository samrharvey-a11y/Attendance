# Attendance Milestones – Rainford High

A mock-up of an app that helps pastoral teams and tutors move students' attendance up in milestones (10%, 20% … 90%, 95%). It will later be rebuilt in Google Apps Script.

**Everything in this repo uses made-up sample data.** Real pupil data must never be committed. The `.gitignore` blocks everything in `data/` except the sample file, plus any `.xlsx`, `.xls` or `.csv` file.

## Open the mock-up

Download `dist/attendance-milestones.html` and open it in Chrome, Edge or Safari, on a phone, tablet or PC. It works offline and saves to that browser only.

Sign in as:
- **Vice Principal:** every year group, Monitoring and Settings.
- **Year X Pastoral:** lists and monitoring for that year only.
- **A tutor:** students in their form who are close to a milestone, with a tick to log a conversation.

## What it does

- Works out the days a student needs to reach each milestone: (target × possible − present) ÷ (1 − target), rounded up to the half day.
- Counts school days left from the last day of the year and a holiday and INSET calendar.
- **Lists:** New, Reward due and Check-in, sorted by where the student is now (block, floor, room).
- **Logging:** check-in completed, goal set and reward given. Each milestone can be rewarded only once.
- **Alerts:** streaks of full attendance, and off-track alerts when attendance drops after a goal is set.
- **Tutor view:** a tick to log a conversation, with a VP summary of which forms are logging conversations.
- **Weekly summary:** one printable A4 page.

## Build

```
python scripts/build.py                   # builds dist/ with the sample data
python scripts/make-sample-data.py        # regenerates the sample data
```

Data format, one row per student: `[student number, year, tutor group, days possible, days present]`.

## Folders

| Path | What |
|---|---|
| `src/app.html` | App source (`/*DATA*/` and `/*LOGO*/` are filled in by the build) |
| `dist/attendance-milestones.html` | Built single-file app |
| `assets/logo.png` | School logo |
| `apps-script/import-synergy.gs` | Daily import from Synergy into a Google Sheet (basic sign-in) |
| `scripts/` | Build and sample-data scripts |

## Branches

- `main`: the simplified version, which is the current one.
- `full-version`: the earlier, fuller interface, kept in case we want to go back.
