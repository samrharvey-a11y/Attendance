/**
 * Pulls the attendance tracker from Synergy into the "Data" tab.
 *
 * Setup:
 *  1. Project Settings > Script Properties: add SYNERGY_URL, SYNERGY_USER and SYNERGY_PASS
 *     (ideally a dedicated read-only login, approved by IT / data protection).
 *  2. Run peek() once and check the Raw tab (A1 should be 200).
 *  3. Run importSynergy(), then add a daily time-driven trigger for it.
 */
const URL = PropertiesService.getScriptProperties().getProperty('SYNERGY_URL'); // set in Script Properties
const TAB = 'Data';

function authHeader_() {
  const p = PropertiesService.getScriptProperties();
  return 'Basic ' + Utilities.base64Encode(p.getProperty('SYNERGY_USER') + ':' + p.getProperty('SYNERGY_PASS'));
}

function importSynergy() {
  const res = UrlFetchApp.fetch(URL, { headers: { Authorization: authHeader_() }, muteHttpExceptions: true });
  if (res.getResponseCode() !== 200) throw new Error('Synergy said ' + res.getResponseCode());
  const type = String(res.getHeaders()['Content-Type'] || '');
  const text = res.getContentText();
  const rows = /csv|text\/plain/i.test(type) ? Utilities.parseCsv(text) : tableToRows_(text);
  if (!rows.length) throw new Error('No rows found. Run peek() and check the Raw tab.');

  const ss = SpreadsheetApp.getActive();
  const sh = ss.getSheetByName(TAB) || ss.insertSheet(TAB);
  sh.clearContents();
  const width = Math.max(...rows.map(r => r.length));
  sh.getRange(1, 1, rows.length, width).setValues(rows.map(r => r.concat(Array(width - r.length).fill(''))));
  sh.getRange('Z1').setValue('Updated ' + new Date());
}

function tableToRows_(html) {
  const table = (html.match(/<table[\s\S]*?<\/table>/i) || [''])[0];
  const clean = s => s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').trim();
  return (table.match(/<tr[\s\S]*?<\/tr>/gi) || []).map(tr =>
    (tr.match(/<t[dh][^>]*>[\s\S]*?<\/t[dh]>/gi) || []).map(clean));
}

function peek() {
  const res = UrlFetchApp.fetch(URL, { headers: { Authorization: authHeader_() }, muteHttpExceptions: true });
  const ss = SpreadsheetApp.getActive();
  const sh = ss.getSheetByName('Raw') || ss.insertSheet('Raw');
  sh.clear().getRange('A1:A3').setValues([[res.getResponseCode()], [String(res.getHeaders()['Content-Type'])], [res.getContentText().slice(0, 40000)]]);
}
