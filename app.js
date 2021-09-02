  const bookContainer = document.getElementById('book-container')
  var result = document.getElementById('result')
  document.getElementById('search-btn').addEventListener('click', () => {

      bookContainer.innerHTML = `
    <div class="w-100 h-100 d-flex justify-content-center align-items-center">
    <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
    </div>
    `
      const searchText = document.getElementById('search-text');
      if (searchText.value == '') {
          bookContainer.innerHTML = ''
          result.innerHTML = "Please search with a valid book name"
          result.style.background = '#1e272d';
      } else {
          const api = `http://openlibrary.org/search.json?q=${searchText.value}`
          searchText.value = ''
          result.innerHTML = ''
          result.style.background = 'transparent';
          fetch(api)
              .then(res => res.json())
              .then(data => showData(data.docs))
      }
  })


  const showData = (books) => {
      var newArr = books.filter(one => one.cover_i !== undefined && one.author_name !== undefined && one.publisher !== undefined && one.title !== undefined && one.first_publish_year !== undefined)
      if (newArr.length === 0) {
          result.innerHTML = ''
          result.innerHTML = 'No Result Found!'
          result.style.background = '#1e272d';
          bookContainer.innerHTML = ''
      } else {

          var newP = document.createElement('p')
          newP.innerHTML = `You got ${newArr.length} books`
          result.style.background = '#1e272d';
          result.innerHTML = ''
          result.appendChild(newP)

          bookContainer.innerHTML = ''
          newArr.forEach(book => {



              const newDiv = document.createElement('div')
              newDiv.innerHTML = `

    <div class="card-group">
      <div class="card rounded-0 shadow mb-5" style="width: 20rem;min-height:450px"> 
      <img class="card-img-top img-fluid" style="width:100%; height:250px" src='https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg'>
      <div class="card-body">
      <h5 class="card-title text-primary">${book.title}</h5>
      <p class="card-subtitle text-secondary mb-2">Author: ${book.author_name[0]}</p>
      <p class="card-text text-warning">Publisher: ${book.publisher[0]}</p>
      <p class="card-text text-danger">First Publish Year: ${book.first_publish_year}</p>
     
      </div>
      </div>
      </div>`

              bookContainer.appendChild(newDiv)
          })
      }


      // <button onclick='showDetails(${id})' class='btn btn-primary'>Details</button>
  }

  const showDetails = (coverId) => {
      console.log(coverId);
  }