const dataLoad =async(searchText,dataLimit)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    displayData(data.data,dataLimit);
}

const phonDivContainer = document.getElementById('phone-container');
const displayData =(phones,dataLimit)=>{
    const noPhoneFoundMsg = document.getElementById('error-msg');
    const showAllBtn = document.getElementById('show-all-btn');
    if (dataLimit && phones.length>12) {
        phones = phones.slice(0,6)
        showAllBtn.classList.remove('d-none');
    }
    else{
        showAllBtn.classList.add('d-none');
    }
    //no phone found msg show from here
    if (phones.length===0) {
        noPhoneFoundMsg.classList.remove('d-none');
        isLoading(false);
    }else{
        noPhoneFoundMsg.classList.add('d-none')
    }

    phonDivContainer.textContent = '';
    phones.forEach(phone=>{
        // console.log(phone);
        const {brand,phone_name,image,slug} = phone;
        const phonDiv = document.createElement('article');
        phonDiv.classList.add('col');
        phonDiv.innerHTML = `
        <div class="card">
            <img src="${image}" class="card-img-top py-4 px-5" alt="...">
            <div class="card-body">
                <span class = "px-3 bg-dark rounded text-white fw-bold pb-1">${brand}</span>
                <h5 class="card-title fw-bold">Name : ${phone_name}</h5>
                <p class="card-text">Model : ${slug}</p>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <button onclick="detailsBtnHandler('${slug}')" class = "btn btn-danger fw-bold"  data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button>
                <button class = "btn btn-success fw-bold">Buy Now</button>
            </div>
        </div>
        `
        phonDivContainer.appendChild(phonDiv);
        isLoading(false);
    })
}

const processSearch = (dataLimit) =>{
    isLoading(true);
    const searchText = document.getElementById('search-text').value;
    dataLoad(searchText,dataLimit);
}
document.getElementById('search-btn').addEventListener('click',()=>{
    processSearch(6);
})

const isLoading = loading =>{
    const loader = document.getElementById('loader');
    if (loading) {
        loader.classList.remove('d-none');
    }else{
        loader.classList.add('d-none');
    }
}

document.getElementById('btn-show-all').addEventListener('click',()=>{
    processSearch();
})

document.getElementById('search-text').addEventListener('keypress',(e)=>{
    if (e.key ==='Enter') {     
        processSearch(12);
    }
})

const detailsBtnHandler = (e) =>{
    phoneDetailsLoader(e)
}

const phoneDetailsLoader =async(id)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    phoneDetailViwer(data.data);
}

const phoneDetailViwer = (data) =>{
    console.log(data);
    const {name,brand,slug,image,releaseDate,mainFeatures,Others}=data;
    document.getElementById('modal-title').innerText = name;
    const detailContainer = document.getElementById('details-container').innerHTML =   `
    <div class="card">
        <img src="${image}" class="card-img-top mx-auto" alt="${name}'s Photo" style="height:300px; width:250px">
        <div class="card-body">
        <span class = "px-3 bg-dark rounded text-white fw-bold pb-1">${brand}</span>
        <h5 class="card-title">Model : ${slug}</h5>
        <p class="card-text">Release Date : ${releaseDate?releaseDate:"comming soon"}</p>
        <a href="#" class="btn btn-warning">Buy Now</a>
        </div>
    </div>
    
    `
}
const btnGroup = document.getElementsByClassName('slct-btn');
for (const btn of btnGroup) {
    btn.addEventListener('click',(e)=>{
        document.getElementById('phone-container').textContent = '';
        const btnText = e.target.innerText;
        dataLoad(btnText);
    })   
}

dataLoad('apple');