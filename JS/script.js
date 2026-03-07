// ============================================================
//  © 2025 Mohammad Jaffar — All Rights Reserved
//  Unauthorised copying or redistribution is prohibited.
// ============================================================

(function () {

  /* ---------- TAB SWITCHING ---------- */
  function show(id, btn) {
    document.querySelectorAll('.section').forEach(function (s) { s.classList.remove('active'); });
    document.querySelectorAll('nav button').forEach(function (b) { b.classList.remove('active'); });
    var section = document.getElementById(id);
    if (section) section.classList.add('active');
    if (btn) btn.classList.add('active');
  }
  window.show = show;

  /* ---------- ACCORDION ---------- */
  function toggle(header) {
    header.classList.toggle('open');
    var body = header.nextElementSibling;
    if (body) body.classList.toggle('open');
  }
  window.toggle = toggle;

  /* ---------- INIT ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    var firstBtn = document.querySelector('nav button');
    var firstSection = document.querySelector('.section');
    if (firstBtn) firstBtn.classList.add('active');
    if (firstSection) firstSection.classList.add('active');
  });

  /* ---------- DISABLE RIGHT-CLICK ---------- */
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    showWarning();
  });

  /* ---------- DISABLE COMMON KEYBOARD SHORTCUTS ---------- */
  document.addEventListener('keydown', function (e) {
    var key = e.key.toLowerCase();
    // Block F12
    if (e.keyCode === 123) { e.preventDefault(); showWarning(); return; }
    // Block Ctrl+U (view source), Ctrl+S (save), Ctrl+Shift+I/J/C (devtools), Ctrl+A (select all)
    if (e.ctrlKey && ['u', 's', 'a'].includes(key)) { e.preventDefault(); showWarning(); return; }
    if (e.ctrlKey && e.shiftKey && ['i', 'j', 'c', 'k'].includes(key)) { e.preventDefault(); showWarning(); return; }
    // Block Ctrl+P (print/save as PDF)
    if (e.ctrlKey && key === 'p') { e.preventDefault(); showWarning(); return; }
  });

  /* ---------- DEVTOOLS DETECTION ---------- */
  var devtoolsOpen = false;
  var threshold = 160;
  setInterval(function () {
    var widthDiff  = window.outerWidth  - window.innerWidth  > threshold;
    var heightDiff = window.outerHeight - window.innerHeight > threshold;
    if ((widthDiff || heightDiff) && !devtoolsOpen) {
      devtoolsOpen = true;
      document.body.innerHTML = '';
      document.body.style.background = '#0f172a';
      document.body.style.display = 'flex';
      document.body.style.alignItems = 'center';
      document.body.style.justifyContent = 'center';
      document.body.style.height = '100vh';
      document.body.innerHTML =
        '<div style="text-align:center;color:white;font-family:sans-serif;">' +
        '<div style="font-size:3rem;margin-bottom:16px;">🚫</div>' +
        '<h2 style="color:#fbbf24;margin-bottom:12px;">Access Restricted</h2>' +
        '<p style="color:#94a3b8;max-width:320px;line-height:1.6;">Developer tools are not permitted on this page.<br><br>' +
        '© 2025 Mohammad Jaffar. All rights reserved.</p>' +
        '</div>';
    }
    if (!widthDiff && !heightDiff) { devtoolsOpen = false; }
  }, 1000);

  /* ---------- DISABLE TEXT SELECTION ---------- */
  document.addEventListener('selectstart', function (e) { e.preventDefault(); });
  document.addEventListener('dragstart',   function (e) { e.preventDefault(); });

  /* ---------- WARNING TOAST ---------- */
  function showWarning() {
    var existing = document.getElementById('__warn__');
    if (existing) return;
    var toast = document.createElement('div');
    toast.id = '__warn__';
    toast.style.cssText =
      'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);' +
      'background:#1e293b;color:white;padding:14px 24px;border-radius:10px;' +
      'font-family:sans-serif;font-size:0.88rem;z-index:99999;' +
      'border-left:4px solid #fbbf24;box-shadow:0 4px 20px rgba(0,0,0,0.4);' +
      'max-width:320px;text-align:center;line-height:1.5;';
    toast.innerHTML = '🔒 <strong>Content Protected</strong><br>' +
      '<span style="color:#94a3b8;font-size:0.82rem;">© 2025 Mohammad Jaffar. Copying is not permitted.</span>';
    document.body.appendChild(toast);
    setTimeout(function () { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 3000);
  }

})();
