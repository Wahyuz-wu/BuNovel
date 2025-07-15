document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items : [
          { id : 1, name: 'Angkasa dan 56 Hari', img: 'https://cdn.gramedia.com/uploads/items/9786239712716.jpg', price: 60000, price2: 110000, bintang: '4.5'},
          { id : 2, name: 'Dikta & Hukum', img: 'https://cdn.gramedia.com/uploads/items/dikta_dan_hukum.jpg', price: 86000, price2: 90000, bintang: '4.2'},
          { id : 3, name: 'Saat-Saat Jauh', img: 'https://cdn.gramedia.com/uploads/items/Saat_Saat_Jauh_cov.jpg', price: 90000, price2: 100000, bintang: '4'},
          { id : 4, name: 'The Last Spell Breather', img: 'https://bukukita.com/babacms/displaybuku/116930_f.jpg', price: 90000, price2: 150000, bintang: '4.4'},
          { id : 5, name: 'Cantik Itu Luka', img: 'https://www.gramedia.com/blog/content/images/2022/06/Cantik-Itu-Luka.jpg', price: 85000, price2: 99000, bintang: '4.3'},
          { id : 6, name: 'Jane', img: 'https://bukurepublika.id/wp-content/uploads/2021/11/CD-Jane.jpg', price: 70000, price2: 120000, bintang: '4.7'},
          { id : 7, name: 'Ayat-Ayat Cinta', img: 'https://cdn1-production-images-kly.akamaized.net/vmO7bBQfyI4bWahHujrKiygU2Ps=/500x667/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/925940/original/032865000_1436602413-ciri-ciri_novel.jpg', price: 40000, price2: 100000, bintang: '5'},
          { id : 8, name: 'The Poppy War', img: 'https://cdn.gramedia.com/uploads/items/9786020634951_the_poppy_war_cov.jpg', price: 70000, price2: 120000, bintang: '4.8'},
          { id : 9, name: 'Kado Terbaik', img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1649449733i/60775590.jpg', price: 184000, price2: 200000, bintang: '4.9'},
          { id : 10, name: 'Sang Pemimpi', img: 'https://cdn.gramedia.com/uploads/items/9786028811378_New-Edition-Sang-Pemimpi.jpg', price: 65000, price2: 150000, bintang: '4.6'},
        ],
    }));

    Alpine.store('cart', {
        items : [],
        total : 0,
        quantity : 0,
        add(newItem) {

            //cek barang ganda
            const cartItem = this.items.find((item) => item.id === newItem.id);

            //jika belum ada
            if(!cartItem){
                this.items.push({...newItem, quantity: 1, total: newItem.price});
                this.quantity++;
                this.total += newItem.price;
            } else {
                //jika  barang ada
                this.items = this.items.map((item) => {
                    //jika barang berbeda
                    if(item.id !== newItem.id){
                        return item;
                    } else {
                        //jika barang dh ada, tambah quantity dan total
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                });
            }
        },
        remove(id){
            const cartItem = this.items.find((item) => item.id === id);

            if(cartItem.quantity > 1){
                this.items = this.items.map((item) => {

                    if(item.id !== id){
                        return item;
                    }else{
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }

                });

            } else if (cartItem.quantity === 1){
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        },
    });
});

//konversi rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};
