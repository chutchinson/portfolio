import * as luxon from 'luxon'

const wastePickupUrl  = 'https://api.cshutchinson.com/api/wastePickup'

const delay = async (duration: number) => {
    return new Promise((resolve) => setTimeout(resolve, duration))
}

export interface WastePickup {
    local: boolean,
    trash: boolean,
    recycling: boolean
}

export class CityService {

    public async wastePickup(): Promise<WastePickup> {

        const local = () => {
            const today = luxon.DateTime.utc()
            const lastKnownRecyclingDate = luxon.DateTime.fromISO('2020-03-10').toUTC()
            const diff = lastKnownRecyclingDate.diffNow('weeks')
            const isTrashDay = today.weekday == 1
            const isRecyclingDay = isTrashDay && diff.weeks % 2 == 0

            return Promise.resolve<WastePickup>({
                local: true,
                trash: isTrashDay,
                recycling: isRecyclingDay
            })
        }

        const remote = async () => {
            try {
                const response = await fetch(wastePickupUrl, {
                    method: 'get',
                    mode: 'cors',
                    cache: 'no-cache',
                    redirect: 'follow',
                    keepalive: false,
                    referrerPolicy: 'no-referrer',
                    credentials: 'omit'
                })

                if (!response.ok) {
                    return local()
                }

                const json = await response.json()
                const today = luxon.DateTime.utc()
                const trashDate = luxon.DateTime.fromISO(json.trash)
                const recyclingDate = luxon.DateTime.fromISO(json.recycling)
                const isTrashDay = trashDate.diff(today, 'days').days <= 0
                const isRecyclingDay = recyclingDate.diff(today, 'days').days <= 0
                
                const result: WastePickup = {
                    local: false,
                    trash: isTrashDay,
                    recycling: isRecyclingDay
                }

                return result
            }
            catch(ex) {
                return local()
            }
        }

        const timeout = delay(5000)
        const result = remote()
        const race = Promise.race([timeout, result])

        return race != timeout
            ? await result
            : await local()
    }

}