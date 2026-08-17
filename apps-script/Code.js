const NOTIFY_EMAIL = 'Juanesquivel@jpe-ventures.com';
const SHEET_TITLE = 'JPE Ventures - Form Intakes';
const TAB_NAME = 'Intakes';
const HEADERS = ['Timestamp', 'Name', 'Email', 'Project Type', 'Details'];

function doGet() {
  return json_({ ok: true, service: 'JPE Ventures Inquiries' });
}

function doPost(e) {
  try {
    const data = parseBody_(e);
    const fullName = String(data.fullName || '').trim();
    const email = String(data.email || '').trim();
    const projectType = String(data.projectType || '').trim();
    const details = String(data.details || '').trim();

    if (!fullName || !email || !projectType || !details) {
      return json_({ ok: false, error: 'Missing required fields' });
    }

    const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
    appendIntake_([timestamp, fullName, email, projectType, details]);
    sendNotice_(timestamp, fullName, email, projectType, details);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

function parseBody_(e) {
  if (e && e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (err) {
      return e.parameter || {};
    }
  }
  return (e && e.parameter) || {};
}

function getSpreadsheet_() {
  try {
    const active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) {
      return active;
    }
  } catch (err) {
    // Standalone script — fall through to saved/created spreadsheet.
  }

  const props = PropertiesService.getScriptProperties();
  const existingId = props.getProperty('SPREADSHEET_ID');

  if (existingId) {
    return SpreadsheetApp.openById(existingId);
  }

  const ss = SpreadsheetApp.create(SHEET_TITLE);
  props.setProperty('SPREADSHEET_ID', ss.getId());
  return ss;
}

function getIntakesSheet_() {
  const ss = getSpreadsheet_();
  let sheet = ss.getSheetByName(TAB_NAME);

  if (!sheet) {
    sheet = ss.getSheets()[0];
    sheet.setName(TAB_NAME);
  }

  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const needsHeaders = HEADERS.some(function (header, i) {
    return String(firstRow[i] || '') !== header;
  });

  if (needsHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function appendIntake_(row) {
  const sheet = getIntakesSheet_();
  sheet.appendRow(row);
}

function sendNotice_(timestamp, fullName, email, projectType, details) {
  const subject = 'New project inquiry from ' + fullName;
  const body = [
    'A new project inquiry was submitted on jpe-ventures.com.',
    '',
    'Submitted: ' + timestamp,
    'Name: ' + fullName,
    'Email: ' + email,
    'Project Type: ' + projectType,
    '',
    'Project Details:',
    details,
  ].join('\n');

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    replyTo: email,
    subject: subject,
    body: body,
  });
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
