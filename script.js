function search() {
  var q = document.getElementById('searchInput').value.trim().toLowerCase();
  var active = document.querySelector('.cat-btn.active');
  var cat = 'all';
  if (active) {
    var m = active.getAttribute('onclick').match(/'([^']+)'/);
    if (m) cat = m[1];
  }
  filterCards(q, cat);
}

function filterCategory(cat, el) {
  document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
  el.classList.add('active');
  var q = document.getElementById('searchInput').value.trim().toLowerCase();
  filterCards(q, cat);
}

function filterCards(query, category) {
  var cards = document.querySelectorAll('.tool-card');
  var visible = 0;

  cards.forEach(function(card) {
    var catMatch = category === 'all' || card.dataset.category === category;
    var tags = (card.dataset.tags || '').toLowerCase();
    var title = card.querySelector('h3').textContent.toLowerCase();
    var desc = card.querySelector('p').textContent.toLowerCase();
    var queryMatch = !query || title.includes(query) || desc.includes(query) || tags.includes(query);

    if (catMatch && queryMatch) {
      card.classList.remove('hidden');
      visible++;
    } else {
      card.classList.add('hidden');
    }
  });

  var existing = document.querySelector('.no-result');
  if (existing) existing.remove();
  if (visible === 0) {
    var div = document.createElement('div');
    div.className = 'no-result';
    div.textContent = '没有找到"' + query + '"相关的工具';
    document.getElementById('toolsGrid').appendChild(div);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var input = document.getElementById('searchInput');
  if (input) {
    input.addEventListener('input', function() {
      var q = this.value.trim().toLowerCase();
      var active = document.querySelector('.cat-btn.active');
      var cat = 'all';
      if (active) {
        var m = active.getAttribute('onclick').match(/'([^']+)'/);
        if (m) cat = m[1];
      }
      filterCards(q, cat);
    });
  }
});
