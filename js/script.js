const API_SERVER_URL = "https://jangyoungsil-api-egweo.run.goorm.site";

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