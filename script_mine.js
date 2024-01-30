// console.log(newsData, '[newsData]');

const domElements = [];

document.addEventListener("DOMContentLoaded", function () {
    // Initialize the page number and items per page
    let currentPage = 1;
    let pageNumber = 1; 
    const itemsPerPage = 5;

    createHeading(newsData);

    // Initialize the pagination control
    const paginationContainer = document.getElementById('pagination-container');
    const initalItems = newsData.channel.item;
    createPaginationControl(initalItems, currentPage, itemsPerPage, paginationContainer);

    // Display the initial table
    const startIndex = ( currentPage - 1 ) * itemsPerPage;
    const endIndex   = startIndex + itemsPerPage;
    const slicedData = initalItems.slice(startIndex,endIndex);
    displayTable(slicedData, currentPage, itemsPerPage);

    // Event listener for pagination buttons
    paginationContainer.addEventListener('click', function (event) {
        // console.log(event.target, '[event.target]');
        // console.log(event.target.tagName,'[dataset]');
        if (event.target.tagName === 'BUTTON') {
            currentPage = parseInt(event.target.dataset.page);
            pageNumber = currentPage;
            const startIndex = (currentPage - 1 ) * itemsPerPage;
            const endIndex   = startIndex + itemsPerPage;
            const items = newsData.channel.item;
            const slicedData = items.slice(startIndex, endIndex);
            displayTable(slicedData, currentPage, itemsPerPage);
            // createPaginationControl(slicedData, currentPage, itemsPerPage, paginationContainer);
        }
    });

    const searchInput = document.getElementById('search-input');
    const sortAscBtn = document.getElementById('sort-asc-btn');
    const sortDescBtn = document.getElementById('sort-desc-btn');

    // Event listener for search input
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();
        const startIndex = ( pageNumber - 1 ) * itemsPerPage;
        const endIndex   = startIndex  + itemsPerPage;
        const items = newsData.channel.item;
        const slicedData = items.slice(startIndex, endIndex);
        const filteredData = filterDataByTitle(slicedData, searchTerm);
        displayTable(filteredData, currentPage, itemsPerPage);
        // createPaginationControl(filteredData, currentPage, itemsPerPage, paginationContainer);
    });

    // Event listeners for sorting buttons
    sortAscBtn.addEventListener('click', function () {
        const startIndex = ( pageNumber - 1 ) * itemsPerPage;
        const endIndex   = startIndex  + itemsPerPage;
        console.log(newsData, '[newsData]-[sorAscBtn]');
        const items = newsData.channel.item;
        console.log(items,'[items]-[btnclick]');
        const slicedData = items.slice(startIndex, endIndex);
        console.log(slicedData, '[slicedData]-[clickbtn]');
        const sortedData = sortDataByTitle(slicedData, 'asc');
        displayTable(sortedData, currentPage, itemsPerPage);
        // createPaginationControl(items, currentPage, itemsPerPage, paginationContainer);
    });

    sortDescBtn.addEventListener('click', function () {
        const startIndex = ( pageNumber - 1 ) * itemsPerPage;
        const endIndex   = startIndex  + itemsPerPage;
        const items = newsData.channel.item;
        console.log(items,'[items]-[btnclick]');
        const slicedData = items.slice(startIndex, endIndex);
        console.log(slicedData, '[slicedData]-[clickbtn]');
        const sortedData = sortDataByTitle(slicedData, 'desc');
        displayTable(sortedData, currentPage, itemsPerPage);
        // createPaginationControl(items, currentPage, itemsPerPage, paginationContainer);
    });
});

const tableGeneration = (data, currentPage, itemsPerPage) => {
    const table = document.getElementById('news-table');

    const items = data;

    // Calculate the starting and ending indices for the current page
    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;

    const tableHeader = document.createElement('tr');

    // for (const heading in items[0]) {
    //     const th = document.createElement('th');
    //     th.textContent = heading;
    //     tableHeader.appendChild(th);
    // }

    const titleHeader = document.createElement('td');
    titleHeader.textContent = 'Headline';
    tableHeader.appendChild(titleHeader);

    const descriptionHeader = document.createElement('td');
    descriptionHeader.textContent = 'Details';
    tableHeader.appendChild(descriptionHeader);

    const pubDate = document.createElement('td');
    pubDate.textContent = 'Published Date';
    tableHeader.appendChild(pubDate);

    const creatorHeader = document.createElement('td');
    creatorHeader.textContent = 'Created By';
    tableHeader.appendChild(creatorHeader);

    tableHeader.classList.add('table-heading');

    table.innerHTML = ''; // Clear the table content

    const headerContainer = document.createElement('div');
    headerContainer.classList.add('header-container');
    headerContainer.appendChild(tableHeader);

    table.appendChild(headerContainer);

    console.log(items,'[items]');

    const rowContainer = document.createElement('div');
    items.forEach((item) => {
        const row = document.createElement('tr');

        if(item['title']){
            const titleCell = document.createElement('td');
            const titleText = document.createTextNode(item['title']);
            titleCell.appendChild(titleText);
            titleCell.classList.add('row-title')
            row.appendChild(titleCell);
        }else{
            const empty = document.createElement('td');
            const text       = document.createTextNode('-');
            empty.classList.add('row-title')
            empty.appendChild(text);
            row.appendChild(empty);
        }
    
        const descriptionCell = document.createElement('td');
        if(item['description']){
            const parser = new DOMParser();
            const parsed = parser.parseFromString(item['description'], 'text/html');
            const link   = parsed.getElementsByTagName('a').item('a');
            const img    = link.children.item('img');
            img.style.width = '40px';
            img.style.height = '40px';
            descriptionCell.appendChild(img);
        }

        if(item['link']){
            const anchor = document.createElement('a');
            anchor.href  = item['link'];
            anchor.target = '_blank';
            anchor.textContent = 'full story here';
            descriptionCell.appendChild(anchor);
            descriptionCell.classList.add('row-description')
            row.appendChild(descriptionCell);

        }else{
            const empty = document.createElement('td');
            const text       = document.createTextNode('-');
            empty.classList.add('row-link')
            descriptionCell.appendChild(text);
            row.appendChild(descriptionCell);
        }


        if(item['pubDate']){
            const publishedDateCell = document.createElement('td');
            const date              = new Date(item['pubDate']);
            const publishedDateText = document.createTextNode(date.toLocaleDateString());
            publishedDateCell.classList.add('row-pub-date')
            publishedDateCell.appendChild(publishedDateText);
            row.appendChild(publishedDateCell);
        }else{
            const empty = document.createElement('td');
            const text       = document.createTextNode('-');
            empty.classList.add('row-pub-date');
            empty.appendChild(text);
            row.appendChild(empty);
        }


        if(item['dc:creator']){
            const createdByCell = document.createElement('td');
            const createdByText = document.createTextNode(item['dc:creator']['#text']);
            createdByCell.classList.add('row-creator')
            createdByCell.appendChild(createdByText);
            row.appendChild(createdByCell);

        }else{
            const empty = document.createElement('td');
            const text       = document.createTextNode('-');
            empty.classList.add('row-creator');
            empty.appendChild(text);
            row.appendChild(empty);
        }

        // console.log(row, '[row]');
        row.classList.add('table-row');
        rowContainer.classList.add('row-container');
        rowContainer.appendChild(row);
        table.appendChild(rowContainer);
    });

    // console.log(domElements[0], '[domElements]');
};  

const createPaginationControl = (data, currentPage, itemsPerPage , paginationContainer) => {
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    paginationContainer.innerHTML = ''; // Clear the pagination control
    
    for (let i = 1; i <= totalPages; i++) {
        const container = document.createElement('div');
        const button = document.createElement('button');
        button.textContent = i;
        button.dataset.page = i;
        button.no = i;
        // button.da
        if (i === currentPage) {
            button.classList.add('active');
        }
        container.appendChild(button);
        paginationContainer.appendChild(container);
    }

};

const displayTable = (data, currentPage, itemsPerPage) => {
    tableGeneration(data, currentPage, itemsPerPage);
};

const createHeading = (data) =>{
    const {channel} = data;

    const parentDiv = document.getElementById('news-heading-container')
    
    // console.log(channel, '[channel]');
    const div = document.createElement('div');

    const anchor = document.createElement('a');
    anchor.href = channel.image.link;
    anchor.target = '_blank';
    const img = document.createElement('img');
    img.src = channel.image.url;
    anchor.appendChild(img);
    div.appendChild(anchor);

    const title  = document.createElement('h2');
    title.textContent = channel.title;
    const desc = document.createElement('p');
    desc.textContent = channel.description;

    const link = document.createElement('a');
    link.href = channel.link;
    link.target = '_blank';
    const linkChild = document.createElement('button');
    linkChild.textContent = 'read full story here';
    
    link.appendChild(linkChild);
    div.append(title);
    div.append(desc);
    div.append(link);

    parentDiv.append(div);

    
}

const filterDataByTitle = (data, searchTerm) => {
    const items = data;
    const result = items.filter(item => item.title.toLowerCase().includes(searchTerm));

    console.log(result,'[result]');

    return result;
};

// Function to sort data by title
const sortDataByTitle = (data, order) => {
    const items = data;
    console.log(items, '[items]-[sortDataByTitle]');
    const sortedItems = items.slice().sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (order === 'asc') {
            return titleA.localeCompare(titleB);
        } else if (order === 'desc') {
            return titleB.localeCompare(titleA);
        }
    });
    // return { channel: { item: sortedItems } };
    return sortedItems;
};