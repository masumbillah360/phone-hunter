const dataLoader = async(searchKey)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchKey}`);
    const data = await res.json();
    dataViewer(data.data);
}
dataLoader();


const dataViewer = (phones) =>{
    phones.forEach(phone => {
        const {brand,phone_name,slug,image} = phone;
        const phoneContainer = document.getElementById('phone-container');
        const phoneCard = document.createElement('article');
        phoneCard.classList.add('col');
        phoneCard.innerHTML = `
        <div class="card">
            <img src="${image}" class="card-img-top w-100 px-5 py-2" alt="...">
            <div class="card-body">
                <span class="bg-dark text-white pb-1 px-3 rounded fw-bold">${brand}</span>
                <h5 class="card-title mt-3 fw-bold">Name : ${phone_name}</h5>
                <p class="card-text">Model : ${slug}</p>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard);
    });
}

const btnGroup = document.getElementsByClassName('s-phone');
for (const btn of btnGroup) {
    btn.addEventListener('click',(e)=>{
        document.getElementById('phone-container').textContent = '';
        const btnText = e.target.innerText;
        const searchKey = btnText.toLowerCase();
        dataLoader(searchKey);
    })   
}