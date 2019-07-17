export default{
    generateUUID(){  
        let ua = navigator.userAgent;
        let nowTime = new Date().getTime();
        return `${ua}---${nowTime}`
    }

} 