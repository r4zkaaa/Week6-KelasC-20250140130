const MIN_INPUT_LENGTH = 1;

const listProdukContainer = document.querySelector('#listProduk');
const inputNama = document.querySelector('#inputNama');
const btnSubmit = document.querySelector('#submit');
const isianContainer = document.querySelector('#isian');

let listBarang = [];

async function fetchProduk() {
  try {
    listProdukContainer.innerHTML = '<p>Sedang mengambil data produk...</p>';
    const response = await fetch('https://dummyjson.com/products');

    if (!response.ok) throw new Error('Gagal mengambil data dari server');

    const data = await response.json();
    listBarang = data.products; 

   
    tampilkanListProduk(listBarang);
  } catch (error) {
    listProdukContainer.innerHTML = `<p style="color: red;"> Ada kesalahan! Tolong cek ulang internet anda.</p>`;
  }
}

function tampilkanListProduk(products) {
  listProdukContainer.innerHTML = ''; 

  products.forEach(product => {
    const box = document.createElement('div');
    box.classList.add('listBox');
    box.innerHTML = `<p>• ${product.title}</p>`;
    listProdukContainer.appendChild(box);
  });
}

btnSubmit.addEventListener('click', function () {
  const teks = inputNama.value.trim();

  if (teks === '') {
    isianContainer.innerHTML = `
      <div class="card-salah">
        <p>Tolong masukkan nama produknya dulu!</p>
      </div>`;
    return;
  }

  const Ketemu = listBarang.find(
    product => product.title.toLowerCase() === teks.toLowerCase()
  );

  if (Ketemu) {
    isianContainer.innerHTML = `
      <div class="card">
        <div class="card-nama-id">
          <p class="id">ID: ${Ketemu.id}</p>
          <p class="nama"><strong>${Ketemu.title}</strong></p>
        </div>
        <div class="card-pict-box">
          <img class="card-pict" src="${Ketemu.thumbnail}" alt="${Ketemu.title}" width="150">
        </div>
        <div class="card-desc">
          <p class="desc">${Ketemu.description}</p>
        </div>
        <div class="card-harga">
          <p class="harga">Harga: $${Ketemu.price}</p>
        </div>
      </div>`;
  } else {
    isianContainer.innerHTML = `
      <div class="card-salah">
        <p>Nama produk "<strong>${teks}</strong>" tidak ada, mohon dicek lagi</p>
      </div>`;
  }
});

fetchProduk();