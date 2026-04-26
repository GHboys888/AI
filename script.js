// 搜索
function search() {
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  filterCards(q, getActiveCategory());
}

document.getElementById('searchInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') search();
});

document.getElementById('searchInput').addEventListener('input', function() {
  const q = this.value.trim().toLowerCase();
  filterCards(q, getActiveCategory());
});

// 分类过滤
function filterCategory(cat) {
  document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  filterCards(q, cat);
}

function getActiveCategory() {
  const active = document.querySelector('.cat-btn.active');
  if (!active) return 'all';
  const onclick = active.getAttribute('onclick');
  const match = onclick.match(/'(.+?)'/);
  return match ? match[1] : 'all';
}

function filterCards(query, category) {
  const cards = document.querySelectorAll('.tool-card');
  let visible = 0;

  cards.forEach(card => {
    const catMatch = category === 'all' || card.dataset.category === category;
    const tags = (card.dataset.tags || '').toLowerCase();
    const title = card.querySelector('h3').textContent.toLowerCase();
    const desc = card.querySelector('p').textContent.toLowerCase();
    const queryMatch = !query || title.includes(query) || desc.includes(query) || tags.includes(query);

    if (catMatch && queryMatch) {
      card.classList.remove('hidden');
      visible++;
    } else {
      card.classList.add('hidden');
    }
  });

  // 无结果提示
  const existing = document.querySelector('.no-result');
  if (existing) existing.remove();
  if (visible === 0) {
    const div = document.createElement('div');
    div.className = 'no-result';
    div.textContent = `没有找到"${query}"相关的工具`;
    document.getElementById('toolsGrid').appendChild(div);
  }
}
