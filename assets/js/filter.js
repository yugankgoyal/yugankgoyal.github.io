// Field filter: buttons [data-filter] show/hide items [data-fields] inside a [data-filterable] container.
document.querySelectorAll('[data-filterable]').forEach(function (root) {
  var buttons = root.querySelectorAll('[data-filter]');
  var items = root.querySelectorAll('[data-fields]');
  var groups = root.querySelectorAll('[data-group]');

  function has(item, f) {
    return item.dataset.fields.split(' ').indexOf(f) !== -1;
  }

  // counts (and hide fields that have no items on this page)
  buttons.forEach(function (b) {
    var f = b.dataset.filter, n = 0;
    items.forEach(function (i) { if (f === 'all' || has(i, f)) n++; });
    var c = b.querySelector('.count');
    if (c) c.textContent = n;
    if (n === 0) b.parentNode.hidden = true;
  });

  function apply(f) {
    items.forEach(function (i) { i.hidden = f !== 'all' && !has(i, f); });
    groups.forEach(function (g) { g.hidden = !g.querySelector('[data-fields]:not([hidden])'); });
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.filter === f ? 'true' : 'false'); });
    try { history.replaceState(null, '', f === 'all' ? location.pathname : '#' + f); } catch (e) {}
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { apply(b.dataset.filter); });
  });

  var start = location.hash.slice(1);
  apply(start && root.querySelector('[data-filter="' + start + '"]') ? start : 'all');
});
