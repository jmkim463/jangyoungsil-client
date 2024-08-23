const API_SERVER_URL = "http://localhost:3000"; // "https://jangyoungsil-api-egweo.run.goorm.site";

async function fetchMealList() {
  const year = targetDate.getFullYear();
  const month = ("0" + (targetDate.getMonth() + 1)).slice(-2);
  const date = ("0" + (targetDate.getDate() + 1)).slice(-2);

  document.getElementById('target-date').textContent = year + '-' + month + '-' + date + ' 급식';

  const mealList = document.getElementById('meal-list');
  mealList.textContent = "";

  const params = [];
  params.areaCode = 'D10';
  params.schoolCode = '7240454';
  params.date = year + month + date;

  const data = await getAPI('/nice/meal', params);

  if (data.length === 0) {
    const node = document.createElement('p');
    node.textContent = '데이터가 없습니다.';

    mealList.appendChild(node);
  }
  else {
    data.forEach((item, idx) => {
      const card = document.createElement('div');
      card.classList.add('card');

      const title = document.createElement('h3');
      title.textContent = item.scheduleNm;
      card.appendChild(title);

      const content = document.createElement('p');
      content.textContent = item.dishNm;
      content.style.whiteSpace = 'pre-line'
      content.style.marginTop = '50px';
      content.style.marginBottom = '150px';
      card.appendChild(content);

      mealList.appendChild(card);
    });
  }
}

async function fetchTimetable() {
  const params = [];
  params.areaCode = 'D10';
  params.schoolCode = '7240259';
  params.grade = document.getElementById('grade-input').value;
  params.classNm = document.getElementById('classNm-input').value;

  const data = await getAPI('/nice/timetable', params);

  const table = document.getElementById("timetable-body");
  table.textContent = "";

  for(let i = 0; i < 7; i++) {
    const row = document.createElement('tr');
    row.id = 'timetable-row' + (i + 1);

    const node = document.createElement('td');
    node.textContent = (i + 1) + "";
    row.appendChild(node);

    table.appendChild(row);
  }

  for(let i = 0; i < data.length; i++) {
    for(let j = 0; j < data[i].length; j++) {
      let content = data[i][j];
      content = content === undefined ? "공강" : content;

      const row = document.getElementById('timetable-row' + (j + 1));
      const node = document.createElement('td');
      node.textContent = content;

      row.appendChild(node);
    }
  }
}

async function getAPI(url = '/', params = null) {
  let apiUrl = API_SERVER_URL + url;

  if(params) {
    apiUrl += '?' + Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  }

  console.log(apiUrl);
  const res = await axios.get(apiUrl);
  const data = res.data;

  return data;
}