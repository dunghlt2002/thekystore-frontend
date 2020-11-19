import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL

class myUtility  {

    translateBuyShort = (color) =>
    {
        var strBSColor = [];
        if (color == 1) {
            strBSColor = ["Buy","Green"]
        } else if (color == 2) {
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

}

export default new myUtility();