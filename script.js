function loadData(categoryId = '1000', sortByViews = false) {
    const url = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayData(data);
        });
}

function displayData(data) {
    const container = document.getElementById('card-container');
    container.innerHTML = ''; // Clear previous content

    if (data.data.length === 0) {
        // If no videos found, display a "No data found" message
        const img = document.createElement('img');
        img.src = 'resources/Icon.png';
        img.classList = 'w-[50%] ml-44';
        const p = document.createElement('p');
        p.innerText = 'No Data Found';
        p.classList = 'w-[20%] mx-auto text-red-500 font-bold mt-10 text-2xl';
        container.appendChild(img);
        container.appendChild(p);
        return;
    }


    for (const video of data.data) {
        const videocard = document.createElement('div');
        // Check if the author is verified and add a tick icon if true
        const author = video.authors[0];
        const verifiedIcon = author.verified ? '<img src="resources/tick.png" class="w-4 h-4 inline ml-1" alt="Verified">' : '';
        videocard.classList = 'w-full sm:w-1/2 md:w-64 lg:w-80 p-4';
        videocard.innerHTML = `
            <figure>
                <img class='w-96 h-52' src="${video.thumbnail}" alt="thumbnails" />
            </figure>
            <div class="p-5">
              <div class="flex gap-2 items-center ">
                <img class="w-8 h-8 rounded-full" src="${video.authors[0].profile_picture}" alt="">
                <h2 class="card-title text-lg font-semibold mb-2">${video.title}</h2>
              </div>
              <div class="flex gap-2 items-center">
                <p class="ml-10 -mt-1">${author.profile_name}</p>
                <p class=" ">${verifiedIcon}</p>
              </div>
              <p class="ml-10 -mt-1">${video.others.views} views</p>
            </div>
        `;
        container.appendChild(videocard);
    }
}

function loadBtn() {
    const url = 'https://openapi.programming-hero.com/api/videos/categories';
    fetch(url)
        .then(res => res.json())
        .then(data => displayBtn(data.data));
}

function displayBtn(categories) {
    const btnContainer = document.getElementById("btn-container");
    btnContainer.innerHTML = ''; // Clear previous buttons
    for (const cat of categories) {
        const div = document.createElement('div');
        div.innerHTML = `<button id='${cat.category_id}' class="btn btn-accent">${cat.category}</button>`;
        btnContainer.appendChild(div);

        // Add event listener after appending the button
        const button = document.getElementById(cat.category_id);
        button.addEventListener('click', function () {
            loadData(cat.category_id); // Load data for the selected category
        });
    }
}

loadData();
loadBtn();
