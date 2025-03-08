




import React from 'react';
import { useUploadBulkFileMutation } from '../redux/baseApi';

const BulkFileUpload = () => {

    const [BulkFileUpload, { isLoading, error }] = useUploadBulkFileMutation();

    const fileUplaodHanlder = async () => {
        try {
            const response = await BulkFileUpload({}).unwrap();
        
            console.log("success:",  JSON.stringify(response));
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <>
            <input onChange={fileUplaodHanlder} disabled={isLoading} type='file' className='px-3 ml-2 py-1 font-bold bg-white text-black rounded transition-all px-4 py-2' />
        
        </>
    )
}

export default BulkFileUpload