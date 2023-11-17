

const url = "https://imiki.pl/dane.json";


fetch(url)
  .then(response => response.json())
  .then(data => {
    const listaPrzewinien = document.getElementById("listaPrzewinien");

    
    Object.keys(data).forEach(key => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = data[key].pozycja;
      listaPrzewinien.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Błąd JSON:', error);
  });


function obliczPunkty() {
  const startowePunkty = parseInt(document.getElementById("startowePunkty").value) || 0;
  const listaPrzewinien = document.getElementById("listaPrzewinien");
  const aktualnePunkty = document.getElementById("aktualnePunkty");

  
  const wybranePrzewinienie = listaPrzewinien.options[listaPrzewinien.selectedIndex].value;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      let punkty;

      
      if (typeof data[wybranePrzewinienie].punkty === "object") {
        punkty = startowePunkty - data[wybranePrzewinienie].punkty.p0 - data[wybranePrzewinienie].punkty.p1;
      } else {
        punkty = startowePunkty - data[wybranePrzewinienie].punkty;
      }

    
      aktualnePunkty.value = punkty;
    })
    .catch(error => {
      console.error('Błąd JSON:', error);
    });
}
