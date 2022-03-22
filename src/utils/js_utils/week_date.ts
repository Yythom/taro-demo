/* eslint-disable @typescript-eslint/no-unused-vars */
import dayjs from "dayjs";

function weekdete(value: string | number | undefined): {
    str?: string,
    time?: string,
    show?: string,
    today?: string,
    hours?: string,
    twelve_hours?: string,
} | undefined {
    if (!value) return;
    var date1 = new Date();
    var date2 = new Date(value);
    // date2.setDate(date1.getDate() + aa);
    let month: string | number = "";
    let day: string | number = "";
    if (date2.getMonth() + 1 < 10) month = "0" + (date2.getMonth() + 1);
    else month = date2.getMonth() + 1;

    if (date2.getDate() < 10) day = "0" + date2.getDate();
    else day = date2.getDate();

    var time2 = date2.getFullYear() + "-" + month + "-" + day;
    const week = `(${dayjs(time2).format("dddd").replace("星期", "周")})`;

    let today =
        dayjs(time2).format("YY-MM-DD dddd") === dayjs(date1).format("YY-MM-DD dddd")
            ? `今日`
            : "";
    let tomorrow =
        dayjs(time2).format("YY-MM-DD dddd") ===
            dayjs(date1.valueOf() + 86400000).format("YY-MM-DD dddd")
            ? `明日`
            : "";
    let yesterday =
        dayjs(time2).format("YY-MM-DD dddd") ===
            dayjs(date1.valueOf() - 86400000).format("YY-MM-DD dddd")
            ? `昨日`
            : "";

    const time3 = dayjs(value).format("HH:mm");
    const str = `${today || tomorrow || yesterday || dayjs(time2).format("MM月DD号 ")
        }`;

    const day_7 = new Date(+date1 + 604800000);
    let Show_7 = false;
    if (day_7.getMonth() === date2.getMonth()) {
        if (Math.abs(date2.getDate() - day_7.getDate()) <= 7) {
            Show_7 = true;
        }
    }
    const _today = `${today || tomorrow || yesterday}`;

    return {
        str,
        time: time2,
        // show: `${!Show_7 ? time2 : str} ${time3}`,
        show: `${!_today ? time2 : str} ${time3}`,
        today: _today,
        hours: dayjs(value).format("HH:mm"),
        twelve_hours: `${!_today ? time2 : str} ${dayjs(value).format("A hh:mm")}`,
    };
}

export { weekdete }