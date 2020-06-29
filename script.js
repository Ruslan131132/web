let choosed_obj;
function view(n) {
    style = document.getElementById(n).style;
    style.display = (style.display == 'block') ? 'none' : 'block';
};


function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
};





// НАЧАЛО...
let obXhr = new XMLHttpRequest();
obXhr.open('GET', `http://exam-2020-1-api.std-400.ist.mospolytech.ru/api/data1` );
obXhr.send();
	
obXhr.onreadystatechange =() => {
	if(obXhr.readyState != 4) return;
	if(obXhr.status != 200){
		alert('Сервер недоступен ' + obXhr.status + ' ' + obXhr.statusText);
		return;
	}
	
	
	
	let arr_top_20 = JSON.parse(obXhr.response).map(elem=>(
			{
				name: elem.name ,
				address: elem.address ,
				admArea: elem.admArea ,
				district: elem.district ,
				rate: elem.rate ,
				typeObject: elem.typeObject,
				socialDiscount: elem.socialDiscount,
				set_1 : elem.set_1,
				set_2 : elem.set_2,
				set_3 : elem.set_3,
				set_4 : elem.set_4,
				set_5 : elem.set_5,
				set_6 : elem.set_6,
				set_7 : elem.set_7,
				set_8 : elem.set_8,
				set_9 : elem.set_9,
				set_10 : elem.set_10
			}
		));
		
		
	function Zap_main(){
			
		view('rest_results');
			
		console.log(JSON.parse(obXhr.response));
		let admArea = JSON.parse(obXhr.response).map(Area => {return Area.admArea;});
		let district = JSON.parse(obXhr.response).map(District => {return District.district;});
		let typeObject = JSON.parse(obXhr.response).map(Type => {return Type.typeObject;});
		(unique(admArea)).forEach(element => {
			let admAreaOption = document.createElement('option');
			admAreaOption.innerHTML = `${String(element)}`;
			document.getElementById('inputadmArea').append(admAreaOption);
				
		});
		(unique(district)).forEach(element => {
			let districtOption = document.createElement('option');
			districtOption.innerHTML = `${String(element)}`;
			document.getElementById('inputDistrict').append(districtOption);
		});
		(unique(typeObject)).forEach(element => {
			let typeObjectOption = document.createElement('option');
			typeObjectOption.innerHTML = `${String(element)}`;
			document.getElementById('inputtypeObject').append(typeObjectOption);
		});
		
		
		
		
		
		let rate_array_top_20 = arr_top_20.sort((a, b) => a.rate < b.rate ? 1 : -1);//все сам))))) - это у нас значится фильтрация массива объектов по рейтингу
		
		for (let i = 0; i < 20; i++){//выводим начиная 20 элементов с конца в отсортированном массиве
        console.log(rate_array_top_20[i]);//выводишь
		
		divrItem = document.createElement('div');
					divrItem.className = "col-md-3";
					divrItem.innerHTML = 
						`<div class="card mb-4 shadow-sm">
							<div class="card-body">
								<div class="row">
									<div class="col-12" style=" height: 60px;"><p class="card-text" id="card">${String(rate_array_top_20[i].name)}(${String(rate_array_top_20[i].typeObject)})</p></div>
									<div class="col-12" style=" height: 120px;"><hr><small class="text-muted">${String(rate_array_top_20[i].address)}</small></div>
								</div>	
								<div class="d-flex justify-content-between align-items-center">
									<div class="btn-group">
										<button type="submit" class="menu_button btn btn-sm btn-outline-success">Выбрать</button>
									</div>
									<small class="text-muted">
									<svg class="bi bi-star-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
										<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
									</svg> ${String(rate_array_top_20[i].rate/10)}</small>
		              			</div>
		            		</div>
						</div>`
				  	document.getElementById('print_rest').append(divrItem);

		
		}
		
		
		
		
		
		
		
		
		
		
		//Начало работы с menu.json		
				let request = new XMLHttpRequest();
				request.open('GET', 'Menu2.json');
				request.send();
			
				request.onreadystatechange = () => {
					if(request.readyState != 4) return;
					if(request.status != 200){
						alert('Сервер недоступен ' + request.status + ' ' + request.statusText);
						return;
						}
					
					let arr_menu = JSON.parse(request.response).map(elem=>(
					{
						name: elem.name ,
						picture: elem.picture ,
						description: elem.description
					}));					
					
							
					let elements = document.getElementsByClassName('menu_button btn btn-sm btn-outline-success');
	
	
					for (let elem of elements) { 
						elem.onclick = () => {//начало события клика на выбранную кнопку у заведения
/*
							
							let elements_price = document.getElementsByName('itog');
				  			for (let el of elements_price) {
			  					el.innerHTML = "Итого 0";
			  				}
*/
							
							itog = 0;
	
							document.getElementById('print_menu').innerHTML = "";
							
							console.log(String(elem.parentNode.parentNode.parentNode.firstElementChild.lastElementChild.lastElementChild.innerHTML));//адрес выбранного заведения
							console.log(String(elem.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.lastElementChild.innerHTML));//"имя"+(+"тип"+)
							
							
							let choosed_address = String(elem.parentNode.parentNode.parentNode.firstElementChild.lastElementChild.lastElementChild.innerHTML);
							let choosed_name_type = String(elem.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.lastElementChild.innerHTML);
							let price_obj;
							let arr_price_obj = rate_array_top_20.filter((element) => {
								
	// 							console.log(element.name+"("+element.typeObject+")");
								
								if( (String(element.name+"("+element.typeObject+")") == choosed_name_type ) && (element.address ==  choosed_address) ){
									
									console.log(element);
									choosed_obj = element;//для модального окна
									price_obj = element;//для массива цен(мы нашли из общего массива данные по выбранному заведению)
									return element;
									
								}
							});//для поиска нужно объекта
					
							let arr_price = Object.values(price_obj).slice(7);//делает объект price_obj массивом и вырезает ценники => массив цен
							console.log(arr_price);
							
							console.log("а это массив");
							console.log(arr_price_obj);
				        	arr_menu.forEach(function(element,i){
					        	
					        	console.log();
								divrItem2 = document.createElement('div');
					        	divrItem2.className = "col-md-4";
								divrItem2.innerHTML = 
						        
						        	`<div class="card mb-4 shadow-sm">
						            	<img src="${element.picture}" class="bd-placeholder-img card-img-top" width="100%" height="200">
										<div class="card-body">
											<p class="card-text">${element.name}</p>
												<div class="row" >
													<div class="col-12" style="height: 70px;">
														<small class="text-muted">${element.description}</small>
													</div>
												</div>
										  	<div class="d-flex justify-content-between align-items-center">
							                	<div class="btn-group">
													<div class="input-group input-group-sm mb-3">
														<div class="input-group-prepend">
							    							<button type="button" class=" decrease btn btn-sm btn-outline-secondary" >-</button>
							  							</div>
							  							<input type="text" class="form-control" readonly aria-label="Small" aria-describedby="inputGroup-sizing-sm" size="2" style=" background: white; border: 1px solid #6b6a6a; " value="0">
							  							<div class="input-group-append">
							    							<button type="button" class=" increase btn btn-sm btn-outline-secondary" >+</button>
							  							</div>
													</div>
							                	</div>
												<p>${arr_price[i]}</p>
							              	</div>
						            	</div>
									</div>`
						        
									document.getElementById('print_menu').append(divrItem2);
				        	});//заполнение меню
		
					
				
			 
	/*
			  				console.log(JSON.parse(request.response));
			  				console.log("Кнопка сработала") ;
	*/
	    				}//конец события при нажатии кнопки выбрать в списке заведений 
	   				}//перебор всех этих кнопок
			 
				}//конец работы с menu.json
		
		
		
		
		
		
		
		
		
		
		
	}// конец zapmain
		
		
	let itog = 0;
	let itog_options = 0;
				
	document.getElementById("FilterFindButton").onclick = () => {
			
			
		let elements_price = document.getElementsByName('itog');
		for (let el of elements_price) {
		  	el.innerHTML = "Итого 0";
		}

		itog = 0;
			
			
		document.getElementById('print_menu').innerHTML = "";
		document.getElementById('print_rest').innerHTML = "";
		document.getElementById('input_pagination').innerHTML = "";
			
			
			
		if(document.getElementById('rest_results').style.display == 'block'){
			document.getElementById('rest_results').style.display = 'none'
		}
		let typeOb = document.getElementById('inputtypeObject').value;
		let Distr = document.getElementById('inputDistrict').value;
		let admAr = document.getElementById('inputadmArea').value;
		let socialDisc = document.getElementById('inputsocialDiscount').value;
		
		let k = 0;
		let arr_print = arr_top_20.filter((element) => {
	    	if((element.admArea == admAr) || (admAr.length == 0))
				if(Distr == element.district || Distr.length == 0)
					if( typeOb == element.typeObject || typeOb.length == 0)
						if(((socialDisc == "Есть") && (element.socialDiscount > 0)) || ((socialDisc == "Нет") && (element.socialDiscount = 0)) || (socialDisc.length == 0))
						{
							k++;
							return element;
    					}

	    }).sort((a, b) => a.rate < b.rate ? 1 : -1);//конец фильтрации массива по нашим параметрам + отсортировано по убыванию рейтинга
	        
	        
	        
	    console.log(k);
	       		
		view('rest_results');
			
		if(k>0 )
		{
			
			
			
			
			
			
			
			
			
			
			
			
			
			let page_container = document.querySelector('#print_rest');
// 			let pagination = document.querySelector('#pagination');
			let update_page = true;
			
			
			
			
			
			
			
			const notesOnPage = 12;
			const countOfPages = Math.ceil(arr_print.length / notesOnPage);
			
			
			
			
			
			
			
			
			
			
			
			let pag_div = document.createElement("div");
			pag_div.id = "pagination"
// 			pag_div.class = "input-group mb-3"
// 			pag_div.style = "list-style: unset; padding: unset;"
			
			
			pag_div.innerHTML = 
			`<div class="input-group mb-3">
				<div class="input-group-prepend">
					<span class=" prev input-group-text" style="cursor:pointer">&laquo;</span>
				</div>
				<input type="text" style="width:40px" class="form-control" oninput="changedNumber()" value="1">
				<div class="input-group-append">
					<span class="next input-group-text" style="cursor:pointer">&raquo;</span>
				</div>
			</div>`
			
			
			document.getElementById('input_pagination').append(pag_div);
			
/*
			let pag_ul = document.createElement("ul");
			pag_ul.id = "pagination"
			pag_ul.style = "list-style: unset; padding: unset;"
			
			
			
			
			
			
			pag_ul.innerHTML = `<li class="prev page-item" style="display:inline; cursor:pointer"><a class="page-link">&laquo;</a></li>
            <li style="display:inline"></li>
            <li class="next page-item" style="display:inline; cursor:pointer"><a class="page-link">&raquo;</a></li>
			`;
			document.getElementById('input_pagination').append(pag_ul);
*/
			
			
			
			document.querySelector('#pagination input').oninput = () => {
			    if(!update_page) return
			    if(!document.querySelector('#pagination input').value){
			        show(1)
			        return
			    }
			    if(document.querySelector('#pagination input').value > countOfPages || document.querySelector('#pagination input').value < 1) return
			    update_page = false
			    setInterval(() => {update_page = true}, 1000)
			    show(document.querySelector('#pagination input').value)
			}
			
			document.querySelector('#pagination .next').onclick = () => {
			    if(document.querySelector('#pagination input').value >= countOfPages) return 
			    	if(!document.querySelector('#pagination input').value) 
			    		document.querySelector('#pagination input').value = 1; 
			    document.querySelector('#pagination input').value = parseInt(document.querySelector('#pagination input').value) + 1
			    show(document.querySelector('#pagination input').value)
			}
			document.querySelector('#pagination .prev').onclick = () => {
			    if(document.querySelector('#pagination input').value <= 1) return
			    	 if(!document.querySelector('#pagination input').value) 
			    	 	document.querySelector('#pagination input').value = 1;
			    document.querySelector('#pagination input').value = parseInt(document.querySelector('#pagination input').value) - 1
			    show(document.querySelector('#pagination input').value)
			}
			show()
			function show(page = 1){
			    if (page > countOfPages) return
			    page_container.innerHTML = arr_print.slice((page - 1) * notesOnPage, page * notesOnPage).map((element) => {
			        return `
			        <div class="col-md-3">
			            <div class="card mb-4 shadow-sm">
							<div class="card-body">
								<div class="row">
									<div class="col-12" style=" height: 60px;"><p class="card-text" id="card">${String(element.name)}(${String(element.typeObject)})</p></div>
									<div class="col-12" style=" height: 120px;"><hr><small class="text-muted">${String(element.address)}</small></div>
								</div>	
								<div class="d-flex justify-content-between align-items-center">
									<div class="btn-group">
										<button type="submit" class="menu_button btn btn-sm btn-outline-success">Выбрать</button>
									</div>
									<small class="text-muted">
									<svg class="bi bi-star-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
										<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
									</svg> ${String(element.rate/10)}</small>
		              			</div>
		            		</div>
						</div>
					</div>
			        `;
			    }).join('')
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
/*

			let notesOnPage = 12;
			let countOfItems = Math.ceil(arr_print.length/notesOnPage);
			for (let i=1; i <= countOfItems; i++ ){
				let pag_buttons = document.createElement('li');
				if(i == 1){
					pag_buttons.className = "page-item active";
				}
				else{
					pag_buttons.className = "page-item";
				}
				pag_buttons.innerHTML = `<a class="page-link">${i}</a>`;
		  		document.getElementById('input_pagination').append(pag_buttons);
			}
			
			let choosed_li = document.getElementsByClassName('page-link');
			ShowPage(choosed_li[0]);
			for(let item of choosed_li){
				item.addEventListener('click', function(){
					let active = document.querySelector("li.page-item.active");						
					console.log(active);
						
					if (active) {
						console.log("найдено");
// 						console.log(active);
						active.className = "page-item";
					}
						
						this.parentNode.className = "page-item active";
// 						console.log(this.parentNode.parentNode.c.classList.contains("page-item active"));
						ShowPage(this);
						
						
						
						
				});//конец клика на страницу li
			}
				
				
					
				
			function ShowPage(item){
				document.getElementById('print_menu').innerHTML = "";
				let pageNum = Number(item.innerHTML);
							
						let start = (pageNum-1)*12;
				let end = (pageNum-1)*12 + 12;
				let notes = arr_print.slice(start, end);
				console.log(notes);
				document.getElementById('print_rest').innerHTML = "";
				notes.forEach((element) => {
					divrItem = document.createElement('div');
					divrItem.className = "col-md-3";
					divrItem.innerHTML = 
						`<div class="card mb-4 shadow-sm">
							<div class="card-body">
								<div class="row">
									<div class="col-12" style=" height: 60px;"><p class="card-text" id="card">${String(element.name)}(${String(element.typeObject)})</p></div>
									<div class="col-12" style=" height: 120px;"><hr><small class="text-muted">${String(element.address)}</small></div>
								</div>	
								<div class="d-flex justify-content-between align-items-center">
									<div class="btn-group">
										<button type="submit" class="menu_button btn btn-sm btn-outline-success">Выбрать</button>
									</div>
									<small class="text-muted">
									<svg class="bi bi-star-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
										<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
									</svg> ${String(element.rate/10)}</small>
		              			</div>
		            		</div>
						</div>`
				  	document.getElementById('print_rest').append(divrItem);
			  			
			  			
			  			
			  			
				        	
			    });//фильтрованные заведения
						
					
*/	
						
						
				//Начало работы с menu.json		
				let request = new XMLHttpRequest();
				request.open('GET', 'Menu2.json');
				request.send();
			
				request.onreadystatechange = () => {
					if(request.readyState != 4) return;
					if(request.status != 200){
						alert('Сервер недоступен ' + request.status + ' ' + request.statusText);
						return;
						}
					
					let arr_menu = JSON.parse(request.response).map(elem=>(
					{
						name: elem.name ,
						picture: elem.picture ,
						description: elem.description
					}));					
					
							
					let elements = document.getElementsByClassName('menu_button btn btn-sm btn-outline-success');
	
	
					for (let elem of elements) { 
						elem.onclick = () => {//начало события клика на выбранную кнопку у заведения
							
/*
							let elements_price = document.getElementsByName('itog');
				  			for (let el of elements_price) {
			  					pItem = document.createElement('p');
			  					pItem.innerHTML = `<big>Итого: ${itog}</big>`;
			  					el.append(pItem)
			  				}
*/
							
							itog = 0;
	
							document.getElementById('print_menu').innerHTML = "";
							
							console.log(String(elem.parentNode.parentNode.parentNode.firstElementChild.lastElementChild.lastElementChild.innerHTML));//адрес выбранного заведения
							console.log(String(elem.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.lastElementChild.innerHTML));//"имя"+(+"тип"+)
							
							
							let choosed_address = String(elem.parentNode.parentNode.parentNode.firstElementChild.lastElementChild.lastElementChild.innerHTML);
							let choosed_name_type = String(elem.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.lastElementChild.innerHTML);
							let price_obj;
							let arr_price_obj = arr_print.filter((element) => {//НАДО ТУТ ИСПРАВИТЬ(На заметку)
								
	// 							console.log(element.name+"("+element.typeObject+")");
								
								if( (String(element.name+"("+element.typeObject+")") == choosed_name_type ) && (element.address ==  choosed_address) ){
									
									console.log(element);
									choosed_obj = element;//для модального окна
									price_obj = element;//для массива цен(мы нашли из общего массива данные по выбранному заведению)
									return element;
									
								}
							});//для поиска нужно объекта
					
							let arr_price = Object.values(price_obj).slice(7);//делает объект price_obj массивом и вырезает ценники => массив цен
							console.log(arr_price);
							
							console.log("а это массив");
							console.log(arr_price_obj);
				        	arr_menu.forEach(function(element,i){
					        	
					        	console.log();
								divrItem2 = document.createElement('div');
					        	divrItem2.className = "col-md-4";
								divrItem2.innerHTML = 
						        
						        	`<div class="card mb-4 shadow-sm">
						            	<img src="${element.picture}" class="bd-placeholder-img card-img-top" width="100%" height="200">
										<div class="card-body">
											<p class="card-text">${element.name}</p>
												<div class="row" >
													<div class="col-12" style="height: 70px;">
														<small class="text-muted">${element.description}</small>
													</div>
												</div>
										  	<div class="d-flex justify-content-between align-items-center">
							                	<div class="btn-group">
													<div class="input-group input-group-sm mb-3">
														<div class="input-group-prepend">
							    							<button type="button" class=" decrease btn btn-sm btn-outline-secondary" >-</button>
							  							</div>
							  							<input type="text" class="form-control" readonly aria-label="Small" aria-describedby="inputGroup-sizing-sm" size="2" style=" background: white; border: 1px solid #6b6a6a; " value="0">
							  							<div class="input-group-append">
							    							<button type="button" class=" increase btn btn-sm btn-outline-secondary" >+</button>
							  							</div>
													</div>
							                	</div>
												<p>${arr_price[i]}</p>
							              	</div>
						            	</div>
									</div>`
						        
									document.getElementById('print_menu').append(divrItem2);
				        	});//заполнение меню
		
					
				
			 
	/*
			  				console.log(JSON.parse(request.response));
			  				console.log("Кнопка сработала") ;
	*/
	    				}//конец события при нажатии кнопки выбрать в списке заведений 
	   				}//перебор всех этих кнопок
			 
				}//конец работы с menu.json
				
					
						
			}//функция показа страниц 
		
		}//есть ли рестораны

	}//Конец события на нажатие кнопку поиск(лупа) фильтра

		
		
		
		
	let arr_itog_price =[];
	
	
		
			
				
				
/*
			function getCheckbox(inpuCheckboxName){
				let Checkbox = document.querySelectorAll(inpuCheckboxName);
				for (let i = 0; i < Checkbox.length; i++) {
					if (Checkbox[i].checked) {
							      
						console.log(Checkbox[i].value);
*/
/*
						if (radio[i].value == "option1")
// 							new_obj[keyName] = 1;
						else if(radio[i].value == "option2"){
// 						new_obj[keyName] = 0;
						}
*/	
/*
					}
					else{
// 						new_obj[keyName] = null; 
					}
				}
			}
*/
	
	
	

	document.addEventListener('click', function (e) {
			  					
		if (e.target.classList.contains("increase")) {
			  					
			let elements_price = document.getElementsByName('itog');
			for (let el of elements_price) {
		  		el.innerHTML = "";
		  	}
		  	
			let all_price = Number(e.target.parentElement.parentElement.parentElement.parentElement.lastElementChild.innerHTML);
			console.log("Ценник блюда");
			console.log(all_price);	
			++e.target.parentElement.parentElement.querySelector("input").value;
			itog += all_price;
		  	console.log("Итого");
		  	console.log(itog);
		  	
		  	
		  	
		  	for (let el of elements_price) {
// 			  	getCheckbox('gridRadios');
		  		pItem = document.createElement('p');
		  		pItem.innerHTML = `<big>Итого: ${itog}<big>`;
		  		el.append(pItem)
		  	}
  		}
  		
  		else if (e.target.classList.contains("decrease")) {
	  		if(e.target.parentElement.parentElement.querySelector("input").value > 0) {
		  		let elements_price = document.getElementsByName('itog');
			  	for (let el of elements_price) {
		  			el.innerHTML = "";
		  		}
	  										  					
/*
	  								document.getElementById('itog_main').innerHTML = "";
			  					document.getElementById('itog_modal').innerHTML = "";	
*/	  								  					
	  			let all_price = e.target.parentElement.parentElement.parentElement.parentElement.lastElementChild.innerHTML;
			  	console.log("Ценник блюда");
			  	console.log(all_price);			  					
	  			--e.target.parentElement.parentElement.querySelector("input").value;
	  			itog -= all_price;
	  			console.log("Итого");
	  			console.log(itog);	
// 									document.getElementsByName('itog').append(pItem);
// 			  						document.getElementById('itog_modal').append(pItem);


// 									let elements_price = document.getElementsByName('itog');

				
				
				
				
			

			
			
			
			
			
			
			
				
/*
				if (document.getElementById("price_25").is(':checked')){
		  	
		  				itog *= 2.5;
// 		  				alert('Включен');
					} 
*/
				
				
				for (let el of elements_price) {
		  			
		  			
		  						
	  				pItem = document.createElement('p');
					pItem.innerHTML = `<big>Итого: ${itog}</big>`;
					el.append(pItem)
		  		}


	  								
	  		}
  		}//если нажатой кнопкой является минус (в меню)
  	});// конец события на нажатия кнопки +/- в  меню

		
	
	
	
	
	
	
	
	
	let CheckBox = document.querySelectorAll('input[name="gridRadios"]')
		
		
	for (let i = 0; i < CheckBox.length; i++) {
		  		
		  	

		
		CheckBox[i].onclick = () =>  {
			
			
			
			let elements_price = document.getElementsByName('itog');
				
				
			if (CheckBox[i].checked) {
				
					if(itog_options == 0)
						itog_options = itog;		      
				
				if (CheckBox[i].value == "option6"){
// 					let elements_price = document.getElementsByName('itog');
					for (let el of elements_price) {
						el.innerHTML = "";
		  			}
					itog_options = itog * 2.5;
					for (let el of elements_price) {
						el.innerHTML = "";
						pItem = document.createElement('p');
						pItem.innerHTML = `<big>Итого: ${itog_options}</big>`;
						el.append(pItem)
		  			}
					
					
					
					let divItem_choosed_options = document.createElement('div');
					divItem_choosed_options.className = "row";
					
					divItem_choosed_options.innerHTML = 
											`<div class="col-5 themed-grid-col" align="left">На компанию</div>
											
											<div class="col-4 themed-grid-col" name="pos_6" align="left">x5 позиций</div>

											<div class="col-3 themed-grid-col" align="center">x2.5 руб.</div>
								`;
					document.getElementById('option6_1').append(divItem_choosed_options);
					
					if(document.getElementById('disc_30').length != null ){
						document.getElementById('disc_30').innerHTML = "";
						document.getElementById('disc_30').innerHTML = `${itog_options*0.7}`;
					}
					
				}	
					
				if (CheckBox[i].value == "option7"){
					console.log(CheckBox[i].value);
					
					
					
					
					let divItem_choosed_options2 = document.createElement('div');
					divItem_choosed_options2.className = "row";
					
					divItem_choosed_options2.innerHTML = 
											`<div class="col-5 themed-grid-col text-danger" align="left">Только горячим</div>
											
											<div class="col-4 themed-grid-col" name="pos_7" align="left">если остынет -</div>

											<div class="col-3 themed-grid-col" align="center" id="disc_30">${itog_options*0.7}</div>
								`
					document.getElementById('option7_1').append(divItem_choosed_options2);

					
					
				}	
			}
			else{
				if (CheckBox[i].value == "option6"){
					document.getElementById('option6_1').innerHTML = "";

					itog_options /= 2.5
					for (let el of elements_price) {
						el.innerHTML = "";
						pItem = document.createElement('p');
						pItem.innerHTML = `<big>Итого: ${itog_options}</big>`;
						el.append(pItem)
		  			}
		  			
		  			if(document.getElementById('disc_30').length != null ){
						document.getElementById('disc_30').innerHTML = "";
						document.getElementById('disc_30').innerHTML = `${itog_options*0.7}`;
					}		  			
		  			
				}
					
				if (CheckBox[i].value == "option7"){
					console.log("отмена" + CheckBox[i].value);
					document.getElementById('option7_1').innerHTML = "";
					
				}
			}
		}

	}
		

		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	document.getElementById('modal_window').onclick = () => {
						
		document.getElementById('modal_positions').innerHTML = "";	
		document.getElementById('modal_name').innerHTML="";
		document.getElementById('modal_admArea').innerHTML="";
		document.getElementById('modal_district').innerHTML="";
		document.getElementById('modal_address').innerHTML="";
		document.getElementById('modal_rate').innerHTML="";						
					
		pItem_modal_address = document.createElement('p');
		pItem_modal_address.innerHTML = `<small class="text-muted">${String(choosed_obj.address)}</small>`;
								
		pItem_modal_rate = document.createElement('p');
		pItem_modal_rate.innerHTML =    `<svg class="bi bi-star-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
										</svg> ${String(choosed_obj.rate/10)}`;

						
						
		document.getElementById('modal_name').append(`${String(choosed_obj.name)}`);
		document.getElementById('modal_admArea').append(`${String(choosed_obj.admArea)}`);
		document.getElementById('modal_district').append(`${String(choosed_obj.district)}`);
		document.getElementById('modal_address').append(pItem_modal_address);
		document.getElementById('modal_rate').append(pItem_modal_rate);
					
		
		
		
		
		
		
		
		
							
						
		let elements_menu_for_modal = document.getElementsByClassName('increase');
		for (let elem of elements_menu_for_modal ) {
			
			
			let kol = Number(elem.parentElement.parentElement.querySelector("input").value);
			
			let choosed_pos = Number(elem.parentElement.parentElement.parentElement.parentElement.lastElementChild.innerHTML);
			
			
			let itog_modal = choosed_pos*kol;
			
			let kol_for_pos = 0;
			
			if( itog_options > itog){
				itog_modal = itog_options;
				kol *=5;
				kol_for_pos = kol/2;
			}
			else{
				kol_for_pos = kol;
			}
			
/*
			if (document.getElementById("price_25").is(':checked')){
				kol *= 5;
				itog_modal *= 2.5;
				alert('Включен');
			} 
*/

			
			
			
			
			
			
			console.log(itog);
			
/*
			console.log(elem.parentElement.parentElement.parentElement.parentElement.lastElementChild.innerHTML);
			console.log(elem.parentElement.parentElement.querySelector("input").value);
			console.log(elem.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.innerHTML);
*/
			if(elem.parentElement.parentElement.querySelector("input").value > 0){
				divItem_choosed_food = document.createElement('div');
				divItem_choosed_food.className = "row";
				divItem_choosed_food.innerHTML = 
											`<div class="col-5 themed-grid-col" align="left">${elem.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.innerHTML}</div>
											
											<div class="col-4 themed-grid-col" name="itog" align="left">${kol}x${choosed_pos}руб.</div>

											<div class="col-3 themed-grid-col" align="center">${kol_for_pos*choosed_pos}руб.</div>
								`;
				document.getElementById('modal_positions').append(divItem_choosed_food);
								
			}
		}
			
			
			
			
	};//конец события на нажатие кнокпи оформить заказ
		

	document.addEventListener("DOMContentLoaded", Zap_main());




		     
	    
}//конец obXhr.onreadystatechange
    
    
    
  
    
    
    
    
    
    
    
    
 