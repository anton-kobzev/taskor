export default class Helpers {
    static secondsToHms(d) {
        d = Number(d)
        const h = Math.floor(d / 3600)
        const m = Math.floor((d % 3600) / 60)
        const s = Math.floor((d % 3600) % 60)

        const hDisplay = h > 9 ? h : "0" + h
        const mDisplay = m > 9 ? m : "0" + m
        const sDisplay = s > 9 ? s : "0" + s
        return hDisplay + ":" + mDisplay + ":" + sDisplay
    }

    static renderDateTime(datetime) {
        let date = new Date(Date.parse(datetime)),
            now = new Date(),
            diffMinutes = Math.round((now - date) / 1000 / 60)
        if (diffMinutes < 1) return "just now"
        else if (diffMinutes === 1) return "1 minute ago"
        else if (diffMinutes < 60) return diffMinutes + " minutes ago"
        else if (diffMinutes > 59 && diffMinutes < 60 * 24) {
            const hours = Math.round(diffMinutes / 60)
            return hours + (hours == 1 ? " hour" : " hours") + " ago"
        } else
            return (
                (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
                "." +
                (date.getMonth() < 10
                    ? "0" + date.getMonth()
                    : date.getMonth()) +
                "." +
                date.getFullYear() +
                " " +
                (date.getHours() < 10
                    ? "0" + date.getHours()
                    : date.getHours()) +
                ":" +
                (date.getMinutes() < 10
                    ? "0" + date.getMinutes()
                    : date.getMinutes())
            )
    }
}
