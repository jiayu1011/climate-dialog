import dayjs from "dayjs";

export const getStdFormatNowTime = () => {
    return dayjs().format('YYYY-MM-DD HH:mm:ss')
}