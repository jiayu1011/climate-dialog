import {dialogModel} from "./model";

export const DIALOG_DB_HANDLER = {
    queryAllDialogList: (): Promise<any> => {
        return new Promise((resolve, reject) => {
            dialogModel.find((err: any, data: any) => {
                if(err) {
                    reject([null, err])
                }
                resolve([data, null])
            })
        })
    },
    insertDialogItem: (dialogItem: any): Promise<any>  => {
        return new Promise((resolve, reject) => {
            dialogModel.create(dialogItem, (err: any, data: any) => {
                if(err) {
                    reject([null, err])
                }
                resolve([data, null])
            })
        })
    }
}