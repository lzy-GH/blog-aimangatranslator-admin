import { Moment } from "moment"
import moment from 'moment';

interface ITime {
    timestart:string,
    timeEnd:string
}
export function formatting(val: Moment[] | null,formatType?:string): ITime {
    // console.log(4442,val![0]);
    let timestart = '',
        timeEnd = ''

    if (val?.length) {
        timestart = moment(val![0]).format(formatType?formatType:'YYYY-MM-DD HH:mm:ss')
        timeEnd = moment(val![1]).format(formatType?formatType:'YYYY-MM-DD HH:mm:ss')
    }
    
    return {
        timestart,
        timeEnd
    }
}