let vendas = [];
let chart;

function show(id){
  document.querySelectorAll('.section').forEach(s=>s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function addVenda(){
  vendas.push({
    vendedor: vendVendedor.value,
    valor: Number(vendValor.value)
  });
  vendVendedor.value="";
  vendValor.value="";
  atualizar();
}

function atualizar(){
  const meta = Number(meta.value);
  const total = vendas.reduce((s,v)=>s+v.valor,0);
  const percent = meta ? ((total/meta)*100).toFixed(1) : 0;

  percent.innerText = percent+"%";
  percent2.innerText = percent+"%";
  total.innerText = total.toFixed(2);

  listaVendas.innerHTML = vendas.map(v=>
    `<li>${v.vendedor} - R$ ${v.valor}</li>`
  ).join("");

  // Ranking
  let rank = {};
  vendas.forEach(v=>{
    rank[v.vendedor]=(rank[v.vendedor]||0)+v.valor;
  });

  listaRanking.innerHTML = Object.entries(rank)
    .sort((a,b)=>b[1]-a[1])
    .map((r,i)=>`<li>${i+1}º ${r[0]} - R$ ${r[1]}</li>`)
    .join("");

  renderChart(rank);
}

function renderChart(rank){
  const labels = Object.keys(rank);
  const data = Object.values(rank);

  if(chart) chart.destroy();
  chart = new Chart(grafico, {
    type:'bar',
    data:{
      labels,
      datasets:[{
        data,
        backgroundColor:'#ff9900'
      }]
    },
    options:{
      plugins:{legend:{display:false}}
    }
  });
}
