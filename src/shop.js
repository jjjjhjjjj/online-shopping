// data 불러오기
function dataLoad() {
  return fetch("./data/data.json")
    .then((res) => res.json())
    .then((data) => data.items);
}

// 아이템 노드 만들기
function createItemElement(item) {
  return `
  <li class="item">
      <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
      <span class="item__description">${item.gender}, ${item.size}</span>
  </li>
  `;
}

// 아이템 화면에 추가
function displayItems(items) {
  const item_list = document.querySelector(".items");

  let element_items = items.map((item) => createItemElement(item));

  item_list.innerHTML = element_items.join();
}

// 타입 필터 이벤트
function onTypeClickevent(e, items) {
  const target = e.target.dataset;
  const key = target.key;
  const value = target.value;

  if (key == null || value == null) return;

  let filtered_items = items.filter((item) => item[key] === value);

  displayItems(filtered_items);
}

// 이벤트 리스너 등록
function clickTypeButton(items) {
  const buttons = document.querySelector(".buttons");

  buttons.addEventListener("click", (e) => onTypeClickevent(e, items));
}

dataLoad()
  .then((items) => {
    displayItems(items);
    clickTypeButton(items);
  })
  .catch(console.log);
