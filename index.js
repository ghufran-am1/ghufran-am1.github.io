let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;

// حساب المجموع
window.getTotal = function() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040";
    } else {
        total.innerHTML = '';
        total.style.background = "#a00d02";
    }
};

// إدارة التخزين المحلي - التأكد من وجود بيانات صحيحة
let dataPro;
try {
    if (localStorage.product && localStorage.product != 'undefined' && localStorage.product != 'null') {
        dataPro = JSON.parse(localStorage.product);
        // التأكد من أن البيانات عبارة عن مصفوفة
        if (!Array.isArray(dataPro)) {
            dataPro = [];
        }
    } else {
        dataPro = [];
    }
} catch (e) {
    console.error('خطأ في قراءة البيانات:', e);
    dataPro = [];
}

// إضافة أو تحديث المنتج
submit.onclick = function() {
    // التحقق من الحقول المطلوبة
    if (title.value.trim() == '' || price.value.trim() == '' || category.value.trim() == '') {
        alert('الرجاء ملء الحقول المطلوبة: العنوان، السعر، والفئة');
        return;
    }

    let newPro = {
        title: title.value.toLowerCase().trim(),
        price: price.value.trim(),
        taxes: taxes.value.trim() || '0',
        ads: ads.value.trim() || '0',
        discount: discount.value.trim() || '0',
        total: total.innerHTML || price.value.trim(),
        count: count.value.trim() || '1',
        category: category.value.toLowerCase().trim(),
    };

    if (mood === 'create') {
        if (newPro.count > 1) {
            for (let i = 0; i < newPro.count; i++) {
                dataPro.push({...newPro, count: '1'});
            }
        } else {
            dataPro.push(newPro);
        }
    } else {
        dataPro[tmp] = newPro;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }

    localStorage.setItem('product', JSON.stringify(dataPro));
    clearData();
    showData();
};

// تنظيف الحقول
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// عرض البيانات في الجدول
window.showData = function() {
    getTotal();
    let table = '';
    
    console.log('عدد المنتجات:', dataPro.length);
    console.log('البيانات:', dataPro);
    
    for (let i = 0; i < dataPro.length; i++) {
        console.log('المنتج رقم', i, ':', dataPro[i]);
        
        // التأكد من وجود البيانات قبل استخدامها
        if (dataPro[i] && typeof dataPro[i] === 'object') {
            table += ` 
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title || ''}</td>
                    <td>${dataPro[i].price || ''}</td>
                    <td>${dataPro[i].taxes || ''}</td>
                    <td>${dataPro[i].ads || ''}</td>
                    <td>${dataPro[i].discount || ''}</td>
                    <td>${dataPro[i].total || ''}</td>
                    <td>${dataPro[i].category || ''}</td>
                    <td><button onclick="window.updateData(${i})">Update</button></td>
                    <td><button onclick="window.deleteData(${i})">Delete</button></td>
                </tr>
            `;
        } else {
            console.warn('بيانات غير صالحة في الفهرس', i);
        }
    }

    document.getElementById('tbody').innerHTML = table;

    let btnDelete = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `
            <button onclick="window.deleteAll()">Delete All (${dataPro.length})</button>
        `;
    } else {
        btnDelete.innerHTML = '';
    }
};

// حذف عنصر واحد
window.deleteData = function(i) {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
        dataPro.splice(i, 1);
        localStorage.setItem('product', JSON.stringify(dataPro));
        showData();
    }
};

// حذف الكل
window.deleteAll = function() {
    if (confirm('هل أنت متأكد من حذف جميع المنتجات؟')) {
        localStorage.removeItem('product');
        dataPro = [];
        showData();
    }
};

// تحديث البيانات
window.updateData = function(i) {
    if (dataPro[i]) {
        title.value = dataPro[i].title || '';
        price.value = dataPro[i].price || '';
        taxes.value = dataPro[i].taxes || '';
        ads.value = dataPro[i].ads || '';
        discount.value = dataPro[i].discount || '';
        category.value = dataPro[i].category || '';
        
        getTotal();
        
        count.style.display = 'none';
        submit.innerHTML = 'Update';
        mood = 'update';
        tmp = i;
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

// متغيرات البحث
let searchMood = 'title';

// تغيير نوع البحث
window.getSearchMood = function(id) {
    let search = document.getElementById('search');
    
    if (id == 'searchTitle') {
        searchMood = 'title';
        search.placeholder = 'Search By Title';
    } else {
        searchMood = 'category';
        search.placeholder = 'Search By Category';
    }
    
    search.focus();
    search.value = '';
    showData();
};

// وظيفة البحث
window.searchData = function(value) {
    let table = '';
    value = value.toLowerCase().trim();
    
    if (value === '') {
        showData();
        return;
    }
    
    if (searchMood == 'title') {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i] && dataPro[i].title && dataPro[i].title.includes(value)) {
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title || ''}</td>
                        <td>${dataPro[i].price || ''}</td>
                        <td>${dataPro[i].taxes || ''}</td>
                        <td>${dataPro[i].ads || ''}</td>
                        <td>${dataPro[i].discount || ''}</td>
                        <td>${dataPro[i].total || ''}</td>
                        <td>${dataPro[i].category || ''}</td>
                        <td><button onclick="window.updateData(${i})">Update</button></td>
                        <td><button onclick="window.deleteData(${i})">Delete</button></td>
                    </tr>
                `;
            }
        }
    } else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i] && dataPro[i].category && dataPro[i].category.includes(value)) {
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title || ''}</td>
                        <td>${dataPro[i].price || ''}</td>
                        <td>${dataPro[i].taxes || ''}</td>
                        <td>${dataPro[i].ads || ''}</td>
                        <td>${dataPro[i].discount || ''}</td>
                        <td>${dataPro[i].total || ''}</td>
                        <td>${dataPro[i].category || ''}</td>
                        <td><button onclick="window.updateData(${i})">Update</button></td>
                        <td><button onclick="window.deleteData(${i})">Delete</button></td>
                    </tr>
                `;
            }
        }
    }
    
    if (table === '') {
        document.getElementById('tbody').innerHTML = '<tr><td colspan="10">لا توجد نتائج للبحث</td></tr>';
    } else {
        document.getElementById('tbody').innerHTML = table;
    }
};

// إضافة منتج تجريبي للاختبار
window.addTestData = function() {
    dataPro.push({
        title: 'منتج تجريبي',
        price: '100',
        taxes: '10',
        ads: '5',
        discount: '0',
        total: '115',
        category: 'اختبار'
    });
    localStorage.setItem('product', JSON.stringify(dataPro));
    showData();
};

// عرض البيانات عند تحميل الصفحة
showData();