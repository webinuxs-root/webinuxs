import moment from "moment";

export const uniqueId = () => {
    const prefix = "WBX";
    const uniquePart = generateUniquePart();
    return prefix + uniquePart;
}

const generateUniquePart = () => {
    const currentDate = moment();
    const timestamp = currentDate.format('YYMMDDHHmmss');
    const randomString = generateRandomString(4).toUpperCase();
    return `${timestamp}${randomString}`;
}

const generateRandomString = (length: number) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}