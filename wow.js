// pegar a data atual para pergunta mais recente

let today = Math.floor(Date.now() / 1000); 

// fazer a requisição // pode ser que no futuro, daqui a alguns anos possa dar problema, porque a API tem um número limitados de resultado que ela retorna, mas sabendo que perguntas com score 10 são mais ou menos umas 10 por mês, isso vai demorar um longo tempo.

$( document ).ready(function() { 
  $.ajax({
    type: "GET",
    dataType: "JSON",
    url: `https://api.stackexchange.com/2.2/questions?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&fromdate=1554076800&todate=${today}&order=desc&min=10&sort=votes&tagged=php&filter=default`,
    success: function(data){

      let items = data.items;
      let list = [];
      let items_order = [];
    
      // pegar datas de criação

      for (let i = 0; i < items.length; i++){ 
        list.push(items[i].creation_date)

      }

      // organizar da maior para a menor

      let list_sort = list.sort(function(x, y){ 
        return y - x;
      });

      // pegar objetos na ordem correta mais recente e respondida e colocá-los no array

      for (let i = 0; i < items.length; i++){ 
        for(let j = 0; j < items.length; j++){
          if (list_sort[i] == items[j].creation_date && items[j].is_answered == true){
          items_order.push(items[j])
        }
      }
      };

      // escrever nas tags HTML

      for (let i = 0; i < 3; i++){
      
        let created = new Date(items_order[i].creation_date * 1000);

        $(`#question${i + 1}`).append(items_order[i].title);
        $(`#question${i + 1}`).attr("href", items_order[i].link);
        $(`#author${i + 1}`).append(items_order[i].owner.display_name);
        $(`#author${i + 1}` ).attr("href", items_order[i].owner.link);
        $(`#score${i + 1}`).append(` - Score da pergunta (${items_order[i].score}) - Pergunta criada em ${created.toLocaleString()}`);
        $(`#image${i + 1}`).attr("src", items_order[i].owner.profile_image);
      }

      
      // animações

      $("#block_stack").removeClass("invisible");
      $('.shadow').addClass('animated fadeInDown');

    }
  });})
