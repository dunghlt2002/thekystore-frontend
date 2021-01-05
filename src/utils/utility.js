import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL

class myUtility  {

    translateBuyShort = (color) =>
    {
        var strBSColor = [];
        if (color === 1) {
            strBSColor = ["Buy","Green"]
        } else if (color === 2) {
            strBSColor = ["Short","Red"]
        }
        
        return strBSColor

    }
    
    uploadFiles(folder, myFile) {

        const fd = new FormData();

        // neu co chon file hinh de upload thi moi chay khuc upload nay
        console.log('file duoc chon la ' + myFile);
        if (myFile) {
            fd.append(folder, myFile);
            console.log("ten file se up la " + myFile.name);
            
            // tat ca cac function tren backend deu bat dau la localhost:8080/api
            // con dieu do qui dinh o dau thi khong biet luon
            axios({
                url: API_URL + folder,
                method: "post",
                data: fd,
            }).then(res => {
                console.log('file upload result: ' + res.statusText);
            }).catch(e => {
              console.log(e);
            })
          }

    }

    //Chuyen doi van de duong link
    // hay chuyen tieng Viet co dau sang khong dau - trong Admin de create new product
    chuyenDoiURL = (str) =>
    {
        // Chuyển hết sang chữ thường
        str = str.toLowerCase();     
        
        // xóa dấu
        str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
        str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
        str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
        str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
        str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
        str = str.replace(/(đ)/g, 'd');
        
        // Xóa ký tự đặc biệt
        str = str.replace(/([^0-9a-z-\s])/g, '');
        
        // Xóa khoảng trắng thay bằng ký tự -
        str = str.replace(/(\s+)/g, '-');
        
        // xóa phần dự - ở đầu
        str = str.replace(/^-+/g, '');
        
        // xóa phần dư - ở cuối
        str = str.replace(/-+$/g, '');
        
        // return
        return str;
    }

    toMyFormatDate(ngay) {
        var ngayve;
        console.log('ngay ' + typeof(ngay));
        // var ngayy = ngay.toString()
        
        if (ngay !== null) {
            // ngayve = ngay.split('-')[0] + '/' + ngay.split('-')[1] + '/' + ngay.split('-')[2] + ' --- ' + ngay.split('T')[0]
            // lay ham slice sau khi chuyen ngay toString, split T no khong chiu
            // vi tri 11 la bat dau gio phut giay
            ngayve = ngay.split('T')[0] + ' at ' + ngay.toString().slice(11,19)
            // + ngay.split('T')[1].slice(0,8)
            // .substring(0,8)
        }
        return ngayve
    }


}

export default new myUtility();