// Receives messages from the arunabh.me contact form, adds each one to this Sheet
// and sends an email alert.
//
// Setup: open the Sheet, then Extensions > Apps Script, and paste this file in.
// Deploy > New deployment > Web app, with "Execute as: Me" and "Who has access: Anyone".
// Put the /exec URL in contact.formEndpoint in public/data/portfolio.json.
// After editing this file, publish it with Manage deployments > Edit > New version,
// which keeps the same URL.

const NOTIFY_EMAIL = 'arunabhmaster@gmail.com';
const MAX_LENGTHS = { name: 100, email: 254, message: 5000 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Bots fill the hidden "website" field. Report success so they don't retry.
    if (data.website) {
      return respond({ ok: true });
    }

    const name = clean(data.name, MAX_LENGTHS.name).replace(/\s+/g, ' ');
    const email = clean(data.email, MAX_LENGTHS.email);
    const message = clean(data.message, MAX_LENGTHS.message);

    if (!name || !message || !EMAIL_PATTERN.test(email)) {
      return respond({ ok: false, error: 'invalid' });
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      SpreadsheetApp.getActiveSpreadsheet()
        .getSheets()[0]
        .appendRow([new Date(), neutralise(name), neutralise(email), neutralise(message)]);
    } finally {
      lock.releaseLock();
    }

    notify(name, email, message);
    return respond({ ok: true });
  } catch (error) {
    console.error(error);
    return respond({ ok: false, error: 'server' });
  }
}

// The message is already saved by this point, so a failed alert must not fail the request.
function notify(name, email, message) {
  try {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: 'Portfolio message from ' + name,
      body: 'From: ' + name + ' <' + email + '>\n\n' + message,
    });
  } catch (error) {
    console.error(error);
  }
}

function clean(value, maxLength) {
  return String(value === undefined || value === null ? '' : value)
    .trim()
    .slice(0, maxLength);
}

// Stops Sheets from running submitted text as a formula.
function neutralise(value) {
  return /^[=+\-@\t\r]/.test(value) ? "'" + value : value;
}

function respond(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
